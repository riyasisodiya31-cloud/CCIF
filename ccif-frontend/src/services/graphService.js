import api from './api.js'
import { graphData } from '../data/mockData.js'

export const graphService = {
  async getGraph() {
    return Promise.resolve(graphData)
  },
  async expandNode(id) {
    return api.get(`/graph/${id}`)
  }
}
