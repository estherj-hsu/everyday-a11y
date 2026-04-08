import CodeExample from '../components/CodeExample'
import './ImageGallery.scss'

const galleryGridCode = `<ul role="list" class="gallery-grid">
  <li>
    <button type="button">
      <img src="/photos/golden-walk.jpg" alt="Golden Retriever on a sunny walk" width="120" height="90" />
    </button>
  </li>
  <li>
    <button type="button">
      <img src="/photos/collie-agility.jpg" alt="Border Collie practicing agility jumps" width="120" height="90" />
    </button>
  </li>
  <!-- one button per image; each alt describes the photo, not the position -->
  ...
</ul>`

const lightboxCode = `<dialog aria-labelledby="lightbox-heading">
  <button type="button" class="dialog-dismiss" aria-label="Close lightbox">Close</button>

  <h2 id="lightbox-heading" class="visually-hidden">Golden Retriever on a sunny walk</h2>

  <img src="/photos/golden-walk-full.jpg" alt="Golden Retriever on a sunny walk, full size" />

  <p class="caption">Golden Retriever on a sunny walk</p>

  <p class="visually-hidden" aria-live="polite" aria-atomic="true">Image 1 of 6</p>

  <button type="button" class="dialog-prev" aria-label="Previous image">Previous</button>
  <button type="button" class="dialog-next" aria-label="Next image">Next</button>
</dialog>`

const demoTitleId = 'image-gallery-demo-title'

const imageGalleryDemoHtml = `<p class="preview-hint text-small">
  💡 Click or Tab in an image to open the lightbox. Use Escape or the close button to return focus to the grid.
</p>

<div data-image-gallery class="image-gallery">
  <ul role="list" class="image-gallery-grid">
    <li>
      <button
        type="button"
        class="image-gallery-item"
        data-image-index="0"
        data-image-alt="Golden Retriever on a sunny walk"
        data-image-caption="Golden Retriever on a sunny walk">
        <span class="image-gallery-thumb image-gallery-thumb--1" aria-hidden="true">Golden Retriever on a sunny walk</span>
        <span class="visually-hidden">Golden Retriever on a sunny walk</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        class="image-gallery-item"
        data-image-index="1"
        data-image-alt="Border Collie practicing agility jumps"
        data-image-caption="Border Collie practicing agility jumps">
        <span class="image-gallery-thumb image-gallery-thumb--2" aria-hidden="true">Border Collie practicing agility jumps</span>
        <span class="visually-hidden">Border Collie practicing agility jumps</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        class="image-gallery-item"
        data-image-index="2"
        data-image-alt="Corgi napping on a plaid blanket"
        data-image-caption="Corgi napping on a plaid blanket">
        <span class="image-gallery-thumb image-gallery-thumb--3" aria-hidden="true">Corgi napping on a plaid blanket</span>
        <span class="visually-hidden">Corgi napping on a plaid blanket</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        class="image-gallery-item"
        data-image-index="3"
        data-image-alt="Labrador splashing in shallow water"
        data-image-caption="Labrador splashing in shallow water">
        <span class="image-gallery-thumb image-gallery-thumb--4" aria-hidden="true">Labrador splashing in shallow water</span>
        <span class="visually-hidden">Labrador splashing in shallow water</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        class="image-gallery-item"
        data-image-index="4"
        data-image-alt="Dachshund in a cozy sweater"
        data-image-caption="Dachshund in a cozy sweater">
        <span class="image-gallery-thumb image-gallery-thumb--5" aria-hidden="true">Dachshund in a cozy sweater</span>
        <span class="visually-hidden">Dachshund in a cozy sweater</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        class="image-gallery-item"
        data-image-index="5"
        data-image-alt="Mixed-breed rescue pup meeting a new friend"
        data-image-caption="Mixed-breed rescue pup meeting a new friend">
        <span class="image-gallery-thumb image-gallery-thumb--6" aria-hidden="true">Mixed-breed rescue pup meeting a new friend</span>
        <span class="visually-hidden">Mixed-breed rescue pup meeting a new friend</span>
      </button>
    </li>
  </ul>

  <dialog class="image-gallery-dialog" aria-labelledby="${demoTitleId}">
    <button type="button" class="dialog-dismiss" aria-label="Close lightbox">Close</button>

    <h2 id="${demoTitleId}" class="visually-hidden" data-image-gallery-title>Golden Retriever on a sunny walk</h2>

    <div class="image-gallery-dialog-img" role="img" aria-label="Golden Retriever on a sunny walk">
      Golden Retriever on a sunny walk
    </div>

    <p class="image-gallery-dialog-caption">Golden Retriever on a sunny walk</p>

    <p class="image-gallery-live visually-hidden" aria-live="polite" aria-atomic="true">Image 1 of 6</p>

    <div class="image-gallery-dialog-controls">
      <button type="button" class="dialog-prev" aria-label="Previous image">Previous</button>
      <button type="button" class="dialog-next" aria-label="Next image">Next</button>
    </div>
  </dialog>
</div>`

