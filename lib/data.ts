export const profile = {
  name: 'Moe Kyaw Aung',
  firstName: 'Moe Kyaw',
  lastName: 'Aung',
  title: 'Android Senior Developer',
  shortTitle: 'Android · Kotlin · Firebase',
  codename: 'Q-NODE // MKA',
  location: 'Tachileik, Myanmar',
  timezone: 'GMT+07',
  company: 'Microsoft',
  pronouns: 'He/Him',
  available: true,
  tagline:
    'Architecting reliable Android systems at quantum precision — Kotlin, Jetpack, secure backends.',
  bio: `I am an Android Developer with nearly 12 years of experience in building Android applications and working within the Android ecosystem. I have completed several professional certification courses covering programming, computer vision using Python, cyber security, web technologies, and digital growth strategies.\n\nMy goal is to develop reliable, secure, and user-friendly mobile applications. I enjoy learning new technologies, solving real-world problems, and continuously improving my skills as a developer.`,
  avatar:
    'https://0.gravatar.com/avatar/a2dae9a29fbf7c72552047efc744be54a018938aacd9009e7500f93d72eb0f2e?s=400',
  headerImage:
    'https://1.gravatar.com/userimage/275420990/7a03140bb6a413d9ec47679608e32f94?size=1024',
  email: 'moekyawaung@fastmail.com',
  phone: '+959666000050',
  website: 'https://Dev-Moe-kyawaung.github.io/',
  gravatar: 'https://gravatar.com/moekyawaung2026',
  linkedin: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1',
  github: 'https://github.com/Moekyawaung',
  stats: [
    { value: '12+', label: 'Years' },
    { value: '40+', label: 'Certs' },
    { value: '18+', label: 'Skills' },
    { value: '∞', label: 'Nodes' },
  ],
};

export type Skill = {
  name: string;
  icon: string;
  category: 'mobile' | 'backend' | 'web' | 'cloud' | 'data' | 'tools';
  level: number;
  entanglement: number;
};

export const skills: Skill[] = [
  { name: 'Kotlin', icon: 'logo-android', category: 'mobile', level: 95, entanglement: 98 },
  { name: 'Android', icon: 'phone-portrait-outline', category: 'mobile', level: 95, entanglement: 97 },
  { name: 'Jetpack', icon: 'layers-outline', category: 'mobile', level: 90, entanglement: 92 },
  { name: 'Firebase', icon: 'flame-outline', category: 'backend', level: 88, entanglement: 90 },
  { name: 'Java', icon: 'cafe-outline', category: 'mobile', level: 85, entanglement: 86 },
  { name: 'React', icon: 'logo-react', category: 'web', level: 75, entanglement: 78 },
  { name: 'Flutter', icon: 'color-palette-outline', category: 'mobile', level: 70, entanglement: 72 },
  { name: 'Swift', icon: 'logo-apple', category: 'mobile', level: 65, entanglement: 68 },
  { name: 'Python', icon: 'code-slash-outline', category: 'data', level: 80, entanglement: 84 },
  { name: 'JavaScript', icon: 'logo-nodejs', category: 'web', level: 78, entanglement: 80 },
  { name: 'AWS', icon: 'cloud-outline', category: 'cloud', level: 72, entanglement: 74 },
  { name: 'Cyber Sec', icon: 'shield-checkmark-outline', category: 'tools', level: 80, entanglement: 88 },
  { name: 'ML / AI', icon: 'hardware-chip-outline', category: 'data', level: 70, entanglement: 76 },
  { name: 'Git', icon: 'git-branch-outline', category: 'tools', level: 90, entanglement: 93 },
  { name: 'Linux', icon: 'terminal-outline', category: 'tools', level: 82, entanglement: 85 },
  { name: 'IoT', icon: 'wifi-outline', category: 'data', level: 68, entanglement: 70 },
  { name: 'Big Data', icon: 'bar-chart-outline', category: 'data', level: 65, entanglement: 67 },
  { name: 'Crypto', icon: 'key-outline', category: 'tools', level: 60, entanglement: 64 },
];

export type Certification = {
  id: string;
  title: string;
  category: string;
  issuer: string;
  icon: string;
  qubit: string;
};

