import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import { FadeIn } from '@/components/animations'
import { Card } from '@/components/ui'

export default function ArchivesPage() {
  const articles = getAllArticles()

  // 按年月分组
  const grouped: Record<string, { month: string; articles: typeof articles }[]> = {}
  for (const a of articles) {
    if (!a.date) continue
    const d = new Date(a.date)
    const year = d.getFullYear().toString()
    const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!grouped[year]) grouped[year] = []
    let ym = grouped[year].find((g) => g.month === month)
    if (!ym) {
      ym = { month, articles: [] }
      grouped[year].push(ym)
    }
    ym.articles.push(a)
  }

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="min-h-screen pb-16">
      <div className="lg:pl-[320px] xl:pr-[320px] pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">📋 归档</h1>
              <p className="text-gray-500 dark:text-gray-400">
                共 <strong className="text-blue-500">{articles.length}</strong> 篇文章，
                跨越 <strong className="text-blue-500">{years.length}</strong> 个年份
              </p>
            </div>
          </FadeIn>

          {/* 年份导航 */}
          <FadeIn delay={0.1}>
            <div className="liquid-glass-card rounded-xl p-4 mb-8 flex flex-wrap gap-2">
              {years.map((year) => {
                const total = grouped[year].reduce((s, ym) => s + ym.articles.length, 0)
                return (
                  <a
                    key={year}
                    href={`#year-${year}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {year}
                    <span className="ml-1 text-[10px] text-gray-400">({total})</span>
                  </a>
                )
              })}
            </div>
          </FadeIn>

          {/* 时间线 */}
          <div className="space-y-10">
            {years.map((year) => {
              const yearTotal = grouped[year].reduce((s, ym) => s + ym.articles.length, 0)
              return (
                <FadeIn key={year} delay={0.15}>
                  <div id={`year-${year}`}>
                    {/* 年份标题 */}
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{year}</h2>
                      <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        {yearTotal} 篇
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-blue-200/50 to-transparent dark:from-blue-800/30" />
                    </div>

                    {grouped[year]
                      .sort((a, b) => b.month.localeCompare(a.month))
                      .map((ym, yi) => (
                        <div key={ym.month} className="mb-6 relative">
                          {/* 月份分隔线 */}
                          <div className="flex items-center gap-2 mb-3 pl-4">
                            <div className="w-1 h-1 rounded-full bg-blue-400 dark:bg-blue-500" />
                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                              {ym.month}
                            </span>
                            <span className="text-[10px] text-gray-300 dark:text-gray-600">
                              · {ym.articles.length} 篇
                            </span>
                          </div>

                          {/* 文章列表 */}
                          <div className="relative pl-4 ml-0.5 border-l-2 border-blue-100 dark:border-blue-900/30">
                            {ym.articles
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .map((a, ai) => (
                                <Link
                                  key={a.slug}
                                  href={`/articles/${a.slug}`}
                                  className="flex items-start gap-3 group mb-2 relative"
                                >
                                  {/* 时间线圆点 */}
                                  <div className="absolute -left-[18px] top-3 w-2.5 h-2.5 rounded-full border-2 border-blue-400 dark:border-blue-600 bg-white dark:bg-gray-900 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors z-10" />
                                  <Card hover={true} className="!p-3 flex-1 ml-2">
                                    <div className="flex items-start gap-3">
                                      <span className="text-xs text-gray-400 dark:text-gray-500 w-14 flex-shrink-0 font-mono mt-0.5">
                                        {new Date(a.date).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })}
                                      </span>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
                                            {a.title}
                                          </span>
                                        </div>
                                        {a.description && (
                                          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1 leading-relaxed">
                                            {a.description}
                                          </p>
                                        )}
                                      </div>
                                      {a.collection && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5">
                                          {a.collection.split('/')[0]}
                                        </span>
                                      )}
                                    </div>
                                  </Card>
                                </Link>
                              ))}
                            {/* 月份底部连接线 */}
                            {yi < grouped[year].length - 1 && (
                              <div className="absolute bottom-0 left-0 w-full h-4">
                                <div className="w-px h-full bg-blue-100/50 dark:bg-blue-900/20 ml-0" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </FadeIn>
              )
            })}
          </div>

          {/* 底部统计 */}
          <FadeIn delay={0.2}>
            <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
              <div className="flex items-center justify-center gap-8">
                {years.slice(0, 3).map((year) => {
                  const total = grouped[year].reduce((s, ym) => s + ym.articles.length, 0)
                  return (
                    <div key={year} className="text-center">
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{year}</div>
                      <div className="text-xs text-gray-400">{total} 篇</div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-gray-300 dark:text-gray-600 mt-4">
                ✦ 持续记录，保持思考 ✦
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
