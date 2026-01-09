import CodeExample from '../components/CodeExample'
import './Foundations.scss'

export default function Foundations() {
  return (
    <div className="foundations">
      <h1>Foundations</h1>
      <p>Accessibility fundamentals everything else builds on. Get these right and many problems never show up.</p>

      <section>
        <h2 id="semantics" className="h3">
          Semantics
        </h2>
        <p>
          <mark>Semantic HTML is the cheapest accessibility win you will ever get.</mark>
        </p>
        <p>
          Use native HTML elements for what they are meant to do. Buttons are buttons. Links navigate. Headings describe structure. Semantics convey relationships programmatically, giving assistive
          technologies meaning without extra work and reducing the need for ARIA.
        </p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G115">G115</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G140">G140</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="keyboard-interaction" className="h3">
          Keyboard Interaction
        </h2>
        <p>
          <mark>Keyboards are not a fallback, they are a primary input.</mark>
        </p>
        <p>
          Everything must be usable with a keyboard alone. This means logical tab order, no keyboard traps, and no interactions that rely on hover or pointer-only input. If you cannot operate it
          without a mouse, it is broken.
        </p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap">2.1.2 No Keyboard Trap</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G202">G202</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G90">G90</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="focus-management" className="h3">
          Focus Management
        </h2>
        <p>
          <mark>Focus is how users know where they are.</mark>
        </p>
        <p>Focus should move predictably and intentionally. When dialogs open, focus moves inside. When they close, focus returns. After route or view changes, users should not be left stranded.</p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-order">2.4.3 Focus Order</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G59">G59</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="aria-when-when-not-to-use" className="h3">
          ARIA (When &amp; When Not to Use)
        </h2>
        <p>
          <mark>No ARIA is better than bad ARIA.</mark>
        </p>
        <p>
          ARIA exists to fill semantic gaps HTML cannot express on its own. It should never be used to fix broken semantics. Incorrect ARIA can actively make interfaces harder to use with assistive
          technologies.
        </p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>
          </li>
          <li>
            <strong>Examples</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA1">ARIA1</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5">ARIA5</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA16">ARIA16</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="visual-hierarchy" className="h3">
          Visual Hierarchy
        </h2>
        <p>
          <mark>Clarity beats cleverness, every time.</mark>
        </p>
        <p>Accessibility also lives in what people see. If users cannot visually understand or operate the interface, assistive technology alone will not save it.</p>
      </section>

      <section>
        <h2 id="visually-hidden" className="h3">
          Visually Hidden Content
        </h2>
        <p>
          <mark>Visual simplicity should not reduce meaning.</mark>
        </p>
        <p>
          Visually hidden content is text available to screen readers but not visible on the screen. It is commonly used to provide accessible names, context, or instructions without changing the
          visual UI.
        </p>
        <CodeExample
          language="css"
          code={`.visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }`}
          showPreview={false}
        />
      </section>

      <section>
        <h2 id="focus-appearance" className="h3">
          Focus Appearance
        </h2>
        <p>
          <mark>Focus should be obvious, not decorative.</mark>
        </p>
        <p>Focus indicators must be clearly visible, high-contrast, and persistent. Removing outlines without a meaningful replacement breaks keyboard usability.</p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible">2.4.7 Focus Visible</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum">2.4.11 Focus Not Obscured</a> (AA);{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced">2.4.12 Focus Not Obscured</a> (AAA);{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance">2.4.13 Focus Appearance</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G149">G149</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G165">G165</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="motion-reduced-motion" className="h3">
          Motion &amp; Reduced Motion
        </h2>
        <p>
          <mark>Motion is optional, comprehension is not.</mark>
        </p>
        <p>Animations should support understanding, not distract or disorient. Motion triggered by interaction must respect reduced motion preferences and avoid causing disorientation.</p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions">2.3.3 Animation from Interactions</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G219">G219</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="touch-target-spacing" className="h3">
          Touch Target &amp; Spacing
        </h2>
        <p>
          <mark>Precision should not be required to succeed.</mark>
        </p>
        <p>
          Interactive elements need sufficient size (<mark>at least 24 by 24 px</mark>) and spacing to be used comfortably. Small targets increase error rates and fatigue, especially on touch devices.
        </p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG21/Understanding/target-size">2.5.5 Target Size</a> (AAA);{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum">2.5.8 Target Size</a> (AA)
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G207">G207</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="icon-only-ui-labeling" className="h3">
          Icon-only UI &amp; Labeling
        </h2>
        <p>
          <mark>Recognition beats interpretation.</mark>
        </p>
        <p>Icons without text rely on interpretation. If meaning is not universally obvious, provide a visible label or a clear accessible name. Tooltips do not count as labels.</p>
        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content">1.1.1 Non-text Content</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name">2.5.3 Label in Name</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G94">G94</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G208">G208</a>
          </li>
        </ul>
      </section>
    </div>
  )
}
