'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
}: {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    el.style.transition = `opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
