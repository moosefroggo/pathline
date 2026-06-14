import { motion, type Variants } from 'framer-motion'
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

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 340, damping: 30 } },
}

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
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 340, damping: 34 }}
      className="flex flex-1 flex-col"
    >
      <div className="px-4 pt-2.5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-0.5 text-body text-ink-2"
        >
          <IconChevronLeft size={16} stroke={1.8} /> Moments
        </button>

        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mt-2.5 flex items-center gap-2.5">
            <Avatar locked size="md" />
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 text-headline font-medium text-ink">
                {c.anonRole}
                <IconLock size={12} stroke={1.8} className="text-ink-3" />
              </div>
              <div className="flex items-center gap-1.5 text-caption text-live-700">
                <LiveDot /> Active now · replies in {c.repliesIn}
              </div>
            </div>
          </motion.div>

          {/* Verified — the protagonist: stronger container + larger items */}
          <motion.div variants={item}>
            <SectionLabel icon={<IconRosetteDiscountCheck size={14} className="text-live-700" />}>
              Verified
            </SectionLabel>
            <div className="rounded-xl border border-hairline-strong bg-surface px-3 py-1">
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
          </motion.div>

          <motion.div variants={item}>
            <SectionLabel icon={<IconQuote size={14} className="text-iris" />}>
              Vouched by peers
            </SectionLabel>
            <div className="rounded-xl bg-surface px-3 py-2.5">
              <div className="text-label leading-snug text-iris-900">{c.vouch.quote}</div>
              <div className="mt-1.5 text-caption text-ink-3">
                — {c.vouch.by} · <span className="text-live-700">verified</span>
                {c.vouch.more > 0 ? ` · +${c.vouch.more} more` : ''}
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <SectionLabel icon={<IconBolt size={14} className="text-amber-700" />}>
              Track record
            </SectionLabel>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { v: c.track.reply, l: 'avg reply' },
                { v: c.track.showed, l: 'showed up' },
                { v: c.track.onsite, l: '→ onsite' },
              ].map((t) => (
                <div key={t.l} className="rounded-xl bg-surface px-1 py-2 text-center">
                  <div className="text-subhead font-medium text-ink">{t.v}</div>
                  <div className="text-micro text-ink-3">{t.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item}>
            <SectionLabel icon={<IconTarget size={14} className="text-iris" />}>Declared</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {c.declared.map((d) => (
                <Chip key={d}>{d}</Chip>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-3.5 flex items-center gap-2 rounded-xl bg-hairline px-3 py-2.5"
          >
            <IconLock size={15} stroke={1.8} className="text-ink-2" />
            <span className="text-caption leading-snug text-ink">
              Name &amp; face unlock when you both go live.
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="sticky bottom-0 mt-3 bg-cream px-4 pt-2 pb-4">
        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center justify-center gap-1.5 rounded-[14px] bg-coral py-3.5 text-subhead font-medium text-white transition active:scale-[0.98]"
        >
          <IconBolt size={16} stroke={2} /> Start live moment · 2 min
        </button>
        <div className="mt-2 text-center text-micro text-ink-3">
          Both present · guaranteed reply
        </div>
      </div>
    </motion.div>
  )
}
