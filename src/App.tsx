import { useState } from 'react'
import { IconLeaf } from '@tabler/icons-react'
import { PhoneFrame } from './components/PhoneFrame'
import { PushScreen } from './screens/PushScreen'
import { BoardScreen } from './screens/BoardScreen'
import { BriefScreen } from './screens/BriefScreen'
import { GoLiveScreen } from './screens/GoLiveScreen'
import { LiveScreen } from './screens/LiveScreen'
import { BookedScreen } from './screens/BookedScreen'
import { candidates, type Candidate } from './data'

type Screen = 'push' | 'board' | 'brief' | 'golive' | 'live' | 'booked'

export default function App() {
  const [screen, setScreen] = useState<Screen>('push')
  const [selected, setSelected] = useState<Candidate>(candidates[0])

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-7 px-4 py-10">
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-coral text-white">
            <IconLeaf size={15} stroke={2} />
          </span>
          <span className="text-[18px] font-medium text-ink">Pathline</span>
        </div>
        <div className="text-[12px] text-ink-3">
          Hiring, in the moment — a recruiter-side prototype
        </div>
      </div>

      <PhoneFrame tone={screen === 'live' ? 'dark' : 'light'}>
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
      </PhoneFrame>

      <div className="text-[11px] text-ink-4">Tap the notification to begin</div>
    </div>
  )
}
