import { Hourglass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Appel à l'action final */}
      <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-luxe text-primary">
          <span className="h-px w-10 bg-primary/70" />
          Commencez votre passage
          <span className="h-px w-10 bg-primary/70" />
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl text-balance font-heading text-4xl font-light leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Le passé n&apos;est pas révolu. L&apos;avenir n&apos;est pas loin. Tous deux vous attendent, simplement.
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            render={<a href="#destinations">Réserver un Voyage</a>}
            nativeButton={false}
            size="lg"
            className="rounded-full bg-primary px-8 text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.81_0.1_84_/_20%)]"
          />
          <Button
            render={
              <a href="wahabmounirou38@gmail.com" target="_blank" rel="noopener noreferrer">
                Parler à un Directeur
              </a>
            }
            nativeButton={false}
            size="lg"
            variant="outline"
            className="rounded-full border-border bg-transparent px-8 text-foreground transition-all duration-300 hover:bg-secondary"
          />
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row lg:px-10">
          <div className="flex items-center gap-3">
            <Hourglass className="size-4 text-primary" aria-hidden="true" />
            <span className="font-heading text-base text-foreground">
              Chronos Voyages
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2" aria-label="Navigation pied de page">
            <a href="#destinations" className="transition-colors duration-200 hover:text-foreground">Voyages</a>
            <a href="#quiz" className="transition-colors duration-200 hover:text-foreground">Mon Époque</a>
            <a href="#atelier" className="transition-colors duration-200 hover:text-foreground">L&apos;Atelier</a>
            <a href="#assurance" className="transition-colors duration-200 hover:text-foreground">Assurance</a>
            <a href="wahabmounirou38@gmail.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-foreground">Contact</a>
          </nav>
          <p className="text-xs tracking-wide">
            © {new Date().getFullYear()} Chronos Voyages · Toutes les époques réservées
          </p>
        </div>
      </div>
    </footer>
  )
}
