import { motion } from 'framer-motion'

export default function ResultDisplay({ result }) {
  return (
    <div className="relative mt-8 p-1 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="bg-slate-900 rounded-2xl p-6 text-center shadow-2xl">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Best Hand</h3>
        <motion.div
          key={result.type}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400"
        >
          {result.type}
        </motion.div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {result.ranks.map((r, i) => (
            <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
