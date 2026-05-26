import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getSuspects } from "../services/suspectService";

export default function Suspects() {
  const [suspects, setSuspects] = useState([]);

  useEffect(() => {
    getSuspects().then(setSuspects);
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <p className="text-cyan-400 text-sm uppercase tracking-[0.3em]">Intelligence Fabric</p>
        <h1 className="text-5xl font-bold mt-2">Suspect Network</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {suspects.map((suspect, index) => (
          <Link key={suspect.id} to={`/suspects/${suspect.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl bg-white/5 border border-cyan-500/20 backdrop-blur-xl p-6 cursor-pointer hover:border-cyan-400/40 transition-colors"
            >
              <p className="text-zinc-500">{suspect.id}</p>
              <h2 className="text-2xl mt-2">{suspect.name}</h2>
              <p className="text-zinc-400 mt-3">Gang: {suspect.gang}</p>
              <div className="mt-4 text-cyan-400">Risk: {suspect.risk}</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
