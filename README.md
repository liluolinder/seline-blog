# Seline Blog

一个基于 **Next.js 16** 构建的开源个人博客，支持 Markdown 文章、友链管理、项目展示、文章合集等功能。

## ✨ 特性

- **Markdown 文章系统** — 通过 frontmatter 配置元数据，支持标签、合集、排序、封面图
- **文章合集** — 按目录归类文章，自动生成合集导航侧边栏
- **多种提示框** — NOTE / TIP / WARNING / CAUTION / IMPORTANT
- **数学公式** — 基于 KaTeX 的行内和块级公式渲染
- **代码高亮** — 基于 Highlight.js，自动识别语言
- **友链管理** — JSON 配置，支持头像、描述
- **项目展示** — 按平台筛选和搜索
- **响应式布局** — 移动端友好
- **Framer Motion 动画** — 平滑的页面过渡效果
- **静态导出** — 支持部署到 GitHub Pages、Vercel 等静态托管

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
content/
├── articles/        # Markdown 文章
├── friends/
│   └── friends.json # 友链数据
└── projects/
    └── projects.json # 项目数据
src/
├── app/             # Next.js 页面路由
├── components/      # UI 组件
├── lib/             # 工具函数和配置
└── types/           # TypeScript 类型定义
public/
├── images/          # 图片资源
├── icons/           # 平台图标
└── fonts/           # 字体文件
```

## 📝 写文章

在 `content/articles/` 目录下创建 `.md` 文件，使用 frontmatter 配置元数据：

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

文章正文内容...
```

可以放在子目录中归类为合集，例如 `content/articles/合集名称/文章.md`。

## 🔧 配置

编辑 `src/lib/config.ts` 修改站点信息、导航、社交链接等。

## 📄 友链 & 项目

- 友链：编辑 `content/friends/friends.json`
- 项目：编辑 `content/projects/projects.json`

## 📦 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 16 | 框架 |
| TypeScript | 类型安全 |
| Tailwind CSS 4 | 样式 |
| Framer Motion | 动画 |
| React Markdown / Marked | Markdown 渲染 |
| KaTeX | 数学公式 |
| Highlight.js | 代码高亮 |

## 📜 许可

本项目采用 [MulanPSL-2.0](LICENSE) 许可证。
