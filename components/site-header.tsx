'use client'

import { useEffect, useState } from 'react'
import { Hourglass, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Voyages', href: '#destinations' },
  { label: 'Mon Époque', href: '#quiz' },
  { label: "L'Atelier", href: '#atelier' },
  { label: 'Assurance', href: '#assurance' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <Hourglass className="size-5 text-primary" aria-hidden="true" />
          <span className="font-heading text-xl font-medium tracking-wide text-foreground">
            Chronos<span className="text-primary"> Voyages</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            render={<a href="#destinations">Réserver un Voyage</a>}
            nativeButton={false}
            className="rounded-full bg-primary px-6 text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          />
        </div>

        <button
          type="button"
          className="text-foreground transition-colors duration-200 hover:text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4"
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={
                <a href="#destinations" onClick={() => setOpen(false)}>
                  Réserver un Voyage
                </a>
              }
              nativeButton={false}
              className="mt-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            />
          </nav>
        </div>
      )}
    </header>
  )
}
