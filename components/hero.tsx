'use client'

import { useRef, useState } from 'react'
import { Play, Pause, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Hero() {
  const layerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(true)

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fond cinématique */}
      <div className="absolute inset-0">
        <video
          className="size-full object-cover"
          poster="/hero-timescape.png"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          {/* <source src="/hero.mp4" type="video/mp4" /> */}
        </video>
        <div
          ref={layerRef}
          className={cn(
            'absolute inset-0 bg-cover bg-center',
            playing && 'animate-slow-zoom',
          )}
          style={{ backgroundImage: 'url(/hero-timescape.png)' }}
          aria-hidden="true"
        />
        {/* Superpositions en profondeur */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 lg:px-10">
        <div className="max-w-2xl">
          <p className="animate-float-up flex items-center gap-3 text-xs font-medium uppercase tracking-luxe text-primary">
            <span className="h-px w-10 bg-primary/70" />
            Fondée en une année à venir
          </p>

          <h1
            className="animate-float-up mt-6 text-balance font-heading text-5xl font-light leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.1s' }}
          >
            Voyagez au-delà du présent.
            <span className="block text-primary">Arrivez dans une autre ère.</span>
          </h1>

          <p
            className="animate-float-up mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: '0.2s' }}
          >
            Chronos Voyages est le premier atelier privé au monde dédié au voyage
            temporel. Nous concevons des expéditions discrètes et haut de gamme vers
            les instants les plus lumineux de l&apos;Histoire — et vers des futurs que
            seuls quelques privilégiés auront jamais l&apos;occasion de contempler.
          </p>

          <div
            className="animate-float-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: '0.3s' }}
          >
            <Button
              render={<a href="#destinations">Explorer les Destinations</a>}
              nativeButton={false}
              size="lg"
              className="rounded-full bg-primary px-8 text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.81_0.1_84_/_25%)]"
            />
            <Button
              render={<a href="#atelier">L&apos;Expérience Chronos</a>}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-background/30 px-8 text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-background/60"
            />
          </div>
        </div>
      </div>

      {/* Barre de lecture cinématique */}
      <div className="absolute bottom-8 left-0 right-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          aria-label={playing ? "Mettre en pause l'ambiance" : "Reprendre l'ambiance"}
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/40 backdrop-blur-sm transition-colors duration-300 hover:border-primary/50">
            {playing ? (
              <Pause className="size-3.5 text-primary" />
            ) : (
              <Play className="size-3.5 text-primary" />
            )}
          </span>
          Ambiance — Vortex Temporel
        </button>

        <a
          href="#destinations"
          className="hidden items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground sm:flex"
        >
          Défiler pour découvrir
          <ChevronDown className="size-4 animate-bounce text-primary" />
        </a>
      </div>
    </section>
  )
}
