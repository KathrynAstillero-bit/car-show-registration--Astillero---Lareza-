import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-700-italic.css'
import '@fontsource/nunito/latin-400.css'
import '@fontsource/nunito/latin-600.css'
import '@fontsource/nunito/latin-700.css'
import '@fontsource/nunito/latin-800.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import { useState } from 'react'
import RegistrationsPage from './pages/RegistrationsPage'

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  return (
    <div className={`app-shell ${sidebarExpanded ? 'sidebar-is-expanded' : 'sidebar-is-compact'}`}>
      <aside className={`sidebar ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-compact'}`} aria-label="Main navigation">
    <div className="brand">
      <button type="button" className="brand-mark sidebar-toggle" onClick={() => setSidebarExpanded(value => !value)} aria-expanded={sidebarExpanded} aria-controls="sidebar-details" aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'} title={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}>
        <img className="sidebar-logo" src="/images/ride-logo.png" alt="RIDE"/>
      </button>

    </div>
    <div id="sidebar-details" className="sidebar-details" hidden={!sidebarExpanded}>
      <div className="workspace-label">WORKSPACE</div>
      <a href="#dashboard" className="nav-item active" aria-current="page"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></></svg><span>Registration dashboard</span><span className="nav-indicator"/></a>

      <section className="sidebar-event event-context" aria-labelledby="sidebar-event-title">
        <div className="event-context-heading"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><><path d="m5 7 2-4h10l2 4 2 3v8H3v-8l2-3ZM3 10h18M6 18v3m12-3v3M6 14h2m8 0h2"/></></svg><span>CURRENT EVENT</span></div>
        <h2 className="event-context-title" id="sidebar-event-title">Car Show <span>2027</span></h2>
        <p className="event-context-purpose">Registration management</p>
        <dl className="event-context-details">
          <div><dt>Venue</dt><dd>Sorsogon City Coliseum</dd></div>
          <div><dt>Duration</dt><dd>3 days</dd></div>
        </dl>
        <p className="event-context-caption">One shared passion.</p>
      </section>
    </div>
    {!sidebarExpanded && <a href="#dashboard" className="nav-item active compact-navigation" aria-label="Registration dashboard" aria-current="page" title="Registration dashboard"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></></svg></a>}
    <div className="sidebar-bottom"><span className="avatar" aria-label="AutoVista staff">AV</span>{sidebarExpanded && <><div><strong>Event staff</strong><small>AutoVista Events</small></div><span className="online-dot"/></>}</div>
  </aside>
      <div className="main-shell" id="dashboard">
        <RegistrationsPage/>
      </div>
    </div>
  )
}
