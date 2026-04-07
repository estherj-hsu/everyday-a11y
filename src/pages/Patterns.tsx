import { Link } from 'react-router-dom'
import './Patterns.scss'

export default function Patterns() {
  return (
    <div className="components">
      <h1>Patterns</h1>

      <div className="cards">
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
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/live-region">Live Region</Link>
          </h2>
          <p className="text-small">Announce updates without stealing focus.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/combobox">Combobox</Link>
          </h2>
          <p className="text-small">Filter long lists without leaving the input.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/data-grid">Data Grid</Link>
          </h2>
          <p className="text-small">Two-dimensional keyboard navigation for tabular data.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/date-picker">Date Picker</Link>
          </h2>
          <p className="text-small">Calendar navigation built on the grid pattern.</p>
        </div>
        <div className="card">
          <h2 className="h3">
            <Link to="/patterns/carousel">Carousel</Link>
          </h2>
          <p className="text-small">Rotating content that doesn&apos;t leave users behind.</p>
        </div>
      </div>
    </div>
  )
}
