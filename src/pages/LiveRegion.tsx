import './LiveRegion.scss'
import CodeExample from '../components/CodeExample'

export default function LiveRegion() {
  return (
    <div className="pattern-page">
      <h1>Live Region</h1>
      <p>
        Live regions let screen readers announce dynamic content without requiring focus to move. They are the right tool for transient messages like confirmations, status updates, and non-blocking
        notifications where moving focus would be disruptive or unexpected.
      </p>
      <p>
        <mark>Live regions are not a substitute for focus management.</mark> If an action opens a dialog, navigates the user, or requires immediate input, move focus instead.
      </p>

      <section className="example">
        <h2>When to Use a Live Region</h2>

        <p>Use a live region when content updates happen in the background and users need to be informed without being interrupted mid-task.</p>

        <ul>
          <li>Form submission confirmations ("Changes saved")</li>
          <li>Toast notifications ("Link copied", "Item deleted")</li>
          <li>Inline status updates ("Loading…", "3 results found")</li>
          <li>Background process feedback ("Upload complete")</li>
        </ul>

        <p>
          Do not use a live region for errors that require a response. Use inline errors with <code>aria-invalid</code> and <code>aria-describedby</code>, or an{' '}
          <a href="/patterns/forms#error-summary">error summary</a> that receives focus.
        </p>
      </section>

      <section className="example">
        <h2>polite vs assertive</h2>

        <p>
          <code>aria-live="polite"</code> waits for the user to finish their current activity before announcing. <mark>This is the right default for almost every notification.</mark>
        </p>

        <p>
          <code>aria-live="assertive"</code> interrupts immediately. Reserve it for cases where delayed delivery causes real harm: session timeout warnings, payment failures, or errors that block the
          user from proceeding. Overusing <code>assertive</code> creates noise and erodes trust.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            <mark>The live region must exist in the DOM before content is injected.</mark> Dynamically creating an element and setting its text simultaneously will not trigger announcements reliably.
          </li>
          <li>Start with an empty live region and inject text when the event occurs.</li>
          <li>
            Use <code>aria-atomic="true"</code> so the full message is read as a single unit, not just the changed portion.
          </li>
          <li>Clear the region before re-triggering the same message. Some screen readers do not re-announce unchanged text.</li>
          <li>
            <code>role="alert"</code> is shorthand for <code>aria-live="assertive" aria-atomic="true"</code>. Use it sparingly and only for genuine alerts.
          </li>
          <li>Keep messages short. Screen readers read the full content every time the region updates.</li>
          <li>
            Do not use <code>aria-live="assertive"</code> unless the message is genuinely time-sensitive or blocking.
          </li>
        </ul>

        <h3>Dev Notes</h3>

        <h4>Injection timing</h4>
        <p>
          Screen readers observe DOM mutations to detect live region changes. The element must be registered before any mutation happens. The most common mistake is creating the region and injecting
          content in the same call. Many screen readers never subscribe to a region they see for the first time already populated.
        </p>
        <p>
          When re-triggering the same message, clear the region first. Some screen readers track the previous value and skip announcements when the text has not changed. A{' '}
          <code>requestAnimationFrame</code> between clearing and setting gives the browser a tick to register the empty state.
        </p>

        <CodeExample
          language="javascript"
          code={`// Creating element and injecting text simultaneously
// The live region is not registered before the mutation
❌ const region = document.createElement('div')
   region.setAttribute('aria-live', 'polite')
   region.textContent = 'File saved'
   document.body.appendChild(region)

// Region pre-exists in HTML, inject text on user action
⭕️ const region = document.querySelector('#status')
   region.textContent = 'File saved'

// When re-triggering the same message, clear first
// Some screen readers skip announcements if the text has not changed
⭕️ region.textContent = ''
   requestAnimationFrame(() => {
     region.textContent = 'File saved'
   })`}
          showPreview={false}
          showCopyBtn={false}
        />

        <h4>Content length and auto-dismiss</h4>
        <p>
          Screen readers begin reading the moment content is injected into the DOM, not when the toast visually appears or disappears. If a toast auto-dismisses after 3 seconds but the screen reader
          needs 5 seconds to finish reading, removing the element from the DOM does not interrupt the announcement. The content is already buffered in the accessibility tree. However, behavior varies
          across screen readers: NVDA and VoiceOver handle this differently and neither is guaranteed.
        </p>
        <p>
          Keep toast messages short. If the content takes more than a couple of seconds to read, auto-dismissal creates a mismatch between what the user hears and what is on screen.{' '}
          <mark>Toast is the wrong pattern for long messages.</mark> Use a status banner or a dialog instead.
        </p>
        <p>
          For messages that do auto-dismiss, consider adding a dismiss button so users can control the timing. WCAG{' '}
          <a href="https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide">2.2.2 Pause, Stop, Hide</a> requires that moving or auto-updating content can be paused or stopped by the user.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/status-messages">4.1.3 Status Messages</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable">2.2.1 Timing Adjustable</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide">2.2.2 Pause, Stop, Hide</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19">ARIA19</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22">ARIA22</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G199">G199</a>
          </li>
        </ul>

        <CodeExample
          code={`<!-- Region must exist in DOM before content is injected -->
<div id="status" aria-live="polite" aria-atomic="true"></div>

<!-- Use assertive only for urgent interruptions -->
<div id="alert" aria-live="assertive" aria-atomic="true"></div>

<!-- role="alert" is shorthand for aria-live="assertive" aria-atomic="true" -->
<div role="alert" id="alert"></div>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Click a button and listen with a screen reader, or watch the notification appear.
</p>

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.75rem">
  <button
    data-live-region="trigger"
    data-live-region-target="demo-polite"
    data-live-region-message="File saved successfully">
    Save file
  </button>
  <button
    data-live-region="trigger"
    data-live-region-target="demo-polite"
    data-live-region-message="Link copied to clipboard">
    Copy link
  </button>
  <button
    data-live-region="trigger"
    data-live-region-target="demo-assertive"
    data-live-region-message="Session expires in 2 minutes. Save your work.">
    Trigger urgent notice
  </button>
</div>

<div
  id="demo-polite"
  aria-live="polite"
  aria-atomic="true"
  class="live-region-preview"></div>

<div
  id="demo-assertive"
  aria-live="assertive"
  aria-atomic="true"
  class="live-region-preview live-region-preview--assertive"></div>`}
          previewSize="equal"
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>The live region element exists in the HTML on page load. Inspect the DOM before any interaction to confirm.</li>
          <li>Triggering an action announces the message without focus moving away from the current element.</li>
          <li>Triggering the same action twice re-announces the message (the region clears between injections).</li>
          <li>
            <code>aria-live="assertive"</code> and <code>role="alert"</code> appear only for blocking errors or urgent interruptions, not routine confirmations.
          </li>
          <li>Toast messages are short. Longer or persistent content uses a status banner or dialog.</li>
        </ul>
      </section>
    </div>
  )
}
