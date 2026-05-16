export const suspects = [
  { id: 'S-1001', name: 'Arjun Varma', age: 34, risk: 92, gang: 'North Quay Syndicate', location: 'Chennai Port', photo: 'AV', associations: ['S-1003', 'S-1012'], crimes: ['C-2401', 'C-2408'] },
  { id: 'S-1002', name: 'Meera Khan', age: 29, risk: 78, gang: 'None', location: 'Velachery', photo: 'MK', associations: ['S-1007'], crimes: ['C-2402'] },
  { id: 'S-1003', name: 'Rafiq Nazeer', age: 41, risk: 88, gang: 'North Quay Syndicate', location: 'Royapuram', photo: 'RN', associations: ['S-1001', 'S-1009'], crimes: ['C-2401', 'C-2414'] },
  { id: 'S-1004', name: 'Dinesh Pillai', age: 37, risk: 65, gang: 'Iron Route Crew', location: 'T. Nagar', photo: 'DP', associations: ['S-1010'], crimes: ['C-2404'] },
  { id: 'S-1005', name: 'Lakshmi Rao', age: 26, risk: 55, gang: 'None', location: 'Adyar', photo: 'LR', associations: ['S-1011'], crimes: ['C-2405'] },
  { id: 'S-1006', name: 'Karthik Bose', age: 45, risk: 83, gang: 'Iron Route Crew', location: 'Guindy', photo: 'KB', associations: ['S-1004', 'S-1016'], crimes: ['C-2404', 'C-2410'] },
  { id: 'S-1007', name: 'Nisha Joseph', age: 31, risk: 74, gang: 'Marina Link', location: 'Besant Nagar', photo: 'NJ', associations: ['S-1002', 'S-1015'], crimes: ['C-2402', 'C-2409'] },
  { id: 'S-1008', name: 'Mohan Das', age: 52, risk: 61, gang: 'None', location: 'Mylapore', photo: 'MD', associations: ['S-1014'], crimes: ['C-2406'] },
  { id: 'S-1009', name: 'Zahir Ali', age: 38, risk: 90, gang: 'North Quay Syndicate', location: 'Ennore', photo: 'ZA', associations: ['S-1003'], crimes: ['C-2414'] },
  { id: 'S-1010', name: 'Peter Samuel', age: 33, risk: 70, gang: 'Iron Route Crew', location: 'Perambur', photo: 'PS', associations: ['S-1004'], crimes: ['C-2407'] },
  { id: 'S-1011', name: 'Ananya Sen', age: 24, risk: 48, gang: 'None', location: 'Anna Nagar', photo: 'AS', associations: ['S-1005'], crimes: ['C-2405'] },
  { id: 'S-1012', name: 'Vikram Seth', age: 43, risk: 85, gang: 'North Quay Syndicate', location: 'Washermanpet', photo: 'VS', associations: ['S-1001'], crimes: ['C-2408'] },
  { id: 'S-1013', name: 'Sanjay Kulkarni', age: 39, risk: 58, gang: 'None', location: 'Tambaram', photo: 'SK', associations: ['S-1018'], crimes: ['C-2411'] },
  { id: 'S-1014', name: 'Priya Menon', age: 28, risk: 63, gang: 'Marina Link', location: 'Triplicane', photo: 'PM', associations: ['S-1008'], crimes: ['C-2406', 'C-2412'] },
  { id: 'S-1015', name: 'Farhan Qureshi', age: 36, risk: 80, gang: 'Marina Link', location: 'Saidapet', photo: 'FQ', associations: ['S-1007'], crimes: ['C-2409'] },
  { id: 'S-1016', name: 'Elango Kumar', age: 44, risk: 81, gang: 'Iron Route Crew', location: 'Guindy', photo: 'EK', associations: ['S-1006'], crimes: ['C-2410'] },
  { id: 'S-1017', name: 'Rohit Nair', age: 22, risk: 43, gang: 'None', location: 'Chromepet', photo: 'RN', associations: [], crimes: ['C-2413'] },
  { id: 'S-1018', name: 'Ishaan Malik', age: 47, risk: 68, gang: 'East Yard Cell', location: 'Ambattur', photo: 'IM', associations: ['S-1013'], crimes: ['C-2411'] },
  { id: 'S-1019', name: 'Gayathri Das', age: 35, risk: 72, gang: 'East Yard Cell', location: 'Korattur', photo: 'GD', associations: ['S-1020'], crimes: ['C-2415'] },
  { id: 'S-1020', name: 'Manoj Iyer', age: 40, risk: 76, gang: 'East Yard Cell', location: 'Avadi', photo: 'MI', associations: ['S-1019'], crimes: ['C-2415'] }
]

