import api from './api.js'
import { graphData } from '../data/mockData.js'

function normalizeGraph(data) {
  return {
    nodes: data.nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        type: node.data.type || node.data.group,
        risk: node.data.risk || 72
      }
    })),
    edges: data.edges.map((edge) => ({
      ...edge,
      data: {
        ...edge.data,
        label: edge.data.label || edge.data.relationship
      }
    }))
  }
}

export const graphService = {
  async getGraph() {
    try {
      const response = await api.get('/graph/network')
      return normalizeGraph(response.data)
    } catch (error) {
      console.error('Error fetching graph:', error)
      return graphData
    }
  },
  async expandNode(id) {
    return api.get(`/graph/${id}`)
  }
}
