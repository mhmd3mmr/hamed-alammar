// Particle voice orb. Loaded lazily by Hero so three.js stays out of the main bundle.
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera,
  Points, RingGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer,
} from 'three'

export type OrbState = { energy: number; target: number; speaking: boolean }

const vertexShader = /* glsl */ `
uniform float t, e, pr; uniform vec2 m; attribute float seed; varying float vA; varying float vB;
vec3 h(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(vec3(p.x*p.y*p.z,p.x+p.y*p.z,p.x*p.y+p.z));}
float n(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
  return mix(mix(mix(h(i).x,h(i+vec3(1,0,0)).x,f.x),mix(h(i+vec3(0,1,0)).x,h(i+vec3(1,1,0)).x,f.x),f.y),
             mix(mix(h(i+vec3(0,0,1)).x,h(i+vec3(1,0,1)).x,f.x),mix(h(i+vec3(0,1,1)).x,h(i+vec3(1,1,1)).x,f.x),f.y),f.z);}
void main(){
  vec3 p=position; float k=n(p*2.2+vec3(t*.25)); float band=sin(p.y*10.-t*6.)*.5+.5;
  float d=1.45+(k-.5)*.55+e*band*.45*(.6+seed*.8);
  vec3 q=p*d; q.xy+=m*.35*(1.-abs(p.z));
  vec4 mv=modelViewMatrix*vec4(q,1.); gl_Position=projectionMatrix*mv;
  gl_PointSize=(1.3+seed*1.6+e*1.5)*pr*(6./-mv.z);
  vA=.35+.65*smoothstep(-1.,1.,p.z); vB=band*e;
}`

const fragmentShader = /* glsl */ `
varying float vA; varying float vB;
void main(){ vec2 c=gl_PointCoord-.5; if(dot(c,c)>.25) discard;
  vec3 col=mix(vec3(.62,.66,1.),vec3(.17,.23,1.),.35); col=mix(col,vec3(1.),vB*.6);
  gl_FragColor=vec4(col,vA*.85); }`

export function mountOrb(
  canvas: HTMLCanvasElement, stage: HTMLElement, state: OrbState,
  onFrame: (energy: number, time: number) => void, still: boolean,
) {
  let renderer: WebGLRenderer
  try { renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }) }
  catch { return () => {} }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

  const scene = new Scene()
  const camera = new PerspectiveCamera(40, 1, .1, 100)
  camera.position.z = 6.2

  const N = innerWidth < 700 ? 8000 : 16000
  const pos = new Float32Array(N * 3), seed = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u)
    pos.set([s * Math.cos(a), u, s * Math.sin(a)], i * 3)
    seed[i] = Math.random()
  }
  const geo = new BufferGeometry()
  geo.setAttribute('position', new BufferAttribute(pos, 3))
  geo.setAttribute('seed', new BufferAttribute(seed, 1))
  const U = { t: { value: 0 }, e: { value: 0 }, m: { value: new Vector2() }, pr: { value: renderer.getPixelRatio() } }
  const mat = new ShaderMaterial({ uniforms: U, vertexShader, fragmentShader, transparent: true, depthWrite: false, blending: AdditiveBlending })
  const points = new Points(geo, mat)
  scene.add(points)
  const ringGeo = new RingGeometry(2.55, 2.56, 160)
  const ringMat = new MeshBasicMaterial({ color: 0x9aa4ff, transparent: true, opacity: .35 })
  const ring = new Mesh(ringGeo, ringMat)
  scene.add(ring)

  const size = () => {
    const w = stage.clientWidth, h = stage.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const x = w > 900 ? .9 : 0
    points.position.x = x; ring.position.x = x
    // Keep the whole sphere inside narrow stages.
    camera.position.z = w < 600 ? 7.6 : 6.2
  }
  size()
  const ro = new ResizeObserver(size)
  ro.observe(stage)

  const mouse = new Vector2()
  const move = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect()
    mouse.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1))
    state.target = Math.max(state.target, .12)
  }
  const leave = () => { mouse.set(0, 0); if (!state.speaking) state.target = 0 }
  stage.addEventListener('pointermove', move, { passive: true })
  stage.addEventListener('pointerleave', leave)

  let visible = true, raf = 0, last = performance.now()
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  io.observe(stage)

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop)
    const dt = Math.min(.05, (now - last) / 1000); last = now
    if (!visible || document.hidden) return
    state.energy += (state.target - state.energy) * .08
    if (state.speaking) state.target = Math.max(.2, state.target * .96)
    if (!still) { U.t.value += dt; points.rotation.y += dt * .08; ring.rotation.z += dt * .05 }
    U.e.value = state.energy
    U.m.value.lerp(mouse, .06)
    points.rotation.x = U.m.value.y * .2
    renderer.render(scene, camera)
    onFrame(state.energy, U.t.value)
  }
  raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
    stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', leave)
    geo.dispose(); mat.dispose(); ringGeo.dispose(); ringMat.dispose(); renderer.dispose()
  }
}
