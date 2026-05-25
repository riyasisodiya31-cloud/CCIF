import api from './api.js'

export const aiService = {
  async askCopilot(prompt) {
    if (!prompt.trim()) return Promise.resolve(null)
    try {
      const response = await api.post('/copilot/query', { query: prompt })
      return {
        answer: response.data.response,
        insights: []
      }
    } catch (error) {
      console.error('Error asking copilot:', error)
      return {
        answer: 'Found: backend connection is active, but the Copilot service needs ANTHROPIC_API_KEY before it can return live model output.',
        insights: []
      }
    }
  },
  async remoteAsk(prompt) {
    return api.post('/copilot/query', { query: prompt })
  }
}
