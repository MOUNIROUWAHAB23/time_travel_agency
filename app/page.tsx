import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Destinations } from '@/components/destinations'
import { Quiz } from '@/components/quiz'
import { Atelier } from '@/components/atelier'
import { SiteFooter } from '@/components/site-footer'
import { ChatWidget } from '@/components/chat-widget'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Destinations />
      <Quiz />
      <Atelier />
      <SiteFooter />
      <ChatWidget />
    </main>
  )
}
