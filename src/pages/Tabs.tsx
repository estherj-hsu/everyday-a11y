import './Tabs.scss'
import CodeExample from '../components/CodeExample'

export default function Tabs() {
  return (
    <div className="component-page">
      <h1>Tabs</h1>
      <p>
        Tabs switch between related views within the same context, showing one panel at a time. They work best when users need to compare or switch between closely related content without navigating
        away.
      </p>
      <p>
        <mark>Tabs are not just styled buttons.</mark> They come with strict keyboard behavior and state management requirements. If you cannot meet those expectations, another pattern may be a better
        fit.
      </p>

      <section className="example">
        <h2>Basic Tabs Pattern</h2>
        <p>A standard tabs pattern exposes one panel at a time. Only the active tab is focusable, and arrow keys move focus between tabs.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Tabs must be grouped inside a container with role <code>tablist</code>.
          </li>
          <li>
            Each tab must be a real interactive element with role <code>tab</code>, and must live inside the <code>tablist</code>.
          </li>
          <li>
            Each tab must control exactly one panel via <code>aria-controls</code>.
          </li>
          <li>
            Each panel must have role <code>tabpanel</code> and reference its tab using <code>aria-labelledby</code>.
          </li>
          <li>
            The active tab must have <code>aria-selected="true"</code>; all inactive tabs must have it set to <code>false</code>.
          </li>
          <li>
            Only the active tab should be reachable with the Tab key. Inactive tabs must be skipped using <code>tabindex="-1"</code>.
          </li>
          <li>
            Tabs must support <mark>looping arrow key navigation</mark> (Left and Right Arrow for horizontal tabs).
          </li>
          <li>
            The tablist must have an accessible name via <code>aria-label</code> or <code>aria-labelledby</code>.
          </li>
          <li>Focus must remain visible and predictable at all times.</li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>; <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible">2.4.7 Focus Visible</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>
          </li>
        </ul>

        <CodeExample
          code={`<div role="tablist" aria-label="Tabs Heading">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
  <button
    role="tab"
    id="tab-2"
    aria-selected="false"
    aria-controls="panel-2"
    tabindex="-1">
    Tab 2
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <p>Tab 1 Panel</p>
</div>

<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <p>Tab 2 Panel</p>
</div>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Use Left and Right Arrow keys to move between tabs.
</p>

<div class="tabs">
  <div role="tablist" aria-label="Puppy Care Guide">
    <button
      role="tab"
      id="tab-feeding"
      aria-selected="true"
      aria-controls="panel-feeding">
      Feeding
    </button>
    <button
      role="tab"
      id="tab-training"
      aria-selected="false"
      aria-controls="panel-training"
      tabindex="-1">
      Training
    </button>
    <button
      role="tab"
      id="tab-sleep"
      aria-selected="false"
      aria-controls="panel-sleep"
      tabindex="-1">
      Sleep
    </button>
  </div>

  <div
    role="tabpanel"
    id="panel-feeding"
    aria-labelledby="tab-feeding">
    <p class="text-small">
      Puppies need regular meals and consistent schedules to stay healthy.
    </p>
  </div>

  <div
    role="tabpanel"
    id="panel-training"
    aria-labelledby="tab-training"
    hidden>
    <p class="text-small">
      Short, positive training sessions work better than long ones.
    </p>
  </div>

  <div
    role="tabpanel"
    id="panel-sleep"
    aria-labelledby="tab-sleep"
    hidden>
    <p class="text-small">
      Most puppies sleep a lot. A predictable routine helps them settle.
    </p>
  </div>
</div>`}
        />
      </section>

      <section className="example">
        <h2>Vertical Tabs</h2>
        <p>
          Vertical tabs place the tab list beside the content. When tabs are arranged vertically, set <code>aria-orientation="vertical"</code> so arrow key behavior is interpreted correctly.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Tabs must support <mark>looping arrow key navigation</mark> using the Up and Down Arrow keys.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification">3.2.4 Consistent Identification</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>
          </li>
        </ul>

        <CodeExample
          code={`<div
  role="tablist"
  aria-label="Tabs Heading"
  aria-orientation="vertical">
  ...
</div>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Use Up and Down Arrow keys to move between tabs.
</p>

<div class="tabs tabs--vertical">
  <div
    role="tablist"
    aria-label="Puppy Care Guide"
    aria-orientation="vertical">
    <button
      role="tab"
      id="tab-feeding"
      aria-selected="true"
      aria-controls="panel-feeding">
      Feeding
    </button>
    <button
      role="tab"
      id="tab-training"
      aria-selected="false"
      aria-controls="panel-training"
      tabindex="-1">
      Training
    </button>
    <button
      role="tab"
      id="tab-sleep"
      aria-selected="false"
      aria-controls="panel-sleep"
      tabindex="-1">
      Sleep
    </button>
  </div>

  <div
    role="tabpanel"
    id="panel-feeding"
    aria-labelledby="tab-feeding">
    <p class="text-small">
      Puppies need regular meals and consistent schedules to stay healthy.
    </p>
  </div>

  <div
    role="tabpanel"
    id="panel-training"
    aria-labelledby="tab-training"
    hidden>
    <p class="text-small">
      Short, positive training sessions work better than long ones.
    </p>
  </div>

  <div
    role="tabpanel"
    id="panel-sleep"
    aria-labelledby="tab-sleep"
    hidden>
    <p class="text-small">
      Most puppies sleep a lot. A quiet routine helps them settle.
    </p>
  </div>
</div>`}
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>
            Tabs are grouped in a <code>role="tablist"</code>.
          </li>
          <li>
            Only the active tab is focusable with <kbd>Tab</kbd>.
          </li>
          <li>Arrow keys move focus between tabs.</li>
          <li>
            <code>aria-selected</code> updates correctly as the active tab changes.
          </li>
          <li>Hidden panels contain no focusable content.</li>
        </ul>
      </section>
    </div>
  )
}
