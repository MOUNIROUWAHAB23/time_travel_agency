'use client'

import { useState } from 'react'
import { ArrowRight, RotateCcw, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DestinationKey = 'paris' | 'cretace' | 'florence' | 'egypt'

const QUESTIONS = [
  {
    question: "Quel type d'expérience vous appelle ?",
    options: [
      { label: 'Culturelle & Artistique', key: 'florence' as DestinationKey },
      { label: 'Aventure & Nature', key: 'cretace' as DestinationKey },
      { label: "Élégance & Raffinement", key: 'paris' as DestinationKey },
      { label: 'Civilisations Anciennes', key: 'egypt' as DestinationKey },
    ],
  },
  {
    question: "Quelle époque éveille le plus votre imagination ?",
    options: [
      { label: "La Belle Époque — fin du XIXe siècle", key: 'paris' as DestinationKey },
      { label: 'La Terre préhistorique', key: 'cretace' as DestinationKey },
      { label: 'La Renaissance — XVIe siècle', key: 'florence' as DestinationKey },
      { label: "L'Antiquité profonde", key: 'egypt' as DestinationKey },
    ],
  },
  {
    question: 'Votre cadre idéal ?',
    options: [
      { label: "Une ville éblouissante à son apogée", key: 'paris' as DestinationKey },
      { label: 'Une nature primitive et intacte', key: 'cretace' as DestinationKey },
      { label: 'Ateliers, galeries & salons', key: 'florence' as DestinationKey },
      { label: 'Temples sacrés et rives du Nil', key: 'egypt' as DestinationKey },
    ],
  },
  {
    question: 'Votre activité idéale au cours du voyage ?',
    options: [
      { label: "Assister à des événements & expositions historiques", key: 'paris' as DestinationKey },
      { label: 'Observer la faune préhistorique de près', key: 'cretace' as DestinationKey },
      { label: "Commander des œuvres & rencontrer des maîtres", key: 'florence' as DestinationKey },
      { label: 'Assister à des cérémonies & rituels pharaoniques', key: 'egypt' as DestinationKey },
    ],
  },
]

const RESULTS: Record<DestinationKey, {
  era: string
  title: string
  location: string
  image: string
  description: string
}> = {
  paris: {
    era: '1889',
    title: 'Belle Époque Paris',
    location: "France · L'Ère Dorée",
    image: '/carte_1889_france_sansdate.png',
    description:
      "Votre esprit appartient à la Ville Lumière dans son éclat le plus radieux. Paris, 1889 — la Tour Eiffel tout juste dévoilée, l'Exposition Universelle en plein essor, et une civilisation tout entière grisée par son propre génie.",
  },
  cretace: {
    era: '65 M av. J.-C.',
    title: "L'Ère Crétacée",
    location: "Terre Primitive · Ère des Dinosaures",
    image: '/carte_mesozoique_sansdate.png',
    description:
      "L'appel du sauvage résonne en vous. Votre voyage vous conduit à la fin de la période mésozoïque — une terre encore souveraine des titans, des forêts anciennes à perte de vue et des cieux sillonnés de ptérosaures au crépuscule.",
  },
  florence: {
    era: '1504',
    title: 'La Renaissance Florentine',
    location: 'Italie · La République de Florence',
    image: '/carte_1504_florence_sansdate.png',
    description:
      "Vous êtes attirés par l'épanouissement le plus sublime de la créativité humaine. Florence, 1504 — où le ciseau de Michel-Ange résonne encore dans l'atelier, les Médicis règnent et la beauté est considérée comme un devoir civique.",
  },
  egypt: {
    era: '1350 av. J.-C.',
    title: "L'Ère des Pharaons",
    location: 'Égypte · Le Nouvel Empire',
    image: '/carte_egypte_sansdate.png',
    description:
      "La grandeur ancienne vous appelle. Votre passage vous mène vers l'Égypte du Nouvel Empire — le Nil en crue, les piliers de Karnak baignés de lumière de torche et une civilisation au faîte de son pouvoir sacré et monumental.",
  },
}

function tally(answers: DestinationKey[]): DestinationKey {
  const scores: Record<DestinationKey, number> = { paris: 0, cretace: 0, florence: 0, egypt: 0 }
  for (const a of answers) scores[a]++
  return (Object.keys(scores) as DestinationKey[]).reduce((a, b) => scores[a] >= scores[b] ? a : b)
}

export function Quiz() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<DestinationKey[]>([])
  const [selected, setSelected] = useState<DestinationKey | null>(null)
  const [revealed, setRevealed] = useState(false)

  const done = answers.length === QUESTIONS.length
  const result = done ? RESULTS[tally(answers)] : null

  function choose(key: DestinationKey) {
    setSelected(key)
  }

  function next() {
    if (!selected) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1)
    } else {
      setRevealed(true)
    }
  }

  function reset() {
    setStarted(false)
    setStep(0)
    setAnswers([])
    setSelected(null)
    setRevealed(false)
  }

  const current = QUESTIONS[step]
  const progress = answers.length / QUESTIONS.length

  return (
    <section id="quiz" className="relative border-t border-border/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* En-tête */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-luxe text-primary">
            <span className="h-px w-10 bg-primary/70" />
            Recommandation de Voyage
            <span className="h-px w-10 bg-primary/70" />
          </p>
          <h2 className="mt-5 text-balance font-heading text-4xl font-light leading-tight text-foreground sm:text-5xl">
            Quelle époque est la vôtre&nbsp;?
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
            Répondez à quatre questions et laissez Chronos Voyages composer le voyage temporel parfait pour vous.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          {/* Pas encore commencé */}
          {!started && (
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(Object.keys(RESULTS) as DestinationKey[]).map((key, i) => (
                  <div
                    key={key}
                    className="overflow-hidden rounded-lg border border-border/60 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <img
                      src={RESULTS[key].image}
                      alt={RESULTS[key].title}
                      className="aspect-[4/5] w-full object-cover opacity-60 transition-opacity duration-300 hover:opacity-80"
                    />
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setStarted(true)}
                size="lg"
                className="rounded-full bg-primary px-10 text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.81_0.1_84_/_20%)]"
              >
                Commencer le questionnaire
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          )}

          {/* Questions */}
          {started && !revealed && (
            <div className="space-y-8">
              {/* Barre de progression */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span>Question {step + 1} sur {QUESTIONS.length}</span>
                  <span>{Math.round(progress * 100)}&nbsp;% complété</span>
                </div>
                <div className="h-px w-full bg-border/60">
                  <div
                    className="h-px bg-primary/70 transition-all duration-700 ease-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div key={step} className="animate-float-up rounded-2xl border border-border/60 bg-card p-8">
                <h3 className="font-heading text-2xl font-light text-foreground">
                  {current.question}
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {current.options.map((opt, idx) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => choose(opt.key)}
                      className={cn(
                        'animate-float-up rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all duration-200',
                        selected === opt.key
                          ? 'border-primary/70 bg-primary/10 text-foreground shadow-[0_0_0_1px_oklch(0.81_0.1_84_/_30%)]'
                          : 'border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:bg-secondary/60 hover:text-foreground hover:-translate-y-0.5',
                      )}
                      style={{ animationDelay: `${idx * 70}ms` }}
                    >
                      <span className="mr-2 font-medium text-primary">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={next}
                    disabled={!selected}
                    className="rounded-full bg-primary px-8 text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-40"
                  >
                    {step + 1 === QUESTIONS.length ? 'Révéler ma destination' : 'Question suivante'}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Résultat */}
          {revealed && result && (
            <div className="space-y-8 animate-float-up">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="size-full object-cover transition-transform duration-[1400ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-card/20 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full border border-primary/40 bg-background/50 px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary backdrop-blur-sm">
                    {result.era}
                  </span>
                </div>

                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {result.location}
                  </p>
                  <h3 className="mt-2 font-heading text-3xl font-light text-foreground">
                    {result.title}
                  </h3>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                    {result.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#atelier"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:gap-3"
                    >
                      Renseignez-vous sur ce voyage
                      <ArrowUpRight className="size-4" />
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm text-muted-foreground transition-all duration-300 hover:border-border hover:text-foreground"
                    >
                      <RotateCcw className="size-3.5" />
                      Recommencer le quiz
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Pas tout à fait&nbsp;?{' '}
                <a href="#atelier" className="text-primary underline-offset-4 transition-colors hover:underline">
                  Parlez à Aurelia
                </a>
                {' '}— elle composera une recommandation sur mesure.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
