import {
  Building2,
  Car,
  Container,
  Landmark,
  Network,
  ShipWheel
} from 'lucide-react'

export const crimeCategories = [
  {
    id: 'cargo-theft',
    name: 'Port / Cargo Theft',
    crimeCode: 'PT',
    assignedUnit: 'Port Intelligence Unit',
    priorityLevel: 'Critical',
    description: 'Container diversion, cargo manifests, dock access abuse, and logistics theft patterns.',
    icon: Container,
    gradient: 'from-cyan-300/22 via-blue-400/10 to-transparent'
  },
  {
    id: 'financial-fraud',
    name: 'Financial Fraud & Card Skimming',
    crimeCode: 'FT',
    assignedUnit: 'Cyber Crime Unit',
    priorityLevel: 'High',
    description: 'Card skimming, synthetic identities, transaction laundering, and bank fraud clusters.',
    icon: Landmark,
    gradient: 'from-emerald-300/20 via-cyan-300/10 to-transparent'
  },
  {
    id: 'burglary-serial-theft',
    name: 'Burglary / Serial Theft',
    crimeCode: 'BG',
    assignedUnit: 'Theft Investigation Unit',
    priorityLevel: 'High',
    description: 'Residential break-ins, serial theft signatures, staged entry, and repeat target corridors.',
    icon: Building2,
    gradient: 'from-amber-300/20 via-cyan-300/10 to-transparent'
  },
  {
    id: 'vehicle-theft',
    name: 'Vehicle Theft Networks',
    crimeCode: 'VT',
    assignedUnit: 'Auto Crime Cell',
    priorityLevel: 'Elevated',
    description: 'Vehicle stripping rings, ignition tampering, altered plates, and recovery route analysis.',
    icon: Car,
    gradient: 'from-blue-300/20 via-violet-300/10 to-transparent'
  },
  {
    id: 'smuggling-trafficking',
    name: 'Smuggling & Illegal Trafficking',
    crimeCode: 'SM',
    assignedUnit: 'Port Intelligence Unit',
    priorityLevel: 'Critical',
    description: 'Illegal goods movement, convoy anomalies, forged permits, and interdiction intelligence.',
    icon: ShipWheel,
    gradient: 'from-red-300/18 via-cyan-300/10 to-transparent'
  },
  {
    id: 'organized-crime',
    name: 'Organized Crime Syndicates',
    crimeCode: 'OC',
    assignedUnit: 'Criminal Intelligence Division',
    priorityLevel: 'Critical',
    description: 'Syndicate structures, extortion, corruption links, recruitment, and multi-case command patterns.',
    icon: Network,
    gradient: 'from-violet-300/22 via-cyan-300/10 to-transparent'
  }
]
