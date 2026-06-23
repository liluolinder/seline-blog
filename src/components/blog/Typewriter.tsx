'use client'

import { useState, useEffect, useCallback } from 'react'

export function Typewriter({ quotes }: { quotes: string[] }) {
  const [displayed, setDisplayed] = useState('')
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const currentQuote = quotes[quoteIndex]

  const nextQuote = useCallback(() => {
    setQuoteIndex((i) => (i + 1) % quotes.length)
    setCharIndex(0)
    setIsDeleting(false)
  }, [quotes.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentQuote.length) {
          setDisplayed(currentQuote.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          // 打字完毕，等待后开始删除
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(currentQuote.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          // 删除完毕，切到下一条
          nextQuote()
        }
      }
    }, isDeleting ? 30 : 80)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, currentQuote, nextQuote])

  return (
    <p className="text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed min-h-[1.5em]">
      {displayed}
      <span className="animate-pulse ml-0.5 text-blue-400">|</span>
    </p>
  )
}
