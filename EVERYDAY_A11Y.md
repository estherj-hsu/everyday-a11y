# Everyday Accessibility

**Practical UI & Interaction A11y for Makers**

Accessibility makes what we build usable for everyone. It improves clarity, consistency, and reduces barriers that stop people from completing even simple tasks. It is not an add-on or a final checklist. It is part of good UI, solid engineering, and thoughtful design.

Everyday Accessibility focuses on practical patterns you can apply right away. Clear explanations. Real examples. No overwhelming rules or unnecessary jargon. Just guidance to help developers and designers build interfaces that work for everyone.

## Table of Contents

- [Foundations](#foundations)
- [Patterns](#patterns)
  - [Landmarks](#landmarks)
  - [Buttons & Links](#buttons--links)
  - [Forms](#forms)
  - [Accordions](#accordions)
  - [Tabs](#tabs)
  - [Modal / Dialog](#modal--dialog)
  - [Navigation](#navigation)
- [Check & Fix](#check--fix)

---

# Foundations

Accessibility fundamentals that everything else builds on. Get these right and many problems simply never appear.

## Semantics

**Semantic HTML is the cheapest accessibility win you will ever get.**

Use native HTML elements for what they are meant to do. Buttons are buttons. Links navigate. Headings describe structure. Semantics convey relationships programmatically, giving assistive technologies meaning without extra work and reducing the need for ARIA.

**References:**
- **WCAG** [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- **Techniques** [G115](https://www.w3.org/WAI/WCAG21/Techniques/general/G115), [G140](https://www.w3.org/WAI/WCAG21/Techniques/general/G140)

## Keyboard Interaction

**Keyboards are not a fallback, they are a primary input.**

Everything must be usable with a keyboard alone. This includes logical tab order, no keyboard traps, and no interactions that rely on hover or pointer-only input. If you cannot operate it without a mouse, it is broken.

**References:**
- **WCAG** [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard); [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap)
- **Techniques** [G202](https://www.w3.org/WAI/WCAG21/Techniques/general/G202), [G90](https://www.w3.org/WAI/WCAG21/Techniques/general/G90)

## Focus Management

**Focus is how users know where they are.**

Focus should move predictably and intentionally. When dialogs open, focus moves inside. When they close, focus returns. After route or view changes, users should not be left stranded in the DOM.

**References:**
- **WCAG** [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)
- **Techniques** [G59](https://www.w3.org/WAI/WCAG21/Techniques/general/G59)

## ARIA (When & When Not to Use)

**No ARIA is better than bad ARIA.**

ARIA exists to fill semantic gaps that HTML cannot express on its own. It should never be used to fix broken semantics. Incorrect ARIA can actively make interfaces harder to use with assistive technologies.

**References:**
- **WCAG** [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
- **Examples** [ARIA1](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA1), [ARIA5](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5), [ARIA16](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA16)

## Visual Hierarchy

**Clarity beats cleverness, every time.**

Accessibility also lives in what people see. If users cannot visually understand or operate the interface, assistive technology support alone will not save it.

## Visually Hidden Content

**Visual simplicity should not reduce meaning.**

Visually hidden content is text that is available to screen readers but not visible on the screen. It is commonly used to provide accessible names, additional context, or instructions without changing the visual UI.

```css
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

## Focus Appearance

**Focus should be obvious, not decorative.**

Focus indicators must be clearly visible, high-contrast, and persistent. Removing outlines without a meaningful replacement breaks keyboard usability.

**References:**
- **WCAG** [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible); [2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) (AA); [2.4.12 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced) (AAA); [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) (WCAG 2.2)
- **Techniques** [G149](https://www.w3.org/WAI/WCAG21/Techniques/general/G149), [G165](https://www.w3.org/WAI/WCAG21/Techniques/general/G165)

## Motion & Reduced Motion

**Motion is optional, comprehension is not.**

Animations should support understanding, not distract or disorient. Motion triggered by interaction must respect reduced motion preferences and avoid causing dizziness or cognitive overload.

**References:**
- **WCAG** [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)
- **Techniques** [G219](https://www.w3.org/WAI/WCAG21/Techniques/general/G219)

## Touch Target & Spacing

Interactive elements need sufficient size (**at least 24 by 24 px**) and spacing to be used comfortably. Small targets increase error rates and fatigue, especially on touch devices.

**Precision should not be required to succeed.**

**References:**
- **WCAG** [2.5.5 Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size) (AAA, WCAG 2.1); [2.5.8 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) (AA, WCAG 2.2)
- **Techniques** [G207](https://www.w3.org/WAI/WCAG21/Techniques/general/G207)

## Icon-only UI & Labeling

**Recognition beats interpretation.**

Icons without text rely on interpretation. If meaning is not universally obvious, provide a visible label or a clear accessible name. Tooltips do not count as labels.

**References:**
- **WCAG** [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content); [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name)
- **Techniques** [G94](https://www.w3.org/WAI/WCAG21/Techniques/general/G94), [G208](https://www.w3.org/WAI/WCAG21/Techniques/general/G208)

---

# Patterns

## Landmarks

Landmarks define the high-level structure of a page. They identify major regions such as the header, navigation, main content, and footer, allowing assistive technology users to understand the page layout and move efficiently between regions.

**Landmarks expose page structure.** They are not tied to visual layout, styling, or visual grouping.

### Core Page Landmarks

- Use semantic HTML elements whenever possible.
- Only use ARIA landmark roles when semantic elements cannot be used.
- All meaningful page content should live inside a landmark.
- Only one `<main>` per page.
- `<header>` and `<footer>` are landmarks only when they are direct children of `<body>`.
- Multiple `<nav>` landmarks must be labeled.
- `<section>` must have a heading to define its purpose. Use `<div>` if no heading is needed.
- **Fewer landmarks are better.** Too many reduce their usefulness for assistive technology users.

**References:**
- **WCAG** [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships); [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks); [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)
- **Techniques** [G140](https://www.w3.org/WAI/WCAG22/Techniques/general/G140), [ARIA11](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11), [ARIA6](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6), [H69](https://www.w3.org/WAI/WCAG22/Techniques/html/H69)

**Example:**

```html
<body>
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
</body>
```

## Buttons & Links

**Buttons perform actions.** **Links navigate.**

They are announced, focused, and activated differently by assistive technology, so using the right element matters more than how they look.

### Visually Hidden Text for Links

Visually hidden text adds extra context for screen readers without changing the visual UI. It is useful when design requires short or generic link text, and the hidden text becomes part of the link's accessible name.

This pattern builds on [visually hidden content](#visually-hidden-content) as a core accessibility technique.

**References:**
- **WCAG** [2.4.4: Link Purpose (In Context)](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context); [2.4.9: Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only)
- **Techniques** [G91](https://www.w3.org/WAI/WCAG21/Techniques/general/G91), [G53](https://www.w3.org/WAI/WCAG21/Techniques/general/G53), [H30](https://www.w3.org/WAI/WCAG21/Techniques/html/H30), [H77](https://www.w3.org/WAI/WCAG21/Techniques/html/H77), [H78](https://www.w3.org/WAI/WCAG21/Techniques/html/H78), [H79](https://www.w3.org/WAI/WCAG21/Techniques/html/H79), [H81](https://www.w3.org/WAI/WCAG21/Techniques/html/H81), [ARIA7](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA7), [ARIA8](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8), [C7](https://www.w3.org/WAI/WCAG21/Techniques/css/C7)

**Example:**

```html
❌ <a href="#">Link here</a>

⭕️ <a href="#">
     Link here<span class="visually-hidden"> to the accessibility patterns page</span>
   </a>
```

### Focus Indicator

**Focus indicators show where keyboard focus is on the page.** Removing or weakening them makes navigation difficult for keyboard and assistive technology users. Use `:focus-visible` to provide a clear outline without affecting mouse interactions.

**References:**
- **WCAG** [2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible)
- **Techniques** [G149](https://www.w3.org/WAI/WCAG21/Techniques/general/G149), [G165](https://www.w3.org/WAI/WCAG21/Techniques/general/G165), [G195](https://www.w3.org/WAI/WCAG21/Techniques/general/G195), [C15](https://www.w3.org/WAI/WCAG21/Techniques/css/C15), [C40](https://www.w3.org/WAI/WCAG21/Techniques/css/C40), [SCR31](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR31)

**Example:**

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid #000;
  outline-offset: 2px;
}
```

### Links Opening in a New Tab or Window

Opening links in a new tab or window changes the user's browsing context. This can be disorienting for keyboard and screen reader users if it happens without warning. If a link opens in a new tab, communicate that behavior in the link text or accessible name.

**References:**
- **WCAG** [3.2.1: On Focus](https://www.w3.org/WAI/WCAG21/Understanding/on-focus)
- **Techniques** [G200](https://www.w3.org/WAI/WCAG21/Techniques/general/G200), [G201](https://www.w3.org/WAI/WCAG21/Techniques/general/G201)

**Example:**

```html
❌ <a href="#" target="_blank" rel="noopener noreferrer">
     Everyday Accessibility
   </a>

⭕️ <a href="#" target="_blank" rel="noopener noreferrer">
     Everyday Accessibility  (opens in a new tab)
   </a>

⭕️ <a href="#" target="_blank" rel="noopener noreferrer" 
     aria-label="Everyday Accessibility (opens in a new tab)">
     Everyday Accessibility
   </a>

⭕️ <a href="#" target="_blank" rel="noopener noreferrer">
     Everyday Accessibility
     <span class="visually-hidden">(opens in a new tab)</span>
   </a>
```

### Common Cases

#### Case: "Read more" Links in Card Layouts

Multiple cards on a page often use the same "Read more" link text, relying on visual context to explain the destination.

**Example:**

```html
<div class="card">
  <h3>Why accessibility improves usability for everyone</h3>
  <p>
    Clear structure, predictable interactions, and better keyboard support
    make interfaces easier to use for all users.
  </p>
  <a href="#">Read more</a> ⚠️
</div>

❌ <a href="#">Read more</a>
⭕️ <a href="#" aria-label="Read more about why accessibility improves usability">Read more</a>
⭕️ <a href="#">Read more
    <span class="visually-hidden">about why accessibility improves usability</span>
  </a>
```

- **The problem:** Generic link text like "Read more" has no meaning when links are read out of context.
- **Why it matters:** Screen reader users often navigate using a list of links. Identical labels are impossible to distinguish.
- **The fix:** Use `aria-label` to describe the destination while keeping the visual label short.

#### Case: Icon-Only Buttons with No Label

Buttons and links sometimes rely on icons or symbols instead of visible text.

**Example:**

```html
❌ <a href="#"><i class="fa fa-email"></i></a>
⭕️ <a href="#" aria-label="Send us an email"><i class="fa fa-email" aria-hidden="true"></i></a>

❌ <button>x</button>
⭕️ <button aria-label="Close dialog">x</button>
⭕️ <button>
    <span aria-hidden="true">x</span>
    <span class="visually-hidden">Close dialog</span>
   </button>
```

- **The problem:** Icon-only controls have no accessible name and are announced without context.
- **Why it matters:** Users can't tell what the control does before activating it.
- **The fix:** Add an `aria-label` and hide decorative icons with `aria-hidden="true"`.

## Forms

*Content pending*

## Accordions

Accordions are a vertically stacked set of interactive headers that show or hide related sections of content. They are commonly used to reduce scrolling when presenting multiple sections on the same page. When possible, use native `<details>` and `<summary>`, which provide built-in keyboard interaction and state handling. Custom accordions require additional markup and logic to achieve the same behavior.

### Accordion with Native Details

This example uses the native `<details>` element to implement an accordion-style disclosure. The `<summary>` acts as the interactive header, and the browser automatically manages keyboard interaction, focus behavior, and expanded or collapsed state.

**Example:**

```html
<details>
  <summary>Accordion Heading</summary>
  <div class="content">
    <p>Accordion content.</p>
  </div>
</details>
```

### Accordion without Native Semantics

This example shows an accordion built with generic elements and JavaScript. Without native semantics, the accordion header must be implemented as a button, and expanded or collapsed state must be communicated explicitly to assistive technologies.

#### Key Requirements

- Each accordion header must be a real `<button>` element.
- `aria-expanded` must accurately reflect the panel's visible state.
- Values used by `aria-controls` must reference unique IDs.
- Keyboard interaction (Enter, Space, and logical Tab order) must be supported.
- Focus must be clearly visible when navigating by keyboard.

**References:**
- **WCAG** [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value); [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard); [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels); [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
- **Techniques** [ARIA5](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5), [ARIA4](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA4), [G90](https://www.w3.org/WAI/WCAG22/Techniques/general/G90), [G131](https://www.w3.org/WAI/WCAG22/Techniques/general/G131), [G149](https://www.w3.org/WAI/WCAG22/Techniques/general/G149), [G165](https://www.w3.org/WAI/WCAG22/Techniques/general/G165)

**Example:**

```html
<div class="accordion">
  <div class="accordion-header">
    <h3>
      <button
        aria-expanded="false"
        aria-controls="example-accordion">
        Accordion Heading
      </button>
    </h3>
  </div>
  <div class="accordion-content">
    <div
      id="example-accordion"
      class="accordion-content-inner" hidden>
      <p>Accordion content.</p>
    </div>
  </div>
</div>
```

#### Accordion Animation Considerations

Animating accordion height directly can cause layout thrashing and jank. Using a grid-based approach allows the panel to **animate smoothly without measuring content height** in JavaScript.

⚠️ With a fixed transition duration (0.3s here), the perceived animation speed varies with content length, with longer panels appearing to move faster.

**Example:**

```css
.accordion {
  &:has([aria-expanded="true"]) {
    .accordion-content {
      grid-template-rows: 1fr;
    }
  }
  .accordion-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s;

    .accordion-content-inner {
      min-height: 0;
      overflow: hidden;
    }
  }
}
```

## Tabs

Tabs switch between related views in the same context, showing one panel at a time. They work best when users need to compare or switch between closely related content without navigating away.

Tabs are not just styled buttons. They require specific keyboard behavior and state management to work correctly with assistive technologies.

### Basic Tabs Pattern

This example shows a simple tab interface where each tab controls a single panel. Only the active tab is focusable, and switching tabs updates which panel is visible.

#### Key Requirements

- Tabs must be grouped inside a container with role `tablist`.
- Each tab must be a real interactive element with role `tab`, and must be contained within the `tablist`.
- Each tab must control exactly one panel via `aria-controls`.
- Each panel must have role `tabpanel` and reference its controlling tab using `aria-labelledby`.
- The active tab must have `aria-selected="true"`; all other tabs must have it set to `false`.
- Only the active tab should be focusable with the Tab key; inactive tabs should be skipped in the Tab order (typically using `tabindex="-1"`).
- Tabs must support **looping arrow key navigation** (Left and Right Arrow for horizontal tabs).
- The tablist must have an accessible name, provided by `aria-label` or `aria-labelledby`.
- Focus must remain visible and predictable at all times.

**References:**
- **WCAG** [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value); [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships); [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard); [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
- **Techniques** [ARIA5](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5), [G90](https://www.w3.org/WAI/WCAG22/Techniques/general/G90)

**Example:**

```html
<div role="tablist" aria-label="Tabs Heading">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">Tab 2</button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <p>Tab 1 Panel</p>
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <p>Tab 2 Panel</p>
</div>
```

### Vertical Tabs

Vertical tabs place the tab list along the side of the content. When tabs are arranged vertically, set `aria-orientation="vertical"` on the tablist so assistive technologies interpret arrow key navigation correctly.

#### Key Requirements

- Tabs must support **looping arrow key navigation** (Up Arrow and Down Arrow).

**References:**
- **WCAG** [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard); [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships); [3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification)
- **Techniques** [G90](https://www.w3.org/WAI/WCAG22/Techniques/general/G90)

**Example:**

```html
<div role="tablist" aria-label="Tabs Heading" aria-orientation="vertical">
  ...
</div>
```

## Modal / Dialog

**Modal dialogs interrupt the main page.** They ask for input, show critical information, or confirm an action.

Use the native `<dialog>` element when possible. It provides correct focus management and modal behaviour by default. Custom dialogs require significantly more work to reach the same level of accessibility.

### Native Dialog

The native `<dialog>` element handles focus trapping, keyboard interaction, and modal behaviour automatically. **This is the safest and least error-prone option.**

#### Dev Notes

Use the native dialog API to open and close dialogs. Call `showModal()` to open a modal dialog, and `close()` to dismiss it.

**Opening a dialog with `show()` does not create a modal.** Focus will not be trapped, and background content remains interactive.

Avoid toggling visibility with CSS alone, as that bypasses built-in focus and modal behaviour.

**References:**
- **WCAG** [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order); [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap); [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value); [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus); [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible); [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus); [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- **Techniques** [G59](https://www.w3.org/WAI/WCAG22/Techniques/general/G59), [G21](https://www.w3.org/WAI/WCAG22/Techniques/general/G21), [ARIA18](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA18)

**Example:**

```html
<button>Open dialog</button>

<dialog>
  <button aria-label="Close dialog">Close</button>
  <h2>Dialog Title</h2>
  <p>Dialog content</p>
</dialog>
```

### Custom Dialog (Using Divs)

Some projects cannot use the native `<dialog>` element due to legacy code, custom animation requirements, or framework constraints. **In these cases, modal behaviour must be implemented manually.**

#### Dev Notes

This example uses `autofocus` to demonstrate initial focus placement, but `autofocus` alone does not make a dialog accessible.

**Custom dialogs require explicit focus management.** Even with careful handling, they cannot fully replicate native dialog behaviour, which is why native `<dialog>` remains the preferred option.

For custom dialogs, `inert` is the modern way to disable background content, but it must still be paired with explicit focus management.

#### Key Requirements

- The dialog container must have `role="dialog"` and `aria-modal="true"`.
- The dialog must have an accessible name via `aria-labelledby` or `aria-label`.
- Focus must move into the dialog when it opens and be trapped while it is active.
- Escape must close the dialog.
- Focus must return to the triggering element when the dialog closes.

**References:**
- **WCAG** [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order); [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap); [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value); [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus); [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible); [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus); [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- **Techniques** [G59](https://www.w3.org/WAI/WCAG22/Techniques/general/G59), [G21](https://www.w3.org/WAI/WCAG22/Techniques/general/G21), [ARIA18](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA18)

**Example:**

```html
<button>Open dialog</button>

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
</div>
```

## Navigation

Navigation helps users understand where they are and where they can go. It should be predictable, consistent, and easy to scan.

**Good navigation is mostly about structure, not interaction.** Use semantic HTML first. Add behaviour only when necessary.

### Skip to Content

**Skip links let keyboard and screen reader users bypass repeated navigation.** They should be the first focusable element on the page and become visible on focus.

#### Key Requirements

- The skip link should be the first focusable element in the DOM.
- It must move focus to a meaningful landmark or main heading.
- The skip link target should be programmatically focusable (for example, `tabindex="-1"` on `<main>`) so focus moves reliably across browsers.
- It should be **visually hidden until focused**, not removed from the DOM.

**Example:**

```html
<a href="#main" class="skip-link">Skip to Content</a>

<nav aria-label="Primary Navigation">
  ...
</nav>

<main id="main" tabIndex="-1">
  <h1>Page Title</h1>
</main>
```

### Single-level Navigation

A single-level navigation lists top-level destinations without nested menus. This pattern is the simplest and most robust form of site navigation.

#### Key Requirements

- Use the `<nav>` element to identify navigation regions.
- Use `aria-label` on `<nav>` when multiple navigation regions exist.
- Navigation landmarks allow screen reader users to jump directly to site navigation.
- Navigation links should be real `<a>` elements, not buttons.
- The current page should be indicated using `aria-current="page"`.
- Navigation order should match the visual order.
- **Arrow key navigation is not required.** Single-level navigation relies on Tab and Shift + Tab, not menu-style keyboard behavior.

#### Dev Notes

Single-level navigation can be horizontal or vertical. Orientation does not change keyboard behavior, and `aria-orientation` is not required for standard site navigation.

**References:**
- **WCAG** [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships); [2.4.8 Location](https://www.w3.org/WAI/WCAG22/Understanding/location)
- **Techniques** [H97](https://www.w3.org/WAI/WCAG22/Techniques/html/H97), [G128](https://www.w3.org/WAI/WCAG22/Techniques/general/G128)

**Example:**

```html
<nav aria-label="Primary Navigation">
  <ul>
    <li>
      <a href="/" aria-current="page">Home</a>
    </li>
    <li>...</li>
  </ul>
</nav>
```

### Dropdown Navigation

Dropdown navigation is commonly used to reveal secondary links. **In site navigation, this should be treated as a disclosure pattern**, not an application-style menu.

Use a real `<button>` to toggle visibility, and real `<a>` elements for navigation links.

#### Key Requirements

- The toggle must be a real `<button>`, not a link.
- Use `aria-expanded` on the toggle button to reflect state.
- The dropdown content should remain in normal DOM order.
- Keyboard users must be able to Tab into and out of the dropdown naturally.
- **Arrow keys are optional** for site navigation dropdowns. They are only required for application-style menus.

**References:**
- **WCAG** [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value); [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard); [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships)
- **Techniques** [ARIA5](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5)

**Example:**

```html
<nav aria-label="Primary Navigation">
  <ul>
    <li>
      <a href="/" aria-current="page">Home</a>
    </li>

    <li>
      <button
        aria-expanded="false"
        aria-haspopup="true"
        aria-controls="item-subnav">
        Nav Item with Dropdown
      </button>

      <ul id="item-subnav" hidden>
        <li><a href="...">Dropdown item</a></li>
        <li><a href="...">Dropdown item</a></li>
      </ul>
    </li>
    <li>...</li>
  </ul>
</nav>
```

### Breadcrumb Navigation

Breadcrumbs show users where they are in a site's hierarchy and how the current page fits within it. They provide context, not primary navigation shortcuts.

Breadcrumbs are especially helpful on deep or content-heavy sites, where users may arrive from search or external links.

#### Key Requirements

- Use a `<nav>` element with `aria-label="Breadcrumb"` to identify the region.
- Breadcrumbs should reflect the **structural hierarchy**, not the user's browsing history. An ordered list (`<ol>`) is recommended to reflect the hierarchical path of the breadcrumb.
- Each breadcrumb item should be a real `<a>` link, except for the current page.
- The current page should be indicated using `aria-current="page"`.
- Breadcrumbs rely on normal Tab navigation; arrow key navigation is not required.
- **Visual separators must be decorative only and added via CSS**, not as text or markup.

**References:**
- **WCAG** [2.4.8 Location](https://www.w3.org/WAI/WCAG22/Understanding/location); [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships); [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context)
- **Techniques** [G128](https://www.w3.org/WAI/WCAG22/Techniques/general/G128), [ARIA11](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11)

**Example:**

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="#">Parent Page</a>
    </li>
    <li aria-current="page">
      <span>Child Page</span>
    </li>
  </ol>
</nav>
```

---

# Check & Fix

Accessibility issues often appear during testing, debugging, or late-stage reviews. **Keyboard navigation breaks.** **Labels are unclear.** **ARIA warnings are hard to interpret.** This section collects tools and debugging workflows for when the cause is not obvious.

## Tools

A curated set of tools commonly used in accessibility-focused design and development. These tools are best used continuously, not only at the end of a project.

- **[Chrome DevTools Accessibility](https://developer.chrome.com/docs/devtools/accessibility/)** (opens in a new tab)  
  Inspect semantics, roles, names, focus behavior, and contrast directly in the browser.

- **[Axe DevTools](https://www.deque.com/axe/devtools/)** (opens in a new tab)  
  Automated accessibility testing with clear issue descriptions and references to standards.

- **[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)** (opens in a new tab)  
  High-level audits that help catch baseline accessibility issues and track improvements over time.

- **[WAVE](https://wave.webaim.org/)** (opens in a new tab)  
  Visual overlays that highlight structural and content-related accessibility issues.

- **[Pa11y](https://pa11y.org/)** (opens in a new tab)  
  A CLI tool for automated accessibility testing in CI/CD pipelines.

- **[NVDA](https://www.nvaccess.org/)** (opens in a new tab) / **[VoiceOver](https://www.apple.com/accessibility/vision/)** (opens in a new tab)  
  Screen readers for validating the experience of blind and low-vision users.

- **[Stark for Figma](https://www.getstark.co/figma/)** (opens in a new tab)  
  Design-time accessibility tools for Figma, covering contrast, color blindness, and touch targets.

- **[colourcontrast.cc](https://colourcontrast.cc/)** (opens in a new tab)  
  Check text and UI contrast against WCAG requirements during design and implementation.

- **[colorcontrast.app](https://colorcontrast.app/)** (opens in a new tab)  
  A simple tool to verify color contrast ratios for text and graphical elements.

- **[Typescale](https://typescale.com/)** (opens in a new tab)  
  Explore typographic scales and hierarchy to support readable, consistent text systems.

## Debugging Workflows

These workflows describe common accessibility problems and how to approach them when the cause is not obvious. They are meant to be used alongside tools, not instead of them.

### Finding Missing Labels

**When form controls or interactive elements feel unclear**, or do not announce properly when navigating by keyboard or screen reader. This workflow focuses on tracing the issue back to **structure**, **labeling**, or **content**, instead of patching individual elements.

### Fixing Incorrect ARIA

**When ARIA roles or states do not match actual behavior**, or when tools report ARIA issues that are hard to interpret. This workflow helps decide whether ARIA is needed at all, and when **removing ARIA** is the better fix.

### Diagnosing Focus Traps

**When keyboard navigation loops, skips content, or loses focus**, often inside modals or custom components. This workflow looks at **focus flow** and **interaction boundaries** to identify where focus breaks.

