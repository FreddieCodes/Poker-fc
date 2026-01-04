// https://www.codewars.com/kata/524c74f855025e2495000262/train/javascript
// Texas Hold'em Hands

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
}

function hand(holeCards, communityCards) {
  // check for valid hole cards
  if (!validateCards(holeCards, validCards) || holeCards.length !== 2) {
    return "holeCards is not valid";
  }
  // check for valid community cards
  if (!validateCards(communityCards, validCards) || communityCards.length !== 5) {
    return "communityCards is not valid";
  }

  const combinedCards = [...holeCards, ...communityCards];
  // create object Array with 2 properties the Rank and the Suit.
  let orderedCards = generateCardObjects(combinedCards);
  // console.log("ordererd Cards: ", orderedCards);

  const type = typeCheck(orderedCards);
  const ranks = ranksCheck(type, orderedCards);

  return {type: type, ranks: ranks};
}

function validateCards(cards, validCards) {
  const seen = new Set();
  return cards.every(card => {
    if (!validCards.includes(card) || seen.has(card)) return false;
    seen.add(card);
    return true;
  });
}

function generateCardObjects(combinedCards) {
  let resArr = [];
  combinedCards.forEach(element => {
    // split suit and rank
    let rank = element.slice(0,-1);
    let suit = element.slice(-1);
    resArr.push({rank, suit});
  });

  // Sort array in rank order
  resArr.sort((cardA, cardB) => {
    return cardRanking[cardB.rank] - cardRanking[cardA.rank];
  });

  return resArr;
}

// TODO
function typeCheck(allCards) {
  // check for straight flush
  if (isStraightFlush(allCards)) {
    return "straight-flush";
  }

  if (isFourOfAKind(allCards)) {
    return "four-of-a-kind";
  }

  if (isFullHouse(allCards)) {
    return "full house";
  }

  if (isFlush(allCards)) {
    return "flush";
  }

  if (isStraight(allCards)) {
    return "straight";
  }

  if (isThreeOfAKind(allCards)) {
    return "three-of-a-kind";
  }

  if(isTwoPair(allCards)) {
    return "two pair";
  }

  if(isPair(allCards)) {
    return "pair"
  }

  return "nothing";
}

// TODO
function ranksCheck(type, allCards) {
  if (type === "nothing") {
    let ranks = [];
    allCards.forEach((card) => {
      ranks.push(card.rank);
    })
    return ranks.slice(0,5)
  }

  if (type === "straight-flush") {
    return isStraightFlush(allCards);
  }

  if (type === "four-of-a-kind") {
    return isFourOfAKind(allCards);
  }

  if (type === "full house") {
    return isFullHouse(allCards);
  }

  if (type === "flush") {
    let ranks = [];
    let flushCards = isFlush(allCards);
    flushCards.forEach((card) => {
      ranks.push(card.rank);
    })
    return ranks;
  }

  if (type === "straight") {
    return isStraight(allCards);
  }

  if (type === "three-of-a-kind") {
    return isThreeOfAKind(allCards);
    // return tupleFinder(3,allCards);
  }

  if (type === "two pair") {
    return isTwoPair(allCards);
  }

   if (type === "pair") {
     return isPair(allCards);
   }
}

function countByKey(arr, key) {
  const counts = {};
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i][key];
    counts[val] = (counts[val] || 0) + 1;
  }
  return counts;
}

function isStraightFlush(allCards) {
  const flushCards = isFlush(allCards);
  // check for flush
  if (!flushCards) return;
  // check for straight with the same suit
  if (!isStraight(flushCards)) return;
  // get rank
  let ranks = flushCards.map((card) => {
    return card.rank;
  })

  return ranks;
}

const byDescRank = (a, b) => cardRanking[b.rank] - cardRanking[a.rank];

function isFourOfAKind(allCards) {
  return tupleFinder(4, allCards);
}

// for finding tuples
function tupleFinder(tupleType, allCards) {
  const countObj = countByKey(allCards, 'rank');
  const numberOfKickers = 5 - tupleType;

  for (const rank in countObj) {
    if (countObj[rank] === tupleType) {
      const tupleCards = allCards.filter(c => c.rank === rank);
       // get kicker by getting other cards and sorting by card rank
      const kicker = allCards.filter(c => c.rank !== rank).sort(byDescRank);
      // console.log(kicker);
      const ranks = kicker.slice(0, numberOfKickers).map(card => card.rank)
      
      return [tupleCards[0].rank, ...ranks];
    }
  }
  return false;
}


function isFullHouse(allCards) {
  // find a 3 of a kind
  const hasThreeOfAKind = tupleFinder(3,allCards);
  // if no 3 of a kind then return
  if (!hasThreeOfAKind ) return; 
  // with the remaining cards find a pair
  const remainingCards = allCards.filter((x)=> {
    return x.rank !== hasThreeOfAKind[0];
  })

  const hasPair = tupleFinder(2,remainingCards);
  if (!hasPair) return;

  return [hasThreeOfAKind[0], hasPair[0]];
}

function isFlush(allCards) {
  const countObj = countByKey(allCards, 'suit');
  for (const suit in countObj) {
    let element = countObj[suit]
    if (countObj[suit] >= 5) {
      const suitedCards = allCards.filter(c => c.suit === suit);

      // sort by card rank
      suitedCards.sort((a, b) => cardRanking[b.rank] - cardRanking[a.rank]);

      return suitedCards.slice(0, 5); // return the 5 highest rank cards 
    }
  }
  return false;
}

function isStraight(allCards) {
  const rankOrder = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'];

  // Put the ranks we actually hold into a Set (duplicates collapse automatically).
  const have = new Set(allCards.map(c => c.rank));

  // Walk the ordered list and look at every five-card window.
  for (let i = 0; i <= rankOrder.length - 5; i++) {
    const window = rankOrder.slice(i, i + 5);
    if (window.every(r => have.has(r))) {
      return window;
    }
  }
  // Special case: 5-4-3-2-A “wheel” (ace low)
  const wheel = ['5', '4', '3', '2', 'A'];
  if (wheel.every(r => have.has(r))) {
    return wheel;
  }
  
  return false;  
}

function isThreeOfAKind(allCards) {
  return tupleFinder(3, allCards);
}

function isTwoPair(allCards) {
  const hasPair = isPair(allCards);

  if (!hasPair) return;
  // with the remaining cards find a pair
  const remainingCards = allCards.filter((x) => {
    return x.rank !== hasPair[0];
  });

  const hasSecondPair = tupleFinder(2, remainingCards);

  if (!hasSecondPair) return;
  // return the first pair, the second pair and 1 kicker
  return [hasPair[0], ...hasSecondPair.slice(0, 2)];
}

function isPair(allCards) {
  return tupleFinder(2, allCards);
}

export {
  hand,
  isStraight
};
