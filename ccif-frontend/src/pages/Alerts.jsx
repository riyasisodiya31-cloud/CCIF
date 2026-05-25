import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAlerts } from "../services/alertService";

const severityColor = {
  Critical: 'border-red-500/40 text-red-400 bg-red-500/10',
  High:     'border-orange-500/40 text-orange-400 bg-orange-500/10',
  Medium:   'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
}

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts().then(setAlerts);
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm">Live Intelligence</p>
        <h1 className="text-5xl font-bold mt-2">Threat Alerts</h1>
      </div>

      <div className="space-y-6">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-3xl bg-white/5 border border-red-500/20 backdrop-blur-xl p-6"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-xl">{alert.title}</h2>
                <p className="text-zinc-400 mt-2">📍 {alert.location} · {alert.time}</p>
                <div className="mt-3 text-sm text-cyan-400">Signal strength: {alert.signal}%</div>
              </div>
              <div className={`px-3 py-2 rounded-full border text-sm shrink-0 ${severityColor[alert.severity] || 'border-zinc-500/40 text-zinc-400'}`}>
                {alert.severity}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
