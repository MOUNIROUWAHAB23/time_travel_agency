'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'Quel voyage convient à un premier voyageur ?',
  'Comment se vêtir à Paris en 1889 ?',
  "Comment fonctionne l'assurance paradoxe ?",
]

function messageText(message: UIMessage) {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, open])

  function submit(text: string) {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput('')
  }

  return (
    <>
      {/* Bouton lanceur */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fermer le chat concierge' : 'Ouvrir le chat concierge'}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-primary/30',
          open && 'rotate-90',
        )}
      >
        {open ? <X className="size-6" /> : <MessageSquare className="size-6" />}
      </button>

      {/* Panneau de chat */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl transition-all duration-300',
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-4 scale-95 opacity-0',
        )}
        style={{ height: 'min(32rem, calc(100vh - 8rem))' }}
        role="dialog"
        aria-label="Concierge Chronos Voyages"
      >
        {/* En-tête */}
        <div className="flex items-center gap-3 border-b border-border/60 bg-secondary/40 px-5 py-4">
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="font-heading text-base font-medium text-foreground">
              Wanda
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Votre concierge temporelle
            </p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-primary animate-shimmer" />
            En ligne
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-secondary/50 px-4 py-3 text-sm leading-relaxed text-foreground">
                Bienvenue chez Chronos Voyages. Je suis Wanda, votre concierge
                temporelle. Dites-moi quelle époque éveille votre imagination,
                et je commencerai à composer votre passage.
              </div>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="rounded-full border border-border/70 px-3.5 py-2 text-left text-xs text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const isUser = message.role === 'user'
            return (
              <div
                key={message.id}
                className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    isUser
                      ? 'rounded-br-sm bg-primary text-primary-foreground'
                      : 'rounded-tl-sm border border-border/60 bg-secondary/50 text-foreground',
                  )}
                >
                  {messageText(message)}
                </div>
              </div>
            )
          })}

          {status === 'submitted' && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-tl-sm border border-border/60 bg-secondary/50 px-4 py-3.5">
                <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Compositeur */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-center gap-2 border-t border-border/60 bg-secondary/30 px-3 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez vos questions à Wanda…"
            className="flex-1 bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || busy}
            className="size-9 rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-105 disabled:opacity-40"
          >
            <Send className="size-4" />
            <span className="sr-only">Envoyer</span>
          </Button>
        </form>
      </div>
    </>
  )
}
