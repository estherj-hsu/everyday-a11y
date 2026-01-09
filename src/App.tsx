import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/PageLayout'
import Home from './pages/Home'
import Foundations from './pages/Foundations'
import Patterns from './pages/Patterns'
import Landmarks from './pages/Landmarks'
import ButtonsLinks from './pages/ButtonsLinks'
import Forms from './pages/Forms'
import Accordions from './pages/Accordions'
import Tabs from './pages/Tabs'
import ModalDialog from './pages/ModalDialog'
import Navigation from './pages/Navigation'
import CheckFix from './pages/CheckFix'
import './App.scss'

function App() {
  return (
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
  )
}

export default App
