import { FadeIn } from '@/components/animations'
import { Card } from '@/components/ui'
import { siteConfig } from '@/lib/config'

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-16">
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 overflow-hidden shadow-xl mb-6">
                <img src={siteConfig.about.avatar} alt={siteConfig.about.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{siteConfig.about.title}</h1>
              <p className="text-gray-800 dark:text-gray-200">{siteConfig.about.subtitle}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card hover={false} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{siteConfig.about.greeting.title}</h2>
              {siteConfig.about.greeting.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">{p}</p>
              ))}
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card hover={false} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">🛠️ 技能</h2>
              <div className="flex flex-wrap gap-2">
                {siteConfig.about.skills.map((skill) => (
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
                {siteConfig.sidebar.social.map((s) => (
                  <p key={s.name}>{s.name}: {s.url}</p>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
