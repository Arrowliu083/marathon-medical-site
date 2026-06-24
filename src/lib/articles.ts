export interface ArticleMeta {
  slug: string;
  title: string;
  titleEn: string;
  author: string;
  authorRole: string;
  date: string;
  category: 'standards' | 'interviews' | 'news';
  summary: string;
  summaryEn: string;
  featured: boolean;
  tags: string[];
  coverImage: string;
  bilibiliBvid?: string; // B站视频BV号
}

export const articles: ArticleMeta[] = [
  {
    slug: 'bottom-line-thinking',
    title: '马拉松医疗保障"底线思维"',
    titleEn: 'Bottom-Line Thinking in Marathon Medical Support',
    author: '陆乐',
    authorRole: '标准起草专家组召集人 / 第一反应创始人',
    date: '2026-05-21',
    category: 'standards',
    summary: '从"白银越野跑事件"出发，深入阐述T/CADERM 8001-2021和T/CADERM 8002-2021两部标准出台的背景、解决的核心问题和行业意义。',
    summaryEn: 'An in-depth exploration of the background, core issues addressed, and industry significance of the two marathon medical support standards T/CADERM 8001-2021 and T/CADERM 8002-2021.',
    featured: true,
    tags: ['底线思维', '标准背景', '公共安全'],
    coverImage: '/images/cover-bottom-line-thinking.jpg',
  },
  {
    slug: 'aed-in-standards',
    title: '马拉松医疗保障标准中的AED',
    titleEn: 'AED in Marathon Medical Support Standards',
    author: '廖育鲲',
    authorRole: '标准起草专家 / 世界田联REMC医疗官',
    date: '2026-05-22',
    category: 'standards',
    summary: '从"有≠有效"出发，详细解读标准如何构建从有到有效的AED部署体系——数量、携带方式、人员能力、通信联动和事件记录。',
    summaryEn: 'How the standards build an effective AED deployment system — from quantity and carrying methods to personnel competency, communication linkage, and incident recording.',
    featured: true,
    tags: ['AED', '心脏骤停', '设施配置'],
    coverImage: '/images/cover-aed-in-standards.png',
  },
  {
    slug: 'three-cores-nine-pillars',
    title: '三大核心 九位一体',
    titleEn: 'Three Cores, Nine Pillars: Building a Medical Support System',
    author: '张昱',
    authorRole: '新中体育集团医疗安全部总监',
    date: '2026-05-23',
    category: 'standards',
    summary: '新中体分享"九位一体"医疗保障体系的实践成果——赛前风险筛查+赛中多维布防+赛后康复复盘的全流程闭环。',
    summaryEn: 'Xinzhong Sports shares its "Nine-in-One" medical support system — a full-process closed loop of pre-race risk screening, in-race multi-layer deployment, and post-race recovery review.',
    featured: true,
    tags: ['九位一体', '赛事运营', '实战案例'],
    coverImage: '/images/cover-three-cores-nine-pillars.png',
  },
  {
    slug: 'standardization-lifeline',
    title: '以标准化筑牢跑者生命防线',
    titleEn: 'Fortifying Runners\' Lifeline Through Standardization',
    author: '陆乐',
    authorRole: '标准起草专家组召集人',
    date: '2026-05-26',
    category: 'news',
    summary: '绍兴研讨会全面复盘国内马拉松医疗保障实践成果，从标准制定到一线验证再到持续迭代，中国马拉松医疗保障正从"经验驱动"走向"体系驱动"。',
    summaryEn: 'The Shaoxing symposium comprehensively reviewed domestic marathon medical support practices. China\'s marathon medical support is moving from "experience-driven" to "system-driven".',
    featured: false,
    tags: ['研讨会', '行业动态', '标准推广'],
    coverImage: '/images/cover-standardization-lifeline.png',
  },
  {
    slug: 'interview-cai-wenwei',
    title: '专访｜标准的属地化管理',
    titleEn: 'Interview: Localized Implementation of Standards',
    author: '蔡文伟',
    authorRole: '浙江省人民医院急诊科主任 / 浙江省急救指挥中心副主任',
    date: '2026-06-08',
    category: 'interviews',
    summary: '蔡文伟主任分享十余年医疗保障一线经验，强调规范化标准对提升大型赛事医疗保障水平的重要意义，以及各城市需进行属地化管理。',
    summaryEn: 'Dr. Cai Wenwei shares over a decade of frontline medical support experience, emphasizing the importance of standardized protocols and localized implementation.',
    featured: false,
    tags: ['属地化管理', '标准推广', 'G20经验'],
    coverImage: '/images/cover-interview-cai-wenwei.jpg',
    bilibiliBvid: 'BV1mD7K65E7F',
  },
  {
    slug: 'interview-zhang-yu',
    title: '专访｜让标准从"纸面"真正落到"赛道"',
    titleEn: 'Interview: From Paper to the Race Course',
    author: '张昱',
    authorRole: '新中体育集团医疗安全部总监 / 世界田联REMC医疗官',
    date: '2026-06-10',
    category: 'interviews',
    summary: '张昱强调通过数据驱动、标准化建设、技术赋能、培训普及四大支柱，系统性提升大型赛事医疗保障水平。',
    summaryEn: 'Zhang Yu emphasizes four pillars — data-driven approach, standardization, technology empowerment, and training — to systematically improve medical support for major events.',
    featured: false,
    tags: ['数字化', '培训体系', '技术赋能'],
    coverImage: '/images/cover-interview-zhang-yu.jpg',
    bilibiliBvid: 'BV1TU7K61ECL',
  },
  {
    slug: 'interview-liao-yukun',
    title: '专访｜标准的"宽严相济"',
    titleEn: 'Interview: Balancing Rigor and Flexibility in Standards',
    author: '廖育鲲',
    authorRole: '世界田联REMC医疗官 / 第一反应医疗保障指挥官委员会主委',
    date: '2026-06-15',
    category: 'interviews',
    summary: '从超过500场赛事医疗保障经验中萃取关键洞察——人员培训、医疗指挥中心、事件记录规范是当前标准应用需重点关注的三大环节。',
    summaryEn: 'Drawing from over 500 event medical support experiences, three key areas for standards application: personnel training, medical command centers, and incident recording protocols.',
    featured: false,
    tags: ['宽严相济', '指挥中心', '事件记录'],
    coverImage: '/images/cover-interview-liao-yukun.jpg',
    bilibiliBvid: 'BV1tD7K65EwF',
  },
  {
    slug: 'interview-lu-le',
    title: '专访｜务实让"不可能"到"可救活"',
    titleEn: 'Interview: Pragmatism Turns the Impossible into the Survivable',
    author: '陆乐',
    authorRole: '标准起草专家组召集人 / 第一反应创始人',
    date: '2026-06-16',
    category: 'interviews',
    summary: '陆乐介绍标准起草过程中的挑战与38位跨地区、跨行业专家共同努力的成效，分享三个最特别的亲历救援故事。',
    summaryEn: 'Lu Le shares the challenges of drafting the standards, the collaborative efforts of 38 cross-regional and cross-industry experts, and three most memorable rescue stories.',
    featured: true,
    tags: ['标准起草', '救援故事', '行业协作'],
    coverImage: '/images/cover-interview-lu-le.jpg',
    bilibiliBvid: 'BV1TD7K65EQ2',
  },
  {
    slug: 'li-zonghao-speech',
    title: '李宗浩会长致辞',
    titleEn: 'Speech by President Li Zonghao',
    author: '李宗浩',
    authorRole: '中国医学救援协会原会长 / 标准起草专家组组长',
    date: '2026-05-24',
    category: 'news',
    summary: '标准起草专家组组长李宗浩教授在绍兴研讨会上的致辞，回顾标准起草历程，展望标准推广与行业发展的未来。',
    summaryEn: 'Professor Li Zonghao\'s speech at the Shaoxing symposium, reviewing the drafting process and envisioning the future of standard promotion and industry development.',
    featured: false,
    tags: ['标准发布', '行业发展', '专家致辞'],
    coverImage: '/images/cover-li-zonghao-speech.png',
  },
  {
    slug: 'interview-xu-rui',
    title: '专访｜用标准搭建医疗保障的系统性工程',
    titleEn: 'Interview: Building a Systematic Medical Support Project with Standards',
    author: '徐瑞',
    authorRole: '第一反应赛事医疗保障 总监 / 马拉松医疗保障标准起草专家',
    date: '2026-06-09',
    category: 'interviews',
    summary: '徐瑞先生从事马拉松医疗保障工作10年，经历300余场不同规模赛事，处理过20多例心脏骤停案例。通过大连马拉松等案例系统阐述马拉松医疗保障的系统性及应用两部标准搭建这套复杂系统。',
    summaryEn: 'Xu Rui has 10 years of marathon medical support experience across 300+ events, handling over 20 cardiac arrest cases. He explains the systematic nature of marathon medical support through real-world cases.',
    featured: false,
    tags: ['系统性工程', '标准搭建', '实战案例'],
    coverImage: '/images/cover-interview-xu-rui.jpg',
    bilibiliBvid: 'BV14D7K65Ex5',
  },
];

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticles(): ArticleMeta[] {
  return articles.filter((a) => a.featured);
}

export function getLatestArticles(limit: number = 5): ArticleMeta[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
