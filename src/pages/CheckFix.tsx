import './CheckFix.scss'

export default function CheckFix() {
  return (
    <div>
      <h1>Check & Fix</h1>
      <p>
        Accessibility issues often surface during testing, debugging, or late-stage reviews. <mark>Keyboard navigation breaks</mark>. <mark>Labels feel unclear</mark>.{' '}
        <mark>ARIA warnings are confusing</mark>. This section focuses on tools and workflows for when the problem is real but the cause is not obvious.
      </p>

      <section>
        <h2>Tools</h2>
        <p>A practical set of tools commonly used in accessibility-focused design and development. These work best when used continuously, not saved for the end.</p>

        <dl>
          <dt>
            <a href="https://developer.chrome.com/docs/devtools/accessibility/" target="_blank" rel="noopener noreferrer" aria-label="Chrome DevTools Accessibility (opens in a new tab)">
              Chrome DevTools Accessibility
            </a>
          </dt>
          <dd className="text-small">Inspect semantics, roles, names, focus behavior, and contrast directly in the browser.</dd>

          <dt>
            <a href="https://www.deque.com/axe/devtools/" target="_blank" rel="noopener noreferrer" aria-label="Axe DevTools (opens in a new tab)">
              Axe DevTools
            </a>
          </dt>
          <dd className="text-small">Automated accessibility testing with clear issue descriptions and references to standards.</dd>

          <dt>
            <a href="https://developer.chrome.com/docs/lighthouse/overview/" target="_blank" rel="noopener noreferrer" aria-label="Lighthouse (opens in a new tab)">
              Lighthouse
            </a>
          </dt>
          <dd className="text-small">High-level audits that catch baseline accessibility issues and help track improvements over time.</dd>

          <dt>
            <a href="https://wave.webaim.org/" target="_blank" rel="noopener noreferrer" aria-label="WAVE (opens in a new tab)">
              WAVE
            </a>
          </dt>
          <dd className="text-small">Visual overlays that highlight structural and content-related accessibility issues.</dd>

          <dt>
            <a href="https://pa11y.org/" target="_blank" rel="noopener noreferrer" aria-label="Pa11y (opens in a new tab)">
              Pa11y
            </a>
          </dt>
          <dd className="text-small">A CLI tool for automated accessibility testing in CI/CD pipelines.</dd>

          <dt>
            <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer" aria-label="NVDA screen reader (opens in a new tab)">
              NVDA
            </a>
            {' / '}
            <a href="https://www.apple.com/accessibility/vision/" target="_blank" rel="noopener noreferrer" aria-label="VoiceOver screen reader (opens in a new tab)">
              VoiceOver
            </a>
          </dt>
          <dd className="text-small">Screen readers for validating real keyboard and screen reader experiences.</dd>

          <dt>
            <a href="https://www.getstark.co/figma/" target="_blank" rel="noopener noreferrer" aria-label="Stark for Figma (opens in a new tab)">
              Stark for Figma
            </a>
          </dt>
          <dd className="text-small">Design-time accessibility tools for contrast, color blindness, and touch targets.</dd>

          <dt>
            <a href="https://colourcontrast.cc/" target="_blank" rel="noopener noreferrer" aria-label="colourcontrast.cc (opens in a new tab)">
              colourcontrast.cc
            </a>
          </dt>
          <dd className="text-small">Quick contrast checks during design and implementation.</dd>

          <dt>
            <a href="https://colorcontrast.app/" target="_blank" rel="noopener noreferrer" aria-label="colorcontrast.app (opens in a new tab)">
              colorcontrast.app
            </a>
          </dt>
          <dd className="text-small">A simple tool to verify contrast ratios for text and UI elements.</dd>

          <dt>
            <a href="https://typescale.com/" target="_blank" rel="noopener noreferrer" aria-label="Typescale (opens in a new tab)">
              Typescale
            </a>
          </dt>
          <dd className="text-small">Explore typographic scales to support readable, consistent text systems.</dd>
        </dl>
      </section>

      <section>
        <h2>Debugging Workflows</h2>
        <p>These workflows describe common accessibility failures and how to approach them when the cause is not obvious. Use them alongside tools, not instead of them.</p>

        <h3>Finding Missing Labels</h3>
        <p>
          <mark>When form controls or interactive elements feel unclear</mark>, or do not announce properly when navigating by keyboard or screen reader. This workflow traces the issue back to{' '}
          <mark>structure</mark>, <mark>labeling</mark>, or <mark>content</mark>, instead of patching individual elements.
        </p>

        <h3>Fixing Incorrect ARIA</h3>
        <p>
          <mark>When ARIA roles or states do not match actual behavior</mark>, or when tools report ARIA issues that are hard to interpret. This workflow helps decide whether ARIA is needed at all,
          and when <mark>removing ARIA</mark> is the better fix.
        </p>

        <h3>Diagnosing Focus Traps</h3>
        <p>
          <mark>When keyboard navigation loops, skips content, or loses focus</mark>, often inside modals or custom components. This workflow looks at <mark>focus flow</mark> and{' '}
          <mark>interaction boundaries</mark> to identify where focus breaks.
        </p>
      </section>
    </div>
  )
}
