import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Cases from './pages/Cases.jsx'
import CaseDetail from './pages/CaseDetail.jsx'
import Suspects from './pages/Suspects.jsx'
import SuspectProfile from './pages/SuspectProfile.jsx'
import Evidence from './pages/Evidence.jsx'
import Alerts from './pages/Alerts.jsx'
import IntelligenceGraph from './pages/IntelligenceGraph.jsx'
import AICopilot from './pages/AICopilot.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:caseId" element={<CaseDetail />} />
        <Route path="/suspects" element={<Suspects />} />
        <Route path="/suspects/:suspectId" element={<SuspectProfile />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/graph" element={<IntelligenceGraph />} />
        <Route path="/copilot" element={<AICopilot />} />
      </Route>
    </Routes>
  )
}
