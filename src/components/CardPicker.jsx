import React from 'react';
import { formatCard } from './Card';

const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = [
  { symbol: '♠', name: 'Spades', color: 'black' },
  { symbol: '♥', name: 'Hearts', color: 'red' },
  { symbol: '♦', name: 'Diamonds', color: 'red' },
  { symbol: '♣', name: 'Clubs', color: 'black' },
];

const CardPicker = ({ onSelect, onClose, usedCards = [] }) => {
  const usedSet = new Set(usedCards);

  const handleCardClick = (rank, suit) => {
    const card = formatCard(rank, suit);
    if (!usedSet.has(card)) {
      onSelect(card);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="picker-overlay" onClick={handleOverlayClick}>
      <div className="picker-modal">
        <div className="picker-header">
          <h2 className="picker-title">Select a Card</h2>
          <button className="picker-close" onClick={onClose}>×</button>
        </div>

        {SUITS.map((suit) => (
          <div key={suit.symbol} className="picker-suit-section">
            <div className={`picker-suit-label ${suit.color}`}>
              <span>{suit.symbol}</span>
              <span>{suit.name}</span>
            </div>
            <div className="picker-cards-grid">
              {RANKS.map((rank) => {
                const card = formatCard(rank, suit.symbol);
                const isUsed = usedSet.has(card);

                return (
                  <div
                    key={card}
                    className={`picker-card ${suit.color} ${isUsed ? 'disabled' : ''}`}
                    onClick={() => handleCardClick(rank, suit.symbol)}
                  >
                    <span>{rank}</span>
                    <span>{suit.symbol}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPicker;
