import { HashLink } from 'react-router-hash-link'
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
            The label's <code>for</code> must exactly match the control's <code>id</code>.
          </li>
          <li>
            <mark>Placeholder text must never replace a label.</mark>
          </li>
          <li>
            Use ARIA labeling only when a native <code>&lt;label&gt;</code> cannot exist.
          </li>
        </ul>

        <h3>Dev Notes</h3>
        <p>
          Input borders, focus indicators, and other boundaries that identify form controls must meet at <strong>least 3:1 contrast</strong> against adjacent colors. See also{' '}
          <HashLink to="/foundations#colour-contrast">Colour &amp; Contrast</HashLink>.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content">1.1.1 Non-text Content</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast">1.4.11 Non-text Contrast</a>;{' '}
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

        <h3>Textarea</h3>
        <p>
          <code>&lt;textarea&gt;</code> follows the same labeling rules as text inputs. Use hints and character count descriptions to guide users without relying on visual cues alone.
        </p>
        <ul>
          <li>
            Always pair with a <code>&lt;label&gt;</code>. Use <code>rows</code> to control visual height, but never rely on it to communicate what the field is for.
          </li>
          <li>
            Use <code>aria-describedby</code> to associate character limits or format instructions with the control.
          </li>
        </ul>
        <CodeExample
          code={`⭕️ <label for="bio">Bio</label>
   <textarea id="bio" rows="4" maxlength="200"
     aria-describedby="bio-hint"></textarea>
   <span id="bio-hint">Maximum 200 characters</span>`}
          previewCode={`<div class="field">
  <label for="p-bio">Bio</label>
  <textarea id="p-bio" rows="4" maxlength="200"
    aria-describedby="p-bio-hint"></textarea>
  <span id="p-bio-hint" class="hint">Maximum 200 characters</span>
</div>`}
          previewSize="narrow"
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
     <legend>Choose your favorite breed</legend>
     <label>
       <input type="checkbox" name="breed" value="golden" />
       Golden Retriever
     </label>
     ...
   </fieldset>

<!-- Use ARIA grouping only when fieldset cannot be used -->
⭕️ <p id="breed-group"><strong>Choose your favorite breed</strong></p>
   <div role="group" aria-labelledby="breed-group">
     <label>
       <input type="checkbox" /> Golden Retriever
     </label>
     ...
   </div>`}
          showPreview={false}
          showCopyBtn={false}
        />
        <h3>Custom Checkboxes and Radio Buttons</h3>
        <p>
          When native <code>&lt;input type="checkbox"&gt;</code> or <code>&lt;input type="radio"&gt;</code> cannot be used, the custom element must replicate their full behavior manually.
        </p>
        <ul>
          <li>
            Add the correct role: <code>role="checkbox"</code> or <code>role="radio"</code>.
          </li>
          <li>
            Manage <code>aria-checked</code> in JavaScript — set <code>true</code> or <code>false</code> on every state change. For a "select all" checkbox, use <code>"mixed"</code> when partially
            selected.
          </li>
          <li>
            Add <code>tabindex="0"</code> to make it keyboard focusable.
          </li>
          <li>
            Handle <kbd>Space</kbd> to toggle, and <kbd>↑</kbd> / <kbd>↓</kbd> to move between options in a radio group.
          </li>
          <li>Wrap the group in a fieldset with a legend, same as native inputs.</li>
        </ul>
        <CodeExample
          code={`<fieldset>
  <legend>Notification preferences</legend>
  <div role="checkbox" aria-checked="false" tabindex="0"
    onkeydown="if(e.key===' ')toggleCheck(this)">
    Email
  </div>
  <div role="checkbox" aria-checked="true" tabindex="0"
    onkeydown="if(e.key===' ')toggleCheck(this)">
    SMS
  </div>
</fieldset>

<script>
  function toggleCheck(el) {
    const checked = el.getAttribute('aria-checked') === 'true'
    el.setAttribute('aria-checked', String(!checked))
  }
