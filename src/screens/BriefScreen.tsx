import { motion } from 'framer-motion'
import {
  IconBolt,
  IconChevronLeft,
  IconCircleCheck,
  IconLock,
  IconQuote,
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
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="flex flex-1 flex-col"
    >
      <div className="px-4 pt-2.5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 text-[13px] text-ink-2"
        >
          <IconChevronLeft size={16} stroke={1.8} /> Moments
        </button>

        <div className="mt-2.5 flex items-center gap-2.5">
          <Avatar locked size="md" />
          <div className="leading-tight">
            <div className="flex items-center gap-1.5 text-[16px] font-medium text-ink">
              {c.anonRole}
              <IconLock size={12} stroke={1.8} className="text-ink-3" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-live-700">
              <LiveDot /> Active now · replies in {c.repliesIn}
            </div>
          </div>
        </div>

        <SectionLabel icon={<IconRosetteDiscountCheck size={14} className="text-live-700" />}>
          Verified · not self-reported
        </SectionLabel>
        <div className="rounded-xl bg-surface px-3 py-1">
          {c.verified.map((v, i) => (
            <div
              key={v.label}
              className={`flex items-center gap-2.5 py-2.5 ${
                i < c.verified.length - 1 ? 'border-b border-hairline' : ''
              }`}
            >
              <IconCircleCheck size={16} stroke={1.8} className="shrink-0 text-live-700" />
              <span className="flex-1 text-[12px] text-ink">{v.label}</span>
              <SourceTag source={v.source} sourceIcon={v.sourceIcon} />
            </div>
          ))}
        </div>

        <SectionLabel icon={<IconQuote size={14} className="text-iris" />}>
          Vouched by peers
        </SectionLabel>
        <div className="rounded-xl bg-surface px-3 py-2.5">
          <div className="text-[12px] leading-snug text-iris-900">{c.vouch.quote}</div>
          <div className="mt-1.5 text-[11px] text-ink-3">
            — {c.vouch.by} · <span className="text-live-700">verified</span>
            {c.vouch.more > 0 ? ` · +${c.vouch.more} more` : ''}
          </div>
        </div>

        <SectionLabel icon={<IconBolt size={14} className="text-amber-700" />}>
          Track record on Pathline · earned
        </SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { v: c.track.reply, l: 'avg reply' },
            { v: c.track.showed, l: 'showed up' },
            { v: c.track.onsite, l: '→ onsite' },
          ].map((t) => (
            <div key={t.l} className="rounded-xl bg-surface px-1 py-2 text-center">
              <div className="text-[15px] font-medium text-ink">{t.v}</div>
              <div className="text-[10px] text-ink-3">{t.l}</div>
            </div>
          ))}
        </div>

        <SectionLabel icon={<IconTarget size={14} className="text-iris" />}>
          Declared — the only thing they wrote
        </SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {c.declared.map((d) => (
            <Chip key={d}>{d}</Chip>
          ))}
        </div>

        <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-hairline px-3 py-2.5">
          <IconLock size={15} stroke={1.8} className="text-ink-2" />
          <span className="text-[11px] leading-snug text-ink">
            Name &amp; face unlock when you both go live.
          </span>
        </div>
      </div>

      <div className="sticky bottom-0 mt-3 bg-cream px-4 pt-2 pb-4">
        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center justify-center gap-1.5 rounded-[14px] bg-coral py-3.5 text-[14px] font-medium text-white transition active:scale-[0.98]"
        >
          <IconBolt size={16} stroke={2} /> Start live moment · 2 min
        </button>
        <div className="mt-2 text-center text-[10px] text-ink-3">
          Both present · guaranteed reply · you talk to the real person
        </div>
      </div>
    </motion.div>
  )
}
