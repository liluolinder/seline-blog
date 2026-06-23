/**
 * GitHub Pages 部署时的 basePath
 * 仓库名为 seline-blog，所以部署 URL 为 https://liluolinder.github.io/seline-blog/
 * 路径前缀必须与 next.config.ts 中的 basePath 一致
 */
export const basePath = '/seline-blog'

/**
 * 将图片/静态资源路径适配当前环境
 * 本地开发: /images/avatar.webp
 * Pages:     /seline-blog/images/avatar.webp
 */
export function assetUrl(path: string): string {
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  }
  return path
}