</script>`}
          showPreview={false}
          showCopyBtn={false}
        />
      </section>

      <section className="example">
        <h2>Error Messages & Validation</h2>

        <p>
          Errors must be perceivable, identifiable, and actionable. Inline errors and an error summary are <mark>complementary</mark>. Use both on multi-field forms. The summary gives users an
          overview of what failed and where; the inline error gives context when they arrive at the field.
        </p>

        <CodeExample
          code={`<!-- After a failed submission: both patterns work together -->

<!-- 1. Error summary — rendered at top, receives focus on submit failure -->
<div role="alert" aria-labelledby="err-heading" tabindex="-1">
  <h2 id="err-heading">2 errors found</h2>
  <ul>
    <li><a href="#email">Email: enter a valid email</a></li>
    <li><a href="#phone">Phone: enter a phone number</a></li>
  </ul>
</div>

<!-- 2. Inline errors — each field carries its own message -->
<label for="email">Email <span aria-hidden="true">*</span></label>
<input id="email" type="email" aria-required="true"
  aria-invalid="true"
  aria-describedby="email-err" />
<span id="email-err">Enter a valid email, e.g. name@example.com</span>

<label for="phone">Phone <span aria-hidden="true">*</span></label>
<input id="phone" type="tel" aria-required="true"
  aria-invalid="true"
  aria-describedby="phone-err" />
<span id="phone-err">Enter a phone number, e.g. +1 555 000 0000</span>`}
          previewCode={`<p class="preview-hint text-small">💡 Submit with empty or invalid fields, then fix them and resubmit.</p>
<form data-form-validation novalidate>
  <div data-fv-summary class="summary" role="alert" aria-labelledby="demo-err-heading" tabindex="-1" hidden>
    <h2 id="demo-err-heading" data-fv-summary-heading></h2>
    <ul data-fv-summary-list></ul>
  </div>
  <p class="required-note"><span class="required-star" aria-hidden="true">*</span> Required</p>
  <div class="field" data-fv-field>
    <label for="demo-email">Email <span class="required-star" aria-hidden="true">*</span></label>
    <input id="demo-email" type="email" aria-required="true"
      data-fv-error-msg="Enter a valid email address, e.g. name@example.com"
      data-fv-pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" />
    <span id="demo-email-err" class="error" data-fv-error hidden>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      Enter a valid email address, e.g. name@example.com
    </span>
  </div>
  <div class="field" data-fv-field>
    <label for="demo-phone">Phone <span class="required-star" aria-hidden="true">*</span></label>
    <input id="demo-phone" type="tel" aria-required="true"
      data-fv-error-msg="Enter a phone number, e.g. +1 555 000 0000" />
    <span id="demo-phone-err" class="error" data-fv-error hidden>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      Enter a phone number, e.g. +1 555 000 0000
    </span>
  </div>
  <button type="submit">Submit</button>
  <p data-fv-success class="success" aria-live="polite" hidden>✓ Submitted successfully.</p>
</form>`}
          previewSize="equal"
        />

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Set <code>aria-invalid="true"</code> on any field that fails validation.
          </li>
          <li>
            Use <code>aria-describedby</code> to associate the error message with the input.
          </li>
          <li>Place the error message adjacent to the input it describes, preferably below it.</li>
          <li>
            <mark>Do not rely on color alone</mark> to signal an error. Include visible text and an icon.
          </li>
          <li>For multi-field forms, render a summary above the form and move focus to it after submission.</li>
          <li>Write error messages that describe the problem and suggest how to fix it.</li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color">1.4.1 Use of Color</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/error-identification">3.3.1 Error Identification</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion">3.3.3 Error Suggestion</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/status-messages">4.1.3 Status Messages</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G83">G83</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G84">G84</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA2">ARIA2</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA21">ARIA21</a>
          </li>
        </ul>

        <h3>Inline Error</h3>
        <p>
          Place the error message directly below the field it belongs to. Use <code>aria-invalid="true"</code> to signal the invalid state and <code>aria-describedby</code> to link the message. Screen
          readers will then read the error automatically when the field is focused.
        </p>
        <CodeExample
          code={`❌ <label for="email">Email</label>
   <input id="email" type="email" />
   <span style="color: red">Invalid email</span>

