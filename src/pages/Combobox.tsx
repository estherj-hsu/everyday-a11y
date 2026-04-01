import './Combobox.scss'
import CodeExample from '../components/CodeExample'

export default function Combobox() {
  return (
    <div className="pattern-page">
      <h1>Combobox</h1>
      <p>
        A combobox combines a text input with a listbox popup. Users can type to filter options and use keyboard navigation to select from the list. Because the listbox appears dynamically, the
        pattern requires explicit ARIA state management to stay accessible.
      </p>
      <p>
        <mark>
          Use a native <code>&lt;select&gt;</code> when the list is short and fixed.
        </mark>{' '}
        A combobox earns its complexity when the list is long enough that filtering genuinely helps, or when the options are loaded dynamically.
      </p>

      <section className="example">
        <h2>Combobox Pattern</h2>

        <p>The input carries all the ARIA state. The listbox and options are passive containers. Keyboard interaction and focus always stay on the input.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            <code>role="combobox"</code> is on the <code>&lt;input&gt;</code> itself, not a wrapper div.
          </li>
          <li>
            <code>aria-expanded</code> must reflect whether the listbox is currently visible.
          </li>
          <li>
            <code>aria-autocomplete="list"</code> tells screen readers that a list of suggestions will appear.
          </li>
          <li>
            <code>aria-haspopup="listbox"</code> signals the type of popup that will open.
          </li>
          <li>
            <code>aria-controls</code> references the listbox's <code>id</code>.
          </li>
          <li>
            <code>aria-activedescendant</code> is set to the active option's <code>id</code> during keyboard navigation, and removed when no option is active.
          </li>
          <li>
            Every <code>role="option"</code> element must have a unique <code>id</code>. This is required for <code>aria-activedescendant</code> to work.
          </li>
          <li>
            <code>aria-selected</code> on each option reflects whether it is currently highlighted.
          </li>
          <li>
            <code>autocomplete="off"</code> prevents the browser's native autocomplete from overlapping the listbox.
          </li>
          <li>
            Keyboard support: <kbd>↓</kbd> / <kbd>↑</kbd> to navigate options, <kbd>Enter</kbd> to select, <kbd>Escape</kbd> to close.
          </li>
        </ul>

        <h3>Dev Notes</h3>
        <p>
          The most important decision in a combobox is <mark>never moving DOM focus to the options</mark>. Moving focus to a <code>[role="option"]</code> would pull the screen reader out of the input
          context, making it impossible to continue typing to refine the filter.
        </p>
        <p>
          <code>aria-activedescendant</code> solves this: it tells assistive technology "treat this option as the active element" while keyboard focus stays on the input. When the value changes,
          screen readers announce the newly active option automatically.
        </p>
        <p>
          When re-opening the listbox after a previous selection, reset <code>aria-activedescendant</code> and all <code>aria-selected</code> states so the virtual cursor starts fresh.
        </p>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions">3.3.2 Labels or Instructions</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6">ARIA6</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>
          </li>
        </ul>

        <CodeExample
          code={`<label for="breed">Favourite dog breed</label>
<div class="combobox-control">
  <input
    id="breed"
    type="text"
    role="combobox"
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-controls="breed-listbox"
    autocomplete="off" />
  <ul id="breed-listbox" role="listbox" aria-label="Dog breeds" hidden>
    <li id="opt-labrador" role="option" aria-selected="false">Labrador Retriever</li>
    ...
  </ul>
</div>`}
          previewCode={`<p class="preview-hint text-small">
  💡 Type to filter, then use Arrow keys to navigate, Enter to select, Escape to close.
</p>

<div data-combobox>
  <label for="p-breed">Favourite dog breed</label>
  <div class="combobox-control">
    <input
      id="p-breed"
      type="text"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded="false"
      aria-haspopup="listbox"
      aria-controls="p-breed-listbox"
      autocomplete="off"
      placeholder="Start typing…" />
    <ul id="p-breed-listbox" role="listbox" aria-label="Dog breeds" hidden>
      <li id="p-opt-1"  role="option" aria-selected="false">Beagle</li>
      <li id="p-opt-2"  role="option" aria-selected="false">Border Collie</li>
      <li id="p-opt-3"  role="option" aria-selected="false">Boxer</li>
      <li id="p-opt-4"  role="option" aria-selected="false">Bulldog</li>
      <li id="p-opt-5"  role="option" aria-selected="false">French Bulldog</li>
      <li id="p-opt-6"  role="option" aria-selected="false">German Shepherd</li>
      <li id="p-opt-7"  role="option" aria-selected="false">Golden Retriever</li>
      <li id="p-opt-8"  role="option" aria-selected="false">Labrador Retriever</li>
      <li id="p-opt-9"  role="option" aria-selected="false">Poodle</li>
      <li id="p-opt-10" role="option" aria-selected="false">Siberian Husky</li>
    </ul>
  </div>
</div>`}
          previewSize="narrow"
        />
      </section>

      <section>
        <h2>Quick Check</h2>

        <ul className="quick-check">
          <li>
            Inspect the input: <code>role="combobox"</code> is on the <code>&lt;input&gt;</code> itself, not a wrapper.
          </li>
          <li>
            Opening the listbox updates <code>aria-expanded</code> to <code>true</code>; <code>aria-activedescendant</code> updates as options are highlighted.
          </li>
          <li>
            Arrow key navigation moves through options without DOM focus leaving the input.
          </li>
          <li>
            <kbd>Enter</kbd> selects the highlighted option; <kbd>Escape</kbd> closes the listbox without selecting.
          </li>
          <li>
            No browser autocomplete dropdown appears over the listbox (<code>autocomplete="off"</code>).
          </li>
        </ul>
      </section>
    </div>
  )
}
