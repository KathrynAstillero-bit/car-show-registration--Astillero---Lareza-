import { useState, useEffect } from 'react'
import { getRegistrations, getSummary } from '../api/registrationsApi'
import useDebounce from '../hooks/useDebounce'
import KpiCards from '../components/KpiCards'
import RegistrationFilters from '../components/RegistrationFilters'
import RegistrationTable from '../components/RegistrationTable'
import Pagination from '../components/Pagination'
const money = value => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 }).format(value)

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
  return <main>
        <div className="page-heading"><div><div className="eyebrow orange-text">AUTOVISTA EVENTS / CAR SHOW 2027</div><h1>REGISTRATION DASHBOARD</h1><p>A clear view of every car, every participant, and every payment.</p></div><div className="event-pill"><span className="online-dot"/> Event overview</div></div>
        <KpiCards cards={kpis}/>
        <section className="registrations-panel" aria-labelledby="registrations-heading">
          <div className="panel-heading"><div><div className="title-row d-flex align-items-center"><h2 id="registrations-heading">Registrations</h2><span className="count-chip">{summary?.totalRegistrations ?? 0} total</span></div><p>Your event lineup, all in one place.</p></div><span className="panel-note"><span className="online-dot"/> Local sample preview</span></div>
          <RegistrationFilters {...{ search, type, status, setSearch, setType, setStatus, changeFilter, reset }}/>
          {loading && <div className="sr-only" role="status">Loading registrations…</div>}
          {error && <div className="feedback error" role="alert">{error} <button onClick={() => {setLoading(true); setRetry(v => v + 1)}}>Try again</button></div>}
          <RegistrationTable {...{ rows, reset, loading, error, pageSize }}/>
          <Pagination {...{ totalCount, page, pages, pageSize, setPageSize, changeFilter, changePage, loading }}/>
        </section>
        <footer><span>AutoVista Events <span className="footer-dot">·</span> Car Show 2027</span><span>Built for a smoother show day.</span></footer>
  </main>
}
export default RegistrationsPage





