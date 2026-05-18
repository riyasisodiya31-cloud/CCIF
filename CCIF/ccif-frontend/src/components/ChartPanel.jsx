import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function ChartPanel({ title, type, data, options }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#d4d4d8', boxWidth: 10 } }
        },
        scales: type === 'doughnut' ? undefined : {
          x: { ticks: { color: '#a1a1aa' }, grid: { color: 'rgba(255,255,255,0.06)' } },
          y: { ticks: { color: '#a1a1aa' }, grid: { color: 'rgba(255,255,255,0.06)' } }
        },
        ...options
      }
    })
    return () => chart.destroy()
  }, [data, options, type])

  return (
    <div className="glass rounded-lg p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase text-zinc-300">{title}</h3>
      <div className="h-64">
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
