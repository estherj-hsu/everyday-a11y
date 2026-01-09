import './Landmarks.scss'
import CodeExample from '../components/CodeExample'

export default function Landmarks() {
  return (
    <div className="component-page">
      <h1>Landmarks</h1>

      <p>
        Landmarks define the high-level structure of a page. They identify major regions like header, navigation, main content, and footer, allowing users to move through a page by structure instead
        of scrolling.
      </p>

      <p>
        <mark>Landmarks expose structure, not layout.</mark> They are independent of styling, positioning, or visual grouping.
      </p>

      <section className="example">
        <h2>Core Page Landmarks</h2>

        <ul>
          <li>Use semantic HTML elements whenever possible.</li>
          <li>Use ARIA landmark roles only when semantic elements cannot be used.</li>
          <li>All meaningful page content should live inside a landmark.</li>
          <li>
            Only one <code>&lt;main&gt;</code> per page.
          </li>
          <li>
            <code>&lt;header&gt;</code> and <code>&lt;footer&gt;</code> are landmarks only when they are direct children of <code>&lt;body&gt;</code>.
          </li>
          <li>
            Multiple <code>&lt;nav&gt;</code> landmarks must be labeled.
          </li>
          <li>
            <code>&lt;section&gt;</code> must have a heading. Use <code>&lt;div&gt;</code> if no heading is needed.
          </li>
          <li>
            <mark>Fewer landmarks are better.</mark> Too many reduce their usefulness.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks">2.4.1 Bypass Blocks</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G140">G140</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11">ARIA11</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6">ARIA6</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H69">H69</a>
          </li>
        </ul>

        <CodeExample
          code={`<body>
  <header>
    <nav aria-label="Primary Navigation">
      ...
    </nav>
    <nav aria-label="Secondary Navigation">
      ...
    </nav>
    <form role="search">...</form>
  </header>

  <main>
    <h1>Page Title</h1>
    <section>
      <h2>Section Heading</h2>
      <article>...</article>
    </section>
  </main>

  <footer>...</footer>
</body>`}
          previewCode={`<div class="sample-body">
  <header>
    <nav class="nav-main text-small" aria-label="Primary Navigation">
      Primary Navigation
    </nav>

    <nav class="nav-secondary text-small" aria-label="Secondary Navigation">
      Secondary Navigation
    </nav>

    <form role="search">
      <label class="text-small">Search</label>
      <input type="search" />
    </form>
  </header>

  <div class="main">
    <h2>Page Title</h2>

    <section>
      <h3>Section Heading</h3>
      <article>
        Article content goes here.
      </article>
    </section>
  </div>

  <footer>
    Footer
  </footer>
</div>`}
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>
            There is exactly one <code>&lt;main&gt;</code> landmark on the page.
          </li>
          <li>
            All meaningful content is contained within a landmark region (such as <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, or{' '}
            <code>&lt;aside&gt;</code>).
          </li>
          <li>
            Multiple <code>&lt;nav&gt;</code> landmarks are each given a unique accessible label using <code>aria-label</code> to describe their purpose.
          </li>
          <li>Each section uses a heading to define its purpose for users and assistive technologies.</li>
          <li>Landmarks are never used solely for styling; they clearly communicate the structure of the page and contain meaningful content.</li>
        </ul>
      </section>
    </div>
  )
}
