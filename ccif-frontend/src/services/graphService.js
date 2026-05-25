import api from './api.js'

export const graphService = {
  async getGraph() {
    try {
      const response = await api.get('/graph/network')
      return response.data
    } catch (error) {
      console.error('Error fetching graph:', error)
      return { nodes: [], edges: [] }
    }
  }
}
