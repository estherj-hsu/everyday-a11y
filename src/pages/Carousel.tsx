import './Carousel.scss'
import CodeExample from '../components/CodeExample'

const staticPreviewHtml = `<p class="preview-hint text-small">
  💡 Tab into the active slide; hidden slides are removed from the tab order.
</p>

<div data-carousel>
  <div
    role="region"
    aria-roledescription="carousel"
    aria-label="Puppy photo highlights"
    class="carousel">
    <div class="carousel-slides">
      <div
        role="group"
        aria-roledescription="slide"
        aria-label="Slide 1 of 3"
        class="carousel-slide">
        <p><strong>Slide 1 — Morning walk</strong></p>
        <p>Leash on, snoot up: this pup’s ready to greet every neighbor.</p>
      </div>
      <div
        role="group"
        aria-roledescription="slide"
        aria-label="Slide 2 of 3"
        class="carousel-slide"
        hidden>
        <p><strong>Slide 2 — Training time</strong></p>
        <p>Sit, stay, treat: short sessions keep tails wagging and brains busy.</p>
      </div>
      <div
        role="group"
        aria-roledescription="slide"
        aria-label="Slide 3 of 3"
        class="carousel-slide"
        hidden>
        <p><strong>Slide 3 — Cozy nap</strong></p>
        <p>After zoomies, the best spot is a sunbeam and a soft blanket.</p>
      </div>
    </div>
    <div class="carousel-controls">
      <button type="button" class="carousel-prev" aria-label="Previous slide, currently on slide 1 of 3">
        Previous
      </button>
      <button type="button" class="carousel-next" aria-label="Next slide">Next</button>
    </div>
    <div class="carousel-indicators" role="group" aria-label="Slides">
      <button type="button" aria-label="Go to slide 1" aria-current="true"><span class="visually-hidden">1</span></button>
      <button type="button" aria-label="Go to slide 2"><span class="visually-hidden">2</span></button>
      <button type="button" aria-label="Go to slide 3"><span class="visually-hidden">3</span></button>
    </div>
  </div>
</div>`

const autoPreviewHtml = `<p class="preview-hint text-small">
  💡 Auto-rotation pauses when you focus inside the carousel.
</p>

<div data-carousel>
  <button type="button" class="carousel-pause" aria-label="Play carousel" aria-pressed="false">Play</button>
  <div
    role="region"
    aria-roledescription="carousel"
    aria-label="Puppy photo highlights"
    class="carousel">
    <div class="carousel-slides">
      <div
        role="group"
        aria-roledescription="slide"
        aria-label="Slide 1 of 3"
        class="carousel-slide">
        <p><strong>Slide 1 — Morning walk</strong></p>
        <p>Leash on, snoot up: this pup’s ready to greet every neighbor.</p>
      </div>
      <div
        role="group"
        aria-roledescription="slide"
        aria-label="Slide 2 of 3"
        class="carousel-slide"
        hidden>
        <p><strong>Slide 2 — Training time</strong></p>
        <p>Sit, stay, treat: short sessions keep tails wagging and brains busy.</p>
      </div>
      <div
        role="group"
        aria-roledescription="slide"
        aria-label="Slide 3 of 3"
        class="carousel-slide"
        hidden>
        <p><strong>Slide 3 — Cozy nap</strong></p>
        <p>After zoomies, the best spot is a sunbeam and a soft blanket.</p>
      </div>
    </div>
    <div class="carousel-controls">
      <button type="button" class="carousel-prev" aria-label="Previous slide, currently on slide 1 of 3">
        Previous
      </button>
      <button type="button" class="carousel-next" aria-label="Next slide">Next</button>
    </div>
    <div class="carousel-indicators" role="group" aria-label="Slides">
      <button type="button" aria-label="Go to slide 1" aria-current="true"><span class="visually-hidden">1</span></button>
      <button type="button" aria-label="Go to slide 2"><span class="visually-hidden">2</span></button>
      <button type="button" aria-label="Go to slide 3"><span class="visually-hidden">3</span></button>
    </div>
  </div>
</div>`