export const certifications: Certification[] = [
  { id: '1', title: 'Kotlin for Android', category: 'Mobile', issuer: 'Google Dev Launchpad', icon: 'phone-portrait', qubit: 'Q0' },
  { id: '2', title: 'Firebase', category: 'Backend', issuer: 'Google Dev Launchpad', icon: 'flame', qubit: 'Q1' },
  { id: '3', title: 'Machine Learning', category: 'AI/ML', issuer: 'Google Dev Launchpad', icon: 'hardware-chip', qubit: 'Q2' },
  { id: '4', title: 'Artificial Intelligence', category: 'AI/ML', issuer: 'Google Dev Launchpad', icon: 'bulb', qubit: 'Q3' },
  { id: '5', title: 'Cyber Security', category: 'Security', issuer: 'Google Dev Launchpad', icon: 'shield-checkmark', qubit: 'Q4' },
  { id: '6', title: 'Ethical Hacking', category: 'Security', issuer: 'Google Dev Launchpad', icon: 'lock-closed', qubit: 'Q5' },
];

export type SocialLink = {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
};

export const socials: SocialLink[] = [
  { id: 'github', name: 'GitHub', handle: 'Moekyawaung', url: 'https://github.com/Moekyawaung', icon: 'logo-github' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'moe-kyaw-aung', url: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', icon: 'logo-linkedin' },
  { id: 'website', name: 'Website', handle: 'Dev-Moe-kyawaung', url: 'https://Dev-Moe-kyawaung.github.io/', icon: 'globe-outline' },
  { id: 'gravatar', name: 'Gravatar', handle: 'moekyawaung2026', url: 'https://gravatar.com/moekyawaung2026', icon: 'person-circle-outline' },
  { id: 'bluesky', name: 'Bluesky', handle: 'moekyawaung96', url: 'https://bsky.app/profile/moekyawaung96.bsky.social', icon: 'cloud-outline' },
  { id: 'tiktok', name: 'TikTok', handle: '@moelay262411', url: 'https://tiktok.com/@moelay262411', icon: 'logo-tiktok' },
];

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Android Senior Developer',
    company: 'Microsoft',
    period: 'Present',
    description:
      'Building reliable, secure, and user-friendly Android applications within a world-class engineering culture.',
    highlights: [
      'Kotlin & Jetpack Compose architecture',
      'REST API integration & offline-first design',
      'Performance, security, and polished UX',
    ],
  },
  {
    id: '2',
    role: 'Android Developer',
    company: 'Independent / Freelance',
    period: '2014 — Present',
    description:
      'Nearly 12 years shipping Android apps across the full ecosystem — from native Kotlin/Java to multi-platform stacks.',
    highlights: [
      'End-to-end mobile product delivery',
      'Firebase backends & cloud services',
      'Cross-platform with Flutter & React',
    ],
  },
];

export type QuantumNode = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  energy: number;
  links: string[];
  icon: string;
  status: 'superposition' | 'entangled' | 'collapsed' | 'stable';
  detail: string;
  tech: string[];
};

