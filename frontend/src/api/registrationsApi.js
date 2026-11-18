const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')
async function request(path) {
  if (!baseUrl) throw new Error('Set VITE_API_BASE_URL in .env.development')
  const response = await fetch(`${baseUrl}${path}`)
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.json()
}
export function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  const query = new URLSearchParams({ page, pageSize })
  if (participantName) query.set('participantName', participantName)
  if (type) query.set('type', type)
  if (status) query.set('status', status)
  return request(`/api/registrations?${query}`)
}
export function getSummary() { return request('/api/registrations/summary') }
