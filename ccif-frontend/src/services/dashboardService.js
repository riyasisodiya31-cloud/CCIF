import api from './api.js'

export async function getDashboardData() {
  try {
    const [cases, suspects, evidence, alerts] = await Promise.all([
      api.get('/cases/').then((r) => r.data).catch(() => []),
      api.get('/suspects/').then((r) => r.data).catch(() => []),
      api.get('/evidence/').then((r) => r.data).catch(() => []),
      api.get('/alerts/').then((r) => r.data).catch(() => []),
    ])
    return { cases, suspects, evidence, alerts }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return { cases: [], suspects: [], evidence: [], alerts: [] }
  }
}
