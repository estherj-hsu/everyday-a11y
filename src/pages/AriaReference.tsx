import './AriaReference.scss'
import CodeExample from '../components/CodeExample'

export default function AriaReference() {
  return (
    <div>
      <h1>ARIA Reference</h1>
      <p>ARIA supplements HTML semantics when native elements cannot express what is needed. Use it sparingly. Wrong ARIA is worse than none.</p>

      <section className="example">
        <h2>Roles vs Native HTML</h2>
        <p>
          Native HTML elements carry implicit ARIA roles. Prefer the native element whenever it exists. A <code>&lt;button&gt;</code> provides keyboard handling, focus management, and the correct role
          for free. A <code>&lt;div role="button"&gt;</code> requires all of that to be rebuilt manually.
        </p>

        <table className="aria-table">
          <thead>
            <tr>
              <th scope="col">Native HTML</th>
              <th scope="col">ARIA role</th>
              <th scope="col">Notes</th>
              <th scope="col">Pattern</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>&lt;button&gt;</code>
              </td>
              <td>
                <code>role="button"</code>
              </td>
              <td>Always prefer the native element</td>
              <td>
                <a href="/patterns/buttons-links">Buttons &amp; Links</a>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;a href&gt;</code>
              </td>
              <td>
                <code>role="link"</code>
              </td>
              <td>
                Without <code>href</code>, it is not a link
              </td>
              <td>
                <a href="/patterns/buttons-links">Buttons &amp; Links</a>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;input type="checkbox"&gt;</code>
              </td>
              <td>
                <code>role="checkbox"</code>
              </td>
              <td>
                Custom role requires <code>aria-checked</code> managed manually
              </td>
              <td>
                <a href="/patterns/forms">Forms</a>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;ul&gt;</code> / <code>&lt;ol&gt;</code>
              </td>
              <td>
                <code>role="list"</code>
              </td>
              <td>
                Safari + VoiceOver removes list semantics when <code>list-style</code> is removed in CSS
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <code>&lt;nav&gt;</code>
              </td>
              <td>
                <code>role="navigation"</code>
              </td>
              <td>Identical semantics; use the element</td>
              <td>
                <a href="/patterns/landmarks">Landmarks</a>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;main&gt;</code>
              </td>
              <td>
                <code>role="main"</code>
              </td>
              <td>Identical semantics; use the element</td>
              <td>
                <a href="/patterns/landmarks">Landmarks</a>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;header&gt;</code> (body child)
              </td>
              <td>
                <code>role="banner"</code>
              </td>
              <td>
                Only maps to <code>banner</code> when a direct child of <code>&lt;body&gt;</code>
              </td>
              <td>
                <a href="/patterns/landmarks">Landmarks</a>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;footer&gt;</code> (body child)
              </td>
              <td>
                <code>role="contentinfo"</code>
              </td>
              <td>
                Same scoping rule as <code>banner</code>
              </td>
              <td>
                <a href="/patterns/landmarks">Landmarks</a>
              </td>
            </tr>
            <tr>
              <td>None</td>
              <td>
                <code>role="tab"</code> / <code>role="tablist"</code>
              </td>
              <td>No native equivalent; requires full ARIA + keyboard implementation</td>
              <td>
                <a href="/patterns/tabs">Tabs</a>
              </td>
            </tr>
            <tr>
              <td>
                <code>&lt;dialog&gt;</code>
              </td>
              <td>
                <code>role="dialog"</code>
              </td>
              <td>
                Native <code>&lt;dialog&gt;</code> is now well-supported; prefer it
              </td>
              <td>
                <a href="/patterns/modal-dialog">Modal Dialog</a>
              </td>
            </tr>
            <tr>
              <td>None</td>
              <td>
                <code>role="listbox"</code> / <code>role="option"</code>
              </td>
              <td>
                No native equivalent for a custom list of selectable options. Each <code>option</code> needs <code>aria-selected</code>; the <code>listbox</code> needs a label.
              </td>
              <td>
                <a href="/patterns/combobox">Combobox</a>, <a href="/patterns/forms">Forms</a>
              </td>
            </tr>
            <tr>
              <td>None</td>
              <td>
                <code>role="alert"</code>
              </td>
              <td>
                Equivalent to <code>aria-live="assertive"</code>. Interrupts the screen reader immediately. Reserve for urgent, blocking messages.
              </td>
              <td>
                <a href="/patterns/live-region">Live Region</a>
              </td>
            </tr>
            <tr>
              <td>None</td>
              <td>
                <code>role="status"</code>
              </td>
              <td>
                Equivalent to <code>aria-live="polite"</code>. Announces after the user finishes their current action. Use for confirmations and non-critical updates.
              </td>
              <td>
                <a href="/patterns/live-region">Live Region</a>
              </td>
            </tr>
          </tbody>
        </table>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>
          </li>
          <li>
            <strong>ARIA Spec</strong>{' '}
            <a href="https://www.w3.org/TR/wai-aria/#roles_categorization" target="_blank" rel="noopener noreferrer" aria-label="WAI-ARIA Roles categorization (opens in a new tab)">
              WAI-ARIA Roles
            </a>
          </li>
        </ul>
      </section>

      <section className="example">
        <h2>States and Properties</h2>
        <p>States are dynamic and change as users interact. Properties describe relationships and are typically set once.</p>

        <h3>aria-expanded</h3>
        <p>
          Signals whether a collapsible region is open or closed. Set on the trigger element, not the panel. See{' '}
          <a href="/patterns/accordions">Accordions</a> and <a href="/patterns/navigation">Navigation</a> for implementation examples.
        </p>

        <h3>aria-selected</h3>
        <p>
          Selected state for tabs, listbox options, and grid cells. Every item in the set needs this attribute — selected gets <code>true</code>, all others get <code>false</code>. Do not substitute{' '}
          <code>aria-checked</code>. See <a href="/patterns/tabs">Tabs</a>.
        </p>

        <h3>aria-checked</h3>
        <p>
          Checked state for custom checkbox and radio implementations. Native <code>&lt;input type="checkbox"&gt;</code> manages this automatically; only needed for custom controls. The third value,{' '}
          <code>"mixed"</code>, represents an indeterminate state — most commonly a "select all" checkbox where some but not all items in a group are selected. See{' '}
          <a href="/patterns/forms">Forms</a> for custom field examples.
        </p>
        <CodeExample
          code={`<div role="checkbox" aria-checked="false" tabindex="0">Accept terms</div>

<!-- Indeterminate: some but not all child items are selected -->
<div role="checkbox" aria-checked="mixed" tabindex="0">Select all</div>`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>aria-pressed</h3>
        <p>
          Toggle state for buttons that switch between two modes: mute/unmute, bold/unbold, bookmark on/off. Unlike <code>aria-checked</code>, which belongs to checkbox and radio roles,{' '}
          <code>aria-pressed</code> belongs to the button role. See <a href="/patterns/buttons-links">Buttons &amp; Links</a>.
        </p>

        <h3>aria-disabled</h3>
        <p>
          Unlike the native <code>disabled</code> attribute, <code>aria-disabled="true"</code> keeps the element in the tab order and visible in the accessibility tree. Use it when users benefit from
          knowing the control exists — for example, a Save button that becomes active once required fields are filled. Block the interaction in JavaScript; do not rely on the attribute alone.
        </p>
        <CodeExample
          code={`<!-- Native disabled: removed from tab order, skipped by screen readers -->
<button disabled>Save</button>

<!-- aria-disabled: still focusable, still announced -->
<button aria-disabled="true">Save</button>
<!-- Block the action in a click/keydown handler -->`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>aria-hidden</h3>
        <p>
          Removes an element from the accessibility tree entirely. Use for decorative icons, presentational images, or text that duplicates an already-announced label. Never place on a focusable element
          — it stays in the tab order but the screen reader has nothing to announce. See <a href="/patterns/buttons-links">Buttons &amp; Links</a> for icon button examples.
        </p>

        <h3>aria-live</h3>
        <p>
          Announces dynamic content changes without moving focus. The region element must exist in the DOM before content is injected, not added alongside the message. See{' '}
          <a href="/patterns/live-region">Live Region</a> for implementation details and screen reader behavior.
        </p>
        <CodeExample
          code={`<!-- polite: waits for the user to finish; use for confirmations, search results -->
<div aria-live="polite" aria-atomic="true"></div>

<!-- assertive: interrupts immediately; reserve for urgent blocking errors -->
<div aria-live="assertive" aria-atomic="true"></div>`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>aria-label</h3>
        <p>
          Provides an accessible name as a plain string. Overrides all other name sources including child text content. Use only when no visible label exists. If visible text is present, the label must
          start with that text — voice control users activate elements by speaking what they see. See <a href="/patterns/buttons-links">Buttons &amp; Links</a>.
        </p>

        <h3>aria-labelledby</h3>
        <p>
          Points to the <code>id</code> of an existing visible element whose text becomes the accessible name. Preferred over <code>aria-label</code> when a label is already on screen — stays in sync
          automatically. Multiple ids can be space-separated; the browser concatenates them in order, which is useful when a name needs to combine two elements.
        </p>
        <CodeExample
          code={`<!-- Single reference: section labelled by its heading -->
<h2 id="billing-heading">Billing Address</h2>
<section aria-labelledby="billing-heading">...</section>

<!-- Multiple ids: combines "Quantity" + "Running Shoes" as the input name -->
<span id="qty-label">Quantity</span>
<span id="product-name">Running Shoes</span>
<input type="number" aria-labelledby="qty-label product-name" />`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>aria-describedby</h3>
        <p>
          Points to supplementary content read after the element's name and role: format hints, constraints, or error messages. Always pair with <code>aria-invalid</code> when pointing to an error
          message. See <a href="/patterns/forms">Forms</a> for full validation examples.
        </p>

        <h3>aria-controls</h3>
        <p>
          References the element a control affects. Used in <a href="/patterns/tabs">Tabs</a> and <a href="/patterns/accordions">Accordions</a> to associate a trigger with its panel. Browser and screen
          reader support is inconsistent — treat it as supplementary context, not a primary labeling mechanism.
        </p>

        <h3>aria-required and aria-invalid</h3>
        <p>
          <code>aria-required</code> signals a mandatory field. Prefer the native <code>required</code> attribute — it triggers built-in browser validation automatically.{' '}
          <code>aria-invalid</code> marks a field that has failed validation; set it only after the user has submitted or left the field, not on page load. Always pair with{' '}
          <code>aria-describedby</code> pointing to the visible error message. See <a href="/patterns/forms">Forms</a>.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/error-identification">3.3.1 Error Identification</a>
          </li>
          <li>
            <strong>ARIA Spec</strong>{' '}
            <a href="https://www.w3.org/TR/wai-aria/#states_and_properties" target="_blank" rel="noopener noreferrer" aria-label="WAI-ARIA States and Properties (opens in a new tab)">
              WAI-ARIA States and Properties
            </a>
          </li>
        </ul>
      </section>

      <section className="example">
        <h2>What Not to Do</h2>

        <h3>Replacing native semantics with role</h3>
        <p>
          An explicit <code>role</code> replaces an element's implicit role entirely. An <code>&lt;h2 role="tab"&gt;</code> is no longer a heading to a screen reader.
        </p>
        <CodeExample
          code={`❌ <h2 role="tab">Settings</h2>
   <!-- heading semantics gone — screen readers announce it as a tab only -->

⭕️ <div role="tab" aria-selected="false" tabindex="0">Settings</div>
   <!-- headings belong inside tab panels, not on the tab triggers -->`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>Redundant role on a native element</h3>
        <p>Native elements already carry their implicit role. Restating it adds noise and signals the element may have been built without understanding how ARIA works.</p>
        <CodeExample
          code={`❌ <button role="button">Submit</button>
❌ <nav role="navigation">...</nav>

⭕️ <button>Submit</button>
⭕️ <nav>...</nav>`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>aria-hidden on a focusable element</h3>
        <p>
          <code>aria-hidden="true"</code> removes an element from the accessibility tree but not from the tab order. A keyboard user can focus it; the screen reader has nothing to announce.
        </p>
        <CodeExample
          code={`❌ <button aria-hidden="true">Open menu</button>
   <!-- reachable by Tab, invisible to screen readers -->

⭕️ <button>Open menu</button>
   <!-- if truly decorative, also add tabindex="-1" to remove from tab order -->`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>aria-label that does not start with the visible text</h3>
        <p>
          Voice control users activate elements by speaking what they see. If <code>aria-label</code> does not start with the visible text, saying the visible label will not match the element.
          For icon-only buttons and other labeling cases, see <a href="/patterns/buttons-links">Buttons &amp; Links</a>.
        </p>
        <CodeExample
          code={`❌ <button aria-label="Submit the registration form">Send</button>
   <!-- voice control: "Click Send" will not match "Submit the registration form" -->

⭕️ <button aria-label="Send registration">Send</button>
   <!-- starts with the visible text "Send" — voice control matches -->`}
          showPreview={false}
          showCopyBtn={false}
        />

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name">2.5.3 Label in Name</a>
          </li>
          <li>
            <strong>ARIA Spec</strong>{' '}
            <a href="https://www.w3.org/TR/wai-aria-practices/" target="_blank" rel="noopener noreferrer" aria-label="ARIA Authoring Practices Guide (opens in a new tab)">
              ARIA Authoring Practices Guide
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
