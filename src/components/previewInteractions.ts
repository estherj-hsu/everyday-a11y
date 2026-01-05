// Handlers for interactive elements in code previews

type InteractionHandler = (container: HTMLElement) => () => void

// Accordion
function handleAccordions(container: HTMLElement): () => void {
  const accordions = container.querySelectorAll<HTMLElement>('[data-accordion]')
  const cleanupFunctions: Array<() => void> = []

  accordions.forEach(accordion => {
    const button = accordion.querySelector<HTMLButtonElement>('button[aria-expanded][aria-controls]')
    if (!button) return

    const controlsId = button.getAttribute('aria-controls')
    if (!controlsId) return

    const content = container.querySelector(`#${controlsId}`)
    if (!content) return

    const accordionContent = accordion.querySelector<HTMLElement>('.accordion-content')
    if (!accordionContent) return

    // Remove inline onclick handlers
    button.removeAttribute('onclick')

    let transitionEndHandler: ((e: TransitionEvent) => void) | null = null

    const handleClick = () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true'
      const newExpanded = !isExpanded

      // Update data-accordion attribute
      accordion.setAttribute('data-accordion', newExpanded ? 'opened' : 'closed')

      // Update aria-expanded
      button.setAttribute('aria-expanded', String(newExpanded))

      if (newExpanded) {
        // Opening: remove hidden immediately so content can animate in
        content.removeAttribute('hidden')
        // Remove any existing transition handler
        if (transitionEndHandler) {
          accordionContent.removeEventListener('transitionend', transitionEndHandler)
          transitionEndHandler = null
        }
      } else {
        // Closing: wait for transition to complete before setting hidden
        if (transitionEndHandler) {
          accordionContent.removeEventListener('transitionend', transitionEndHandler)
        }

        const handler = (e: TransitionEvent) => {
          // Only handle grid-template-rows transitions
          if (e.propertyName === 'grid-template-rows') {
            content.setAttribute('hidden', '')
            accordionContent.removeEventListener('transitionend', handler)
            transitionEndHandler = null
          }
        }

        transitionEndHandler = handler
        accordionContent.addEventListener('transitionend', handler)
      }
    }

    button.addEventListener('click', handleClick)
    cleanupFunctions.push(() => {
      button.removeEventListener('click', handleClick)
      if (transitionEndHandler) {
        accordionContent.removeEventListener('transitionend', transitionEndHandler)
      }
    })
  })

  return () => {
    cleanupFunctions.forEach(cleanup => cleanup())
  }
}

// Tabs
function handleTabs(container: HTMLElement): () => void {
  const tablists = container.querySelectorAll('[role="tablist"]')
  const cleanupFunctions: Array<() => void> = []

  tablists.forEach(tablist => {
    const tabs = tablist.querySelectorAll<HTMLElement>('[role="tab"]')
    const panels = container.querySelectorAll<HTMLElement>('[role="tabpanel"]')

    tabs.forEach(tab => {
      const controlsId = tab.getAttribute('aria-controls')
      if (!controlsId) return

      const panel = container.querySelector(`#${controlsId}`)
      if (!panel) return

      tab.removeAttribute('onclick')

      const handleClick = () => {
        // Update all tabs
        tabs.forEach(t => {
          const isSelected = t === tab
          t.setAttribute('aria-selected', String(isSelected))
          t.setAttribute('tabindex', isSelected ? '0' : '-1')
        })

        // Update all panels
        panels.forEach(p => {
          if (p.id === controlsId) {
            p.removeAttribute('hidden')
          } else {
            p.setAttribute('hidden', '')
          }
        })
      }

      // Handle arrow key navigation (manual activation)
      const handleKeyDown = (e: KeyboardEvent) => {
        const currentIndex = Array.from(tabs).indexOf(tab)
        let targetIndex = currentIndex

        // Arrow keys, Home, and End: move focus only (manual activation)
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          targetIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
          ;(tabs[targetIndex] as HTMLElement).focus()
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          targetIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
          ;(tabs[targetIndex] as HTMLElement).focus()
        } else if (e.key === 'Home') {
          e.preventDefault()
          targetIndex = 0
          ;(tabs[targetIndex] as HTMLElement).focus()
        } else if (e.key === 'End') {
          e.preventDefault()
          targetIndex = tabs.length - 1
          ;(tabs[targetIndex] as HTMLElement).focus()
        } else if (e.key === 'Enter' || e.key === ' ') {
          // Enter or Space: activate the currently focused tab
          e.preventDefault()
          handleClick()
        }
      }

      tab.addEventListener('click', handleClick)
      tab.addEventListener('keydown', handleKeyDown)

      cleanupFunctions.push(() => {
        tab.removeEventListener('click', handleClick)
        tab.removeEventListener('keydown', handleKeyDown)
      })
    })
  })

  return () => {
    cleanupFunctions.forEach(cleanup => cleanup())
  }
}

