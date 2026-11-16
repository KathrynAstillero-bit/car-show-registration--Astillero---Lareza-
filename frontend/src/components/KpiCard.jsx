import Icon from './Icon'
export default function KpiCard({ label, value, icon, note, color }) { return <article className="kpi-card"><div className="kpi-top"><span>{label}</span><span className={`kpi-icon ${color}`}><Icon name={icon}/></span></div><div className="kpi-value">{value}</div><p>{note}</p></article> }
