import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ToastProvider } from './context/ToastContext'
import { Loader } from './components/common/Loader'

const Home = lazy(() => import('./pages/Home'))
const PersonalInfo = lazy(() => import('./pages/PersonalInfo'))
const DataPersonalization = lazy(() => import('./pages/DataPersonalization'))
const Security = lazy(() => import('./pages/Security'))
const PeopleSharing = lazy(() => import('./pages/PeopleSharing'))
const PaymentsSubscription = lazy(() => import('./pages/PaymentsSubscription'))
const Help = lazy(() => import('./pages/Help'))

export default function App() {
  return (
    <ToastProvider>
      <Layout>
        <Suspense fallback={<Loader text="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<PersonalInfo />} />
            <Route path="/data" element={<DataPersonalization />} />
            <Route path="/security" element={<Security />} />
            <Route path="/people" element={<PeopleSharing />} />
            <Route path="/payments" element={<PaymentsSubscription />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Suspense>
      </Layout>
    </ToastProvider>
  )
}
