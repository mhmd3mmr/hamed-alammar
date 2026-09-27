// All site copy lives here. Edit English under `en` and Arabic under `ar`.
// Keep both languages in sync: every key in `en` must exist in `ar`.
// Rule: facts only. No em dashes or en dashes in copy.

export type Lang = 'en' | 'ar'

export const EMAIL = 'hmd3mar@gmail.com'
export const LINKEDIN = 'https://www.linkedin.com/in/seeammar'

const en = {
  name: 'Hamed Alammar',
  role: 'Arabic Language Specialist',
  nav: { about: 'About', work: 'Work', dialects: 'Dialects', lab: 'AI Lab', community: 'Community' },
  talk: "Let's talk",
  langToggle: 'Switch to Arabic',
  themeToggle: 'Toggle dark theme',
  meta: 'Columbus, Ohio · Native Levantine · MSA',
  heroA: 'I listen to how Arabic is ',
  heroEm: 'really spoken',
  heroB: ', and turn it into clear, trustworthy text for people and machines.',
  speak: 'Make it speak',
  speaking: 'Speaking',
  orbLabel: 'Interactive particle sphere that reacts to the cursor and pulses like speech',
  scroll: 'Scroll to explore',
  hud: { dialect: 'Dialect · Levantine', energy: 'Energy', city: 'Columbus' },

  aboutK: 'About',
  aboutS: 'Ten years inside the Arabic language',
  statement:
    'Arabic is the language I work in every day. I record it, edit it, transcribe it, and moderate it for large audiences, and I notice the small things that change meaning from one speaker to the next.',
  photoAlt: 'Portrait of Hamed Alammar',
  photoTodo: 'Photo coming soon',
  facts: [
    { n: '10+ yrs', l: 'working in Arabic every day' },
    { n: '1M+', l: 'audience of the bilingual studio he produces for' },
    { n: '45K', l: 'members in the community network he founded' },
    { n: '5', l: 'varieties of Arabic he works across' },
  ],
  voice: { k: 'Voice sample', play: 'Play', pause: 'Pause' },

  workK: 'Work',
  workS: 'Audio, archives, and building things',
  workH: 'Selected work',
  work: [
    {
      org: 'mhmd3mmr Media', years: '2020 · Present', fx: 'wave',
      h: 'Audio Producer and Editor',
      p: 'Records and edits Arabic and English interviews for a bilingual studio. Judges every take on clarity, noise, and natural spoken rhythm before release.',
      tags: ['Recording', 'Editing', 'Bilingual'],
    },
    {
      org: 'miheen.com', years: '2020 · Present', fx: 'rings',
      h: 'Oral History Archive',
      sub: 'Editor and Archive Reviewer',
      p: 'Listens to, transcribes, and classifies recorded Syrian testimony, often from elderly speakers and noisy recordings, marking what is certain and what is not.',
      tags: ['Transcription', 'Classification', 'Dialects'],
    },
    {
      org: 'AI training platforms', years: '2024 · 2026', fx: 'grid',
      h: 'AI Data Annotator',
      p: 'Transcribed and annotated Arabic and English data and ranked model answers against written rubrics, with clear reasoning for every decision.',
      tags: ['Annotation', 'Rubrics', 'Evaluation'],
    },
    {
      org: 'SAFWAH · AlHramayn LLC', years: '2023 · 2026', fx: 'dots',
      h: 'Founder and Store Manager',
      p: 'Built and ran a retail business end to end: sales, inventory, staff, suppliers, and customer service.',
      tags: ['Operations', 'Leadership'],
    },
  ],

  dK: 'Dialects',
  dS: 'One language, many sounds',
  dH: 'The map he hears',
  hint: 'Click a cluster',
  starsLabel: 'Constellation of Arabic dialects. Use the buttons beside it to choose a dialect.',
  chooseDialect: 'Choose a dialect',
  rowKeys: ['How are you?', 'Now', 'I want', 'What?'],

  lK: 'AI Lab',
  lS: 'Transcription and model evaluation',
  lH: 'Teaching machines to listen',
  lP: 'Good speech data starts with a careful ear. Hamed transcribes exactly what was said, labels dialect and disfluencies, and explains every judgment call so a model learns from real speech, not from guesses.',
  platformsLabel: 'Platforms',
  skills: [
    ['Verbatim Arabic transcription', 'noisy · accented'],
    ['Dialect and register labeling', 'LEV · GLF · EGY · MAG · MSA'],
    ['Prosody and disfluency tagging', 'stress · rhythm · fillers'],
    ['Ranking model answers', 'rubric based'],
  ],
  sample: 'Sample annotation · illustrative',
  tabs: ['Verbatim', 'Clean', 'MSA', 'English', 'Labels'],
  rankH: 'Ranking · "Say \'I\'m on my way\' in Egyptian Arabic"',
  rankA: 'MSA, not Egyptian',
  rankB: 'Preferred',
  why: 'B uses everyday Egyptian phrasing (⁨جاي، السكة⁩). A is correct Arabic but ignores the dialect the prompt asked for.',

  cK: 'Community',
  cS: 'Building networks in Arabic',
  c1n: '45,000+',
  c1h: 'Syrians in Jordan',
  c1p: 'Founded in 2015, the network grew to more than 45,000 members. Hamed wrote and moderated its daily Arabic communication.',
  c2n: '2025',
  c2h: 'Syrian Network in the United States',
  c2p: 'Founded in 2025 to connect Syrian community members across the United States.',
  eduH: 'Education',
  edu: [
    ['Diploma in Computer Science, Kiron', '2019'],
    ['Business Administration, Community College', '2025'],
    ['Photography and Mobile Apps, SAE', '2018'],
  ],
  awH: 'Recognition',
  awards: [
    ['NASA Innovation Award, National 2nd Place', '2017'],
    ['Kiron Digital Innovation Award, 2nd Place', '2020'],
    ['JRS Outstanding Student Commitment', '2021'],
  ],

  fA: "Let's ",
  fEm: 'talk.',
  copy: 'Copy email',
  copied: 'Copied',
  copyFail: 'Selected, press copy',
  location: 'Columbus, Ohio',
  langs: 'Arabic · English',
  skip: 'Skip to content',
}

