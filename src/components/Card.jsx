import { motion } from 'framer-motion'
import clsx from 'clsx'

const SUIT_COLORS = {
  '♦': 'text-red-500',
  '♥': 'text-red-500',
  '♣': 'text-slate-200',
  '♠': 'text-slate-200'
}

export default function Card({ rank, suit, selected, disabled, onClick, className }) {
  return (
    <motion.div

      onClick={!disabled ? onClick : undefined}
      className={clsx(
        "relative rounded-lg w-14 h-20 sm:w-16 sm:h-24 flex items-center justify-center border-2 cursor-pointer select-none transition-colors",
        "bg-white dark:bg-[#1e293b]", // Card background
        selected
          ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-bg-dark shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          : "border-slate-700 hover:border-slate-500",
        disabled && "opacity-20 cursor-not-allowed grayscale",
        className
      )}
    >
      <div className={clsx("flex flex-col items-center leading-none", SUIT_COLORS[suit])}>
        <span className="text-xl sm:text-2xl font-bold">{rank}</span>
        <span className="text-2xl sm:text-3xl">{suit}</span>
      </div>
    </motion.div>
  )
}
