import api from './api.js'

function normalize(item) {
  return {
    ...item,
    caseId: item.case_id ?? item.caseId,
    uploadedBy: item.uploaded_by ?? item.uploadedBy,
  }
}

export async function getEvidence() {
  try {
    const response = await api.get('/evidence/')
    return response.data.map(normalize)
  } catch (error) {
    console.error('Error fetching evidence:', error)
    return []
  }
}

export async function getEvidenceByCase(caseId) {
  try {
    const response = await api.get(`/evidence/${caseId}`)
    return response.data.map(normalize)
  } catch (error) {
    console.error('Error fetching evidence for case:', error)
    return []
  }
}