export const cases = [
  { id: 'C-2401', title: 'Harbor Container Theft', type: 'Cargo Theft', location: 'Chennai Port', officer: 'ACP R. Iyer', status: 'Active', date: '2026-05-12', trust: 91, suspects: ['S-1001', 'S-1003'], related: ['C-2408', 'C-2414'], summary: 'High-value electronics moved through falsified container manifests and late-night gate access.' },
  { id: 'C-2402', title: 'Velachery Card Skimming Ring', type: 'Cyber Fraud', location: 'Velachery', officer: 'SI Leena Das', status: 'Active', date: '2026-05-10', trust: 84, suspects: ['S-1002', 'S-1007'], related: ['C-2409'], summary: 'Cluster of ATM skimming reports tied to reused device signatures.' },
  { id: 'C-2403', title: 'Metro Station Assault', type: 'Assault', location: 'Central Metro', officer: 'Inspector Naveen', status: 'Closed', date: '2026-04-28', trust: 76, suspects: [], related: [], summary: 'CCTV-confirmed assault near platform exit, resolved after witness corroboration.' },
  { id: 'C-2404', title: 'Rail Yard Fuel Diversion', type: 'Smuggling', location: 'Guindy Yard', officer: 'DSP M. Joseph', status: 'Active', date: '2026-05-08', trust: 88, suspects: ['S-1004', 'S-1006'], related: ['C-2410'], summary: 'Diesel siphoning operation using forged maintenance permits.' },
  { id: 'C-2405', title: 'Adyar Jewelry Burglary', type: 'Burglary', location: 'Adyar', officer: 'SI K. Mehta', status: 'Review', date: '2026-05-04', trust: 69, suspects: ['S-1005', 'S-1011'], related: [], summary: 'Residential burglary with evidence of staged forced entry.' },
  { id: 'C-2406', title: 'Mylapore Extortion Calls', type: 'Extortion', location: 'Mylapore', officer: 'Inspector Farah', status: 'Active', date: '2026-05-03', trust: 80, suspects: ['S-1008', 'S-1014'], related: ['C-2412'], summary: 'Voice pattern analysis links multiple extortion calls to shared routing nodes.' },
  { id: 'C-2407', title: 'Perambur Warehouse Fire', type: 'Arson', location: 'Perambur', officer: 'ACP R. Iyer', status: 'Cold', date: '2026-03-19', trust: 58, suspects: ['S-1010'], related: [], summary: 'Accelerant traces suggest deliberate ignition after insurance policy changes.' },
  { id: 'C-2408', title: 'Washermanpet Phone Heist', type: 'Cargo Theft', location: 'Washermanpet', officer: 'SI Leena Das', status: 'Active', date: '2026-05-01', trust: 86, suspects: ['S-1001', 'S-1012'], related: ['C-2401'], summary: 'Intercepted shipment shares vehicle and route markers with port theft.' },
  { id: 'C-2409', title: 'Besant Nagar Identity Fraud', type: 'Cyber Fraud', location: 'Besant Nagar', officer: 'Inspector Naveen', status: 'Review', date: '2026-04-27', trust: 79, suspects: ['S-1007', 'S-1015'], related: ['C-2402'], summary: 'Synthetic identity documents generated from breached bank records.' },
  { id: 'C-2410', title: 'Guindy Night Convoy', type: 'Smuggling', location: 'Guindy', officer: 'DSP M. Joseph', status: 'Active', date: '2026-05-11', trust: 82, suspects: ['S-1006', 'S-1016'], related: ['C-2404'], summary: 'Thermal camera footage shows recurring unauthorized convoy movement.' },
  { id: 'C-2411', title: 'Ambattur Logistics Fraud', type: 'Financial Crime', location: 'Ambattur', officer: 'SI K. Mehta', status: 'Review', date: '2026-04-22', trust: 73, suspects: ['S-1013', 'S-1018'], related: [], summary: 'Phantom invoices tied to shell transport vendors.' },
  { id: 'C-2412', title: 'Triplicane Protection Racket', type: 'Extortion', location: 'Triplicane', officer: 'Inspector Farah', status: 'Active', date: '2026-05-06', trust: 87, suspects: ['S-1014'], related: ['C-2406'], summary: 'Repeated payment demands across small businesses with identical collection windows.' },
  { id: 'C-2413', title: 'Chromepet Bike Theft Series', type: 'Auto Theft', location: 'Chromepet', officer: 'SI Daniel Raj', status: 'Closed', date: '2026-04-18', trust: 64, suspects: ['S-1017'], related: [], summary: 'Recovered bikes reveal same altered ignition method.' },
  { id: 'C-2414', title: 'Ennore Dock Bribery', type: 'Corruption', location: 'Ennore', officer: 'ACP R. Iyer', status: 'Active', date: '2026-05-14', trust: 93, suspects: ['S-1003', 'S-1009'], related: ['C-2401'], summary: 'Dockside access logs indicate coordinated bribery and cargo rerouting.' },
  { id: 'C-2415', title: 'Avadi Arms Cache', type: 'Weapons', location: 'Avadi', officer: 'DSP M. Joseph', status: 'Critical', date: '2026-05-13', trust: 95, suspects: ['S-1019', 'S-1020'], related: [], summary: 'Search warrant recovered parts inventory compatible with illegal firearm assembly.' }
]

