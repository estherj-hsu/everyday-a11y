import { Link } from 'react-router-dom'
import './Home.scss'

export default function Home() {
  return (
    <div className="home">
      <h1 className="logo" aria-label="Everyday Accessibility">
        Everyday <span>A</span>ccessibility
      </h1>

      <p className="h3">Practical UI & Interaction A11y for Makers</p>

      <p>Accessibility helps people use what we build without friction. It improves clarity, reduces surprises, and removes barriers that turn simple tasks into dead ends.</p>

      <p>It is not an add-on or a final checklist. It is part of good UI, solid engineering, and thoughtful design decisions made early.</p>

      <p>
        Everyday Accessibility focuses on practical patterns you can apply right away. Clear explanations. Real examples. No jargon walls. Just enough guidance to help developers and designers build
        interfaces that actually work.
      </p>

      <div className="home-links">
        <Link to="/patterns" className="btn">
          Patterns
        </Link>
        <Link to="/foundations" className="btn">
          Foundations
        </Link>
        <Link to="/check-fix" className="btn">
          Check & Fix
        </Link>
      </div>
    </div>
  )
}
