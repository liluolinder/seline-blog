// 图片路径都指向 public/ 目录下的文件
// 例如 '/images/avatar.webp' 对应 public/images/avatar.webp

export const siteConfig = {

  // ─── 顶栏 ───
  header: {
    // 左上角 Logo 图片
    logo: '/images/logo.webp',
    // 站点名称（顶栏、页脚）
    name: 'Seline Blog',
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
    title: 'Seline Blog',
    // SEO 描述
    description: '一个基于 Next.js 的开源个人博客',
    // 标签页图标
    favicon: '/images/avatar.webp',
  },

  // ─── 欢迎区（首页第一屏） ───
  hero: {
    // 大标题
    title: 'Seline Blog',
    // 头像
    avatar: '/images/avatar.webp',
    // 标题下方标语
    slogan: '一个开源的个人博客',
    // 打字机循环显示的名言
    quotes: [
      '" Talk is cheap. Show me the code." — Linus Torvalds',
      '"在编程中，简单和优雅不是可选的，它们是基本要求。"',
      '"任何傻瓜都能写出计算机能理解的代码，优秀的程序员写出人类能读懂的代码。" — Martin Fowler',
      '"先让它工作，再让它变快。"',
      '"调试代码比编写代码难两倍。" — Brian Kernighan',
      '"简洁是最终的优雅。" — Leonardo da Vinci',
    ],
  },

  // ─── 侧边栏个人信息 ───
  sidebar: {
    // 作者名称
    author: 'Seline Blog',
    // 作者下方标语
    slogan: '记录与分享',
    // 个人简介
    bio: '一个基于 Next.js 构建的开源个人博客，支持 Markdown 文章、友链管理、项目展示。',
    // 社交链接（自动渲染到侧边栏、页脚、关于页，有什么平台自己按格式加）
    social: [
      { name: 'GitHub', url: 'https://github.com/liluolinder/seline-blog' },
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
    title: '关于 Seline Blog',
    // 标题下方副标题
    subtitle: '一个基于 Next.js 的开源个人博客',
    // 页面顶部头像
    avatar: '/images/avatar.webp',
    // 问候区
    greeting: {
      title: '👋 欢迎来到 Seline Blog！',
      paragraphs: [
        'Seline Blog 是一个开源的个人博客，基于 Next.js 构建，提供现代化的博客体验。',
        '支持 Markdown 文章编写、友链管理、项目展示、文章合集、数学公式、代码高亮等功能，开箱即用。',
      ],
    },
    // 技能列表
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
  },
}