export const evidence = Array.from({ length: 50 }, (_, index) => {
  const caseId = cases[index % cases.length].id
  const types = ['CCTV Frame', 'Call Log', 'Forensic Report', 'Manifest', 'Bank Trace', 'Witness Note', 'GPS Ping']
  const officers = ['Officer A. Bose', 'Officer B. Rao', 'Officer C. Thomas', 'Officer D. Kumar']
  return {
    id: `E-${(5001 + index).toString()}`,
    caseId,
    type: types[index % types.length],
    uploadedBy: officers[index % officers.length],
    timestamp: `2026-05-${String((index % 15) + 1).padStart(2, '0')} ${String(8 + (index % 12)).padStart(2, '0')}:30`,
    trust: 58 + ((index * 7) % 40),
    integrity: index % 9 === 0 ? 'Needs Review' : index % 5 === 0 ? 'Verified' : 'Intact',
    summary: `${types[index % types.length]} linked to ${caseId}`
  }
})

export const alerts = [
  { id: 'A-901', title: '3 burglaries detected in same region', location: 'Adyar', severity: 'High', time: '8 min ago', signal: 92 },
  { id: 'A-902', title: 'Suspicious convoy pattern detected', location: 'Guindy', severity: 'Critical', time: '19 min ago', signal: 96 },
  { id: 'A-903', title: 'Cold case similarity found', location: 'Perambur', severity: 'Medium', time: '36 min ago', signal: 71 },
  { id: 'A-904', title: 'Shared evidence pattern detected', location: 'Chennai Port', severity: 'High', time: '44 min ago', signal: 88 },
  { id: 'A-905', title: 'Possible repeat suspect movement', location: 'Besant Nagar', severity: 'Medium', time: '1 hr ago', signal: 67 }
]

export const locations = [
  { name: 'Chennai Port', lat: 13.1005, lng: 80.2943, severity: 92 },
  { name: 'Guindy', lat: 13.0067, lng: 80.2206, severity: 88 },
  { name: 'Adyar', lat: 13.0064, lng: 80.2578, severity: 71 },
  { name: 'Velachery', lat: 12.9759, lng: 80.2212, severity: 78 },
  { name: 'Avadi', lat: 13.1147, lng: 80.1098, severity: 95 }
]

export const activityFeed = [
  'New evidence added to Harbor Container Theft',
  'Cold case similarity found in Perambur Warehouse Fire',
  'Alert generated for Guindy Night Convoy',
  'Suspect Arjun Varma linked to dock bribery pattern',
  'Evidence integrity verified for E-5012'
]

export const graphData = {
  nodes: [
    ...suspects.map((s) => ({ data: { id: s.id, label: s.name, type: 'suspect', risk: s.risk } })),
    ...cases.map((c) => ({ data: { id: c.id, label: c.title, type: 'case', risk: c.trust } })),
    ...evidence.slice(0, 24).map((e) => ({ data: { id: e.id, label: e.type, type: 'evidence', risk: e.trust } })),
    ...Array.from(new Set([...locations.map((l) => l.name), ...cases.map((c) => c.location)])).map((name) => {
      const location = locations.find((item) => item.name === name)
      return { data: { id: `L-${name}`, label: name, type: 'location', risk: location?.severity || 68 } }
    }),
    ...Array.from(new Set(suspects.filter((s) => s.gang !== 'None').map((s) => s.gang))).map((g) => ({ data: { id: `G-${g}`, label: g, type: 'gang', risk: 86 } }))
  ],
  edges: [
    ...cases.flatMap((c) => c.suspects.map((s) => ({ data: { id: `${s}-${c.id}`, source: s, target: c.id, label: 'INVOLVED_IN' } }))),
    ...evidence.slice(0, 24).map((e) => ({ data: { id: `${e.caseId}-${e.id}`, source: e.caseId, target: e.id, label: 'HAS_EVIDENCE' } })),
    ...suspects.flatMap((s) => s.associations.map((a) => ({ data: { id: `${s.id}-${a}`, source: s.id, target: a, label: 'ASSOCIATED_WITH' } }))),
    ...suspects.filter((s) => s.gang !== 'None').map((s) => ({ data: { id: `${s.id}-G-${s.gang}`, source: s.id, target: `G-${s.gang}`, label: 'AFFILIATED_WITH' } })),
    ...cases.map((c) => ({ data: { id: `${c.id}-L-${c.location}`, source: c.id, target: `L-${c.location}`, label: 'LOCATED_AT' } }))
  ]
}
