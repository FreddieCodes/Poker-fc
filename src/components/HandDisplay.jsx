import Card from './Card'

export default function HandDisplay({ cards, max }) {
  const placeholders = Array(max).fill(null)

  return (
    <div className="flex gap-3 justify-start overflow-x-auto pb-4 custom-scrollbar">
      {placeholders.map((_, i) => {
        const card = cards[i]

        if (card) {
          return (
            <Card
              key={`${card.rank}-${card.suit}`}
              rank={card.rank}
              suit={card.suit}
              selected={false}
              className="border-primary/50"
            />
          )
        }

        return (
          <div
            key={i}
            className="w-14 h-20 sm:w-16 sm:h-24 rounded-lg border-2 border-dashed border-slate-700 bg-slate-800/20 flex items-center justify-center"
          >
            <span className="text-slate-600 text-xs font-semibold">Empty</span>
          </div>
        )
      })}
    </div>
  )
}
