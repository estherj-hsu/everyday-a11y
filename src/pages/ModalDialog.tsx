import './ModalDialog.scss'
import CodeExample from '../components/CodeExample'

export default function ModalDialog() {
  return (
    <div className="pattern-page">
      <h1>Modal / Dialog</h1>
      <p>
        <mark>Modal dialogs interrupt the page.</mark>
        They demand attention, block background interaction, and temporarily take over focus.
      </p>
      <p>
        Use the native <code>&lt;dialog&gt;</code> element whenever possible. It provides correct focus handling and modal behavior by default. Custom dialogs require significantly more work to reach
        the same baseline.
      </p>

      <section className="example">
        <h2>Native Dialog</h2>
        <p>
          The native <code>&lt;dialog&gt;</code> element handles focus trapping, keyboard interaction, and modal behavior automatically.
          <mark>This is the safest and least error-prone option.</mark>
        </p>

        <h3>Dev Notes</h3>
        <p>
          Use the dialog API to control visibility. Call <code>showModal()</code> to open a modal dialog and <code>close()</code> to dismiss it.
        </p>
        <p>
          <mark>
            Opening a dialog with <code>show()</code> does not create a modal.
          </mark>{' '}
          Focus is not trapped, and background content remains interactive.
        </p>
        <p>Avoid toggling dialogs with CSS alone. That bypasses built-in focus handling and modal behavior.</p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-order">2.4.3 Focus Order</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap">2.1.2 No Keyboard Trap</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus">1.4.13 Content on Hover or Focus</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible">2.4.7 Focus Visible</a>; <a href="https://www.w3.org/WAI/WCAG22/Understanding/on-focus">3.2.1 On Focus</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G59">G59</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G21">G21</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA18">ARIA18</a>
          </li>
        </ul>

        <CodeExample
          code={`<button>Open dialog</button>

<dialog>
  <button aria-label="Close dialog">Close</button>
  <h2>Dialog Title</h2>
  <p>Dialog content</p>
</dialog>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Use the keyboard to open the dialog, then try Tab and Escape.
</p>

<button data-dialog="native">Open important dialog</button>

<dialog id="native">
  <button class="dismiss" aria-label="Close dialog">Close</button>
  <h2 class="h3">This dialog behaves itself</h2>
  <p>
    Focus is trapped. Escape works. Background content is inert.
    This is what native behavior looks like.
  </p>
  <p>
    Try tabbing between the close button and this <a href="#">focusable link</a>.
  </p>
</dialog>`}
        />
      </section>

      <section className="example">
        <h2>Custom Dialog (Using Divs)</h2>
        <p>
          Some projects cannot use <code>&lt;dialog&gt;</code> due to legacy code, animation requirements, or framework constraints.
          <mark>In those cases, modal behavior must be implemented manually.</mark>
        </p>

        <h3>Dev Notes</h3>
        <p>
          This example uses <code>autofocus</code> to demonstrate initial focus placement, but <code>autofocus</code> alone does not make a dialog accessible.
        </p>
        <p>
          <mark>Custom dialogs require explicit focus management.</mark>
          Even when implemented carefully, they rarely match native behavior.
        </p>
        <p>
          For custom dialogs, <code>inert</code> is the modern way to disable background content, but it must still be paired with focus trapping and return logic.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            The dialog container must have <code>role="dialog"</code> and <code>aria-modal="true"</code>.
          </li>
          <li>
            The dialog must have an accessible name via <code>aria-labelledby</code> or <code>aria-label</code>.
          </li>
          <li>Focus must move into the dialog when it opens.</li>
          <li>Focus must be trapped while the dialog is active.</li>
          <li>Escape must close the dialog.</li>
          <li>Focus must return to the triggering element on close.</li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-order">2.4.3 Focus Order</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap">2.1.2 No Keyboard Trap</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus">1.4.13 Content on Hover or Focus</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible">2.4.7 Focus Visible</a>; <a href="https://www.w3.org/WAI/WCAG22/Understanding/on-focus">3.2.1 On Focus</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G59">G59</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G21">G21</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA18">ARIA18</a>
          </li>
        </ul>

        <CodeExample
          code={`<button>Open dialog</button>

<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  class="modal"
  hidden>
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <button class="dismiss" aria-label="Close dialog" autofocus>Close</button>
    <h2 id="dialog-title">Dialog Title</h2>
    <p>Dialog Content</p>
  </div>
</div>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Use the keyboard to open the dialog, then try Tab and Escape.
</p>

<button data-dialog="role-dialog">Open important dialog</button>

<div
  id="role-dialog"
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  class="modal"
  hidden>
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <button class="dismiss" aria-label="Close dialog" autofocus>Close</button>
    <h2 class="h3" id="dialog-title">This dialog needs supervision</h2>
    <p>
      Unlike the native dialog, this version relies on JavaScript
      to manage focus, keyboard interaction, and background behavior.
    </p>
    <p>
      Try tabbing to this <a href="#">focusable link</a>.
      Focus is not trapped without additional logic.
    </p>
  </div>
</div>`}
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>
            Native <code>&lt;dialog&gt;</code> is used whenever possible for dialogs.
          </li>
          <li>Focus moves into the dialog when it opens.</li>
          <li>
            Focus is <strong>trapped</strong> inside the dialog while it is open.
          </li>
          <li>
            Pressing <kbd>Escape</kbd> closes the dialog.
          </li>
          <li>When the dialog closes, focus returns to the button (or element) that opened it.</li>
        </ul>
      </section>
    </div>
  )
}
