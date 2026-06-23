// 图片路径都指向 public/ 目录下的文件
// 例如 '/images/avatar.webp' 对应 public/images/avatar.webp

export const siteConfig = {
  // ─── 浏览器标签页 ───
  seo: {
    title: 'Seline Blog - 记录技术、生活和思考',
    description: '个人技术博客，分享前端开发、项目经验和生活思考',
    favicon: '/images/avatar.webp',
  },

  // ─── 顶栏 ───
  header: {
    logo: '/images/logo.webp',
    name: 'Seline Blog',
    nav: [
      { name: '首页', path: '/' },
      { name: '文章', path: '/articles' },
      { name: '归档', path: '/archives' },
      { name: '项目', path: '/projects' },
      { name: '友链', path: '/friends' },
      { name: '关于', path: '/about' },
    ],
  },

  // ─── 首页品牌区 ───
  hero: {
    avatar: '/images/avatar.webp',
    slogan: '记录技术、生活和思考',
    quotes: [
      '"代码是写给人看的，顺便还能在机器上运行。" — Harold Abelson',
      '"保持简单，保持愚蠢。" — Unix 哲学',
      '" Talk is cheap. Show me the code." — Linus Torvalds',
      '"在编程中，简单和优雅不是可选的，它们是基本要求。"',
      '"任何傻瓜都能写出计算机能理解的代码，优秀的程序员写出人类能读懂的代码。" — Martin Fowler',
      '"先让它工作，再让它变快。"',
      '"调试代码比编写代码难两倍。" — Brian Kernighan',
    ],
  },

  // ─── 侧边栏个人信息 ───
  sidebar: {
    author: 'Seline',
    bio: '热爱前端开发、开源与一切有趣的技术。',
    social: {
      github: 'https://github.com/liluolinder',
      email: 'hello@seline-blog.com',
    },
  },

  // ─── 背景图 ───
  backgrounds: {
    light: ['/images/bg1.webp', '/images/bg2.webp', '/images/bg2.webp'],
    dark: ['/images/bg2.webp', '/images/bg1.webp','/images/bg2.webp'],
  },

  // ─── 关于页 ───
  about: {
    title: '关于我',
    subtitle: '个人技术博客，分享前端开发、项目经验和生活思考',
    avatar: '/images/avatar.webp',
    greeting: {
      title: '👋 嗨，你好！',
      paragraphs: [
        '欢迎来到我的个人博客！这里是我记录技术学习、项目开发和生活思考的地方。',
        '我热爱前端开发、开源社区和一切有趣的技术。希望通过这个博客能结识更多志同道合的朋友。',
      ],
    },
    skills: ['TypeScript', 'React', 'Next.js', 'Vue', 'Node.js', 'Tailwind CSS', 'Git', 'Docker'],
  },
}