⭕️ <label for="email">Email</label>
   <input id="email" type="email"
     aria-invalid="true"
     aria-describedby="email-error" />
   <span id="email-error">
     Enter a valid email, e.g. name@example.com
   </span>`}
          previewCode={`<div class="field">
  <label for="p-email-bad">❌ Email</label>
  <input id="p-email-bad" type="email" class="error-input" value="not-an-email" />
  <span class="error">Invalid email</span>
  <span class="hint">Color only — no aria-invalid or aria-describedby</span>
</div>
<div class="field">
  <label for="p-email-good">⭕️ Email</label>
  <input id="p-email-good" type="email"
    aria-invalid="true"
    aria-describedby="p-email-err"
    value="not-an-email" />
  <span id="p-email-err" class="error">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
    Enter a valid email, e.g. name@example.com
  </span>
</div>`}
          previewSize="equal"
        />

        <h3>Error Summary</h3>
        <p>
          When a form is submitted with multiple errors, a summary at the top of the form lets users see all problems at once.{' '}
          <mark>Move focus to the summary container programmatically after submission.</mark> Make each item a link so users can jump directly to the field that needs fixing.
        </p>
        <CodeExample
          code={`<div role="alert"
  aria-labelledby="error-heading"
  tabindex="-1">
  <h2 id="error-heading">2 errors found</h2>
  <ul>
    <li><a href="#email">Email: enter a valid email</a></li>
    <li><a href="#phone">Phone: enter a valid phone number</a></li>
  </ul>
</div>`}
          showPreview={false}
        />
      </section>

      <section className="example">
        <h2>Required Fields</h2>

        <p>
          Required fields must be identifiable both visually and programmatically. <mark>Never communicate "required" through color or visual marker alone.</mark> Screen readers need a programmatic
          signal.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Use the native <code>required</code> attribute or <code>aria-required="true"</code> on every mandatory control.
          </li>
          <li>
            Prefer the native <code>required</code> attribute. It triggers built-in browser validation and is reliably announced by screen readers.
          </li>
          <li>Add a visible marker (e.g. an asterisk) and explain its meaning at the top of the form or group.</li>
          <li>Never rely solely on the asterisk color or icon shape to convey "required."</li>
          <li>If all fields are required, state it once in a form-level instruction instead of marking every field.</li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color">1.4.1 Use of Color</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions">3.3.2 Labels or Instructions</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G83">G83</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA2">ARIA2</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H90">H90</a>
          </li>
        </ul>

        <CodeExample
          code={`<p>Fields marked <span aria-hidden="true">*</span>
<span class="visually-hidden">with an asterisk</span> are required.</p>

❌ <label for="name">Name *</label>
   <input id="name" type="text" />

<!-- Native required (preferred) -->
⭕️ <label for="name">
     Name <span aria-hidden="true">*</span>
   </label>
   <input id="name" type="text" required />

<!-- aria-required when native required triggers unwanted browser validation -->
⭕️ <label for="name">
     Name <span aria-hidden="true">*</span>
   </label>
   <input id="name" type="text" aria-required="true" />`}
          previewCode={`<p class="required-note">Fields marked <span aria-hidden="true" class="required-star">*</span> are required.</p>
<div class="field">
  <label for="p-fname">
    First name <span aria-hidden="true" class="required-star">*</span>
  </label>
  <input id="p-fname" type="text" required />
</div>
<div class="field">
  <label for="p-lname">
    Last name <span aria-hidden="true" class="required-star">*</span>
  </label>
  <input id="p-lname" type="text" required />
