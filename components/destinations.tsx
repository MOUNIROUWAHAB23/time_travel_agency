import { ScrollReveal } from '@/components/scroll-reveal'
import { DestinationCard, type Destination } from '@/components/destination-card'

const DESTINATIONS: Destination[] = [
  {
    era: '1889',
    title: 'Belle Époque Paris',
    location: "France · L'Ère Dorée",
    description:
      "Valsez sous la Tour Eiffel fraîchement inaugurée, assistez à l'ouverture de l'Exposition Universelle et dînez chez Maxim's tandis que la ville scintille sous la lumière du gaz.",
    image: '/carte_1889_france_sansdate.png',
    duration: '7 nuits',
  },
  {
    era: '65 M av. J.-C.',
    title: "L'Ère Crétacée",
    location: "Terre Primitive · L'Ère des Dinosaures",
    description:
      "Foullez la terre primitive à la fin du Mésozoïque — observez les tricératops au bord des rivières, les ptérosaures sillonnant les thermiques et un ciel vierge de toute présence humaine.",
    image: '/carte_mesozoique_sansdate.png',
    duration: '5 nuits',
  },
  {
    era: '1504',
    title: 'La Renaissance Florentine',
    location: 'Italie · La République de Florence',
    description:
      "Arpentez les rues de marbre de la République à son apogée — assistez à un salon des Médicis, commandez une œuvre à Michel-Ange et vivez la Renaissance dans toute sa magnificence.",
    image: '/carte_1504_florence_sansdate.png',
    duration: '6 nuits',
  },
  {
    era: '1350 av. J.-C.',
    title: "L'Ère des Pharaons",
    location: 'Égypte · Le Nouvel Empire',
    description:
      "Naviguez sur le Nil sous un ciel étoilé, participez aux cérémonies du temple de Karnak et contemplez la civilisation pharaonique dans toute sa grandeur sacrée et monumentale.",
    image: '/carte_egypte_sansdate.png',
    duration: '8 nuits',
  },
]

export function Destinations() {
  return (
    <section id="destinations" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-luxe text-primary">
                <span className="h-px w-10 bg-primary/70" />
                Voyages Sélectionnés
              </p>
              <h2 className="mt-5 text-balance font-heading text-4xl font-light leading-tight text-foreground sm:text-5xl">
                Quatre époques vous attendent
              </h2>
            </div>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Chaque voyage est privatisé pour un seul groupe. Couture
              d&apos;époque, guides experts et assurance paradoxe sont inclus
              d&apos;office.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((dest, i) => (
            <ScrollReveal key={dest.title} delay={i * 150} className="flex">
              <DestinationCard dest={dest} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
