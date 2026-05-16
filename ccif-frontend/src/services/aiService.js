import api from './api.js'

export const aiService = {
  async askCopilot(prompt) {
    if (!prompt.trim()) return Promise.resolve(null)
    return Promise.resolve({
      answer: 'Found: 3 linked cases, 2 repeat suspects, and a shared evidence pattern detected near the requested zone.',
      insights: ['Route overlap with C-2401', 'Repeat suspect S-1001 surfaced', 'Evidence trust average: 86%']
    })
  },
  async remoteAsk(prompt) {
    return api.post('/ai/copilot', { prompt })
  }
}
