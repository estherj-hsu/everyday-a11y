import './Accordions.scss'
import CodeExample from '../components/CodeExample'

export default function Accordions() {
  return (
    <div>
      <h1>Accordions</h1>
      <p>
        Accordions group related content into vertically stacked sections that can be expanded or collapsed. They are commonly used to reduce scrolling when multiple sections share the same context.
        When possible, use native <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code>. They provide built-in keyboard interaction and state handling for free. Custom accordions require extra
        markup, logic, and testing to reach the same baseline.
      </p>

      <section className="example">
        <h2>Accordion with Native Details</h2>
        <p>
          This example uses the native <code>&lt;details&gt;</code> element. The <code>&lt;summary&gt;</code> acts as the interactive header, while the browser handles keyboard interaction, focus
          behavior, and expanded state automatically.
        </p>

        <CodeExample
          code={`<details>
  <summary>Accordion Heading</summary>
  <div>
    <p>Accordion content.</p>
  </div>
</details>`}
          previewCode={`<div class="accordions">
<details class="accordion">
  <summary>Why do we care so much about accessibility?</summary>
  <div>
    <p class="text-small">
      Because small interaction details compound. Keyboard access, clear focus,
      and predictable behavior help more people use what we build without friction.
    </p>
  </div>
</details>

<details class="accordion accordion--details">
  <summary>Can I make the details look prettier?</summary>
  <div class="accordion-content">
    <div class="accordion-content-inner">
      <p class="text-small">
        Yes. You can style <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code>
        freely, but avoid removing focus styles or shrinking the click target.
        The built-in behavior is doing important accessibility work.
      </p>
    </div>
  </div>
</details>
</div>`}
        />
      </section>

      <section className="example">
        <h2>Accordion without Native Semantics</h2>
        <p>
          This example shows a custom accordion built with generic elements and JavaScript. Without native semantics, the header must be a real button, and expanded or collapsed state must be
          communicated explicitly.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Each accordion header must be a real <code>&lt;button&gt;</code>.
          </li>
          <li>
            <code>aria-expanded</code> must accurately reflect the panel’s visible state.
          </li>
          <li>
            <code>aria-controls</code> must reference a unique ID.
          </li>
          <li>Keyboard interaction (Enter, Space, logical Tab order) must be supported.</li>
          <li>Focus must be clearly visible when navigating by keyboard.</li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>; <a href="https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels">2.4.6 Headings and Labels</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible">2.4.7 Focus Visible</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA4">ARIA4</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G131">G131</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G149">G149</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G165">G165</a>
          </li>
        </ul>

        <CodeExample
          code={`<div class="accordion">
  <div class="accordion-header">
    <h3>
      <button
        aria-expanded="false"
        aria-controls="example-accordion">
        Accordion Heading
      </button>
    </h3>
  </div>
  <div class="accordion-content">
    <div
      id="example-accordion"
      class="accordion-content-inner"
      hidden>
      <p>Accordion content.</p>
    </div>
  </div>
</div>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Try using the keyboard to see focus behavior.
</p>

<div class="accordions">
  <div class="accordion" data-accordion="closed">
    <div class="accordion-header">
      <h3 class="h4">
        <button
          aria-expanded="false"
          aria-controls="why-do-we-care-so-much-about-accessibility">
          Why do we care so much about accessibility?
        </button>
      </h3>
    </div>
    <div class="accordion-content">
      <div
        id="why-do-we-care-so-much-about-accessibility"
        class="accordion-content-inner"
        hidden>
        <p class="text-small">
          Because small interaction details compound. Keyboard access,
          clear focus, and predictable behavior help more people succeed.
        </p>
      </div>
    </div>
  </div>

  <div class="accordion" data-accordion="closed">
    <div class="accordion-header">
      <h3 class="h4">
        <button
          aria-expanded="false"
          aria-controls="can-i-just-use-divs-for-accordions">
          Can I just use divs for accordions?
        </button>
      </h3>
    </div>
    <div class="accordion-content">
      <div
        id="can-i-just-use-divs-for-accordions"
        class="accordion-content-inner"
        hidden>
        <p class="text-small">
          You can, but then you are responsible for keyboard interaction,
          focus management, and state announcements.
          Native elements handle that work and do not miss edge cases.
        </p>
      </div>
    </div>
  </div>
</div>`}
        />

        <h3>Accordion Animation Considerations</h3>
        <p>
          Animating height directly often causes layout thrashing and jank. A grid-based approach allows panels to <mark>animate smoothly without measuring content height</mark> in JavaScript.
        </p>
        <p>⚠️ With a fixed transition duration (0.3s here), perceived speed varies with content length. Longer panels appear to move faster.</p>

        <CodeExample
          language="css"
          code={`.accordion {
  &:has([aria-expanded="true"]) {
    .accordion-content {
      grid-template-rows: 1fr;
    }
  }

  .accordion-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s;

    .accordion-content-inner {
      min-height: 0;
      overflow: hidden;
    }
  }
}`}
          showPreview={false}
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>
            Native <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> is used when possible.
          </li>
          <li>
            Custom accordions use real <code>&lt;button&gt;</code> elements for toggles.
          </li>
          <li>
            <code>aria-expanded</code> accurately reflects the visible state of the panel.
          </li>
          <li>
            Each panel is labelled by and associated with its trigger using <code>aria-controls</code> and <code>id</code>.
          </li>
          <li>Keyboard focus is always visible on triggers and in panels.</li>
        </ul>
      </section>
    </div>
  )
}
