import './Navigation.scss'
import CodeExample from '../components/CodeExample'

export default function Navigation() {
  return (
    <div>
      <h1>Navigation</h1>
      <p>Navigation helps users understand where they are and where they can go. It should be predictable, consistent, and easy to scan.</p>
      <p>
        <mark>Good navigation is mostly about structure, not interaction.</mark> Use semantic HTML first. Add behavior only when it earns its keep.
      </p>

      <section className="example">
        <h2>Skip to Content</h2>
        <p>
          <mark>Skip links let users bypass repeated navigation.</mark> They should be the first focusable element on the page and become visible when focused.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>The skip link should be the first focusable element in the DOM.</li>
          <li>It must move focus to a meaningful landmark or main heading.</li>
          <li>
            The target must be programmatically focusable (for example, <code>tabindex="-1"</code> on <code>&lt;main&gt;</code>) so focus moves reliably across browsers.
          </li>
          <li>
            It should be <mark>visually hidden until focused</mark>, not removed from the DOM.
          </li>
        </ul>

        <CodeExample
          code={`<a href="#main" class="skip-link">Skip to Content</a>

<nav aria-label="Primary Navigation">
  ...
</nav>

<main id="main" tabIndex="-1">
  <h1>Page Title</h1>
</main>`}
          previewCode={`<a href="#preview-main" class="skip-link">Skip to Content</a>
<nav class="sample-nav" aria-label="Primary">
  <ul class="nav">
    <li><a href="#" aria-current="page">Home</a></li>
    <li><a href="#">Patterns</a></li>
    <li><a href="#">Foundations</a></li>
    <li><a href="#">Check & Fix</a></li>
  </ul>
</nav>
<main id="preview-main" tabIndex="-1">
  <h1 class="h2">Homepage</h1>
  <p class="preview-hint text-small">
    💡 Use Tab to reveal the Skip to Content link
  </p>
</main>`}
        />
      </section>

      <section className="example">
        <h2>Single-level Navigation</h2>
        <p>Single-level navigation lists top-level destinations without nesting. It is the simplest and most robust form of site navigation.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Use the <code>&lt;nav&gt;</code> element to identify navigation regions.
          </li>
          <li>
            Use <code>aria-label</code> on <code>&lt;nav&gt;</code> when multiple navigation regions exist.
          </li>
          <li>Navigation landmarks allow users to jump directly to site navigation.</li>
          <li>
            Navigation items must be real <code>&lt;a&gt;</code> elements, not buttons.
          </li>
          <li>
            Indicate the current page with <code>aria-current="page"</code>.
          </li>
          <li>Navigation order should match visual order.</li>
          <li>
            <mark>Arrow keys are not required.</mark> Single-level navigation relies on Tab and Shift + Tab.
          </li>
        </ul>

        <h3>Dev Notes</h3>
        <p>
          Navigation can be horizontal or vertical. Orientation does not change keyboard behavior, and <code>aria-orientation</code> is not required.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/location">2.4.8 Location</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H97">H97</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G128">G128</a>
          </li>
        </ul>

        <CodeExample
          code={`<nav aria-label="Primary Navigation">
  <ul>
    <li>
      <a href="/" aria-current="page">Home</a>
    </li>
    <li>...</li>
  </ul>
</nav>`}
          previewCode={`<nav class="sample-nav" aria-label="Sample Navigation">
  <ul class="nav">
    <li>
      <a href="#" aria-current="page">Home</a>
    </li>
    <li><a href="#">Patterns</a></li>
    <li><a href="#">Foundations</a></li>
    <li><a href="#">Check & Fix</a></li>
  </ul>
</nav>`}
        />
      </section>

      <section className="example">
        <h2>Dropdown Navigation</h2>
        <p>
          Dropdowns reveal secondary links. <mark>In site navigation, treat this as disclosure</mark>, not an application-style menu.
        </p>

        <p>
          Use a real <code>&lt;button&gt;</code> to toggle visibility and real <code>&lt;a&gt;</code> elements for navigation.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            The toggle must be a real <code>&lt;button&gt;</code>.
          </li>
          <li>
            Use <code>aria-expanded</code> on the toggle to reflect state.
          </li>
          <li>The dropdown content should remain in normal DOM order.</li>
          <li>Keyboard users must be able to Tab in and out naturally.</li>
          <li>
            <mark>Arrow keys are optional.</mark> They are required only for application-style menus.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>
          </li>
        </ul>

        <CodeExample
          code={`<nav aria-label="Primary Navigation">
  <ul>
    <li>
      <a href="/" aria-current="page">Home</a>
    </li>
    <li>
      <button
        aria-expanded="false"
        aria-haspopup="true"
        aria-controls="item-subnav">
        Nav Item with Dropdown
      </button>
      <ul id="item-subnav" hidden>
        <li><a href="...">Dropdown item</a></li>
        <li><a href="...">Dropdown item</a></li>
      </ul>
    </li>
  </ul>
</nav>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Use Tab, Enter, and Escape to explore the dropdown.
</p>

<nav class="sample-nav" aria-label="Sample Navigation with Dropdowns">
  <ul class="nav">
    <li><a href="/" aria-current="page">Home</a></li>
    <li class="nav-item">
      <button aria-expanded="false" aria-haspopup="true" aria-controls="item-subnav">Dropdown 1</button>
      <ul class="subnav" id="item-subnav" hidden>
        <li><a href="#" class="text-small">Dropdown Item</a></li>
        <li><a href="#" class="text-small">Dropdown Item</a></li>
        <li><a href="#" class="text-small">Dropdown Item</a></li>
      </ul>
    </li>
  </ul>
</nav>

<p class="preview-hint text-small">
  💡 Arrow key support is included here as an enhancement.
</p>

<nav class="sample-nav" aria-label="Sample Navigation with Arrow Key Support">
  <ul class="nav">
    <li><a href="/" aria-current="page">Home</a></li>
    <li class="nav-item">
      <button aria-expanded="false" aria-haspopup="true" aria-controls="item-arrow-subnav">Dropdown</button>
      <ul class="subnav" id="item-arrow-subnav" data-arrow hidden>
        <li><a href="#" class="text-small">Dropdown Item</a></li>
        <li><a href="#" class="text-small">Dropdown Item</a></li>
        <li><a href="#" class="text-small">Dropdown Item</a></li>
      </ul>
    </li>
  </ul>
</nav>`}
        />
      </section>

      <section className="example">
        <h2>Breadcrumb Navigation</h2>
        <p>Breadcrumbs show where the current page sits in the site hierarchy. They provide context, not primary navigation.</p>

        <p>Breadcrumbs are especially helpful on deep or content-heavy sites, where users may arrive from search or external links.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Use a <code>&lt;nav&gt;</code> element with <code>aria-label="Breadcrumb"</code>.
          </li>
          <li>
            Breadcrumbs should reflect the <mark>structural hierarchy</mark>, not browsing history. Use an ordered list (<code>&lt;ol&gt;</code>).
          </li>
          <li>Each breadcrumb item should be a real link, except for the current page.</li>
          <li>
            Indicate the current page with <code>aria-current="page"</code>.
          </li>
          <li>Normal Tab navigation is sufficient.</li>
          <li>
            <mark>Visual separators must be decorative</mark> and added via CSS.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/location">2.4.8 Location</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context">2.4.4 Link Purpose (In Context)</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G128">G128</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11">ARIA11</a>
          </li>
        </ul>

        <CodeExample
          code={`<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="#">Parent Page</a></li>
    <li aria-current="page">
      <span>Child Page</span>
    </li>
  </ol>
</nav>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Use Tab to move through breadcrumb links.
  The current page is announced but not interactive.
</p>

<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="#">Parent Page</a></li>
    <li aria-current="page">
      <span>Child Page</span>
    </li>
  </ol>
</nav>`}
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <h3>Skip Link</h3>
        <ul className="quick-check">
          <li>
            A <code>Skip to main content</code> link is the first focusable element on the page.
          </li>
          <li>
            The skip link becomes <strong>visible when focused</strong> (using CSS).
          </li>
          <li>
            The link moves focus directly to a <strong>meaningful landmark</strong> (e.g., <code>&lt;main&gt;</code>).
          </li>
          <li>
            The skip target has <code>tabIndex="-1"</code> to ensure it is programmatically focusable.
          </li>
          <li>The skip link works consistently across browsers and assistive technologies.</li>
        </ul>

        <h3>Navigation</h3>
        <ul className="quick-check">
          <li>
            Navigation is wrapped in a <code>&lt;nav&gt;</code> landmark.
          </li>
          <li>
            The current page uses <code>aria-current="page"</code>.
          </li>
          <li>Keyboard navigation follows visual order.</li>
          <li>
            Dropdown toggles are <code>&lt;button&gt;</code> elements, not links.
          </li>
          <li>Arrow keys are used only when necessary.</li>
        </ul>

        <h3>Breadcrumbs</h3>
        <ul className="quick-check">
          <li>
            Breadcrumbs reflect the <strong>site structure</strong>, not the user's history.
          </li>
          <li>
            The <strong>current page</strong> is not a link and has <code>aria-current="page"</code> set.
          </li>
          <li>
            <strong>Separators</strong> (e.g., <code>/</code>) are marked as <code>aria-hidden="true"</code> or with <code>role="presentation"</code> so they are ignored by assistive technologies.
          </li>
          <li>
            Navigation order matches the <strong>visual order</strong> of breadcrumb items.
          </li>
        </ul>
      </section>
    </div>
  )
}
