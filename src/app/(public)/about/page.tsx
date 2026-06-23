import { FadeIn } from '@/components/animations'
import { Card } from '@/components/ui'
import { siteConfig } from '@/lib/config'

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-16">
      <div className="lg:pl-[320px] xl:pr-[320px] pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 text-white text-4xl shadow-xl mb-6">
                💎
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">关于我</h1>
              <p className="text-gray-600 dark:text-gray-400">{siteConfig.description}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card hover={false} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">👋 嗨，你好！</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                欢迎来到我的个人博客！这里是我记录技术学习、项目开发和生活思考的地方。
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                我热爱前端开发、开源社区和一切有趣的技术。希望通过这个博客能结识更多志同道合的朋友。
              </p>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card hover={false} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">🛠️ 技能</h2>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'Next.js', 'Vue', 'Node.js', 'Tailwind CSS', 'Git', 'Docker'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card hover={false}>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">📬 联系方式</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>GitHub: {siteConfig.social.github}</p>
                <p>Email: hello@seline-blog.com</p>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