const fullGalleryExampleCode = `<div data-image-gallery class="image-gallery">
  <ul role="list" class="image-gallery-grid">
    <li>
      <button
        type="button"
        class="image-gallery-item"
        data-image-index="0"
        data-image-alt="Golden Retriever on a sunny walk"
        data-image-caption="Golden Retriever on a sunny walk">
        <span class="image-gallery-thumb" aria-hidden="true">…</span>
        <span class="visually-hidden">Golden Retriever on a sunny walk</span>
      </button>
    </li>
    <!-- …repeat for remaining images -->
  </ul>

  <!-- Empty gallery dialog -->
  <dialog class="image-gallery-dialog" aria-labelledby="image-gallery-dialog-title">
    <button type="button" class="dialog-dismiss" aria-label="Close lightbox">Close</button>
    <h2 id="image-gallery-dialog-title" class="visually-hidden" data-image-gallery-title></h2>
    <div class="image-gallery-dialog-img" role="img" aria-label=""></div>
    <p class="image-gallery-dialog-caption"></p>
    <p class="image-gallery-live visually-hidden" aria-live="polite" aria-atomic="true"></p>
    <div class="image-gallery-dialog-controls">
      <button type="button" class="dialog-prev" aria-label="Previous image">Previous</button>
      <button type="button" class="dialog-next" aria-label="Next image">Next</button>
    </div>
  </dialog>
</div>

<script>
  function setupImageGallery(galleryRoot) {
    const dialog = galleryRoot.querySelector('dialog')
    const titleEl = dialog.querySelector('[data-image-gallery-title]')
    const dialogImg = dialog.querySelector('.image-gallery-dialog-img')
    const captionEl = dialog.querySelector('.image-gallery-dialog-caption')
    const liveEl = dialog.querySelector('.image-gallery-live')
    const gridButtons = galleryRoot.querySelectorAll('button[data-image-index]')
    const total = gridButtons.length
    let triggerButton = null
    let currentIndex = 0

    const getAlt = (btn) =>
      btn.getAttribute('data-image-alt')?.trim() || btn.querySelector('.visually-hidden')?.textContent?.trim() || ''

    const applySlide = (index) => {
      const i = ((index % total) + total) % total
      currentIndex = i
      const btn = gridButtons[i]
      const alt = getAlt(btn)
      const caption = btn.getAttribute('data-image-caption')?.trim() || alt
      if (titleEl) titleEl.textContent = alt
      if (dialogImg) {
        dialogImg.setAttribute('aria-label', alt)
        dialogImg.textContent = alt
      }
      if (captionEl) captionEl.textContent = caption
      if (liveEl) liveEl.textContent = 'Image ' + (i + 1) + ' of ' + total
    }

    galleryRoot.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-image-index]')
      if (!btn || !galleryRoot.contains(btn)) return
      triggerButton = btn
      applySlide(parseInt(btn.getAttribute('data-image-index') || '0', 10))
      dialog.showModal()
    })

    dialog.querySelector('.dialog-prev')?.addEventListener('click', () => applySlide(currentIndex - 1))
    dialog.querySelector('.dialog-next')?.addEventListener('click', () => applySlide(currentIndex + 1))
    dialog.querySelector('.dialog-dismiss')?.addEventListener('click', () => dialog.close())
    dialog.addEventListener('close', () => triggerButton?.focus())
  }

  document.querySelectorAll('[data-image-gallery]').forEach(setupImageGallery)
</script>`