</div>
<div class="field">
  <label for="p-nickname">Nickname</label>
  <input id="p-nickname" type="text" />
</div>`}
          previewSize="narrow"
        />
      </section>

      <section className="example">
        <h2>Native Select</h2>

        <p>
          <code>&lt;select&gt;</code> follows the same labeling rules as text inputs but has a few extra considerations around default options and grouping.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Always pair with a <code>&lt;label&gt;</code>. Never use placeholder text as the only label.
          </li>
          <li>
            Use <code>&lt;optgroup&gt;</code> to group related options when the list is long.
          </li>
          <li>
            Avoid a "-- Select --" default option with no value. If a selection is required, mark the field <code>required</code> and provide a meaningful prompt option instead.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions">3.3.2 Labels or Instructions</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H44">H44</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H85">H85</a>
          </li>
        </ul>

        <CodeExample
          code={`❌ <select>
     <option value="">-- Choose a country --</option>
     <option value="tw">Taiwan</option>
     ...
   </select>

⭕️ <label for="country">Country</label>
   <select id="country" required>
     <option value="">Select a country</option>
     <option value="tw">Taiwan</option>
     ...
   </select>

<!-- Use optgroup to group related options -->
⭕️ <label for="timezone">Timezone</label>
   <select id="timezone">
     <optgroup label="Asia">
       <option value="Asia/Taipei">Taipei (UTC+8)</option>
       ...
     </optgroup>
     <optgroup label="Europe">
       <option value="Europe/London">London (UTC+0)</option>
       ...
     </optgroup>
   </select>`}
          previewCode={`<div class="field">
  <label for="p-country">Country</label>
  <select id="p-country" required>
    <option value="">Select a country</option>
    <option value="tw">Taiwan</option>
    <option value="jp">Japan</option>
    <option value="uk">United Kingdom</option>
  </select>
</div>
<div class="field">
  <label for="p-tz">Timezone</label>
  <select id="p-tz">
    <optgroup label="Asia">
      <option value="Asia/Taipei">Taipei (UTC+8)</option>
      <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="Europe/London">London (UTC+0)</option>
      <option value="Europe/Paris">Paris (UTC+1)</option>
    </optgroup>
  </select>
</div>`}
          previewSize="narrow"
        />
      </section>

      <section className="example">
        <h2>Custom Select</h2>
        <p>
          The native <code>&lt;select&gt;</code> is hard to style consistently across browsers. When building a custom replacement, the ARIA button + listbox pattern preserves the same semantics a
          screen reader expects.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Use a real <code>&lt;button&gt;</code> as the trigger, not a <code>&lt;div&gt;</code>. It is keyboard focusable and announced correctly without extra ARIA.
          </li>
          <li>
            Add <code>aria-haspopup="listbox"</code> and <code>aria-expanded</code> to the trigger; update <code>aria-expanded</code> on open and close.
          </li>
          <li>
            Give the dropdown <code>role="listbox"</code> and each option <code>role="option"</code>; set <code>aria-selected="true"</code> on the chosen option.
          </li>
          <li>
            Use <code>aria-labelledby</code> on the trigger to combine the visible label and the current value so screen readers announce both.
          </li>
          <li>
            Support full keyboard interaction: <kbd>Enter</kbd> / <kbd>Space</kbd> to open, <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> / <kbd>Space</kbd> to select, <kbd>Escape</kbd> to
            close and return focus to the trigger.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>
          </li>
        </ul>

        <CodeExample
          code={`<!-- label for= works with <button> — it's a labelable element -->
<label id="country-label" for="country-trigger">Country</label>
<button id="country-trigger" class="cs-trigger"
  aria-haspopup="listbox"
  aria-expanded="false"
  aria-labelledby="country-label country-value">
  <span id="country-value">Select a country</span>
</button>