// Modals/Dialogs
function handleModals(container: HTMLElement): () => void {
  const cleanup: Array<() => void> = []

  // ---------- Native <dialog> ----------
  container.querySelectorAll<HTMLDialogElement>('dialog').forEach(dialog => {
    const id = dialog.id
    if (!id) return

    container.querySelectorAll<HTMLElement>(`[data-dialog="${id}"]`).forEach(trigger => {
      const open = () => dialog.showModal()
      trigger.addEventListener('click', open)
      cleanup.push(() => trigger.removeEventListener('click', open))
    })

    dialog.querySelectorAll<HTMLButtonElement>('button.dismiss').forEach(btn => {
      const close = () => dialog.close()
      btn.addEventListener('click', close)
      cleanup.push(() => btn.removeEventListener('click', close))
    })
  })

  // ---------- Helpers ----------
  const getFocusable = (root: HTMLElement): HTMLElement[] => {
    return Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('hidden'))
  }

  const setInertSiblings = (dialog: HTMLElement, inert: boolean) => {
    Array.from(container.children).forEach(el => {
      if (el === dialog) return
      inert ? el.setAttribute('inert', '') : el.removeAttribute('inert')
    })
  }

  // ---------- Custom dialogs ----------
  container.querySelectorAll<HTMLElement>('[role="dialog"]').forEach(dialog => {
    if (dialog.tagName.toLowerCase() === 'dialog') return

    const id = dialog.id
    if (!id) return

    let trigger: HTMLElement | null = null

    // Open
    container.querySelectorAll<HTMLElement>(`[data-dialog="${id}"]`).forEach(btn => {
      const open = () => {
        trigger = btn
        dialog.removeAttribute('hidden')

        // Make background inert
        setInertSiblings(dialog, true)

        // Move focus into dialog
        const focusables = getFocusable(dialog)
        focusables[0]?.focus()
      }

      btn.addEventListener('click', open)
      cleanup.push(() => btn.removeEventListener('click', open))
    })

    // Close
    const close = () => {
      dialog.setAttribute('hidden', '')
      setInertSiblings(dialog, false)
      trigger?.focus()
    }

    dialog.querySelectorAll<HTMLElement>('button.dismiss').forEach(btn => {
      btn.addEventListener('click', close)
      cleanup.push(() => btn.removeEventListener('click', close))
    })

    // Escape
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !dialog.hasAttribute('hidden')) {
        e.preventDefault()
        close()
      }
    }

    // Focus pinning (simple + predictable)
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || dialog.hasAttribute('hidden')) return

      const focusables = getFocusable(dialog)
      if (focusables.length === 0) {
        e.preventDefault()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        first.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        last.focus()
      }
    }

    dialog.addEventListener('keydown', onEscape)
    dialog.addEventListener('keydown', onTab)

    cleanup.push(() => {
      dialog.removeEventListener('keydown', onEscape)
      dialog.removeEventListener('keydown', onTab)
    })
  })

  return () => cleanup.forEach(fn => fn())
}

