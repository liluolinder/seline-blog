import { getAllFriends } from '@/lib/friends'
import { Card } from '@/components/ui'
import { FadeIn } from '@/components/animations'

export default function FriendsPage() {
  const friends = getAllFriends().sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen pb-16">
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">🔗 友情链接</h1>
              <p className="text-gray-600 dark:text-gray-400">我的朋友们</p>
            </div>
          </FadeIn>

          {friends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.map((friend, i) => (
                <FadeIn key={friend.name} delay={i * 0.1}>
                  <a href={friend.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full flex items-start gap-4">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/50 flex-shrink-0 object-cover"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 truncate">
                          {friend.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {friend.description}
                        </p>
                      </div>
                    </Card>
                  </a>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔗</p>
              <p className="text-gray-500 dark:text-gray-400">暂无友链</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
