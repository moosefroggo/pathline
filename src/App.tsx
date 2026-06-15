import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconLeaf } from '@tabler/icons-react'
import { PhoneFrame } from './components/PhoneFrame'
import { PushScreen } from './screens/PushScreen'
import { BoardScreen } from './screens/BoardScreen'
import { BriefScreen } from './screens/BriefScreen'
import { GoLiveScreen } from './screens/GoLiveScreen'
import { LiveScreen } from './screens/LiveScreen'
import { BookedScreen } from './screens/BookedScreen'
import { candidates, type Candidate } from './data'
import { screenTransition } from './lib/motion'

type Screen = 'push' | 'board' | 'brief' | 'golive' | 'live' | 'booked'

export default function App() {
  const [screen, setScreen] = useState<Screen>('push')
  const [selected, setSelected] = useState<Candidate>(candidates[0])

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-7 px-4 py-10">
      <nav aria-label="Switch view" className="pl-glass-pill fixed top-5 right-5 z-30 flex items-center gap-1 rounded-full p-1 text-caption font-medium">
        <span className="rounded-full bg-live-200/15 px-3 py-1.5 text-live-700">App</span>
        <a className="rounded-full px-3 py-1.5 text-ink-3 transition hover:text-ink" href="/deck.html">
          Deck
        </a>
      </nav>

      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <span className="pl-glass-soft flex h-6 w-6 items-center justify-center rounded-[7px] text-live-700">
            <IconLeaf size={15} stroke={2} />
          </span>
          <span className="font-serif text-[20px] font-medium text-ink">Pathline</span>
        </div>
        <div className="text-label text-ink-3">
          Pathline - recruiter demo
        </div>
      </div>

      <PhoneFrame tone={screen === 'live' ? 'dark' : 'light'}>
        <AnimatePresence initial={false}>
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.997 }}
            transition={screenTransition}
            className="flex min-h-0 flex-1 flex-col"
          >
            {screen === 'push' && <PushScreen onOpen={() => setScreen('board')} />}
            {screen === 'board' && (
              <BoardScreen
                onSelect={(c) => {
                  setSelected(c)
                  setScreen('brief')
                }}
              />
            )}
            {screen === 'brief' && (
              <BriefScreen
                c={selected}
                onBack={() => setScreen('board')}
                onStart={() => setScreen('golive')}
              />
            )}
            {screen === 'golive' && (
              <GoLiveScreen
                c={selected}
                onStart={() => setScreen('live')}
                onBack={() => setScreen('brief')}
              />
            )}
            {screen === 'live' && (
              <LiveScreen
                c={selected}
                onBook={() => setScreen('booked')}
                onEnd={() => setScreen('board')}
              />
            )}
            {screen === 'booked' && (
              <BookedScreen
                c={selected}
                onRestart={() => {
                  setSelected(candidates[0])
                  setScreen('push')
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </PhoneFrame>

      <div className="text-caption text-ink-3">Tap the notification to begin</div>
    </div>
  )
}