export type Copy = typeof en

const ar: Copy = {
  name: 'حامد العمار',
  role: 'متخصص في اللغة العربية',
  nav: { about: 'نبذة', work: 'الأعمال', dialects: 'اللهجات', lab: 'مختبر الذكاء الاصطناعي', community: 'المجتمع' },
  talk: 'لنتحدث',
  langToggle: 'التبديل إلى الإنجليزية',
  themeToggle: 'تبديل الوضع الداكن',
  meta: 'كولمبس، أوهايو · اللهجة الشامية لغتي الأم · الفصحى',
  heroA: 'أُصغي إلى العربية كما ',
  heroEm: 'يتحدثها الناس فعلًا',
  heroB: '، وأحوّلها إلى نص واضح وموثوق للإنسان والآلة.',
  speak: 'اجعلها تتكلم',
  speaking: 'تتكلم الآن',
  orbLabel: 'كرة تفاعلية من الجزيئات تتفاعل مع المؤشر وتنبض كالكلام',
  scroll: 'مرّر للاستكشاف',
  hud: { dialect: 'Dialect · Levantine', energy: 'Energy', city: 'Columbus' },

  aboutK: 'نبذة',
  aboutS: 'عشر سنوات في قلب اللغة العربية',
  statement:
    'العربية هي اللغة التي أعمل بها كل يوم. أسجّلها وأحرّرها وأفرّغها وأشرف عليها لجماهير واسعة، وألاحظ التفاصيل الصغيرة التي تغيّر المعنى من متحدث إلى آخر.',
  photoAlt: 'صورة حامد العمار',
  photoTodo: 'الصورة قريبًا',
  facts: [
    { n: '10+', l: 'سنوات من العمل اليومي باللغة العربية' },
    { n: '1M+', l: 'جمهور الاستوديو ثنائي اللغة الذي ينتج له' },
    { n: '45K', l: 'عضو في الشبكة المجتمعية التي أسسها' },
    { n: '5', l: 'تنويعات من العربية يعمل عليها' },
  ],
  voice: { k: 'عيّنة صوتية', play: 'تشغيل', pause: 'إيقاف مؤقت' },

  workK: 'الأعمال',
  workS: 'الصوت والأرشيف وبناء المشاريع',
  workH: 'أعمال مختارة',
  work: [
    {
      org: 'mhmd3mmr Media', years: '2020 · حتى الآن', fx: 'wave',
      h: 'منتج ومحرر صوتي',
      p: 'يسجّل ويحرّر مقابلات بالعربية والإنجليزية لاستوديو ثنائي اللغة، ويقيّم كل تسجيل من حيث الوضوح والضجيج والإيقاع الطبيعي للكلام قبل نشره.',
      tags: ['التسجيل', 'التحرير', 'ثنائي اللغة'],
    },
    {
      org: 'miheen.com', years: '2020 · حتى الآن', fx: 'rings',
      h: 'أرشيف التاريخ الشفوي',
      sub: 'محرر ومراجع أرشيف',
      p: 'يستمع إلى الشهادات السورية المسجّلة ويفرّغها ويصنّفها، وكثير منها لكبار السن وبتسجيلات يغلب عليها الضجيج، مع تمييز المؤكد من غير المؤكد.',
      tags: ['التفريغ', 'التصنيف', 'اللهجات'],
    },
    {
      org: 'منصات تدريب الذكاء الاصطناعي', years: '2024 · 2026', fx: 'grid',
      h: 'مختص في وسم بيانات الذكاء الاصطناعي',
      p: 'فرّغ بيانات عربية وإنجليزية ووسمها، وقيّم إجابات النماذج وفق معايير مكتوبة، مع تعليل واضح لكل قرار.',
      tags: ['الوسم', 'المعايير', 'التقييم'],
    },
    {
      org: 'SAFWAH · AlHramayn LLC', years: '2023 · 2026', fx: 'dots',
      h: 'مؤسس ومدير متجر',
      p: 'أسس مشروعًا تجاريًا للبيع بالتجزئة وأداره بالكامل: المبيعات والمخزون والموظفون والموردون وخدمة العملاء.',
      tags: ['العمليات', 'القيادة'],
    },
  ],

  dK: 'اللهجات',
  dS: 'لغة واحدة وأصوات كثيرة',
  dH: 'الخريطة التي يسمعها',
  hint: 'اضغط على مجموعة',
  starsLabel: 'كوكبة من اللهجات العربية. استخدم الأزرار المجاورة لاختيار لهجة.',
  chooseDialect: 'اختر لهجة',
  rowKeys: ['كيف حالك؟', 'الآن', 'أريد', 'ماذا؟'],

  lK: 'مختبر الذكاء الاصطناعي',
  lS: 'التفريغ وتقييم النماذج',
  lH: 'نعلّم الآلة أن تُصغي',
  lP: 'البيانات الصوتية الجيدة تبدأ بأذن دقيقة. يفرّغ حامد ما قيل حرفيًا، ويَسِم اللهجة ومواضع التلعثم، ويشرح كل قرار حتى يتعلّم النموذج من كلام حقيقي لا من التخمين.',
  platformsLabel: 'المنصات',
  skills: [
    ['التفريغ الحرفي للعربية', 'noisy · accented'],
    ['وسم اللهجة والمستوى اللغوي', 'LEV · GLF · EGY · MAG · MSA'],
    ['وسم التنغيم والتلعثم', 'stress · rhythm · fillers'],
    ['ترتيب إجابات النماذج', 'rubric based'],
  ],
  sample: 'نموذج تعليق توضيحي',
  tabs: ['حرفي', 'منقّح', 'فصحى', 'إنجليزي', 'الوسوم'],
  rankH: 'ترتيب · «قل: أنا في الطريق، باللهجة المصرية»',
  rankA: 'فصحى، وليست مصرية',
  rankB: 'المفضّلة',
  why: 'الإجابة B تستخدم تعبيرًا مصريًا يوميًا (جاي، السكة). أما الإجابة A فعربية صحيحة، لكنها تتجاهل اللهجة التي طلبها السؤال.',

  cK: 'المجتمع',
  cS: 'بناء الشبكات بالعربية',
  c1n: '45,000+',
  c1h: 'سوريون في الأردن',
  c1p: 'تأسست الشبكة عام 2015 ونمت لتضم أكثر من 45 ألف عضو، وتولّى حامد كتابة تواصلها اليومي بالعربية والإشراف عليه.',
  c2n: '2025',
  c2h: 'الشبكة السورية في الولايات المتحدة',
  c2p: 'تأسست عام 2025 لتربط أبناء المجتمع السوري في أنحاء الولايات المتحدة.',
  eduH: 'التعليم',
  edu: [
    ['دبلوم في علوم الحاسوب، Kiron', '2019'],
    ['إدارة الأعمال، كلية المجتمع', '2025'],
    ['التصوير وتطبيقات الهاتف، SAE', '2018'],
  ],
  awH: 'التقدير',
  awards: [
    ['جائزة NASA للابتكار، المركز الثاني على المستوى الوطني', '2017'],
    ['جائزة Kiron للابتكار الرقمي، المركز الثاني', '2020'],
    ['جائزة JRS لالتزام الطالب المتميز', '2021'],
  ],

  fA: 'لنتحدث',
  fEm: '.',
  copy: 'انسخ البريد',
  copied: 'تم النسخ',
  copyFail: 'تم التحديد، اضغط نسخ',
  location: 'كولمبس، أوهايو',
  langs: 'العربية · الإنجليزية',
  skip: 'انتقل إلى المحتوى',
}