export default function Carousel() {
  return (
    <div className="pattern-page">
      <h1>Carousel</h1>
      <p>
        A carousel presents a set of slides in the same place, usually with previous and next controls. Assistive technology users need the same structure and predictable keyboard behavior as sighted
        users, with extra care when slides change on a timer.
      </p>
      <p>
        <mark>Most carousels are a UX anti-pattern.</mark> Use one only when the content is genuinely sequential, space is constrained, and a simpler page layout would bury the material. If users need
        to compare items or read in any order, use plain sections or a grid instead.
      </p>

      <section className="example">
        <h2>When to use</h2>
        <p>
          Prefer static content, accordions, or tabs when the information is not strictly linear. Reach for a carousel when you have a short, ordered story (for example, onboarding steps or a tightly
          related image set) and horizontal space is limited.
        </p>
      </section>

      <section className="example">
        <h2>Static Carousel</h2>
        <p>
          In a static carousel, slides change only when the user activates a control. There is no timer, so you avoid many of the motion and interruption issues that affect auto-rotating carousels.
        </p>

        <h3>Key Requirements</h3>
        <ul>
          <li>
            Outer container: <code>role="region"</code>, <code>aria-roledescription="carousel"</code>, and <code>aria-label</code> describing the content.
          </li>
          <li>
            Each slide: <code>role="group"</code>, <code>aria-roledescription="slide"</code>, and <code>aria-label="Slide X of Y"</code>.
          </li>
          <li>
            Only the active slide is visible; hidden slides use the <code>hidden</code> attribute or <code>display: none</code>.
          </li>
          <li>
            Previous and next buttons have clear names, for example <q>Previous slide</q> and <q>Next slide</q>.
          </li>
          <li>
            Current position is clear from each slide&apos;s <code>aria-label</code> (for example, <q>Slide 1 of 3</q>).
          </li>
          <li>
            <kbd>Tab</kbd> moves into the active slide&apos;s content directly; hidden slides are not in the tab order.
          </li>
          <li>Focus does not move automatically when the slide changes.</li>
        </ul>

        <h3>Dev Notes</h3>
        <ul>
          <li>
            <code>aria-roledescription</code> overrides the default role announcement. It does not provide an accessible name — always pair it with <code>aria-label</code> (or{' '}
            <code>aria-labelledby</code>) on the region.
          </li>
          <li>
            Do not use <code>aria-live</code> on the slide container for a static carousel. Focus does not move on change, so when the user activates a control they already know the slide updated.
          </li>
          <li>
            Slide indicators (dots) are optional. If you use them, implement them as buttons with <code>aria-label="Go to slide X"</code> and <code>aria-current="true"</code> on the active control.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">1.3.1 Info and Relationships</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>; <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible">2.4.7 Focus Visible</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G90">G90</a>
          </li>
        </ul>

        <CodeExample
          code={`<div
  role="region"
  aria-roledescription="carousel"
  aria-label="Featured puppies">
  <div class="carousel-slides">
    <div
      role="group"
      aria-roledescription="slide"
      aria-label="Slide 1 of 3">
      ...
    </div>
    <div
      role="group"
      aria-roledescription="slide"
      aria-label="Slide 2 of 3"
      hidden>
      ...
    </div>
  </div>
  <button type="button" aria-label="Previous slide">...</button>
  <button type="button" aria-label="Next slide">...</button>
</div>`}
          previewCode={staticPreviewHtml}
          previewSize="equal"
        />
      </section>

      <section className="example">
        <h2>Auto-rotating Carousel</h2>
        <p>Auto-rotating carousels add motion and timing. WCAG expects users to be able to pause movement, and to avoid motion that cannot be disabled or that disrupts screen reader use.</p>

        <h3>Key Requirements</h3>
        <ul>
          <li>All static carousel requirements apply.</li>
          <li>A pause/play control must be visible at all times so users can stop movement without hunting for it.</li>
          <li>Auto-rotation pauses when the carousel receives focus, when the pointer hovers over it, and when the pause control is activated.</li>
          <li>Auto-rotation does not start again on its own when focus leaves or the pointer leaves; the user must explicitly resume.</li>
          <li>
            When <code>prefers-reduced-motion: reduce</code> is set, auto-rotation is off entirely, not merely slower.
          </li>
          <li>
            Do not use <code>aria-live</code> while slides advance automatically — it would interrupt screen reader users on every tick. Reserve live announcements for manual navigation if you truly
            need them.
          </li>
        </ul>

        <h3>Dev Notes</h3>
        <ul>
          <li>
            Pausing when the carousel receives focus is easy to get wrong. Listen for <code>focusin</code> on the carousel container so any focused descendant (including the pause button) stops
            rotation, not <code>focus</code> on a single element.
          </li>
          <li>
            Check reduced motion with <code>window.matchMedia('(prefers-reduced-motion: reduce)').matches</code> before starting timers or intervals.
          </li>
        </ul>

        <ul className="references">
          <li>
            <strong>WCAG</strong> <a href="https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide">2.2.2 Pause, Stop, Hide</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions">2.3.3 Animation from Interactions</a>;{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">4.1.2 Name, Role, Value</a>; <a href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard">2.1.1 Keyboard</a>
          </li>
          <li>
            <strong>Techniques</strong> <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G75">G75</a>, <a href="https://www.w3.org/WAI/WCAG22/Techniques/general/G76">G76</a>,{' '}
            <a href="https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5">ARIA5</a>
          </li>
        </ul>

        <CodeExample
          code={`<button type="button" aria-label="Pause carousel" aria-pressed="true">
  Pause
</button>

<div
  role="region"
  aria-roledescription="carousel"
  aria-label="Featured puppies">
  <!-- slides + controls (same as static) -->
</div>`}
          previewCode={autoPreviewHtml}
          previewSize="equal"
        />
      </section>

      <section>
        <h2>Quick Check</h2>
        <ul className="quick-check">
          <li>
            Region: <code>role="region"</code>, <code>aria-roledescription="carousel"</code>, and <code>aria-label</code>.
          </li>
          <li>
            Slides: <code>role="group"</code>, <code>aria-roledescription="slide"</code>, <code>aria-label="Slide X of Y"</code>; only one visible at a time.
          </li>
          <li>Inactive slides are hidden and not tabbable.</li>
          <li>
            Prev/next are real buttons with descriptive labels; optional dots are buttons with <code>aria-current</code> on the active slide.
          </li>
          <li>Tab order follows visible content only; focus does not jump when slides change.</li>
          <li>
            No <code>aria-live</code> on the slide region for manual slide changes.
          </li>
          <li>
            <strong>Auto-rotating:</strong> Pause/play control is always visible; its name and pressed state reflect playing vs paused.
          </li>
          <li>
            <strong>Auto-rotating:</strong> Focus inside or hover over the carousel stops auto-rotation; leaving focus or the pointer does not resume it.
          </li>
          <li>
            <strong>Auto-rotating:</strong> No auto-advance when <code>prefers-reduced-motion: reduce</code> is true.
          </li>
          <li>
            <strong>Auto-rotating:</strong> No <code>aria-live</code> on slides for automatic changes.
          </li>
        </ul>
      </section>
    </div>
  )
}
