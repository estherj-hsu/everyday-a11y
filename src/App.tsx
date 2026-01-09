import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import PageLayout from './components/PageLayout'
import './App.scss'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const Foundations = lazy(() => import('./pages/Foundations'))
const Patterns = lazy(() => import('./pages/Patterns'))
const Landmarks = lazy(() => import('./pages/Landmarks'))
const ButtonsLinks = lazy(() => import('./pages/ButtonsLinks'))
const Forms = lazy(() => import('./pages/Forms'))
const Accordions = lazy(() => import('./pages/Accordions'))
const Tabs = lazy(() => import('./pages/Tabs'))
const ModalDialog = lazy(() => import('./pages/ModalDialog'))
const Navigation = lazy(() => import('./pages/Navigation'))
const CheckFix = lazy(() => import('./pages/CheckFix'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="loading" aria-live="polite" aria-label="Loading page">
          <div className="loading-logo" aria-hidden>
            A
          </div>
          <p className="loading-text">Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <PageLayout showNav={false}>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/foundations"
          element={
            <PageLayout>
              <Foundations />
            </PageLayout>
          }
        />
        <Route
          path="/patterns"
          element={
            <PageLayout>
              <Patterns />
            </PageLayout>
          }
        />
        <Route
          path="/patterns/landmarks"
          element={
            <PageLayout>
              <Landmarks />
            </PageLayout>
          }
        />
        <Route
          path="/patterns/buttons-links"
          element={
            <PageLayout>
              <ButtonsLinks />
            </PageLayout>
          }
        />
        <Route
          path="/patterns/forms"
          element={
            <PageLayout>
              <Forms />
            </PageLayout>
          }
        />
        <Route
          path="/patterns/accordions"
          element={
            <PageLayout>
              <Accordions />
            </PageLayout>
          }
        />
        <Route
          path="/patterns/tabs"
          element={
            <PageLayout>
              <Tabs />
            </PageLayout>
          }
        />
        <Route
          path="/patterns/modal-dialog"
          element={
            <PageLayout>
              <ModalDialog />
            </PageLayout>
          }
        />
        <Route
          path="/patterns/navigation"
          element={
            <PageLayout>
              <Navigation />
            </PageLayout>
          }
        />
        <Route
          path="/check-fix"
          element={
            <PageLayout>
              <CheckFix />
            </PageLayout>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
