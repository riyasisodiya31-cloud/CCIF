import api from './api.js'
import { evidence as fallbackEvidence } from '../data/mockData.js'

function normalize(item) {
  return {
    ...item,
    caseId: item.caseId || item.case_id,
    uploadedBy: item.uploadedBy || item.uploaded_by,
  }
}

export async function getEvidence() {
  try {
    const response = await api.get('/evidence/')
    return response.data.map(normalize)
  } catch (error) {
    console.error('Error fetching evidence:', error)
    return fallbackEvidence
  }
}

export async function getEvidenceByCase(caseId) {
  try {
    const response = await api.get(`/evidence/${caseId}`)
    return response.data.map(normalize)
  } catch (error) {
    console.error(`Error fetching evidence for ${caseId}:`, error)
    return fallbackEvidence.filter((item) => item.caseId === caseId)
  }
}
