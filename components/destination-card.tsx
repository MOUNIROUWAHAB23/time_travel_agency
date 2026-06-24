'use client'

import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export type Destination = {
  era: string
  title: string
  location: string
  description: string
  image: string
  duration: string
}

export function DestinationCard({ dest }: { dest: Destination }) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width   // 0 → 1
    const y = (e.clientY - top) / height   // 0 → 1
    const rotX = (y - 0.5) * -14
    const rotY = (x - 0.5) * 14

    // 3D tilt : transition rapide pendant le mouvement
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    el.style.transition = 'transform 0.07s linear'

    // Reflet doré qui suit le curseur
    if (glareRef.current) {
      glareRef.current.style.background =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, oklch(0.81 0.1 84 / 22%), transparent 58%)`
      glareRef.current.style.opacity = '1'
    }
  }

  function onMouseEnter() {
    // Sweep lumineux — relancé à chaque survol
    const s = shimmerRef.current
    if (!s) return
    s.classList.remove('animate-shimmer-sweep')
    void s.offsetWidth // force reflow pour relancer l'animation
    s.classList.add('animate-shimmer-sweep')
  }

  function onMouseLeave() {
    const el = tiltRef.current
    if (!el) return
    // Retour élastique au repos
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    el.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }

  return (
    <div
      ref={tiltRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex w-full"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <article className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card transition-[border-color,box-shadow] duration-500 hover:border-primary/30 hover:shadow-[0_28px_56px_-14px_rgba(0,0,0,0.6),0_0_0_1px_oklch(0.81_0.1_84_/_18%)]">

        {/* ① Sweep doré — traverse la card une fois au survol */}
        <div
          ref={shimmerRef}
          className="pointer-events-none absolute inset-0 z-30 -translate-x-full"
          style={{
            background:
              'linear-gradient(105deg, transparent 15%, oklch(0.81 0.1 84 / 14%) 50%, transparent 85%)',
          }}
          aria-hidden="true"
        />

        {/* ② Reflet doré dynamique qui suit le curseur */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 rounded-lg opacity-0 transition-opacity duration-200"
          aria-hidden="true"
        />

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={dest.image || '/placeholder.svg'}
            alt={`${dest.title}, ${dest.era}`}
            className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent transition-opacity duration-500 group-hover:opacity-75" />

          {/* Badge époque */}
          <span className="absolute left-5 top-5 rounded-full border border-primary/40 bg-background/50 px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary backdrop-blur-sm transition-all duration-300 group-hover:border-primary/80 group-hover:bg-background/75 group-hover:shadow-[0_0_12px_oklch(0.81_0.1_84_/_25%)]">
            {dest.era}
          </span>
        </div>

        {/* Texte */}
        <div className="relative -mt-20 flex flex-1 flex-col gap-3 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-primary/70">
            {dest.location}
          </p>
          <h3 className="font-heading text-2xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary/95">
            {dest.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {dest.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {dest.duration}
            </span>
            <a
              href="#atelier"
              className="flex items-center gap-1.5 text-sm font-medium text-primary transition-all duration-300 hover:gap-2.5 hover:text-foreground"
            >
              En savoir plus
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