export const COPY: Record<Lang, Copy> = { en, ar }

// Captions typed during "Make it speak" (Levantine, with English translation).
export const CAPTIONS: [string, string][] = [
  ['كيفك؟ شو الأخبار؟', "How are you? What's new?"],
  ['هلّق جاية عبالي قهوة', 'Right now I feel like a coffee'],
  ['والله يا ابني هديك الأيام كانت غير', 'Honestly, son, those days were different'],
]

export type Dialect = {
  id: string; en: string; ar: string; x: number; y: number
  words: [string, string, string, string]
  note: Record<Lang, string>
}

export const DIALECTS: Dialect[] = [
  { id: 'lev', en: 'Levantine', ar: 'شامي', x: 0.62, y: 0.34, words: ['كيفك؟', 'هلّق', 'بدّي', 'شو؟'],
    note: { en: "Hamed's native dialect. Syria, Lebanon, Jordan, Palestine.", ar: 'لهجة حامد الأم. سوريا ولبنان والأردن وفلسطين.' } },
  { id: 'msa', en: 'Modern Standard', ar: 'فصحى', x: 0.5, y: 0.16, words: ['كيف حالك؟', 'الآن', 'أريد', 'ماذا؟'],
    note: { en: 'The shared written standard used in news, books, and formal speech.', ar: 'المعيار المكتوب المشترك في الأخبار والكتب والخطاب الرسمي.' } },
  { id: 'glf', en: 'Gulf', ar: 'خليجي', x: 0.8, y: 0.56, words: ['شلونك؟', 'الحين', 'أبي', 'شنو؟'],
    note: { en: 'Saudi Arabia, Kuwait, UAE, Qatar, Bahrain, Oman.', ar: 'السعودية والكويت والإمارات وقطر والبحرين وعُمان.' } },
  { id: 'egy', en: 'Egyptian', ar: 'مصري', x: 0.44, y: 0.58, words: ['إزيك؟', 'دلوقتي', 'عايز', 'إيه؟'],
    note: { en: 'Widely understood across the Arab world, thanks to film and TV.', ar: 'مفهومة على نطاق واسع في العالم العربي بفضل السينما والتلفزيون.' } },
  { id: 'mag', en: 'Maghrebi', ar: 'مغاربي', x: 0.18, y: 0.46, words: ['لاباس عليك؟', 'دابا', 'بغيت', 'أشنو؟'],
    note: { en: 'Morocco, Algeria, Tunisia, Libya. Fast, with many French and Amazigh loanwords.', ar: 'المغرب والجزائر وتونس وليبيا. سريعة وفيها كثير من الكلمات الفرنسية والأمازيغية.' } },
]

export const PLATFORMS = ['Outlier (Scale AI)', 'Mercor', 'Alignerr', 'Surge AI', 'Appen', 'Prolific']

// AI Lab sample. Illustrative only; keep the "illustrative" label on the console.
export const LAB_TABS: ({ ar: boolean; html: string } | { kv: [string, string][] })[] = [
  { ar: true, html: 'إيه <mark>يعني</mark>... <mark class="d">هلّق</mark> بدنا نروح عالسوق بس، <mark>اممم</mark>، الطقس كتير <mark class="d">شوب</mark> اليوم.' },
  { ar: true, html: 'إيه، هلّق بدنا نروح عالسوق، بس الطقس كتير شوب اليوم.' },
  { ar: true, html: 'نعم، نريد الآن الذهاب إلى السوق، لكن الطقس حارّ جدًا اليوم.' },
  { ar: false, html: "Yeah, we want to go to the market now, but it's really hot today." },
  { kv: [['dialect', 'Levantine · Damascene'], ['fillers', 'يعني · اممم'], ['dialect words', 'هلّق = now · شوب = hot'], ['prosody', 'falling · relaxed'], ['noise', 'low · indoor'], ['confidence', 'high · reviewed']] },
]
