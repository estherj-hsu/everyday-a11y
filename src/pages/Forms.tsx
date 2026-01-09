import './Forms.scss'
import CodeExample from '../components/CodeExample'

export default function Forms() {
  return (
    <div>
      <h1>Forms</h1>
      <p>Forms fail quietly when labels, grouping, or instructions are missing. When controls are not labeled correctly, users are forced to guess.</p>

      <section className="example">
        <h2>Labeling Form Controls</h2>

        <p>
          Every form control needs a programmatic label. <mark>Visual proximity is not enough.</mark> If a label is not associated in the markup, assistive technologies cannot announce it reliably.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Use a native <code>&lt;label&gt;</code> element whenever possible.
          </li>
          <li>
            The label’s <code>for</code> must exactly match the control’s <code>id</code>.
          </li>
          <li>
            <mark>Placeholder text must never replace a label.</mark>
          </li>
          <li>
            Use ARIA labeling only when a native <code>&lt;label&gt;</code> cannot exist.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content">1.1.1 Non-text Content</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels">2.4.6 Headings and Labels</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions">3.3.2 Labels or Instructions</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G131">G131</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G162">G162</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G167">G167</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H44">H44</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H65">H65</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H93">H93</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6">ARIA6</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA9">ARIA9</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16">ARIA16</a>
          </li>
        </ul>

        <CodeExample
          code={`<!-- Never use placeholder as the only label -->
❌ <input type="email" placeholder="Email" />

⭕️ <label for="email">Email</label>
   <input id="email" type="email" />

<!-- Visually hidden label -->
⭕️ <label for="search" class="visually-hidden">Search</label>
   <input id="search" type="search" />
   <button type="submit">Search</button>

<!-- Use ARIA only when a label cannot exist -->
⭕️ <input type="search" aria-label="Search" />

<!-- Context-based labeling -->
⭕️ <h3 id="product-1">Product A</h3>
   <button id="add-1" aria-labelledby="add-1 product-1">
     Add to cart
   </button>`}
          showPreview={false}
          showCopyBtn={false}
        />
      </section>

      <section className="example">
        <h2>Grouping Related Inputs</h2>

        <p>
          Grouping related inputs provides context that individual labels cannot. When users enter or leave a group, screen readers announce the group label, making complex forms easier to understand.
        </p>

        <p>
          <mark>Always use native grouping first.</mark> <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> provide reliable semantics without extra logic.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>Group inputs that share a common purpose.</li>
          <li>
            Use <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> whenever possible.
          </li>
          <li>
            Keep <code>&lt;legend&gt;</code> text short and descriptive.
          </li>
          <li>Do not repeat the legend text inside individual labels.</li>
          <li>
            Use ARIA grouping (<code>role="group"</code>) only when native grouping is not possible.
          </li>
          <li>Ensure grouped inputs are adjacent in the DOM.</li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels">2.4.6 Headings and Labels</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions">3.3.2 Labels or Instructions</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H71">H71</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H85">H85</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA9">ARIA9</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16">ARIA16</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA17">ARIA17</a>
          </li>
        </ul>

        <h3>Text Inputs (First and Last Name)</h3>
        <CodeExample
          code={`<!-- Never leave related fields ungrouped -->
❌ <div>
     <label for="first-name">First name</label>
     <input id="first-name" type="text" />
     <label for="last-name">Last name</label>
     <input id="last-name" type="text" />
   </div>

<!-- Preferred: native grouping with fieldset + legend -->
⭕️ <fieldset>
     <legend>Name</legend>
     <label for="first-name">First name</label>
     <input id="first-name" type="text" />
     <label for="last-name">Last name</label>
     <input id="last-name" type="text" />
   </fieldset>`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h3>Radio Buttons and Checkboxes</h3>
        <p>
          Radio buttons and checkboxes almost always belong to a set. Each option needs its own label, but users also need to understand the <mark>question</mark> those options answer.
        </p>
        <p>Group related options so assistive technologies can announce the start, context, and end of the group.</p>

        <CodeExample
          code={`<!-- Group related options with fieldset + legend -->
⭕️ <fieldset>
     <legend>Choose your availability</legend>
     <label>
       <input type="checkbox" name="availability" value="morning" />
       Morning
     </label>
     <label>
       <input type="checkbox" name="availability" value="afternoon" />
       Afternoon
     </label>
     <label>
       <input type="checkbox" name="availability" value="evening" />
       Evening
     </label>
   </fieldset>

<!-- Use ARIA grouping only when fieldset cannot be used -->
⭕️ <p id="availability-group"><strong>Choose your availability</strong></p>
   <div role="group" aria-labelledby="availability-group">
     <label>
       <input type="checkbox" /> Morning
     </label>
     <label>
       <input type="checkbox" /> Afternoon
     </label>
     <label>
       <input type="checkbox" /> Evening
     </label>
   </div>`}
          showPreview={false}
          showCopyBtn={false}
        />
      </section>
    </div>
  )
}
