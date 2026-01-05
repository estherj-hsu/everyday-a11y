import { Link } from 'react-router-dom'
import './Patterns.scss'

export default function Patterns() {
  return (
    <div className="components">
      <h1>Patterns</h1>

      <section className="cards">
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/landmarks">Landmarks</Link>
          </h2>
          <p className="text-small">Structure your page so assistive tech isn’t guessing.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/buttons-links">Buttons & Links</Link>
          </h2>
          <p className="text-small">Make actions act and links link.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/navigation">Navigation</Link>
          </h2>
          <p className="text-small">Predictable paths beat clever layouts.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/accordions">Accordion</Link>
          </h2>
          <p className="text-small">Progressive disclosure without progressive frustration.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/tabs">Tabs</Link>
          </h2>
          <p className="text-small">Multiple panels, one logical focus order.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/modal-dialog">Modal / Dialog</Link>
          </h2>
          <p className="text-small">Manage focus like you mean it.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/forms">Forms</Link>
          </h2>
          <p className="text-small">Clear questions, clear errors, clear expectations.</p>
        </div>
      </section>
    </div>
  )
}
