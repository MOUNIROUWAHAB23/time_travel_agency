import { Compass, Gem, ShieldCheck, Sparkles } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'

const PILLARS = [
  {
    icon: Compass,
    title: 'Itinéraires Sur Mesure',
    body: "Chaque voyage est composé à partir d'une page blanche, autour de vos curiosités, vos goûts et votre rythme — jamais un circuit figé.",
  },
  {
    icon: Gem,
    title: 'Service Haut de Gamme',
    body: "Un Directeur de Voyage dédié, des guides experts en période et des gardes-robes de couture adaptées à chaque époque visitée.",
  },
  {
    icon: ShieldCheck,
    title: 'Assurance Paradoxe',
    body: "Les protocoles de non-interférence et l'assurance chronologique complète sont inclus d'office, afin que la seule chose que vous changiez soit vous-même.",
  },
  {
    icon: Sparkles,
    title: 'Accès Exclusif',
    body: "Salons privés, archives scellées et instants oubliés de l'Histoire — réservés à un seul groupe à la fois.",
  },
]

export function Atelier() {
  return (
    <section id="atelier" className="relative border-y border-border/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Côté texte — sticky */}
          <ScrollReveal className="lg:sticky lg:top-32 lg:self-start">
            <div>
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-luxe text-primary">
                <span className="h-px w-10 bg-primary/70" />
                L&apos;Atelier
              </p>
              <h2 className="mt-5 text-balance font-heading text-4xl font-light leading-tight text-foreground sm:text-5xl">
                Un standard de voyage qui n&apos;existait pas jusqu&apos;alors
              </h2>
              <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                Depuis trois générations, nos horlogers, historiens et concierges ont
                perfectionné un seul art&nbsp;: vous transporter, impeccablement, dans une
                autre époque. De la Belle Époque parisienne à l&apos;Égypte des Pharaons,
                de la Renaissance florentine à l&apos;ère des dinosaures — le résultat
                s&apos;apparente moins à une excursion qu&apos;à un passage privé, pensé dans
                ses moindres détails.
              </p>
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                <div>
                  <dt className="font-heading text-4xl font-light text-primary">240+</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Voyages organisés
                  </dd>
                </div>
                <div>
                  <dt className="font-heading text-4xl font-light text-primary">4</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Époques proposées
                  </dd>
                </div>
                <div>
                  <dt className="font-heading text-4xl font-light text-primary">100%</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Retours garantis
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          {/* Grille des piliers */}
          <ScrollReveal delay={150}>
            <div id="assurance" className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-2">
              {PILLARS.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="group bg-card p-8 transition-all duration-300 hover:bg-secondary/60"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/20 group-hover:scale-110">
                    <pillar.icon className="size-5 text-primary transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary/90">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
