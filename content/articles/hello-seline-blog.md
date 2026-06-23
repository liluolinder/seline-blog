---
title: Hello Seline Blog
description: 欢迎来到 Seline Blog，一个开源的个人博客！
date: '2024-01-15'
published: true
cover: ''
sort: 1
tags: ["Seline", "Next.js", "博客"]
---

# 🌟 欢迎来到 Seline Blog

一个开源的 **个人博客**，基于 **Next.js** 构建，拥有现代化 UI 和丰富的功能特性。

---

## ✨ 特色功能

### 📝 Markdown 文章系统

支持完整的 Markdown 编写体验，通过 `gray-matter` 解析 frontmatter 元数据，支持标签、合集、排序、封面图等配置。

```markdown
---
title: 文章标题
description: 文章描述
date: '2024-01-15'
tags: ["Next.js", "Web"]
published: true
cover: ''
sort: 1
---
```

### 🎨 多种提示框样式

> [!NOTE]
> 笔记信息提示框

> [!TIP]
> 小技巧提示框

> [!WARNING]
> 警告信息提示框

> [!CAUTION]
> 危险操作提示框

> [!IMPORTANT]
> 重要说明提示框

### 🧮 数学公式支持

行内公式：$E = mc^2$

独立公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

### 📂 文章合集功能

支持将文章按目录归类为合集，自动生成合集导航侧边栏，方便读者按系列阅读。

### 🔗 友链 & 项目展示

内置友链管理和项目展示页面，支持按平台筛选和搜索，方便展示你的开源项目和朋友们。

### 🌙 主题风格

- 渐变背景主题
- 平滑动画过渡（基于 Framer Motion）
- 自适应明暗风格
- 响应式布局，移动端友好

### 🎵 音乐播放器

文章内可嵌入音乐播放组件，支持自定义音乐链接。

---

## 🚀 技术栈

| 技术 | 用途 |
|------|------|
| **Next.js 16** | 框架 |
| **TypeScript** | 类型安全 |
| **Tailwind CSS 4** | 样式 |
| **Framer Motion** | 动画 |
| **React Markdown** | Markdown 渲染 |
| **KaTeX** | 数学公式 |
| **Highlight.js** | 代码高亮 |

---

## 📖 开始使用

1. 在 `content/articles/` 下创建 `.md` 文件写文章
2. 在 `content/friends/friends.json` 添加友链
3. 在 `content/projects/projects.json` 添加项目
4. 自定义 `src/lib/config.ts` 修改站点配置

---

> 💡 更多详情请查看项目文档或源码，欢迎 Star 和贡献！

感谢你的访问，祝你使用愉快！🌟
