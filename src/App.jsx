import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hand } from '../texas-holdem.js'
import './index.css'

// Placeholder for components I'm about to build
import CardSelector from './components/CardSelector'
import HandDisplay from './components/HandDisplay'
import ResultDisplay from './components/ResultDisplay'

function App() {
  const [holeCards, setHoleCards] = useState([])
  const [communityCards, setCommunityCards] = useState([])

  // Logic Integration
  const result = useMemo(() => {
    if (holeCards.length === 2 && communityCards.length === 5) {
      // Logic requires strings e.g., 'K♠'
      // My card objects will likely be { rank: 'K', suit: '♠' }
      // So I map them to strings
      const holeStrings = holeCards.map(c => `${c.rank}${c.suit}`)
      const commStrings = communityCards.map(c => `${c.rank}${c.suit}`)
      return hand(holeStrings, commStrings)
    }
    return null
  }, [holeCards, communityCards])

  const handleCardSelect = (card) => {
    // Check if card is already selected
    const isHole = holeCards.some(c => c.rank === card.rank && c.suit === card.suit)
    const isComm = communityCards.some(c => c.rank === card.rank && c.suit === card.suit)

    if (isHole) {
      setHoleCards(holeCards.filter(c => c.rank !== card.rank || c.suit !== card.suit))
      return
    }
    if (isComm) {
      setCommunityCards(communityCards.filter(c => c.rank !== card.rank || c.suit !== card.suit))
      return
    }

    // Add logic
    if (holeCards.length < 2) {
      setHoleCards([...holeCards, card])
    } else if (communityCards.length < 5) {
      setCommunityCards([...communityCards, card])
    } else {
      // Full, shake animation trigger?
    }
  }

  const reset = () => {
    setHoleCards([])
    setCommunityCards([])
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl glass-panel p-8"
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter">
            Poker<span className="text-gradient">Analyzer</span>
          </h1>
          <button onClick={reset} className="text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20">
            Reset Table
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-secondary">Your Hand <span className="text-sm opacity-50">({holeCards.length}/2)</span></h2>
              <HandDisplay cards={holeCards} max={2} />
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3 text-secondary">Community Cards <span className="text-sm opacity-50">({communityCards.length}/5)</span></h2>
              <HandDisplay cards={communityCards} max={5} />
            </section>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ResultDisplay result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="glass-panel p-6 bg-black/20">
            <h2 className="text-xl font-semibold mb-4 text-center">Select Cards</h2>
            <CardSelector
              selectedHole={holeCards}
              selectedCommunity={communityCards}
              onSelect={handleCardSelect}
            />
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default App