export default function ImageGallery() {
  return (
    <div className="pattern-page">
      <h1>Image Gallery</h1>
      <p>An image gallery presents a collection of images in a grid. Clicking an image opens it in a lightbox: a dialog that shows the full-size image with previous and next controls.</p>
      <p>
        <mark>The grid and the lightbox are two separate accessibility problems. Solve them separately.</mark> The grid needs a meaningful name for every image. The lightbox needs the same discipline
        as any other modal: focus, name, and an escape hatch.
      </p>

      <section className="example">
        <h2>Gallery Grid</h2>
        <p>
          The grid is a list of interactive elements. Each item opens a dialog, so each item is a <code>&lt;button&gt;</code>, not a link. Every button needs an accessible name that describes the
          image, not just its position.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Wrap items in <code>&lt;ul&gt;</code> with <code>role=&quot;list&quot;</code> to preserve list semantics in Safari + VoiceOver when <code>list-style</code> is removed via CSS
          </li>
          <li>
            Each item is a <code>&lt;button&gt;</code> (opens a dialog = action, not navigation)
          </li>
          <li>
            Each <code>&lt;img&gt;</code> has a descriptive <code>alt</code> that describes the photo content, not its position in the grid. Skip bare labels like &quot;Image 1&quot; or &quot;Photo
            2&quot;.
          </li>
          <li>
            If the image is purely decorative within a labeled button, use <code>alt=&quot;&quot;</code> and provide the name via <code>aria-label</code> on the button instead
          </li>
        </ul>

        <h3>Dev Notes</h3>
        <ul>
          <li>
            Assistive tech usually builds the button name from the thumbnail <code>&lt;img&gt;</code>, so the <code>alt</code> is what people hear. An empty or generic alt means a generic button, no
            matter how pretty the layout is.
          </li>
          <li>
            When the thumbnail is purely decorative, the story moves to the button: <code>alt=&quot;&quot;</code> on the image plus an <code>aria-label</code> on the button avoids the name being read
            twice.
          </li>
          <li>
            <code>role=&quot;list&quot;</code> on the <code>&lt;ul&gt;</code> matters because VoiceOver on Safari drops list semantics when <code>list-style: none</code> is set in CSS. Without it,
            users lose the sense of &quot;how many items&quot; and &quot;where am I in the set.&quot; See the ARIA Reference for details.
          </li>
        </ul>

        <CodeExample code={galleryGridCode} showPreview={false} />

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-content">1.1.1 Non-text Content</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G94">G94</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/html/H37">H37</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>
          </li>
        </ul>

        <h3>Quick Check</h3>
        <ul className="quick-check">
          <li>
            List uses <code>role=&quot;list&quot;</code> when CSS removes bullets so the list still reads as a list in Safari + VoiceOver.
          </li>
          <li>
            Each thumbnail is a real <code>&lt;button&gt;</code>, not a link, because opening the lightbox is an action.
          </li>
          <li>
            Every button has a descriptive name from the image <code>alt</code> (or from <code>aria-label</code> when the thumbnail is decorative).
          </li>
          <li>Accessible names describe the photo, not its position in the grid.</li>
        </ul>
      </section>

      <section className="example">
        <h2>Lightbox</h2>
        <p>
          The lightbox is a <code>&lt;dialog&gt;</code>. All the requirements from the Modal / Dialog pattern apply. The gallery-specific details are about focus return, image description, and
          prev/next navigation inside the dialog.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Use native <code>&lt;dialog&gt;</code> with <code>showModal()</code> for this pattern; avoid custom div-based dialogs.
          </li>
          <li>
            The dialog must have an accessible name via <code>aria-labelledby</code> pointing to the image caption or a visually hidden heading
          </li>
          <li>
            The full-size <code>&lt;img&gt;</code> inside the dialog must have a descriptive <code>alt</code> attribute
          </li>
          <li>When the dialog closes, focus returns to the exact button that opened it, not the first button in the gallery.</li>
          <li>
            If the dialog has prev/next controls, they must be real <code>&lt;button&gt;</code> elements with descriptive <code>aria-label</code> values: &quot;Previous image&quot; and &quot;Next
            image&quot;
          </li>
          <li>
            Pressing <kbd>Escape</kbd> closes the dialog and returns focus to the triggering button
          </li>
          <li>
            <code>aria-live=&quot;polite&quot;</code> on a visually hidden element inside the dialog can announce the current position when prev/next is used: &quot;Image 2 of 6&quot;
          </li>
        </ul>

        <h3>Dev Notes</h3>
        <ul>
          <li>
            Focus return sounds simple but is easy to get wrong in a gallery. The dialog must send focus back to the exact button that opened it, not the first item in the grid, not the gallery
            container, and not the dialog itself.
          </li>
          <li>
            Prev/next inside the lightbox should stay one continuous modal session. Closing and reopening the dialog on every image fights focus and screen reader announcements; updating the image,
            caption, and live region in place keeps the story coherent.
          </li>
          <li>
            <mark>The full-size image should be at least as descriptive as the thumbnail.</mark> An empty <code>alt</code> on the large image is a full-screen view that says nothing to assistive tech.
            Match or expand on the thumbnail&apos;s description instead.
          </li>
        </ul>

        <CodeExample code={lightboxCode} showPreview={false} />

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-order">2.4.3 Focus Order</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap">2.1.2 No Keyboard Trap</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible">2.4.7 Focus Visible</a>; <a href="https://www.w3.org/WAI/WCAG22/Understanding/status-messages">4.1.3 Status Messages</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G59">G59</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G21">G21</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA18">ARIA18</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22">ARIA22</a>
          </li>
        </ul>

        <h3>Quick Check</h3>
        <ul className="quick-check">
          <li>
            Lightbox uses <code>&lt;dialog&gt;</code> and <code>showModal()</code>, not a styled <code>&lt;div&gt;</code> overlay.
          </li>
          <li>
            The dialog has a clear name (<code>aria-labelledby</code> or equivalent) and the large image has a meaningful <code>alt</code>.
          </li>
          <li>
            Closing with <kbd>Escape</kbd> or the close button returns focus to the thumbnail button that opened the lightbox.
          </li>
          <li>
            Prev and next are <code>&lt;button&gt;</code> controls with descriptive <code>aria-label</code> values (for example, &quot;Previous image&quot; and &quot;Next image&quot;).
          </li>
          <li>If the dialog has prev/next controls, a live region announces the current position when the image changes.</li>
        </ul>
      </section>

      <section className="example">
        <h2>Example</h2>
        <p>
          This demo combines the grid and the lightbox: each thumbnail is a button with a descriptive name, and the lightbox is a native <code>&lt;dialog&gt;</code> opened with{' '}
          <code>showModal()</code>. Expand <strong>Code</strong> above the live example for abbreviated markup plus sample JavaScript (the site uses the same logic in{' '}
          <code>previewInteractions.ts</code>).
        </p>
        <CodeExample language="html" code={fullGalleryExampleCode} previewCode={imageGalleryDemoHtml} layout="vertical" />
      </section>
    </div>
  )
}
