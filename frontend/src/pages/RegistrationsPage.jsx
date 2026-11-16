import { useState, useEffect } from 'react'
import { getRegistrations, getSummary } from '../api/sample-data'
import useDebounce from '../hooks/useDebounce'
import { money } from '../formatters'
import Icon from '../components/Icon'
import KpiCards from '../components/KpiCards'
import RegistrationFilters from '../components/RegistrationFilters'
import RegistrationTable from '../components/RegistrationTable'
import Pagination from '../components/Pagination'
function RegistrationsPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [data, setData] = useState({ items: [], totalCount: 0, totalPages: 0 })
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const debouncedSearch = useDebounce(search, 400)
  useEffect(() => {
    let active = true
    Promise.all([getRegistrations({ participantName: debouncedSearch, type, status, page, pageSize }), getSummary()])
      .then(([result, totals]) => { if (active) { setData(result); setSummary(totals); setError('') } })
      .catch(() => { if (active) setError('Cannot reach the API. Please check the connection and try again.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [debouncedSearch, type, status, page, pageSize, retry])
  const rows = data.items
  const totalCount = data.totalCount
  const pages = Math.max(1, data.totalPages)
  function changeFilter(setter, value) { setLoading(true); setter(value); setPage(1) }
  function changePage(value) { setLoading(true); setPage(value) }
  function reset() { setLoading(true); setSearch(''); setType(''); setStatus(''); setPage(1); setRetry(v => v + 1) }
  const kpis = summary ? [['Total registrations', summary.totalRegistrations, 'people', 'All event participants', 'orange'], ['Total payments', money(summary.totalPayments), 'wallet', 'Collected so far', 'green'], ['Uncollected payments', money(summary.uncollectedPayments), 'clock', 'Remaining balance', 'amber'], ['Confirmed', summary.confirmed, 'check', 'Ready for the show', 'blue'], ['Checked in', summary.checkedIn, 'entry', 'Arrived at the venue', 'purple']] : []
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#dashboard"><span className="brand-mark"><Icon name="car" size={27}/></span><span>AUTO<span className="brand-accent">VISTA</span><small>EVENT MANAGEMENT</small></span></a>
      <div className="workspace-label">WORKSPACE</div>
      <a href="#dashboard" className="nav-item active" aria-current="page"><Icon name="grid"/> Registration dashboard <span className="nav-indicator"/></a>
      <div className="sidebar-event"><span className="eyebrow">THE NEXT BIG SHOW</span><div className="event-year">CAR SHOW<span>2027</span></div><div className="event-rule"/><p>Sorsogon City Coliseum</p><span className="event-tag">3 days. One shared passion.</span></div>
      <div className="sidebar-bottom"><span className="avatar">AV</span><div><strong>Event staff</strong><small>AutoVista Events</small></div><span className="online-dot"/></div>
    </aside>
    <div className="main-shell" id="dashboard">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>Registration dashboard</strong></div><div className="topbar-right"><span className="demo-label">Sample data</span><span className="avatar light">AV</span></div></header>
      <main>
        <div className="page-heading"><div><div className="eyebrow orange-text">AUTOVISTA EVENTS / CAR SHOW 2027</div><h1>Registration dashboard<span>.</span></h1><p>A clear view of every car, every participant, and every payment.</p></div><div className="event-pill"><span className="online-dot"/> Event overview</div></div>
        <KpiCards cards={kpis}/>
        <section className="registrations-panel" aria-labelledby="registrations-heading">
          <div className="panel-heading"><div><div className="title-row d-flex align-items-center"><h2 id="registrations-heading">Registrations</h2><span className="count-chip">{summary?.totalRegistrations ?? 0} total</span></div><p>Your event lineup, all in one place.</p></div><span className="panel-note"><span className="online-dot"/> Local sample preview</span></div>
          <RegistrationFilters {...{ search, type, status, setSearch, setType, setStatus, changeFilter, reset }}/>
          {loading && <div className="feedback" role="status">Loading registrations…</div>}
          {error && <div className="feedback error" role="alert">{error} <button onClick={() => {setLoading(true); setRetry(v => v + 1)}}>Try again</button></div>}
          <RegistrationTable {...{ rows, reset, loading, error }}/>
          <Pagination {...{ totalCount, page, pages, pageSize, setPageSize, changeFilter, changePage, loading }}/>
        </section>
        <footer><span>AutoVista Events <span className="footer-dot">·</span> Car Show 2027</span><span>Built for a smoother show day.</span></footer>
      </main>
    </div>
  </div>
}
export default RegistrationsPage

