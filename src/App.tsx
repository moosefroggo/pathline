import { useEffect, useState } from 'react'
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
import { screenStackVariants, screenTransition } from './lib/motion'

type Screen = 'push' | 'board' | 'brief' | 'golive' | 'live' | 'booked'

const screenOrder: Record<Screen, number> = {
  push: 0,
  board: 1,
  brief: 2,
  golive: 3,
  live: 4,
  booked: 5,
}

/**
 * The deck embeds the real prototype via <iframe src="/?embed=1">, so the slide
 * shows this exact app rather than a hand-drawn copy. `embed` strips the page
 * chrome down to the bare phone; `screen` deep-links the starting screen.
 */
const params = new URLSearchParams(window.location.search)
const isEmbed = params.has('embed')
const initialScreen: Screen =
  params.get('screen') && params.get('screen')! in screenOrder
    ? (params.get('screen') as Screen)
    : 'push'

export default function App() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [direction, setDirection] = useState(1)
  const [selected, setSelected] = useState<Candidate>(candidates[0])

  // Let the phone sit flush on the deck's dark glass — no app page background.
  useEffect(() => {
    if (!isEmbed) return
    document.documentElement.classList.add('pl-embed')
    return () => document.documentElement.classList.remove('pl-embed')
  }, [])

  function go(nextScreen: Screen) {
    setDirection(screenOrder[nextScreen] >= screenOrder[screen] ? 1 : -1)
    setScreen(nextScreen)
  }

  const phone = (
    <PhoneFrame tone={screen === 'live' ? 'dark' : 'light'}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={screen}
          custom={direction}
          variants={screenStackVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={screenTransition}
          className="absolute inset-0 flex min-h-0 flex-col shadow-[-14px_0_34px_rgba(0,0,0,0.26)]"
        >
          {screen === 'push' && <PushScreen onOpen={() => go('board')} />}
            {screen === 'board' && (
              <BoardScreen
                onSelect={(c) => {
                  setSelected(c)
                  go('brief')
                }}
              />
            )}
            {screen === 'brief' && (
              <BriefScreen
                c={selected}
                onBack={() => go('board')}
                onStart={() => go('golive')}
              />
            )}
            {screen === 'golive' && (
              <GoLiveScreen
                c={selected}
                onStart={() => go('live')}
                onBack={() => go('brief')}
              />
            )}
            {screen === 'live' && (
              <LiveScreen
                c={selected}
                onBook={() => go('booked')}
                onEnd={() => go('board')}
              />
            )}
            {screen === 'booked' && (
              <BookedScreen
                c={selected}
                onRestart={() => {
                  setSelected(candidates[0])
                  go('push')
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </PhoneFrame>
  )

  if (isEmbed) {
    return <div className="flex min-h-full items-center justify-center">{phone}</div>
  }

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

      {phone}
    </div>
  )
}
