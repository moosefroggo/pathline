import {
  IconBolt,
  IconChevronLeft,
  IconCircleCheck,
  IconLock,
  IconRosetteDiscountCheck,
  IconTarget,
} from '@tabler/icons-react'
import { Avatar, Chip, LiveDot, SectionLabel, SourceTag } from '../components/bits'
import type { Candidate } from '../data'

export function BriefScreen({
  c,
  onBack,
  onStart,
}: {
  c: Candidate
  onBack: () => void
  onStart: () => void
}) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="pl-noscroll min-h-0 flex-1 overflow-y-auto px-4 pt-2.5 pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 text-body text-ink-2"
        >
          <IconChevronLeft size={16} stroke={1.8} /> Moments
        </button>

        <div className="mt-2.5 flex items-center gap-2.5">
          <Avatar locked size="md" />
          <div className="leading-tight">
            <div className="flex items-center gap-1.5 text-headline font-medium text-ink">
              {c.anonRole}
              <IconLock size={16} stroke={1.8} className="text-ink-3" />
            </div>
            <div className="flex items-center gap-1.5 text-caption text-live-700">
              <LiveDot /> Replies in {c.repliesIn}
            </div>
          </div>
        </div>

        <SectionLabel icon={<IconRosetteDiscountCheck size={14} className="text-live-700" />}>
          Facts
        </SectionLabel>
        <div className="pl-glass rounded-xl px-3 py-1">
          {c.verified.map((v, i) => (
            <div
              key={v.label}
              className={`flex items-center gap-2.5 py-2.5 ${
                i < c.verified.length - 1 ? 'border-b border-hairline' : ''
              }`}
            >
              <IconCircleCheck size={16} stroke={1.8} className="shrink-0 text-live-700" />
              <span className="flex-1 text-body text-ink">{v.label}</span>
              <SourceTag source={v.source} sourceIcon={v.sourceIcon} />
            </div>
          ))}
        </div>

        <SectionLabel icon={<IconBolt size={14} className="text-amber-700" />}>
          Behavior
        </SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { v: c.track.reply, l: 'avg reply' },
            { v: c.track.showed, l: 'showed up' },
            { v: c.track.onsite, l: 'onsites' },
          ].map((t) => (
            <div key={t.l} className="pl-glass-soft rounded-xl px-1 py-2 text-center">
              <div className="text-subhead font-medium text-ink">{t.v}</div>
              <div className="text-micro text-ink-3">{t.l}</div>
            </div>
          ))}
        </div>

        <SectionLabel icon={<IconTarget size={14} className="text-iris" />}>Intent</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {c.declared.map((d) => (
            <Chip key={d}>{d}</Chip>
          ))}
        </div>

        <div className="pl-glass-soft mt-3.5 flex items-center gap-2 rounded-xl px-3 py-2.5">
          <IconLock size={16} stroke={1.8} className="text-ink-2" />
          <span className="text-caption leading-snug text-ink">
            Reveal happens after mutual start.
          </span>
        </div>
      </div>

      <div className="pl-bottom-glass shrink-0 px-4 pt-2 pb-4">
        <button
          type="button"
          onClick={onStart}
          className="pl-primary-action flex w-full items-center justify-center gap-1.5 rounded-[14px] py-3.5 text-subhead font-medium transition active:scale-[0.98]"
        >
          <IconBolt size={16} stroke={2} /> Go live
        </button>
      </div>
    </div>
  )
}
