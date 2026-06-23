/**
 * 静态资源路径适配
 * 本地开发: basePath = ''  → /images/avatar.webp
 * Pages:    basePath 由环境变量 NEXT_PUBLIC_BASE_PATH 注入 → /seline-blog/images/avatar.webp
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function assetUrl(path: string): string {
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  }
  return path
}
