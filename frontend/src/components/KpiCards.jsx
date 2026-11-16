import KpiCard from './KpiCard'
export default function KpiCards({ cards }) { return <section className="kpi-grid" aria-label="Registration summary">{cards.map(([label, value, icon, note, color]) => <KpiCard key={label} label={label} value={value} icon={icon} note={note} color={color}/>)}</section> }
