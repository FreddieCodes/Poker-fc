import React from 'react';

// Utility to determine if a suit is red
const isRedSuit = (suit) => suit === '♥' || suit === '♦';

// Parse a card string like "K♠" into { rank, suit }
export const parseCard = (cardStr) => {
  if (!cardStr) return null;
  const suit = cardStr.slice(-1);
  const rank = cardStr.slice(0, -1);
  return { rank, suit };
};

// Format a card object back to string
export const formatCard = (rank, suit) => `${rank}${suit}`;

const Card = ({ card, onClick, selected = false, className = '' }) => {
  const parsed = typeof card === 'string' ? parseCard(card) : card;

  if (!parsed) {
    return (
      <div className={`card-slot ${className}`} onClick={onClick}>
        <span className="card-slot-icon">+</span>
      </div>
    );
  }

  const { rank, suit } = parsed;
  const colorClass = isRedSuit(suit) ? 'red' : 'black';

  return (
    <div
      className={`card ${colorClass} ${selected ? 'selected' : ''} ${className}`}
      onClick={onClick}
    >
      <span className="card-rank">{rank}</span>
      <span className="card-suit">{suit}</span>
    </div>
  );
};

export default Card;
