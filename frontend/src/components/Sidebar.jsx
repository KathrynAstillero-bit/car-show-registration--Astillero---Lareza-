import Icon from './Icon'

export default function Sidebar({ expanded, onToggle }) {
  return <aside className={`sidebar ${expanded ? 'sidebar-expanded' : 'sidebar-compact'}`} aria-label="Main navigation">
    <div className="brand">
      <button type="button" className="brand-mark sidebar-toggle" onClick={onToggle} aria-expanded={expanded} aria-controls="sidebar-details" aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'} title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}>
        <Icon name="car" size={27}/>
      </button>
      {expanded && <span className="brand-name">AUTO<span className="brand-accent">VISTA</span></span>}
    </div>
    <div id="sidebar-details" className="sidebar-details" hidden={!expanded}>
      <div className="workspace-label">WORKSPACE</div>
      <a href="#dashboard" className="nav-item active" aria-current="page"><Icon name="grid"/><span>Registration dashboard</span><span className="nav-indicator"/></a>
      <div className="sidebar-event"><span className="eyebrow">THE NEXT BIG SHOW</span><div className="event-year">CAR SHOW<span>2027</span></div><div className="event-rule"/><p>Sorsogon City Coliseum</p><span className="event-tag">3 days. One shared passion.</span></div>
    </div>
    {!expanded && <a href="#dashboard" className="nav-item active compact-navigation" aria-label="Registration dashboard" aria-current="page" title="Registration dashboard"><Icon name="grid"/></a>}
    <div className="sidebar-bottom"><span className="avatar" aria-label="AutoVista staff">AV</span>{expanded && <><div><strong>Event staff</strong><small>AutoVista Events</small></div><span className="online-dot"/></>}</div>
  </aside>
}