<ul role="listbox"
  aria-labelledby="country-label"
  tabindex="-1"
  hidden>
  <li role="option" aria-selected="false">Taiwan</li>
  ...
</ul>`}
          previewCode={`<p class="preview-hint text-small">💡 Click the button or press Space / Enter to open. Use arrow keys to navigate, Escape to close.</p>
<div class="field" data-custom-select>
  <label id="cs-country-label" for="cs-country-trigger">Country</label>
  <div class="cs-control">
    <button id="cs-country-trigger" class="cs-trigger"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-labelledby="cs-country-label cs-country-value">
      <span id="cs-country-value" class="cs-value">Select a country</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="cs-chevron"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <ul role="listbox"
      aria-labelledby="cs-country-label"
      tabindex="-1"
      hidden>
      <li role="option" aria-selected="false">Taiwan</li>
      <li role="option" aria-selected="false">Japan</li>
      <li role="option" aria-selected="false">United Kingdom</li>
      <li role="option" aria-selected="false">South Korea</li>
      <li role="option" aria-selected="false">France</li>
    </ul>
  </div>
</div>`}
          previewSize="narrow"
        />
      </section>

      <section className="example">
        <h2>Disabled vs Read-only</h2>

        <p>
          <code>disabled</code> and <code>readonly</code> look similar visually but behave very differently for keyboard and screen reader users. <code>disabled</code> removes the control from the tab
          order and its <mark>value is not submitted</mark> with the form. Many screen readers skip it entirely. <code>readonly</code> keeps the control focusable and its{' '}
          <mark>value is submitted</mark>. Screen readers announce it as "read only."
        </p>
        <p>
          For custom components, <code>aria-disabled="true"</code> marks a control as disabled semantically without removing it from the tab order. Use it when you still want the element reachable by
          keyboard and handle the blocked interaction in JS.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Use <code>readonly</code> when the user needs to read or copy a value. The field stays focusable and its value is submitted.
          </li>
          <li>
            Use <code>disabled</code> when a control is genuinely unavailable. Its value is excluded from form submission.
          </li>
          <li>
            Prefer <code>aria-disabled="true"</code> over <code>disabled</code> on custom components when you want the control to remain reachable by keyboard.
          </li>
          <li>
            Ensure disabled and read-only states have <mark>sufficient visual distinction</mark> beyond color alone. WCAG 1.4.3 exempts disabled components, but poor contrast still harms low-vision
            users.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum">1.4.3 Contrast (Minimum)</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA9">ARIA9</a>
          </li>
        </ul>

        <CodeExample
          code={`<!-- disabled: not in tab order, value not submitted -->
<label for="plan">Current plan</label>
<input id="plan" type="text" value="Free" disabled />

<!-- readonly: focusable, value submitted -->
<label for="username">Username</label>
<input id="username" type="text" value="esther_dev" readonly />

<!-- aria-disabled: stays reachable, interaction blocked in JS -->
<button aria-disabled="true" onclick="return false">
  Upgrade plan
</button>

<!-- Avoid this workaround — use readonly instead -->
❌ <input type="text" value="esther_dev" disabled />
   <input type="hidden" name="username" value="esther_dev" />`}
          previewCode={`<form><p class="hint hint--mb">Tab through the fields to compare focus behaviour.</p>
<div class="field">
  <label for="p-plan">Current plan</label>
  <input id="p-plan" type="text" value="Free" disabled />
  <span class="hint">disabled — skipped by keyboard, value not submitted</span>
</div>
<div class="field">
  <label for="p-username">Username</label>
  <input id="p-username" type="text" value="esther_dev" readonly />
  <span class="hint">readonly — focusable, value submitted</span>
</div>
<div class="field">
  <button aria-disabled="true" onclick="return false" disabled>
    Upgrade plan
  </button>
  <span class="hint">aria-disabled — reachable by keyboard, interaction blocked in JS</span>
</div></form>`}
          previewSize="narrow"
        />
      </section>
    </div>
  )
}
