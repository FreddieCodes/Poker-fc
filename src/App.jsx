import React, { useState, useMemo } from 'react';
import Card from './components/Card';
import CardPicker from './components/CardPicker';
import ResultPanel from './components/ResultPanel';
import { evaluateHand } from './pokerLogic';

function App() {
  // Hole cards (2 player cards)
  const [holeCards, setHoleCards] = useState([null, null]);

  // Community cards (3-5 cards on the table)
  const [communityCards, setCommunityCards] = useState([null, null, null, null, null]);

  // Card picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(null); // { type: 'hole'|'community', index: number }

  // Get all used cards
  const usedCards = useMemo(() => {
    return [...holeCards, ...communityCards].filter(Boolean);
  }, [holeCards, communityCards]);

  // Evaluate current hand
  const handResult = useMemo(() => {
    const validHole = holeCards.filter(Boolean);
    const validCommunity = communityCards.filter(Boolean);

    if (validHole.length === 2 && validCommunity.length >= 3) {
      return evaluateHand(holeCards, communityCards);
    }
    return null;
  }, [holeCards, communityCards]);

  // Open card picker
  const openPicker = (type, index) => {
    setPickerTarget({ type, index });
    setPickerOpen(true);
  };

  // Handle card selection from picker
  const handleCardSelect = (card) => {
    if (!pickerTarget) return;

    if (pickerTarget.type === 'hole') {
      const newHole = [...holeCards];
      newHole[pickerTarget.index] = card;
      setHoleCards(newHole);
    } else {
      const newCommunity = [...communityCards];
      newCommunity[pickerTarget.index] = card;
      setCommunityCards(newCommunity);
    }

    setPickerOpen(false);
    setPickerTarget(null);
  };

  // Clear a card
  const clearCard = (type, index) => {
    if (type === 'hole') {
      const newHole = [...holeCards];
      newHole[index] = null;
      setHoleCards(newHole);
    } else {
      const newCommunity = [...communityCards];
      newCommunity[index] = null;
      setCommunityCards(newCommunity);
    }
  };

  // Reset all cards
  const resetAll = () => {
    setHoleCards([null, null]);
    setCommunityCards([null, null, null, null, null]);
  };

  // Get number of community cards shown (at least 3, up to 5)
  const visibleCommunitySlots = Math.max(
    3,
    communityCards.filter(Boolean).length + 1,
    5
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Poker Hand Evaluator</h1>
        <p className="app-subtitle">Select your cards to see your best hand</p>
      </header>

      <main className="poker-table">
        {/* Your Hand (Hole Cards) */}
        <section className="hand-section">
          <div className="section-label">Your Hand</div>
          <div className="cards-row">
            {holeCards.map((card, index) => (
              <Card
                key={`hole-${index}`}
                card={card}
                onClick={() => card ? clearCard('hole', index) : openPicker('hole', index)}
                className={card ? 'card-flip' : ''}
              />
            ))}
          </div>
        </section>

        {/* Community Cards */}
        <section className="hand-section">
          <div className="section-label">Community Cards</div>
          <div className="cards-row">
            {communityCards.slice(0, 5).map((card, index) => (
              <Card
                key={`community-${index}`}
                card={card}
                onClick={() => card ? clearCard('community', index) : openPicker('community', index)}
                className={card ? 'card-flip' : ''}
              />
            ))}
          </div>
        </section>

        {/* Result */}
        <ResultPanel
          result={handResult}
          holeCards={holeCards}
          communityCards={communityCards}
        />

        {/* Clear Button */}
        {usedCards.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <button className="clear-btn" onClick={resetAll}>
              Clear All Cards
            </button>
          </div>
        )}
      </main>

      {/* Card Picker Modal */}
      {pickerOpen && (
        <CardPicker
          onSelect={handleCardSelect}
          onClose={() => {
            setPickerOpen(false);
            setPickerTarget(null);
          }}
          usedCards={usedCards}
        />
      )}
    </div>
  );
}

export default App;
