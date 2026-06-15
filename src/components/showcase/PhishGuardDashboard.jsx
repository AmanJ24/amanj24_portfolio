import { motion } from 'framer-motion'

export default function PhishGuardDashboard() {
  const stats = [
    { value: '247', label: 'Sent', color: '#8C8378' },
    { value: '61%', label: 'Opened', color: '#E6DDD0' },
    { value: '23%', label: 'Clicked', color: '#BFA98A' },
    { value: '8%', label: 'Creds', color: '#FF5F56' },
  ]

  const chartData = [25, 45, 30, 65, 80, 50, 60, 40, 55, 70, 90, 45]

  const events = [
    { text: 'user18@acme.com submitted credentials', time: '2 min ago', type: 'creds' },
    { text: 'user04@acme.com clicked campaign link', time: '5 min ago', type: 'clicked' },
    { text: 'user99@acme.com opened simulation email', time: '8 min ago', type: 'opened' },
  ]

  return (
    <div className="w-full p-4 font-mono select-none">
      <div className="w-full max-w-xl mx-auto bg-surface border border-border rounded-md shadow-2xl overflow-hidden text-left">
        {/* Mock Window Top Bar */}
        <div className="bg-[#1C1A17] border-b border-border/40 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-text font-bold uppercase tracking-wider">PhishGuard OS</span>
            <span className="font-mono text-[8px] text-muted bg-surface2 border border-border/40 px-2 py-0.5 rounded">Acme Corp ▾</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
            </span>
            <span className="font-mono text-[8px] text-sage tracking-widest uppercase">CAMPAIGN ACTIVE</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-5 space-y-6">
          {/* Header section */}
          <div className="flex justify-between items-baseline border-b border-border/20 pb-3">
            <h4 className="font-display text-sm text-text tracking-tight font-light">Q2 Phishing Assessment</h4>
            <span className="font-mono text-[8px] text-muted/50">(illustrative data)</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <div key={i} className="bg-bg/40 border border-border/30 p-3 rounded text-center">
                <span className="block font-mono text-[8px] text-muted/60 uppercase tracking-widest mb-1.5">{stat.label}</span>
                <span className="font-mono text-base md:text-lg font-bold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Mini CSS Bar Chart */}
          <div className="space-y-2.5">
            <span className="font-mono text-[8px] text-muted uppercase tracking-widest">Click Rate Trend (hourly)</span>
            <div className="h-16 w-full flex items-end gap-1.5 border-b border-border/20 pb-1 pt-2 bg-bg/20 rounded px-3">
              {chartData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  <motion.div
                    className="w-full rounded-t-sm"
                    style={{ backgroundColor: '#BFA98A', opacity: 0.2 + (val / 100) * 0.8 }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.04, ease: 'easeOut' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Simulation Events */}
          <div className="space-y-2">
            <span className="font-mono text-[8px] text-muted uppercase tracking-widest">Live Telemetry Feed</span>
            <div className="space-y-1.5 text-[9px] bg-bg/40 border border-border/20 rounded p-3 text-muted/95 leading-relaxed font-mono">
              {events.map((ev, i) => (
                <div key={i} className="flex justify-between items-center py-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        ev.type === 'creds' ? 'bg-[#FF5F56]' : ev.type === 'clicked' ? 'bg-accent' : 'bg-muted'
                      }`}
                    />
                    <span className="font-mono">{ev.text}</span>
                  </div>
                  <span className="font-mono text-[8px] text-muted/40">{ev.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