// Navigation
function handleNavigation(container: HTMLElement): () => void {
  const cleanupFunctions: Array<() => void> = []

  // Find all navigation dropdown buttons
  container.querySelectorAll<HTMLButtonElement>('nav button[aria-expanded][aria-controls]').forEach(button => {
    const controlsId = button.getAttribute('aria-controls')
    if (!controlsId) return

    const dropdown = container.querySelector<HTMLElement>(`#${controlsId}`)
    if (!dropdown) return

    // Get the parent nav-item to check if focus is within the dropdown area
    const navItem = button.closest('.nav-item')
    if (!navItem) return

    // Remove any inline onclick handlers
    button.removeAttribute('onclick')

    // Check if this dropdown supports arrow key navigation
    const supportsArrowKeys = dropdown.hasAttribute('data-arrow')

    const toggleDropdown = (isExpanded: boolean) => {
      button.setAttribute('aria-expanded', String(isExpanded))
      if (isExpanded) {
        dropdown.removeAttribute('hidden')
      } else {
        dropdown.setAttribute('hidden', '')
      }
    }

    const handleClick = () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true'
      toggleDropdown(!isExpanded)
    }

    // Handle Escape key to close dropdown, and arrow keys if supported
    const handleKeyDown = (e: KeyboardEvent) => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true'

      if (e.key === 'Escape') {
        if (isExpanded) {
          e.preventDefault()
          toggleDropdown(false)
          button.focus() // Return focus to button
        }
        return
      }

      // Handle arrow keys on button if dropdown supports them
      if (supportsArrowKeys) {
        const focusableElements = Array.from(dropdown.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))

        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          if (!isExpanded) {
            e.preventDefault()
            toggleDropdown(true)
            // Focus first item after opening
            if (focusableElements.length > 0) {
              setTimeout(() => focusableElements[0]?.focus(), 0)
            }
          } else if (e.key === 'ArrowDown' && focusableElements.length > 0) {
            e.preventDefault()
            focusableElements[0]?.focus()
          }
        } else if (e.key === 'ArrowUp' && isExpanded && focusableElements.length > 0) {
          e.preventDefault()
          focusableElements[focusableElements.length - 1]?.focus()
        }
      }
    }

    // Handle Shift+Tab from dropdown items to close dropdown, and arrow keys if supported
    const handleDropdownKeyDown = (e: KeyboardEvent) => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true'
      if (!isExpanded) return

      // Get all focusable elements in the dropdown
      const focusableElements = Array.from(dropdown.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      const currentIndex = focusableElements.indexOf(e.target as HTMLElement)

      // Handle Escape key to close dropdown
      if (e.key === 'Escape') {
        e.preventDefault()
        toggleDropdown(false)
        button.focus() // Return focus to button
        return
      }

      // Handle Shift+Tab to close dropdown when on first item
      if (e.key === 'Tab' && e.shiftKey) {
        // If we're on the first item (or it's the only item), close the dropdown
        if (currentIndex === 0 || focusableElements.length === 1) {
          toggleDropdown(false)
          // Focus will naturally move to the button or previous element
        }
        return
      }

      // Handle arrow keys only if dropdown supports them
      if (supportsArrowKeys && focusableElements.length > 0) {
        let targetIndex = currentIndex

        if (e.key === 'ArrowDown') {
          e.preventDefault()
          targetIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0
          focusableElements[targetIndex]?.focus()
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          targetIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1
          focusableElements[targetIndex]?.focus()
        } else if (e.key === 'Home') {
          e.preventDefault()
          focusableElements[0]?.focus()
        } else if (e.key === 'End') {
          e.preventDefault()
          focusableElements[focusableElements.length - 1]?.focus()
        }
      }
    }

    // Close dropdown when focus moves outside the dropdown area
    const handleFocusOut = () => {
      // Use setTimeout to allow the new focus target to be set
      setTimeout(() => {
        const activeElement = document.activeElement
        const isExpanded = button.getAttribute('aria-expanded') === 'true'

        if (isExpanded && activeElement) {
          // Check if the new focus is outside both the button and dropdown
          const isOutsideButton = !button.contains(activeElement) && activeElement !== button
          const isOutsideDropdown = !dropdown.contains(activeElement)
          const isOutsideNavItem = !navItem.contains(activeElement)

          // Also close if focus moved back to the button (from dropdown)
          const movedToButton = activeElement === button

          if ((isOutsideButton && isOutsideDropdown && isOutsideNavItem) || movedToButton) {
            toggleDropdown(false)
          }
        }
      }, 0)
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const isExpanded = button.getAttribute('aria-expanded') === 'true'

      if (isExpanded && !navItem.contains(target)) {
        toggleDropdown(false)
      }
    }

    button.addEventListener('click', handleClick)
    button.addEventListener('keydown', handleKeyDown)
    dropdown.addEventListener('keydown', handleDropdownKeyDown)
    navItem.addEventListener('focusout', handleFocusOut as EventListener)
    document.addEventListener('click', handleClickOutside)

    cleanupFunctions.push(() => {
      button.removeEventListener('click', handleClick)
      button.removeEventListener('keydown', handleKeyDown)
      dropdown.removeEventListener('keydown', handleDropdownKeyDown)
      navItem.removeEventListener('focusout', handleFocusOut as EventListener)
      document.removeEventListener('click', handleClickOutside)
    })
  })

  return () => {
    cleanupFunctions.forEach(cleanup => cleanup())
  }
}

// Registry of all interaction handlers
const interactionHandlers: InteractionHandler[] = [handleAccordions, handleTabs, handleModals, handleNavigation]

/**
 * Applies all interaction handlers to a container element
 * Returns a cleanup function to remove all event listeners
 */
export function setupPreviewInteractions(container: HTMLElement): () => void {
  const cleanupFunctions = interactionHandlers.map(handler => handler(container))

  return () => {
    cleanupFunctions.forEach(cleanup => cleanup())
  }
}
