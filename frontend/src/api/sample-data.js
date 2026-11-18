const names = ['Juan Dela Cruz', 'Maria Santos', 'Miguel Reyes', 'Andrea Garcia', 'Paolo Mendoza', 'Sofia Ramos', 'Carlo Villanueva', 'Isabella Torres', 'Luis Navarro', 'Camille Flores', 'Rafael Aquino', 'Bea Castillo', 'Marco Rivera', 'Nicole Lim', 'Gabriel Cruz', 'Diana Perez', 'Adrian Tan', 'Julia Mercado', 'Enzo Bautista', 'Patricia Lopez', 'Daniel Sy', 'Clara Gonzales', 'Joshua Diaz', 'Mika Romero', 'Anton Santiago']
const cars = ['Toyota Supra MK4', 'Honda Civic Type R', 'Mazda MX-5', 'Nissan Skyline GT-R', 'Ford Mustang', 'Mitsubishi Lancer Evo', 'Subaru WRX STI', 'Toyota GR86']
const registrations = names.map((participantName, i) => {
  const registrationFee = [1500, 2500, 4000][i % 3]
  const amountPaid = [registrationFee, 0, registrationFee / 2, registrationFee][i % 4]
  return { id: `00000000-0000-4000-8000-${String(i + 1).padStart(12, '0')}`, contactNumber: `0917${String(1234567 + i)}`, address: 'Sorsogon City', registrationNumber: `CS27-${String(i + 1).padStart(4, '0')}`, registrationDate: `2027-02-${String(10 + i % 7).padStart(2, '0')}T08:30:00Z`, participantName, email: `${participantName.toLowerCase().replaceAll(' ', '.')}@example.com`, carMakeModel: cars[i % cars.length], plateNumber: `ABC ${1234 + i}`, registrationType: ['Exhibitor', 'Competitor', 'VIP'][i % 3], status: ['Confirmed', 'Pending', 'CheckedIn', 'Confirmed', 'Cancelled'][i % 5], registrationFee, amountPaid, paymentStatus: amountPaid === 0 ? 'Unpaid' : amountPaid < registrationFee ? 'Partial' : 'Paid' }
})

export async function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  const filtered = registrations.filter(r => r.participantName.toLowerCase().includes(participantName.toLowerCase()) && (!type || r.registrationType === type) && (!status || r.status === status))
  return { items: filtered.slice((page - 1) * pageSize, page * pageSize), page, pageSize, totalCount: filtered.length, totalPages: Math.ceil(filtered.length / pageSize) }
}
export async function getSummary() {
  return { totalRegistrations: registrations.length, confirmed: registrations.filter(r => r.status === 'Confirmed').length, checkedIn: registrations.filter(r => r.status === 'CheckedIn').length, pending: registrations.filter(r => r.status === 'Pending').length, cancelled: registrations.filter(r => r.status === 'Cancelled').length, totalFees: registrations.reduce((sum, r) => sum + r.registrationFee, 0), totalPayments: registrations.reduce((sum, r) => sum + r.amountPaid, 0), uncollectedPayments: registrations.reduce((sum, r) => sum + r.registrationFee - r.amountPaid, 0) }
}

