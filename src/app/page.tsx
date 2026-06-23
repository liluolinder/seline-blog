import { getAllArticles } from '@/lib/articles'
import { SearchBox, Typewriter } from '@/components/blog'
import { Card } from '@/components/ui'
import { FadeIn } from '@/components/animations'
import { siteConfig } from '@/lib/config'

const imgPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

const quotes = siteConfig.hero.quotes

export default function HomePage() {
  const allArticles = getAllArticles()

  return (
    <div className="min-h-screen">
      {/* ===== 第一段：品牌卡片 ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-28">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <FadeIn>
            <div className="liquid-glass rounded-3xl p-10 md:p-14 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-xl ring-4 ring-white/60 dark:ring-gray-800/60 overflow-hidden">
                <img src={imgPath(siteConfig.hero.avatar)} alt={siteConfig.sidebar.author} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 tracking-tight leading-[1.2] pb-2">
                {siteConfig.hero.title}
              </h1>
              <p className="text-base text-gray-400 dark:text-gray-500">
                {siteConfig.hero.slogan}
              </p>
            </div>
          </FadeIn>

          {/* 名言打字效果 */}
          <FadeIn delay={0.15}>
            <div className="liquid-glass rounded-2xl p-5 text-center mx-auto w-fit max-w-full">
              <Typewriter quotes={quotes} />
            </div>
          </FadeIn>

          {/* 向下提示 — 点击滚动到内容区 */}
          <FadeIn delay={0.3}>
            <a href="#blog-content" className="block animate-bounce text-center pt-2 cursor-pointer">
              <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ===== 第二段：博客内容 ===== */}
      <section id="blog-content" className="pb-16 scroll-mt-20">
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-center">
          {/* 左侧个人信息卡片 */}
          <div className="hidden lg:block w-[240px] flex-shrink-0 sticky top-28 lg:ml-4 2xl:ml-12">
            <FadeIn direction="left">
              <Card hover={false} className="!p-5">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400 flex items-center justify-center text-white text-3xl shadow-lg ring-4 ring-white/60 dark:ring-gray-800/60 overflow-hidden">
                    <img src={imgPath(siteConfig.hero.avatar)} alt={siteConfig.sidebar.author} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-3">{siteConfig.sidebar.author}</h2>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">{siteConfig.sidebar.slogan}</p>
                  <div className="w-10 h-px bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full my-3" />
                  <p className="text-sm text-gray-800 dark:text-gray-200 text-center leading-relaxed">
                    {siteConfig.sidebar.bio}
                  </p>
                  <div className="flex gap-4 mt-3">
                    {siteConfig.sidebar.social.map((s) => (
                      <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">{s.name}</a>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* 中间：搜索 + 文章 */}
          <div className="flex-1 min-w-0 max-w-full lg:max-w-3xl lg:mx-4 xl:mx-auto px-4 lg:px-0">
            <FadeIn>
              <SearchBox articles={allArticles} />
            </FadeIn>
          </div>

          {/* 右侧公告卡片 */}
          <div className="hidden lg:block w-[240px] flex-shrink-0 sticky top-28 lg:mr-4 2xl:mr-12">
            <FadeIn direction="right">
              <Card hover={false} className="!p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">📢</span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">公告</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">🎉 欢迎来到 Seline Blog！</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">本站已全新改版，持续更新中。</p>
                  <div className="pt-2 border-t border-blue-100/50 dark:border-blue-900/30">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">📌 最新：博客 V2 上线</p>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="mt-4 p-4 liquid-glass-card rounded-xl text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">✦ 保持好奇心 ✦</p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 移动端个人信息（小屏） */}
        <div className="lg:hidden pt-8 pb-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-cyan-400 flex items-center justify-center text-white text-2xl shadow-lg overflow-hidden mx-auto">
            <img src={imgPath(siteConfig.hero.avatar)} alt={siteConfig.sidebar.author} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-2">{siteConfig.sidebar.author}</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">{siteConfig.sidebar.slogan}</p>
          <div className="flex gap-4 justify-center mt-2">
            {siteConfig.sidebar.social.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-blue-500 transition-colors">{s.name}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
