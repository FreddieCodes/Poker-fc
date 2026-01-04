import React from 'react';
import { parseCard } from './Card';

// Map hand types to display names
const HAND_TYPE_DISPLAY = {
  'straight-flush': 'Straight Flush',
  'four-of-a-kind': 'Four of a Kind',
  'full house': 'Full House',
  'flush': 'Flush',
  'straight': 'Straight',
  'three-of-a-kind': 'Three of a Kind',
  'two pair': 'Two Pair',
  'pair': 'Pair',
  'nothing': 'High Card',
};

// Emoji for hand types
const HAND_EMOJI = {
  'straight-flush': '🔥',
  'four-of-a-kind': '💎',
  'full house': '🏠',
  'flush': '💧',
  'straight': '📈',
  'three-of-a-kind': '🎯',
  'two pair': '✌️',
  'pair': '👯',
  'nothing': '👋',
};

const isRedSuit = (card) => {
  if (!card) return false;
  const suit = card.slice(-1);
  return suit === '♥' || suit === '♦';
};

const ResultPanel = ({ result, holeCards, communityCards }) => {
  const hasEnoughCards = holeCards.filter(Boolean).length === 2 &&
    communityCards.filter(Boolean).length >= 3;

  if (!hasEnoughCards) {
    return (
      <div className="result-panel">
        <div className="result-label">Your Best Hand</div>
        <div className="result-placeholder">
          Select your 2 hole cards and at least 3 community cards
        </div>
      </div>
    );
  }

  if (!result || typeof result === 'string') {
    return (
      <div className="result-panel">
        <div className="result-label">Your Best Hand</div>
        <div className="result-placeholder">
          {result || 'Unable to evaluate hand'}
        </div>
      </div>
    );
  }

  const { type, ranks } = result;
  const displayName = HAND_TYPE_DISPLAY[type] || type;
  const emoji = HAND_EMOJI[type] || '';

  return (
    <div className="result-panel" key={type + ranks?.join('')}>
      <div className="result-label">Your Best Hand</div>
      <div className="result-hand-type">
        {emoji} {displayName} {emoji}
      </div>
      {ranks && ranks.length > 0 && (
        <div className="result-cards">
          {ranks.map((rank, index) => (
            <span key={index} className="result-card">
              {rank}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultPanel;
