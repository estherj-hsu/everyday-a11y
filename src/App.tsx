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
          <PageLayout showNav={true}>
            <Foundations />
          </PageLayout>
        }
      />
      <Route
        path="/patterns"
        element={
          <PageLayout showNav={true}>
            <Patterns />
          </PageLayout>
        }
      />
      <Route
        path="/patterns/landmarks"
        element={
          <PageLayout showNav={true}>
            <Landmarks />
          </PageLayout>
        }
      />
      <Route
        path="/patterns/buttons-links"
        element={
          <PageLayout showNav={true}>
            <ButtonsLinks />
          </PageLayout>
        }
      />
      <Route
        path="/patterns/forms"
        element={
          <PageLayout showNav={true}>
            <Forms />
          </PageLayout>
        }
      />
      <Route
        path="/patterns/accordions"
        element={
          <PageLayout showNav={true}>
            <Accordions />
          </PageLayout>
        }
      />
      <Route
        path="/patterns/tabs"
        element={
          <PageLayout showNav={true}>
            <Tabs />
          </PageLayout>
        }
      />
      <Route
        path="/patterns/modal-dialog"
        element={
          <PageLayout showNav={true}>
            <ModalDialog />
          </PageLayout>
        }
      />
      <Route
        path="/patterns/navigation"
        element={
          <PageLayout showNav={true}>
            <Navigation />
          </PageLayout>
        }
      />
      <Route
        path="/check-fix"
        element={
          <PageLayout showNav={true}>
            <CheckFix />
          </PageLayout>
        }
      />
    </Routes>
  )
}

export default App
