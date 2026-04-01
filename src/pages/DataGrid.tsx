import './DataGrid.scss'
import CodeExample from '../components/CodeExample'

export default function DataGrid() {
  return (
    <div className="pattern-page">
      <h1>Data Grid</h1>
      <p>
        A grid is a composite widget that supports two-dimensional keyboard navigation, making it the right choice for tabular data where cells are interactive or sortable. Use a plain{' '}
        <code>&lt;table&gt;</code> without grid roles when the data is read-only and navigation happens naturally with Tab.
      </p>

      <section className="example">
        <h2>Read-only Grid</h2>
        <p>A read-only grid exposes column sorting and cell navigation to keyboard and assistive technology users without moving DOM focus to individual cells unnecessarily.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            <code>role="grid"</code> on the <code>&lt;table&gt;</code>; <code>role="row"</code> on each <code>&lt;tr&gt;</code>; <code>role="columnheader"</code> on each <code>&lt;th&gt;</code>;{' '}
            <code>role="gridcell"</code> on each <code>&lt;td&gt;</code>.
          </li>
          <li>
            The grid must have an accessible name via <code>aria-label</code> or <code>aria-labelledby</code>.
          </li>
          <li>Arrow keys navigate cells in two dimensions; Tab moves focus in and out of the grid entirely.</li>
          <li>
            Exactly one cell has <code>tabindex="0"</code> at a time (roving tabindex); all others use <code>tabindex="-1"</code>.
          </li>
          <li>
            Sortable columns use <code>aria-sort="ascending|descending|none"</code> on the <code>&lt;th&gt;</code>; update the value on each sort and reset other columns to <code>"none"</code>.
          </li>
          <li>
            When only a subset of rows is rendered (virtual scrolling), add <code>aria-rowcount</code> / <code>aria-colcount</code> on the grid and <code>aria-rowindex</code> /{' '}
            <code>aria-colindex</code> on rows and cells.
          </li>
        </ul>

        <h3>Dev Notes: Roving Tabindex</h3>
        <p>
          Only one cell is focusable via Tab at any moment. When the user navigates with arrow keys, update <code>tabindex</code> before calling <code>.focus()</code>:
        </p>
        <CodeExample
          language="javascript"
          code={`// Only one cell is tabbable at a time
function focusCell(cell) {
  allCells.forEach(c => c.setAttribute('tabindex', '-1'))
  cell.setAttribute('tabindex', '0')
  cell.focus()
}`}
          showCopyBtn={false}
          showPreview={false}
        />

        <ul className="references">
          <li>
            <strong>WCAG</strong>{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-order">2.4.3 Focus Order</a>
          </li>
          <li>
            <strong>Techniques</strong>{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6">ARIA6</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G149">G149</a>
          </li>
        </ul>

        <CodeExample
          code={`<table role="grid"
  aria-label="Shelter pups"
  aria-rowcount="5">
  <thead>
    <tr role="row">
      <th role="columnheader" aria-sort="ascending" tabindex="0">Breed</th>
      <th role="columnheader" aria-sort="none" tabindex="-1">Friendliness</th>
      <th role="columnheader" aria-sort="none" tabindex="-1">Fur</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-rowindex="1">
      <td role="gridcell" tabindex="-1">Golden Retriever</td>
      <td role="gridcell" tabindex="-1">Pure sunshine — will lean on you</td>
      <td role="gridcell" tabindex="-1">Golden fluff</td>
    </tr>
    ...
  </tbody>
</table>`}
          previewCode={`<p class="preview-hint text-small">💡 Arrow keys navigate cells. Click or press Enter on a column header to sort.</p>
<table role="grid" aria-label="Shelter pups" aria-rowcount="5">
  <thead>
    <tr role="row">
      <th role="columnheader" aria-sort="ascending" tabindex="0">Breed</th>
      <th role="columnheader" aria-sort="none" tabindex="-1">Friendliness</th>
      <th role="columnheader" aria-sort="none" tabindex="-1">Fur</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-rowindex="1">
      <td role="gridcell" tabindex="-1">Beagle</td>
      <td role="gridcell" tabindex="-1">Snack radar — tail never stops</td>
      <td role="gridcell" tabindex="-1">Short & glossy</td>
    </tr>
    <tr role="row" aria-rowindex="2">
      <td role="gridcell" tabindex="-1">Corgi</td>
      <td role="gridcell" tabindex="-1">Short king — big heart, tiny loaf</td>
      <td role="gridcell" tabindex="-1">Medium floof</td>
    </tr>
    <tr role="row" aria-rowindex="3">
      <td role="gridcell" tabindex="-1">Golden Retriever</td>
      <td role="gridcell" tabindex="-1">Pure sunshine — leans for cuddles</td>
      <td role="gridcell" tabindex="-1">Golden fluff</td>
    </tr>
    <tr role="row" aria-rowindex="4">
      <td role="gridcell" tabindex="-1">Greyhound</td>
      <td role="gridcell" tabindex="-1">Gentle snoot — couch potato deluxe</td>
      <td role="gridcell" tabindex="-1">Sleek short</td>
    </tr>
    <tr role="row" aria-rowindex="5">
      <td role="gridcell" tabindex="-1">Samoyed</td>
      <td role="gridcell" tabindex="-1">Smile cloud — treat motivated</td>
      <td role="gridcell" tabindex="-1">Floofy double coat</td>
    </tr>
  </tbody>
</table>`}
          previewSize="equal"
        />
      </section>

      <section className="example">
        <h2>Interactive Grid</h2>
        <p>An interactive grid contains actionable elements (buttons, links) inside cells, requiring a two-mode navigation model: navigation mode and action mode.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Interactive elements inside gridcells start with <code>tabindex="-1"</code> in navigation mode so Tab skips them and arrow keys control movement.
          </li>
          <li>
            Press <kbd>Enter</kbd> on a gridcell to move focus to the first interactive element inside it (enter action mode).
          </li>
          <li>
            Press <kbd>Escape</kbd> from within the interactive element to return focus to the parent gridcell (return to navigation mode).
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong>{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-order">2.4.3 Focus Order</a>
          </li>
          <li>
            <strong>Techniques</strong>{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6">ARIA6</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G149">G149</a>
          </li>
        </ul>

        <CodeExample
          code={`<table role="grid"
  aria-label="Doggo daycare checklist"
  aria-rowcount="4">
  <thead>
    <tr role="row">
      <th role="columnheader" tabindex="0">Pup</th>
      <th role="columnheader" tabindex="-1">Note</th>
      <th role="columnheader" tabindex="-1">Treats</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-rowindex="1">
      <td role="gridcell" tabindex="-1">Golden Retriever</td>
      <td role="gridcell" tabindex="-1">Towel after swim</td>
      <td role="gridcell" tabindex="-1">
        <!-- buttons start with tabindex="-1" in navigation mode -->
        <button tabindex="-1">Edit</button>
        <button tabindex="-1">All set</button>
      </td>
    </tr>
    ...
  </tbody>
</table>`}
          previewCode={`<p class="preview-hint text-small">💡 Arrow keys navigate cells. Press Enter on a Treats cell to activate buttons, Escape to return.</p>
<p data-grid-feedback class="dg-feedback" aria-live="polite">&nbsp;</p>
<table role="grid" aria-label="Doggo daycare checklist">
  <thead>
    <tr role="row">
      <th role="columnheader" tabindex="0">Pup</th>
      <th role="columnheader" tabindex="-1">Note</th>
      <th role="columnheader" tabindex="-1">Treats</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-rowindex="1">
      <td role="gridcell" tabindex="-1">Golden Retriever</td>
      <td role="gridcell" tabindex="-1">Towel after swim</td>
      <td role="gridcell" tabindex="-1">
        <button tabindex="-1">Edit</button>
        <button tabindex="-1">All set</button>
      </td>
    </tr>
    <tr role="row" aria-rowindex="2">
      <td role="gridcell" tabindex="-1">Corgi</td>
      <td role="gridcell" tabindex="-1">Lift on stairs</td>
      <td role="gridcell" tabindex="-1">
        <button tabindex="-1">Edit</button>
        <button tabindex="-1">All set</button>
      </td>
    </tr>
    <tr role="row" aria-rowindex="3">
      <td role="gridcell" tabindex="-1">Beagle</td>
      <td role="gridcell" tabindex="-1">Snack pocket</td>
      <td role="gridcell" tabindex="-1">
        <button tabindex="-1">Edit</button>
        <button tabindex="-1">All set</button>
      </td>
    </tr>
    <tr role="row" aria-rowindex="4">
      <td role="gridcell" tabindex="-1">Dachshund</td>
      <td role="gridcell" tabindex="-1">Extra blanket</td>
      <td role="gridcell" tabindex="-1">
        <button tabindex="-1">Edit</button>
        <button tabindex="-1">All set</button>
      </td>
    </tr>
  </tbody>
</table>`}
          previewSize="equal"
        />
      </section>

      <section>
        <h2>Quick Check</h2>
        <ul className="quick-check">
          <li>
            <code>role="grid"</code> on the table; <code>role="row"</code>, <code>role="columnheader"</code>, <code>role="gridcell"</code> on descendants.
          </li>
          <li>Arrow keys navigate in two dimensions; Tab exits the grid entirely.</li>
          <li>
            One cell has <code>tabindex="0"</code> at a time (roving tabindex); all others use <code>tabindex="-1"</code>.
          </li>
          <li>
            Sortable headers have <code>aria-sort</code>; the value updates on each sort and resets on other columns.
          </li>
          <li>
            <code>aria-rowcount</code> / <code>aria-colcount</code> are present when the full dataset is virtually rendered.
          </li>
          <li>
            Interactive cells: <kbd>Enter</kbd> enters action mode, <kbd>Escape</kbd> returns focus to the cell.
          </li>
        </ul>
      </section>
    </div>
  )
}
