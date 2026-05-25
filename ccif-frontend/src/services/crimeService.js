import api from './api'
import { crimeCategories } from '../data/mockCrimeCategories.js'

export async function getCrimeCategories() {
  try {
    const response = await api.get('/crimes')
    return response.data.map((domain) => ({
      ...domain,
      icon: crimeCategories.find((item) => item.crimeCode === domain.crimeCode)?.icon,
      gradient: crimeCategories.find((item) => item.crimeCode === domain.crimeCode)?.gradient
    }))
  } catch (error) {
    console.error('Error fetching crime categories:', error)
    return crimeCategories
  }
}
