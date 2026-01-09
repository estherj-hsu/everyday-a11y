import { HashLink } from 'react-router-hash-link'
import './ButtonsLinks.scss'
import CodeExample from '../components/CodeExample'

export default function ButtonsLinks() {
  return (
    <div className="component-page">
      <h1>Buttons & Links</h1>
      <p>
        <mark>Buttons perform actions.</mark> <mark>Links navigate.</mark>
        <br />
        They are announced, focused, and activated differently by assistive technology. Using the right element matters more than how it looks.
      </p>

      <section className="example">
        <h2>Visually Hidden Text for Links</h2>
        <p>
          Visually hidden text adds context for screen readers without changing the visual UI. It is useful when design calls for short or generic link text. The hidden text becomes part of the link’s
          accessible name.
          <br />
          This pattern builds on <HashLink to="/foundations#visually-hidden">visually hidden content</HashLink>.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context">2.4.4 Link Purpose (In Context)</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only">2.4.9 Link Purpose (Link Only)</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G91">G91</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G53">G53</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Techniques/html/H30">H30</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/html/H77">H77</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Techniques/html/H78">H78</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/html/H79">H79</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Techniques/html/H81">H81</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA7">ARIA7</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8">ARIA8</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/css/C7">C7</a>
          </li>
        </ul>

        <CodeExample
          code={`❌ <a href="#">Link here</a>

⭕️ <a href="#">
     Link here<span class="visually-hidden"> to the accessibility patterns page</span>
   </a>`}
          showPreview={false}
          showCopyBtn={false}
        />
      </section>

      <section className="example">
        <h2>Focus Indicator</h2>
        <p>
          <mark>Focus indicators show where keyboard focus is.</mark> Removing or weakening them makes navigation unreliable. Use <code>:focus-visible</code> to provide a clear outline without
          affecting mouse users.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG21/Understanding/focus-visible">2.4.7 Focus Visible</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G149">G149</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G165">G165</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G195">G195</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/css/C15">C15</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG21/Techniques/css/C40">C40</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR31">SCR31</a>
          </li>
        </ul>

        <CodeExample
          language="css"
          code={`a:focus-visible,
button:focus-visible {
  outline: 2px solid #000;
  outline-offset: 2px;
}`}
          previewCode={`<a href="#">Everyday Accessibility</a><br/><br/>
❌ No outline on focus<br/>
<a class="no-outline" href="#">Everyday Accessibility</a><br/><br/>
❌ Default outline on focus<br/>
<a class="outline-default" href="#">Everyday Accessibility</a><br/><br/>
⭕️ Visible outline on focus<br/>
<a class="outline" href="#">Everyday Accessibility</a>`}
          previewSize="narrow"
        />
      </section>

      <section className="example">
        <h2>Links Opening in a New Tab or Window</h2>
        <p>
          Opening a link in a new tab changes browsing context. If it happens without warning, it can be disorienting. When a link opens in a new tab, say so in the visible text or accessible name.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG21/Understanding/on-focus">3.2.1 On Focus</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G200">G200</a>, <a href="https://www.w3.org/WAI/WCAG21/Techniques/general/G201">G201</a>
          </li>
        </ul>

        <CodeExample
          code={`❌ <a href="#" target="_blank" rel="noopener noreferrer">
     Everyday Accessibility
   </a>

⭕️ <a href="#" target="_blank" rel="noopener noreferrer">
     Everyday Accessibility (opens in a new tab)
   </a>

⭕️ <a href="#" target="_blank" rel="noopener noreferrer"
     aria-label="Everyday Accessibility (opens in a new tab)">
     Everyday Accessibility
   </a>

⭕️ <a href="#" target="_blank" rel="noopener noreferrer">
     Everyday Accessibility
     <span class="visually-hidden">(opens in a new tab)</span>
   </a>`}
          showPreview={false}
          showCopyBtn={false}
        />
      </section>

      <section className="example">
        <h2>Common Cases</h2>

        <h3>Case: “Read more” Links in Card Layouts</h3>
        <p>Cards often repeat generic link text and rely on nearby visuals to explain the destination. That context disappears for screen reader users.</p>

        <CodeExample
          code={`<div class="card">
  <h3>Why accessibility improves usability for everyone</h3>
  <p>
    Clear structure, predictable interactions, and better keyboard support
    make interfaces easier to use.
  </p>
  <a href="#">Read more</a> ⚠️
</div>

❌ <a href="#">Read more</a>
⭕️ <a href="#" aria-label="Read more about why accessibility improves usability">Read more</a>
⭕️ <a href="#">
     Read more
     <span class="visually-hidden">about why accessibility improves usability</span>
   </a>`}
          showPreview={false}
          showCopyBtn={false}
        />

        <ul>
          <li>
            <strong>The problem:</strong> Generic link text has no meaning out of context.
          </li>
          <li>
            <strong>Why it matters:</strong> Screen reader users often navigate using a list of links.
          </li>
          <li>
            <strong>The fix:</strong> Describe the destination in the accessible name while keeping the visual label short.
          </li>
        </ul>

        <h3>Case: Icon-Only Buttons with No Label</h3>
        <p>Icons alone rely on interpretation. Without a label, controls are announced without context.</p>

        <CodeExample
          code={`❌ <a href="#"><i class="fa fa-email"></i></a>
⭕️ <a href="#" aria-label="Send us an email">
     <i class="fa fa-email" aria-hidden="true"></i>
   </a>

❌ <button>x</button>
⭕️ <button aria-label="Close dialog">x</button>
⭕️ <button>
     <span aria-hidden="true">x</span>
     <span class="visually-hidden">Close dialog</span>
   </button>`}
          showPreview={false}
          showCopyBtn={false}
        />

        <ul>
          <li>
            <strong>The problem:</strong> Icon-only controls have no accessible name.
          </li>
          <li>
            <strong>Why it matters:</strong> Users cannot understand the action before activating it.
          </li>
          <li>
            <strong>The fix:</strong> Provide a clear accessible name and hide decorative icons.
          </li>
        </ul>
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>Buttons perform actions, links navigate.</li>
          <li>
            Interactive elements are never <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code>.
          </li>
          <li>Focus styles are visible and intentional.</li>
          <li>Links that open new tabs communicate this change.</li>
          <li>Icon-only controls have accessible names.</li>
        </ul>
      </section>
    </div>
  )
}
