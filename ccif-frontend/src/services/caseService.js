import api from './api.js'
import { cases, evidence, suspects } from '../data/mockData.js'

export const caseService = {
  async getCases() {
    return Promise.resolve(cases)
  },
  async getCaseById(id) {
    return Promise.resolve(cases.find((item) => item.id === id))
  },
  async getCaseEvidence(caseId) {
    return Promise.resolve(evidence.filter((item) => item.caseId === caseId))
  },
  async getLinkedSuspects(caseItem) {
    return Promise.resolve(suspects.filter((item) => caseItem?.suspects.includes(item.id)))
  },
  async remoteSearch(query) {
    return api.get('/cases', { params: { query } })
  }
}