/** Project / architecture nodes in the quantum graph */
export const quantumNodes: QuantumNode[] = [
  {
    id: 'n1',
    title: 'Android Core',
    subtitle: 'Native runtime spine',
    category: 'Platform',
    energy: 98,
    links: ['n2', 'n3', 'n6'],
    icon: 'phone-portrait',
    status: 'stable',
    detail:
      'Production Kotlin architecture with modular feature graphs, lifecycle-aware state, and Material systems.',
    tech: ['Kotlin', 'Jetpack', 'Coroutines'],
  },
  {
    id: 'n2',
    title: 'Compose UI',
    subtitle: 'Declarative interface field',
    category: 'UI',
    energy: 92,
    links: ['n1', 'n4'],
    icon: 'color-wand',
    status: 'entangled',
    detail:
      'Composable UI layers tuned for motion, accessibility, and density-independent layouts.',
    tech: ['Compose', 'Material 3', 'Animation'],
  },
  {
    id: 'n3',
    title: 'Firebase Mesh',
    subtitle: 'Realtime backend lattice',
    category: 'Backend',
    energy: 90,
    links: ['n1', 'n5', 'n6'],
    icon: 'flame',
    status: 'stable',
    detail:
      'Auth, Firestore, Cloud Functions, and messaging woven into offline-first mobile clients.',
    tech: ['Firebase', 'Auth', 'FCM'],
  },
  {
    id: 'n4',
    title: 'API Gateway',
    subtitle: 'REST entanglement bus',
    category: 'Data',
    energy: 88,
    links: ['n2', 'n3', 'n5'],
    icon: 'git-network',
    status: 'entangled',
    detail:
      'Typed network layers, caching strategies, and resilient retry policies across services.',
    tech: ['Retrofit', 'OkHttp', 'JSON'],
  },
  {
    id: 'n5',
    title: 'Security Vault',
    subtitle: 'Threat-collapse barrier',
    category: 'Security',
    energy: 94,
    links: ['n3', 'n4', 'n6'],
    icon: 'shield-checkmark',
    status: 'stable',
    detail:
      'Secure storage, certificate pinning patterns, and cyber-aware release hygiene.',
    tech: ['Crypto', 'Keystore', 'OWASP'],
  },
  {
    id: 'n6',
    title: 'AI Insight',
    subtitle: 'Decision particle engine',
    category: 'AI',
    energy: 86,
    links: ['n1', 'n3', 'n5'],
    icon: 'sparkles',
    status: 'superposition',
    detail:
      'ML-assisted features and architecture decision traces visualized as quantum bursts.',
    tech: ['ML Kit', 'Python', 'Vision'],
  },
  {
    id: 'n7',
    title: 'Cross-Platform',
    subtitle: 'Parallel reality builds',
    category: 'Multi',
    energy: 78,
    links: ['n1', 'n2'],
    icon: 'layers',
    status: 'collapsed',
    detail:
      'Flutter & React bridges when multi-surface delivery is the optimal collapse path.',
    tech: ['Flutter', 'React', 'JS'],
  },
  {
    id: 'n8',
    title: 'Cloud Orbit',
    subtitle: 'AWS gravity well',
    category: 'Cloud',
    energy: 74,
    links: ['n3', 'n4'],
    icon: 'cloud',
    status: 'entangled',
    detail:
      'Cloud services supporting scale, storage, and distributed mobile backends.',
    tech: ['AWS', 'S3', 'Lambda'],
  },
];

export type ArchDecision = {
  id: string;
  title: string;
  rationale: string;
  impact: 'high' | 'medium' | 'critical';
  particles: number;
};

export const archDecisions: ArchDecision[] = [
  {
    id: 'd1',
    title: 'Kotlin-first modules',
    rationale: 'Type-safe coroutines + null safety collapse entire classes of runtime bugs.',
    impact: 'critical',
    particles: 24,
  },
  {
    id: 'd2',
    title: 'Offline-first sync',
    rationale: 'Local source of truth with eventual consistency keeps UX stable under weak networks.',
    impact: 'high',
    particles: 18,
  },
  {
    id: 'd3',
    title: 'Security by default',
    rationale: 'Encrypted prefs, least-privilege APIs, and secure transport on every node.',
    impact: 'critical',
    particles: 22,
  },
  {
    id: 'd4',
    title: 'Composable UI graph',
    rationale: 'UI state as unidirectional flow — predictable renders, testable nodes.',
    impact: 'high',
    particles: 16,
  },
  {
    id: 'd5',
    title: 'Observability hooks',
    rationale: 'Crash + performance signals entangled with release pipelines.',
    impact: 'medium',
    particles: 12,
  },
];

export const focuses = [
  {
    title: 'Native Android',
    desc: 'Kotlin, Jetpack, Material Design, production architecture.',
    icon: 'phone-portrait-outline',
  },
  {
    title: 'Reliable Backends',
    desc: 'Firebase, REST APIs, secure auth, scalable data layers.',
    icon: 'server-outline',
  },
  {
    title: 'Security First',
    desc: 'Cyber security practices in every release cycle.',
    icon: 'shield-checkmark-outline',
  },
  {
    title: 'Continuous Growth',
    desc: '40+ certifications across AI, ML, cloud, and web.',
    icon: 'rocket-outline',
  },
];
