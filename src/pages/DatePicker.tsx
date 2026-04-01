import CodeExample from '../components/CodeExample'

export default function DatePicker() {
  return (
    <div className="pattern-page">
      <h1>Date Picker</h1>
      <p>A calendar date picker is a Data Grid variant. The same roving tabindex and 2D arrow key navigation apply, with additional shortcuts for month navigation and date selection.</p>

      <section className="example">
        <h2>Calendar Grid</h2>
        <p>A month-view calendar where keyboard users can navigate days and select a date without leaving the grid.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            <code>role="grid"</code> on the calendar table; <code>role="row"</code> on week rows; <code>role="gridcell"</code> on day cells
          </li>
          <li>
            Grid <code>aria-label</code> includes the displayed month and year; update when the month changes
          </li>
          <li>
            <code>aria-selected="true"</code> on the selected date
          </li>
          <li>
            <code>aria-current="date"</code> on today
          </li>
          <li>
            Filler cells outside the current month use <code>aria-hidden="true"</code>
          </li>
          <li>
            Roving tabindex: the selected date (or today, or the first day) has <code>tabindex="0"</code>; all others <code>"-1"</code>
          </li>
          <li>
            Prev/Next buttons have descriptive <code>aria-label</code>s: "Previous month", "Next month"
          </li>
          <li>
            Column headers use <code>&lt;abbr&gt;</code> for full day names: <code>{`<abbr title="Sunday">Su</abbr>`}</code>
          </li>
        </ul>

        <h3>Keyboard Shortcuts</h3>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd>
              </td>
              <td>Move by one day</td>
            </tr>
            <tr>
              <td>
                <kbd>Page Up</kbd> / <kbd>Page Down</kbd>
              </td>
              <td>Previous / next month</td>
            </tr>
            <tr>
              <td>
                <kbd>Home</kbd> / <kbd>End</kbd>
              </td>
              <td>First / last day of week</td>
            </tr>
            <tr>
              <td>
                <kbd>T</kbd>
              </td>
              <td>Jump to today</td>
            </tr>
            <tr>
              <td>
                Click, <kbd>Enter</kbd>, or <kbd>Space</kbd>
              </td>
              <td>Select date</td>
            </tr>
          </tbody>
        </table>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-order">2.4.3 Focus Order</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6">ARIA6</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G149">G149</a>
          </li>
        </ul>

        <CodeExample
          code={`<div class="header">
  <button class="prev" aria-label="Previous month">‹</button>
  <span class="month-year" aria-live="polite"></span>
  <button class="next" aria-label="Next month">›</button>
</div>

<table role="grid" class="grid">
  <thead>
    <tr role="row">
      <th role="columnheader"><abbr title="Sunday">Su</abbr></th>
      ...
    </tr>
  </thead>
  <tbody class="body"><!-- rendered dynamically --></tbody>
</table>

<p class="selected" aria-live="polite"></p>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Arrow keys move by day, Page Up/Down changes month, T jumps to today; click a day or press Enter to select.
</p>

<div data-datepicker>
  <div class="header">
    <button class="prev" aria-label="Previous month">‹</button>
    <span class="month-year" aria-live="polite"></span>
    <button class="next" aria-label="Next month">›</button>
  </div>

  <table role="grid" class="grid">
    <thead>
      <tr role="row">
        <th role="columnheader"><abbr title="Sunday">Su</abbr></th>
        <th role="columnheader"><abbr title="Monday">Mo</abbr></th>
        <th role="columnheader"><abbr title="Tuesday">Tu</abbr></th>
        <th role="columnheader"><abbr title="Wednesday">We</abbr></th>
        <th role="columnheader"><abbr title="Thursday">Th</abbr></th>
        <th role="columnheader"><abbr title="Friday">Fr</abbr></th>
        <th role="columnheader"><abbr title="Saturday">Sa</abbr></th>
      </tr>
    </thead>
    <tbody class="body"></tbody>
  </table>

  <p class="selected" aria-live="polite"></p>
</div>`}
          previewSize="narrow"
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>
            <code>role="grid"</code> on the calendar; <code>role="gridcell"</code> on day cells
          </li>
          <li>
            <code>aria-selected="true"</code> on the selected date; <code>aria-current="date"</code> on today
          </li>
          <li>
            Grid <code>aria-label</code> and the month/year span update on month change; span has <code>aria-live="polite"</code>
          </li>
          <li>
            Arrow keys navigate days; <kbd>Page Up</kbd> / <kbd>Page Down</kbd> changes month; <kbd>T</kbd> jumps to today
          </li>
          <li>
            Filler cells outside the month have <code>aria-hidden="true"</code>
          </li>
        </ul>
      </section>
    </div>
  )
}
