# Chronos Voyages — Web App Interactive

Web app pour une agence de voyage temporel fictive, créée dans le cadre du projet supervisé IA M1/M2 (Session 2).

## 🛠 Stack Technique

- **Framework** : Next.js 16 (App Router, Turbopack)
- **Langage** : TypeScript + React 19
- **Style** : Tailwind CSS v4 — thème sombre, accents or champagne (oklch)
- **Typographie** : Cormorant Garamond (titres) + Geist Sans (corps)
- **Composants** : shadcn/ui
- **IA** : Vercel AI SDK v6 (`ai`) + Groq API (LLaMA 3.3 70B)
- **Hébergement** : Vercel

## ✨ Features Implémentées

- **Landing page immersive** — Hero plein écran avec fond animé (zoom cinématique lent), titre en apparition progressive, CTAs
- **Galerie de 4 destinations temporelles** — Cards interactives avec visuels générés en Session 1 (images sans dates)
- **Chatbot IA conversationnel (Branda)** — Widget flottant, réponses en streaming via Groq/LLaMA 3.3 70B, personnalité de concierge de luxe
- **Quiz de recommandation "Mon Époque"** — 4 questions → recommandation personnalisée de destination
- **Section L'Atelier** — Présentation de l'agence et des 4 piliers de service
- **Animations au scroll** — ScrollReveal (IntersectionObserver, translateY + opacity)
- **Hover 3D sur les cards** — Tilt perspective, reflet doré dynamique, sweep lumineux
- **Navigation responsive** — Header sticky avec glassmorphisme, menu hamburger mobile

## 🗓 Destinations

| Époque | Période | Durée |
|--------|---------|-------|
| Belle Époque Paris | 1889 | 7 nuits |
| L'Ère Crétacée | 65 M av. J.-C. | 5 nuits |
| La Renaissance Florentine | 1504 | 6 nuits |
| L'Ère des Pharaons | 1350 av. J.-C. | 8 nuits |

## 🤖 IA Utilisées

| Usage | Outil / Modèle |
|-------|----------------|
| Génération de la base du code | v0.dev (Vercel) — Claude Sonnet |
| Fine-tuning et développement | Claude Code (Anthropic) — Claude Sonnet 4.6 |
| Chatbot conversationnel | Groq API — LLaMA 3.3 70B Versatile |
| Visuels des destinations | Génération IA Session 1 (images sans dates) |

### Prompts documentés

**System prompt Branda (chatbot)** — défini dans `app/api/chat/route.ts` :
> "Tu es Branda, la concierge temporelle personnelle de Chronos Voyages, un atelier de voyage temporel ultra-luxe. Ton ton : raffinée, chaleureuse et discrète. Tu aides des clients exigeants à planifier des voyages sur mesure à travers l'Histoire..."

**Prompt de génération initiale (v0.dev)** :
> "Landing page for luxury time travel agency, hero section with video background, 4 destination cards, chatbot widget, elegant design, dark mode, premium feel, champagne gold accents, Cormorant Garamond font"

## 📁 Structure du Projet

```
app/
  api/chat/route.ts    — Route streaming IA (Groq)
  layout.tsx           — Layout global, lang="fr"
  page.tsx             — Assemblage des sections
components/
  hero.tsx             — Section hero animée
  destinations.tsx     — Grille des 4 destinations
  destination-card.tsx — Card 3D interactive
  quiz.tsx             — Quiz de recommandation
  atelier.tsx          — Section agence
  chat-widget.tsx      — Widget chatbot Branda
  scroll-reveal.tsx    — Animation au scroll
  site-header.tsx      — Navigation sticky
  site-footer.tsx      — Pied de page
public/
  *.png                — Visuels Session 1 (sans dates)
```

## ⚙️ Installation

```bash
npm install
```

Créer un fichier `.env.local` :
```
GROQ_API_KEY=votre_clé_groq  # Gratuit sur console.groq.com
```

```bash
npm run dev
# → http://localhost:3000
```

## 📝 Crédits & Transparence

- Code généré et affiné avec l'aide d'outils IA (v0.dev, Claude Code)
- Visuels des destinations : générés en Session 1 par IA générative
- Modèle IA chatbot : LLaMA 3.3 70B via Groq (open source, Apache 2.0)
- Composants UI : shadcn/ui (MIT)
- Framework : Next.js / Vercel

## 💭 Réflexion sur le Processus

Le workflow "vibe coding" a permis de générer une base solide en quelques minutes avec v0.dev, puis d'itérer avec Claude Code pour affiner le design, corriger les bugs (provider IA, encodage), ajouter les animations 3D sur les cards et traduire l'ensemble en français. Le principal défi technique a été l'intégration du chatbot : l'AI SDK v6 requiert un objet `LanguageModel` typé (et non une chaîne brute), résolu en installant `@ai-sdk/groq`. Le quiz de recommandation et les animations au scroll ont été ajoutés pour renforcer l'aspect "personnalisation" et la fluidité UX.

---

*Projet pédagogique — M1/M2 Digital & IA · Chronos Voyages *
