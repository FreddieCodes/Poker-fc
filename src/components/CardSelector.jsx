import Card from './Card'

const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const SUITS = ['♦', '♣', '♥', '♠']

export default function CardSelector({ selectedHole, selectedCommunity, onSelect }) {
  const allAvailableCards = []

  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      allAvailableCards.push({ rank, suit })
    })
  })

  // Group by suit for better layout? Or just grid?
  // User asked for user friendly. A big grid might be overwhelming but standard.
  // Organizing by suit rows is cleaner.

  return (
    <div className="space-y-6">
      {SUITS.map(suit => (
        <div key={suit} className="flex flex-wrap gap-2 justify-center">
          {RANKS.map(rank => {
            const isSelectedHole = selectedHole.some(c => c.rank === rank && c.suit === suit)
            const isSelectedComm = selectedCommunity.some(c => c.rank === rank && c.suit === suit)
            const isSelected = isSelectedHole || isSelectedComm

            return (
              <Card
                key={`${rank}${suit}`}
                rank={rank}
                suit={suit}
                selected={isSelected}
                disabled={false} // Maybe disable if max reached but not this card?
                // Let App handle validation logic (shake etc)
                onClick={() => onSelect({ rank, suit })}
                className="w-10 h-14 sm:w-12 sm:h-16 text-sm"
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
