export default function KpiCard({ label, value, icon, note, color }) {
  const icons = {
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 9h18M16 14h5M6 5V3h12"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    entry: <><path d="M14 3h6v18h-6M3 12h12m-4-4 4 4-4 4"/></>
  }
  return <article className="kpi-card"><div className="kpi-top"><span>{label}</span><span className={`kpi-icon ${color}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[icon]}</svg></span></div><div className="kpi-value">{value}</div><p>{note}</p></article> }
