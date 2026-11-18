export default function StatusBadge({ value }) { return <span className={`badge ${value.toLowerCase()}`}><span className="dot"/>{value === 'CheckedIn' ? 'Checked in' : value}</span> }
