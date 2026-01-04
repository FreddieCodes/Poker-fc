// Poker Hand Evaluator - ES Module version
// Adapted from texas-holdem.js for use with React/Vite

const validCards = [
  'A♦','A♣','A♥','A♠',
  'K♦','K♣','K♥','K♠',
  'Q♦','Q♣','Q♥','Q♠',
  'J♦','J♣','J♥','J♠',
  '10♦','10♣','10♥','10♠',
  '9♦','9♣','9♥','9♠',
  '8♦','8♣','8♥','8♠',
  '7♦','7♣','7♥','7♠',
  '6♦','6♣','6♥','6♠',
  '5♦','5♣','5♥','5♠',
  '4♦','4♣','4♥','4♠',
  '3♦','3♣','3♥','3♠',
  '2♦','2♣','2♥','2♠'
];

const cardRanking = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  '10': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2
};

function validateCards(cards, validCardsList) {
  const seen = new Set();
  return cards.every(card => {
    if (!validCardsList.includes(card) || seen.has(card)) return false;
    seen.add(card);
    return true;
  });
}

function generateCardObjects(combinedCards) {
  let resArr = [];
  combinedCards.forEach(element => {
    let rank = element.slice(0,-1);
    let suit = element.slice(-1);
    resArr.push({rank, suit});
  });

  resArr.sort((cardA, cardB) => {
    return cardRanking[cardB.rank] - cardRanking[cardA.rank];
  });

  return resArr;
}

function countByKey(arr, key) {
  const counts = {};
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i][key];
    counts[val] = (counts[val] || 0) + 1;
  }
  return counts;
}

const byDescRank = (a, b) => cardRanking[b.rank] - cardRanking[a.rank];

function tupleFinder(tupleType, allCards) {
  const countObj = countByKey(allCards, 'rank');
  const numberOfKickers = 5 - tupleType;

  for (const rank in countObj) {
    if (countObj[rank] === tupleType) {
      const tupleCards = allCards.filter(c => c.rank === rank);
      const kicker = allCards.filter(c => c.rank !== rank).sort(byDescRank);
      const ranks = kicker.slice(0, numberOfKickers).map(card => card.rank);
      return [tupleCards[0].rank, ...ranks];
    }
  }
  return false;
}

function isFlush(allCards) {
  const countObj = countByKey(allCards, 'suit');
  for (const suit in countObj) {
    if (countObj[suit] >= 5) {
      const suitedCards = allCards.filter(c => c.suit === suit);
      suitedCards.sort((a, b) => cardRanking[b.rank] - cardRanking[a.rank]);
      return suitedCards.slice(0, 5);
    }
  }
  return false;
}

function isStraight(allCards) {
  const rankOrder = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'];
  const have = new Set(allCards.map(c => c.rank));

  for (let i = 0; i <= rankOrder.length - 5; i++) {
    const window = rankOrder.slice(i, i + 5);
    if (window.every(r => have.has(r))) {
      return window;
    }
  }
  
  const wheel = ['5', '4', '3', '2', 'A'];
  if (wheel.every(r => have.has(r))) {
    return wheel;
  }
  
  return false;
}

function isStraightFlush(allCards) {
  const flushCards = isFlush(allCards);
  if (!flushCards) return;
  if (!isStraight(flushCards)) return;
  
  let ranks = flushCards.map((card) => card.rank);
  return ranks;
}

function isFourOfAKind(allCards) {
  return tupleFinder(4, allCards);
}

function isFullHouse(allCards) {
  const hasThreeOfAKind = tupleFinder(3, allCards);
  if (!hasThreeOfAKind) return;
  
  const remainingCards = allCards.filter((x) => x.rank !== hasThreeOfAKind[0]);
  const hasPair = tupleFinder(2, remainingCards);
  if (!hasPair) return;

  return [hasThreeOfAKind[0], hasPair[0]];
}

function isThreeOfAKind(allCards) {
  return tupleFinder(3, allCards);
}

function isTwoPair(allCards) {
  const hasPair = isPair(allCards);
  if (!hasPair) return;
  
  const remainingCards = allCards.filter((x) => x.rank !== hasPair[0]);
  const hasSecondPair = tupleFinder(2, remainingCards);
  if (!hasSecondPair) return;
  
  return [hasPair[0], ...hasSecondPair.slice(0, 2)];
}

function isPair(allCards) {
  return tupleFinder(2, allCards);
}

function typeCheck(allCards) {
  if (isStraightFlush(allCards)) return "straight-flush";
  if (isFourOfAKind(allCards)) return "four-of-a-kind";
  if (isFullHouse(allCards)) return "full house";
  if (isFlush(allCards)) return "flush";
  if (isStraight(allCards)) return "straight";
  if (isThreeOfAKind(allCards)) return "three-of-a-kind";
  if (isTwoPair(allCards)) return "two pair";
  if (isPair(allCards)) return "pair";
  return "nothing";
}

function ranksCheck(type, allCards) {
  if (type === "nothing") {
    let ranks = allCards.map(card => card.rank);
    return ranks.slice(0, 5);
  }
  if (type === "straight-flush") return isStraightFlush(allCards);
  if (type === "four-of-a-kind") return isFourOfAKind(allCards);
  if (type === "full house") return isFullHouse(allCards);
  if (type === "flush") {
    let flushCards = isFlush(allCards);
    return flushCards.map(card => card.rank);
  }
  if (type === "straight") return isStraight(allCards);
  if (type === "three-of-a-kind") return isThreeOfAKind(allCards);
  if (type === "two pair") return isTwoPair(allCards);
  if (type === "pair") return isPair(allCards);
}

/**
 * Evaluate a poker hand with flexible community card count (3-5 cards)
 * @param {string[]} holeCards - Array of 2 hole cards
 * @param {string[]} communityCards - Array of 3-5 community cards
 * @returns {{ type: string, ranks: string[] } | string} Hand result or error message
 */
export function evaluateHand(holeCards, communityCards) {
  // Filter out empty/null cards
  const validHole = holeCards.filter(Boolean);
  const validCommunity = communityCards.filter(Boolean);
  
  // Validate hole cards
  if (validHole.length !== 2) {
    return "Select exactly 2 hole cards";
  }
  if (!validateCards(validHole, validCards)) {
    return "Invalid hole cards";
  }
  
  // Validate community cards (3-5)
  if (validCommunity.length < 3) {
    return "Select at least 3 community cards";
  }
  if (validCommunity.length > 5) {
    return "Maximum 5 community cards";
  }
  if (!validateCards(validCommunity, validCards)) {
    return "Invalid community cards";
  }
  
  // Check for duplicates
  const allCards = [...validHole, ...validCommunity];
  const uniqueCards = new Set(allCards);
  if (uniqueCards.size !== allCards.length) {
    return "Duplicate cards detected";
  }
  
  const orderedCards = generateCardObjects(allCards);
  const type = typeCheck(orderedCards);
  const ranks = ranksCheck(type, orderedCards);
  
  return { type, ranks };
}

export { validCards };
