import type { ReactNode } from 'react'
import {
  IconBolt,
  IconCircleCheck,
  IconClock,
  IconLeaf,
  IconLock,
  IconMicrophone,
} from '@tabler/icons-react'
import { Avatar, Chip, LiveDot, SourceTag } from './components/bits'
import { screenMotionTransitions, smoothEase } from './lib/motion'

/**
 * Living style guide — a top-level view at /?style. It renders the *real*
 * components and motion tokens (imported, not redrawn) so it can't drift from
 * the product. Reachable from the nav pill alongside App and Deck.
 */

function Section({
  index,
  title,
  note,
  children,
}: {
  index: string
  title: string
  note?: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-hairline pt-7">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-serif text-subhead text-live-700 tabular-nums">{index}</span>
        <h2 className="text-title font-medium text-ink">{title}</h2>
      </div>
      {note && <p className="mb-5 max-w-[60ch] text-body text-ink-3">{note}</p>}
      {children}
    </section>
  )
}

function Swatch({ cls, name, hex, role }: { cls: string; name: string; hex: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-10 w-10 shrink-0 rounded-xl border border-hairline ${cls}`} />
      <div className="min-w-0 leading-tight">
        <div className="text-body font-medium text-ink">{name}</div>
        <div className="text-micro text-ink-3 tabular-nums">{hex}</div>
        <div className="text-micro text-ink-4">{role}</div>
      </div>
    </div>
  )
}

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="pl-glass flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-5 text-center">
      {children}
      <span className="text-micro text-ink-3">{label}</span>
    </div>
  )
}

const colorGroups: { group: string; swatches: { cls: string; name: string; hex: string; role: string }[] }[] = [
  {
    group: 'Ink — text',
    swatches: [
      { cls: 'bg-ink', name: 'ink', hex: '#faf8e7', role: 'primary text' },
      { cls: 'bg-ink-2', name: 'ink-2', hex: '#d7ded5', role: 'secondary' },
      { cls: 'bg-ink-3', name: 'ink-3', hex: '#a6bab7', role: 'muted' },
      { cls: 'bg-ink-4', name: 'ink-4', hex: '#7f948f', role: 'faint' },
    ],
  },
  {
    group: 'Surface — canvas',
    swatches: [
      { cls: 'bg-surface', name: 'surface', hex: '#17211f', role: 'app canvas' },
      { cls: 'bg-cream', name: 'cream', hex: '#25312f', role: 'raised' },
      { cls: 'bg-hairline', name: 'hairline', hex: '#34443f', role: 'divider' },
      { cls: 'bg-night', name: 'night', hex: '#0f1715', role: 'live / device' },
    ],
  },
  {
    group: 'Presence — live / verified',
    swatches: [
      { cls: 'bg-live-200', name: 'live-200', hex: '#b9e4d7', role: 'presence text' },
      { cls: 'bg-live-400', name: 'live-400', hex: '#8acdbd', role: 'waveform' },
      { cls: 'bg-live', name: 'live', hex: '#76b9a8', role: 'live dot' },
      { cls: 'bg-live-900', name: 'live-900', hex: '#10241f', role: 'on-live bg' },
    ],
  },
  {
    group: 'Action & accent',
    swatches: [
      { cls: 'bg-coral', name: 'coral', hex: '#596d69', role: 'action / focus' },
      { cls: 'bg-coral-700', name: 'coral-700', hex: '#c8d4cf', role: 'action text' },
      { cls: 'bg-amber-700', name: 'amber-700', hex: '#c8d4cf', role: 'intent text' },
      { cls: 'bg-iris', name: 'iris', hex: '#6f898b', role: 'avatar accent' },
    ],
  },
]

const typeScale = [
  { cls: 'text-display', name: 'display', px: '60', sample: '9:41' },
  { cls: 'text-title', name: 'title', px: '22', sample: 'Title' },
  { cls: 'text-headline', name: 'headline', px: '17', sample: 'Headline' },
  { cls: 'text-subhead', name: 'subhead', px: '15', sample: 'Subheading' },
  { cls: 'text-body', name: 'body', px: '13', sample: 'Body — the default reading size.' },
  { cls: 'text-caption', name: 'caption · label · micro', px: '12', sample: 'Caption, label and micro all share 12px.' },
]

const materials = [
  { cls: 'pl-glass', name: 'pl-glass', role: 'cards' },
  { cls: 'pl-glass-soft', name: 'pl-glass-soft', role: 'chips, controls' },
  { cls: 'pl-glass-panel', name: 'pl-glass-panel', role: 'sheets, push' },
  { cls: 'pl-glass-pill', name: 'pl-glass-pill', role: 'pills' },
  { cls: 'pl-primary-action', name: 'pl-primary-action', role: 'primary CTA' },
]

const principles = [
  { t: 'Presence over volume', d: 'A few open moments now, not a wall of results.' },
  { t: 'Warmth over efficiency', d: 'Human and trustworthy — never LinkedIn blue.' },
  { t: 'Consent is visible', d: 'Identity stays locked until both sides choose.' },
  { t: 'The moment is the hero', d: 'Reserve choreography for the live reveal.' },
]

export function StyleGuide() {
  return (
    <div className="min-h-full w-full px-5 pt-16 pb-24 sm:px-10">
      <nav
        aria-label="Switch view"
        className="pl-glass-pill fixed top-5 right-5 z-30 flex items-center gap-1 rounded-full p-1 text-caption font-medium"
      >
        <a className="rounded-full px-3 py-1.5 text-ink-3 transition hover:text-ink" href="/">
          App
        </a>
        <span className="rounded-full bg-live-200/15 px-3 py-1.5 text-live-700">Style</span>
        <a className="rounded-full px-3 py-1.5 text-ink-3 transition hover:text-ink" href="/deck.html">
          Deck
        </a>
      </nav>

      <div className="mx-auto max-w-[1040px]">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="pl-glass-soft flex h-7 w-7 items-center justify-center rounded-[8px] text-live-700">
              <IconLeaf size={16} stroke={2} />
            </span>
            <span className="font-serif text-[22px] font-medium text-ink">Pathline</span>
          </div>
          <h1 className="font-serif text-[40px] leading-none font-medium text-ink">Style Guide</h1>
          <p className="mt-3 max-w-[60ch] text-body text-ink-3">
            The design system behind the prototype — tokens first. Everything here renders the real
            components and values, so it stays true to the product.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {/* TYPOGRAPHY */}
          <Section
            index="01"
            title="Typography"
            note="One modular sans scale (Inter) for UI. Fraunces serif is reserved for brand voice — the wordmark, the moment count, and the identity reveal."
          >
            <div className="flex flex-col gap-4">
              {typeScale.map((t) => (
                <div key={t.name} className="flex items-baseline gap-5 border-b border-hairline pb-4">
                  <div className="w-28 shrink-0 leading-tight">
                    <div className="text-caption font-medium text-ink-2">{t.name}</div>
                    <div className="text-micro text-ink-4 tabular-nums">{t.px}px</div>
                  </div>
                  <div className={`min-w-0 truncate text-ink ${t.cls}`}>{t.sample}</div>
                </div>
              ))}
              <div className="flex items-center gap-5">
                <div className="w-28 shrink-0 text-caption font-medium text-ink-2">serif</div>
                <div className="font-serif text-[26px] font-medium text-ink">Maya Chen</div>
              </div>
            </div>
          </Section>

          {/* COLOR */}
          <Section
            index="02"
            title="Color"
            note="Deep sage for trust, warm cream ink for humanity, mint for presence. Some ramps are intentionally aliased (action and intent reuse the sage neutrals) — no generic-AI purple, no LinkedIn blue."
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {colorGroups.map((g) => (
                <div key={g.group}>
                  <div className="mb-3 text-micro font-semibold tracking-wide text-ink-3 uppercase">
                    {g.group}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {g.swatches.map((s) => (
                      <Swatch key={s.name} {...s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ICONOGRAPHY */}
          <Section
            index="03"
            title="Iconography"
            note="Tabler icons on a four-step size scale, paired to the adjacent text. Two stroke weights only: 1.8 default, 2 for emphasis and brand."
          >
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Spec label="14 · inline (12px text)">
                <IconClock size={14} stroke={1.8} className="text-ink" />
              </Spec>
              <Spec label="16 · buttons, rows">
                <IconClock size={16} stroke={1.8} className="text-ink" />
              </Spec>
              <Spec label="20 · controls, tabs">
                <IconClock size={20} stroke={1.8} className="text-ink" />
              </Spec>
              <Spec label="40 · hero glyph">
                <IconClock size={40} stroke={1.8} className="text-ink" />
              </Spec>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Spec label="stroke 1.8 · default">
                <IconBolt size={28} stroke={1.8} className="text-ink" />
              </Spec>
              <Spec label="stroke 2 · emphasis">
                <IconBolt size={28} stroke={2} className="text-ink" />
              </Spec>
            </div>
          </Section>

          {/* MATERIALS */}
          <Section
            index="04"
            title="Materials"
            note="A single glass system — frosted layers over the sage canvas — gives the app its quiet, premium depth."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {materials.map((m) => (
                <div
                  key={m.name}
                  className={`flex h-24 flex-col justify-end rounded-2xl p-3 ${m.cls}`}
                >
                  <div className="text-caption font-medium text-ink">{m.name}</div>
                  <div className="text-micro text-ink-3">{m.role}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* COMPONENTS */}
          <Section index="05" title="Components" note="The shared building blocks, rendered live.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="pl-glass flex flex-col gap-3 rounded-2xl p-4">
                <div className="text-micro font-semibold tracking-wide text-ink-3 uppercase">Avatar</div>
                <div className="flex items-center gap-3">
                  <Avatar locked size="sm" />
                  <Avatar initials="MC" hue="iris" size="md" />
                  <Avatar initials="AO" hue="live" size="md" />
                  <Avatar initials="D" hue="coral" size="xs" />
                </div>
              </div>

              <div className="pl-glass flex flex-col gap-3 rounded-2xl p-4">
                <div className="text-micro font-semibold tracking-wide text-ink-3 uppercase">Presence dot</div>
                <div className="flex items-center gap-5 text-caption text-live-700">
                  <span className="flex items-center gap-1.5">
                    <LiveDot pulse={false} /> static
                  </span>
                  <span className="flex items-center gap-1.5">
                    <LiveDot /> live (pulse)
                  </span>
                </div>
              </div>

              <div className="pl-glass flex flex-col gap-3 rounded-2xl p-4">
                <div className="text-micro font-semibold tracking-wide text-ink-3 uppercase">Chips &amp; tags</div>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip>0→1 product</Chip>
                  <Chip>Series A</Chip>
                  <SourceTag source="work email" sourceIcon="mail" />
                  <SourceTag source="GitHub" sourceIcon="github" />
                </div>
              </div>

              <div className="pl-glass flex flex-col gap-3 rounded-2xl p-4">
                <div className="text-micro font-semibold tracking-wide text-ink-3 uppercase">Actions</div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="pl-primary-action flex w-full items-center justify-center gap-1.5 rounded-[14px] py-3 text-subhead font-medium transition active:scale-[0.98]"
                  >
                    <IconBolt size={16} stroke={2} /> Go live
                  </button>
                  <button
                    type="button"
                    className="pl-glass flex w-full items-center justify-center gap-1.5 rounded-[14px] py-2.5 text-body font-medium text-ink transition active:scale-[0.98]"
                  >
                    <IconCircleCheck size={16} stroke={1.8} className="text-live-700" /> Secondary
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* MOTION */}
          <Section
            index="06"
            title="Motion"
            note="One easing curve, named transitions per navigation intent. A pulse means a live connection — nothing before it animates."
          >
            <div className="pl-glass mb-3 rounded-2xl px-4 py-3 text-body text-ink">
              easing ·{' '}
              <span className="text-ink-3 tabular-nums">cubic-bezier({smoothEase.join(', ')})</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.entries(screenMotionTransitions).map(([name, t]) => (
                <div key={name} className="pl-glass-soft rounded-xl px-3 py-2.5 text-center">
                  <div className="text-caption font-medium text-ink capitalize">{name}</div>
                  <div className="text-micro text-ink-3 tabular-nums">{Math.round(t.duration * 1000)}ms</div>
                </div>
              ))}
            </div>
          </Section>

          {/* PRINCIPLES */}
          <Section index="07" title="Principles">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {principles.map((p) => (
                <div key={p.t} className="pl-glass flex items-start gap-3 rounded-2xl p-4">
                  <IconLock size={16} stroke={1.8} className="mt-0.5 shrink-0 text-live-700" />
                  <div className="leading-tight">
                    <div className="text-body font-medium text-ink">{p.t}</div>
                    <div className="mt-0.5 text-caption text-ink-3">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <footer className="mt-12 flex items-center gap-1.5 border-t border-hairline pt-6 text-caption text-ink-4">
          <IconMicrophone size={14} stroke={1.8} /> Pathline — fix the moment of connection.
        </footer>
      </div>
    </div>
  )
}
