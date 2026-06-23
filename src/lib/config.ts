// 图片路径都指向 public/ 目录下的文件
// 例如 '/images/avatar.webp' 对应 public/images/avatar.webp

export const siteConfig = {

  // ─── 顶栏 ───
  header: {
    // 左上角 Logo 图片
    logo: '/images/logo.webp',
    // 站点名称（顶栏、页脚）
    name: '琉离铟落的小窝',
    // 导航菜单
    nav: [
      { name: '首页', path: '/' },
      { name: '文章', path: '/articles' },
      { name: '归档', path: '/archives' },
      { name: '项目', path: '/projects' },
      { name: '友链', path: '/friends' },
      { name: '关于', path: '/about' },
    ],
  },

  // ─── 浏览器标签页 ───
  seo: {
    // 浏览器标签页标题
    title: '琉离铟落的小窝',
    // SEO 描述
    description: '个人技术博客，分享前端开发、项目经验和生活思考',
    // 标签页图标
    favicon: '/images/avatar.webp',
  },

  // ─── 欢迎区（首页第一屏） ───
  hero: {
    // 大标题
    title: '琉离铟落的小窝',
    // 头像
    avatar: '/images/avatar.webp',
    // 标题下方标语
    slogan: '记录技术、生活和思考',
    // 打字机循环显示的名言
    quotes: [
      '"生如Ark之绚烂，死如仓颉之静美"',
      '" Talk is cheap. Show me the code." — Linus Torvalds',
      '"在编程中，简单和优雅不是可选的，它们是基本要求。"',
      '"任何傻瓜都能写出计算机能理解的代码，优秀的程序员写出人类能读懂的代码。" — Martin Fowler',
      '"先让它工作，再让它变快。"',
      '"调试代码比编写代码难两倍。" — Brian Kernighan',
    ],
  },

  // ─── 侧边栏个人信息 ───
  sidebar: {
    // 作者名称
    author: '琉离铟落linderSeline',
    // 作者下方标语
    slogan: '喵喵喵',
    // 个人简介
    bio: '热爱开发、开源与一切有趣的技术。',
    // 社交链接（自动渲染到侧边栏、页脚、关于页，有什么平台自己按格式加）
    social: [
      { name: 'GitHub', url: 'https://github.com/liluolinder' },
      { name: 'GitCode', url: 'https://gitcode.com/liluolinder' },
      { name: 'Email', url: 'mailto:liluolinder@qq.com' },
    ],
  },

  // ─── 背景图 ───
  backgrounds: {
    // 浅色模式图片（与 dark 同索引配对）
    light: ['/images/bg1.webp', '/images/bg2.webp', '/images/bg2.webp'],
    // 深色模式图片（与 light 同索引配对）
    dark: ['/images/bg2.webp', '/images/bg1.webp','/images/bg2.webp'],
  },

  // ─── 关于页 ───
  about: {
    // 页面标题
    title: '关于我',
    // 标题下方副标题
    subtitle: '个人技术博客，分享前端开发、项目经验和生活思考',
    // 页面顶部头像
    avatar: '/images/avatar.webp',
    // 问候区
    greeting: {
      title: '👋 嗨，你好！',
      paragraphs: [
        '欢迎来到我的个人博客！这里是我记录技术学习、项目开发和生活思考的地方。',
        '我热爱前端开发、开源社区和一切有趣的技术。希望通过这个博客能结识更多志同道合的朋友。',
      ],
    },
    // 技能列表
    skills: ['Cangjie', 'ArkTs', 'JAVA', 'C/C++'],
  },
}
