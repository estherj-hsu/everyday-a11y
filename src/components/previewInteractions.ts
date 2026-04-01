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

// Combobox / Autocomplete
function handleCombobox(container: HTMLElement): () => void {
  const cleanup: Array<() => void> = []

  container.querySelectorAll<HTMLElement>('[data-combobox]').forEach(comboboxEl => {
    const input = comboboxEl.querySelector<HTMLInputElement>('input[role="combobox"]')
    const listbox = comboboxEl.querySelector<HTMLElement>('[role="listbox"]')
    if (!input || !listbox) return

    let activeIndex = -1

    const getAllOptions = () => Array.from(listbox.querySelectorAll<HTMLElement>('[role="option"]'))
    const getVisibleOptions = () => getAllOptions().filter(opt => !opt.hasAttribute('hidden'))

    const openListbox = () => {
      input.setAttribute('aria-expanded', 'true')
      listbox.removeAttribute('hidden')
    }

    const closeListbox = () => {
      input.setAttribute('aria-expanded', 'false')
      listbox.setAttribute('hidden', '')
      input.removeAttribute('aria-activedescendant')
      getAllOptions().forEach(opt => opt.setAttribute('aria-selected', 'false'))
      activeIndex = -1
    }

    const setActive = (index: number) => {
      const options = getVisibleOptions()
      options.forEach((opt, i) => opt.setAttribute('aria-selected', i === index ? 'true' : 'false'))
      if (index >= 0 && options[index]) {
        input.setAttribute('aria-activedescendant', options[index].id)
        options[index].scrollIntoView({ block: 'nearest' })
      } else {
        input.removeAttribute('aria-activedescendant')
      }
      activeIndex = index
    }

    const filterOptions = (query: string) => {
      getAllOptions().forEach(opt => {
        const match = query === '' || (opt.textContent?.toLowerCase() ?? '').includes(query.toLowerCase())
        match ? opt.removeAttribute('hidden') : opt.setAttribute('hidden', '')
      })
    }

    const handleInput = () => {
      filterOptions(input.value)
      activeIndex = -1
      input.removeAttribute('aria-activedescendant')
      getVisibleOptions().length > 0 ? openListbox() : closeListbox()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const isOpen = input.getAttribute('aria-expanded') === 'true'
      const options = getVisibleOptions()

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (!isOpen) {
            filterOptions(input.value)
            if (getVisibleOptions().length > 0) {
              openListbox()
              setActive(0)
            }
          } else {
            setActive(Math.min(activeIndex + 1, options.length - 1))
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (isOpen && activeIndex > 0) setActive(activeIndex - 1)
          break
        case 'Enter':
          e.preventDefault()
          if (isOpen && activeIndex >= 0) {
            const selected = getVisibleOptions()[activeIndex]
            if (selected) {
              input.value = selected.textContent?.trim() ?? ''
              closeListbox()
            }
          }
          break
        case 'Escape':
          e.preventDefault()
          if (isOpen) {
            closeListbox()
          } else {
            input.value = ''
            filterOptions('')
          }
          break
      }
    }

    // mousedown with preventDefault keeps focus on input during option click
    getAllOptions().forEach(option => {
      const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault()
        input.value = option.textContent?.trim() ?? ''
        closeListbox()
      }
      option.addEventListener('mousedown', handleMouseDown)
      cleanup.push(() => option.removeEventListener('mousedown', handleMouseDown))
    })

    const handleBlur = () => {
      setTimeout(() => {
        if (!comboboxEl.contains(document.activeElement)) closeListbox()
      }, 100)
    }

    input.addEventListener('input', handleInput)
    input.addEventListener('keydown', handleKeyDown)
    input.addEventListener('blur', handleBlur)
    cleanup.push(() => {
      input.removeEventListener('input', handleInput)
      input.removeEventListener('keydown', handleKeyDown)
      input.removeEventListener('blur', handleBlur)
    })
  })

  return () => cleanup.forEach(fn => fn())
}

// Live Region / Toast
function handleLiveRegion(container: HTMLElement): () => void {
  const cleanup: Array<() => void> = []

  container.querySelectorAll<HTMLElement>('[data-live-region="trigger"]').forEach(btn => {
    let timer: ReturnType<typeof setTimeout> | null = null

    const handleClick = () => {
      const message = btn.getAttribute('data-live-region-message') ?? 'Done'
      const targetId = btn.getAttribute('data-live-region-target') ?? 'live-region-demo'
      const region = container.querySelector<HTMLElement>(`#${targetId}`)
      if (!region) return

      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      // Clear first so the same message can be re-announced
      region.textContent = ''
      requestAnimationFrame(() => {
        region.textContent = message
      })

      timer = setTimeout(() => {
        region.textContent = ''
        timer = null
      }, 4000)
    }

    btn.addEventListener('click', handleClick)
    cleanup.push(() => {
      btn.removeEventListener('click', handleClick)
      if (timer) clearTimeout(timer)
    })
  })

  return () => cleanup.forEach(fn => fn())
}

// Data Grid
function handleDataGrid(container: HTMLElement): () => void {
  const cleanup: Array<() => void> = []

  container.querySelectorAll<HTMLElement>('[role="grid"]').forEach(grid => {
    // Skip date picker grids (handled by handleDatePicker)
    if (grid.closest('[data-datepicker]')) return

    const getRows = (): HTMLElement[] => Array.from(grid.querySelectorAll<HTMLElement>('tr[role="row"]'))

    const getCells = (row: HTMLElement): HTMLElement[] => Array.from(row.querySelectorAll<HTMLElement>(':scope > [role="gridcell"], :scope > [role="columnheader"]'))

    const findCell = (el: HTMLElement): [number, number] => {
      const rows = getRows()
      for (let r = 0; r < rows.length; r++) {
        const cells = getCells(rows[r])
        const c = cells.indexOf(el)
        if (c !== -1) return [r, c]
      }
      return [-1, -1]
    }

    const setFocus = (r: number, c: number) => {
      const rows = getRows()
      if (r < 0 || r >= rows.length) return
      const cells = getCells(rows[r])
      if (c < 0 || c >= cells.length) return
      grid.querySelectorAll<HTMLElement>('[role="gridcell"], [role="columnheader"]').forEach(cell => cell.setAttribute('tabindex', '-1'))
      cells[c].setAttribute('tabindex', '0')
      cells[c].focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const role = target.getAttribute('role')

      if (role !== 'gridcell' && role !== 'columnheader') {
        const cell = target.closest<HTMLElement>('[role="gridcell"], [role="columnheader"]')
        if (!cell) return
        if (e.key === 'Escape') {
          e.preventDefault()
          cell.focus()
        } else if (e.key === 'Tab') {
          // Trap Tab within the action cell — cycle between its interactive elements
          const interactives = Array.from(cell.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])'))
          if (interactives.length < 2) return
          const idx = interactives.indexOf(target)
          if (idx === -1) return
          e.preventDefault()
          const next = e.shiftKey ? interactives[(idx - 1 + interactives.length) % interactives.length] : interactives[(idx + 1) % interactives.length]
          next.focus()
        }
        return
      }

      const [r, c] = findCell(target)
      if (r === -1) return
      const rows = getRows()

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          setFocus(r, c + 1)
          break
        case 'ArrowLeft':
          e.preventDefault()
          setFocus(r, c - 1)
          break
        case 'ArrowDown':
          e.preventDefault()
          setFocus(r + 1, c)
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocus(r - 1, c)
          break
        case 'Home':
          e.preventDefault()
          e.ctrlKey ? setFocus(0, 0) : setFocus(r, 0)
          break
        case 'End':
          e.preventDefault()
          if (e.ctrlKey) {
            const lastRow = rows.length - 1
            setFocus(lastRow, getCells(rows[lastRow]).length - 1)
          } else {
            setFocus(r, getCells(rows[r]).length - 1)
          }
          break
        case 'Enter':
        case 'F2': {
          const interactive = target.querySelector<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])')
          if (interactive) {
            e.preventDefault()
            interactive.focus()
          }
          break
        }
      }
    }

    // Sortable column headers — Lucide SVG icons injected dynamically
    const sortSvg = (type: 'none' | 'asc' | 'desc') => {
      const paths: Record<string, string> = {
        none: '<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>',
        asc: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
        desc: '<path d="m19 12-7 7-7-7"/><path d="M12 5v14"/>',
      }
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[type]}</svg>`
    }
    const updateSortIcon = (header: HTMLElement) => {
      const sort = header.getAttribute('aria-sort') ?? 'none'
      const type = sort === 'ascending' ? 'asc' : sort === 'descending' ? 'desc' : 'none'
      let iconEl = header.querySelector<HTMLElement>('.sort-icon')
      if (!iconEl) {
        iconEl = document.createElement('span')
        iconEl.className = 'sort-icon'
        header.appendChild(iconEl)
      }
      iconEl.innerHTML = sortSvg(type)
    }

    grid.querySelectorAll<HTMLElement>('[role="columnheader"][aria-sort]').forEach(header => {
      updateSortIcon(header)
      const toggle = () => {
        const next = header.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending'
        grid.querySelectorAll<HTMLElement>('[aria-sort]').forEach(h => {
          h.setAttribute('aria-sort', h === header ? next : 'none')
          updateSortIcon(h)
        })

        // Sort rows by this column
        const tbody = grid.querySelector('tbody')
        if (!tbody) return
        const colIndex = Array.from(header.parentElement!.children).indexOf(header)
        const rows = Array.from(tbody.querySelectorAll<HTMLElement>('tr[role="row"]'))
        rows.sort((a, b) => {
          const aText = (a.children[colIndex] as HTMLElement).textContent?.trim() ?? ''
          const bText = (b.children[colIndex] as HTMLElement).textContent?.trim() ?? ''
          return next === 'ascending' ? aText.localeCompare(bText) : bText.localeCompare(aText)
        })
        rows.forEach(row => tbody.appendChild(row))
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }
      header.addEventListener('click', toggle)
      header.addEventListener('keydown', onKey)
      cleanup.push(() => {
        header.removeEventListener('click', toggle)
        header.removeEventListener('keydown', onKey)
      })
    })

    // Action buttons — show feedback in [data-grid-feedback]
    const feedbackEl = container.querySelector<HTMLElement>('[data-grid-feedback]')
    if (feedbackEl) {
      let feedbackTimer: ReturnType<typeof setTimeout>
      const onAction = (e: MouseEvent) => {
        const btn = (e.target as HTMLElement).closest('button')
        if (!btn) return
        const row = btn.closest('tr')
        if (!row) return
        const issue = row.querySelector<HTMLElement>('[role="gridcell"]')?.textContent?.trim() ?? ''
        clearTimeout(feedbackTimer)
        feedbackEl.textContent = `${btn.textContent?.trim()}: ${issue}`
        feedbackTimer = setTimeout(() => {
          feedbackEl.textContent = '\u00a0'
        }, 4000)
      }
      grid.addEventListener('click', onAction)
      cleanup.push(() => {
        grid.removeEventListener('click', onAction)
        clearTimeout(feedbackTimer)
      })
    }

    grid.addEventListener('keydown', handleKeyDown)
    cleanup.push(() => grid.removeEventListener('keydown', handleKeyDown))
  })

  return () => cleanup.forEach(fn => fn())
}

// Date Picker
function handleDatePicker(container: HTMLElement): () => void {
  const cleanup: Array<() => void> = []

  container.querySelectorAll<HTMLElement>('[data-datepicker]').forEach(picker => {
    const today = new Date()
    let viewYear = today.getFullYear()
    let viewMonth = today.getMonth() // 0-based
    let selectedDate: Date | null = null

    const monthYearEl = picker.querySelector<HTMLElement>('.month-year')
    const bodyEl = picker.querySelector<HTMLElement>('.body')
    const prevBtn = picker.querySelector<HTMLButtonElement>('.prev')
    const nextBtn = picker.querySelector<HTMLButtonElement>('.next')
    const selectedEl = picker.querySelector<HTMLElement>('.selected')
    const grid = picker.querySelector<HTMLElement>('[role="grid"]')
    if (!monthYearEl || !bodyEl || !prevBtn || !nextBtn || !grid) return

    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const clampDay = (year: number, monthIndex: number, day: number): Date => {
      const last = new Date(year, monthIndex + 1, 0).getDate()
      return new Date(year, monthIndex, Math.min(day, last))
    }

    const renderMonth = () => {
      const label = `${MONTHS[viewMonth]} ${viewYear}`
      monthYearEl.textContent = label
      grid.setAttribute('aria-label', label)

      const firstDow = new Date(viewYear, viewMonth, 1).getDay()
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

      let html = ''
      let day = 1 - firstDow

      while (day <= daysInMonth) {
        html += '<tr role="row">'
        for (let col = 0; col < 7; col++, day++) {
          if (day < 1 || day > daysInMonth) {
            html += '<td role="gridcell" tabindex="-1" aria-hidden="true"><span></span></td>'
          } else {
            const date = new Date(viewYear, viewMonth, day)
            const isToday = date.toDateString() === today.toDateString()
            const isSel = selectedDate !== null && date.toDateString() === selectedDate.toDateString()
            const lbl = `${day} ${MONTHS[viewMonth]} ${viewYear}`
            html += `<td role="gridcell" tabindex="-1" data-date="${viewYear}-${viewMonth + 1}-${day}" aria-label="${lbl}"${isToday ? ' aria-current="date"' : ''}${isSel ? ' aria-selected="true"' : ''}><span>${day}</span></td>`
          }
        }
        html += '</tr>'
      }

      bodyEl.innerHTML = html

      const focusTarget =
        bodyEl.querySelector<HTMLElement>('[aria-selected="true"]') ??
        bodyEl.querySelector<HTMLElement>('[aria-current="date"]') ??
        bodyEl.querySelector<HTMLElement>('[role="gridcell"]:not([aria-hidden="true"])')
      focusTarget?.setAttribute('tabindex', '0')
    }

    renderMonth()

    const applySelection = (y: number, m: number, d: number) => {
      selectedDate = new Date(y, m - 1, d)
      if (selectedEl) selectedEl.textContent = `Selected: ${d} ${MONTHS[m - 1]} ${y}`
      renderMonth()
      picker.querySelector<HTMLElement>('[aria-selected="true"]')?.focus()
    }

    const handlePrev = () => {
      viewMonth--
      if (viewMonth < 0) {
        viewMonth = 11
        viewYear--
      }
      renderMonth()
      picker.querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')?.focus()
    }
    const handleNext = () => {
      viewMonth++
      if (viewMonth > 11) {
        viewMonth = 0
        viewYear++
      }
      renderMonth()
      picker.querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')?.focus()
    }

    prevBtn.addEventListener('click', handlePrev)
    nextBtn.addEventListener('click', handleNext)

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.getAttribute('role') !== 'gridcell') return
      if (target.getAttribute('aria-hidden') === 'true') return

      const dateAttr = target.getAttribute('data-date')
      if (!dateAttr) return
      const [y, m, d] = dateAttr.split('-').map(Number) // m is 1-based

      let newDate: Date | null = null

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          newDate = new Date(y, m - 1, d + 1)
          break
        case 'ArrowLeft':
          e.preventDefault()
          newDate = new Date(y, m - 1, d - 1)
          break
        case 'ArrowDown':
          e.preventDefault()
          newDate = new Date(y, m - 1, d + 7)
          break
        case 'ArrowUp':
          e.preventDefault()
          newDate = new Date(y, m - 1, d - 7)
          break
        case 'Home': {
          e.preventDefault()
          const cur = new Date(y, m - 1, d)
          newDate = new Date(y, m - 1, d - cur.getDay())
          break
        }
        case 'End': {
          e.preventDefault()
          const cur = new Date(y, m - 1, d)
          newDate = new Date(y, m - 1, d + (6 - cur.getDay()))
          break
        }
        case 'PageUp':
          e.preventDefault()
          newDate = clampDay(y, m - 2, d)
          break
        case 'PageDown':
          e.preventDefault()
          newDate = clampDay(y, m, d)
          break
        case 't':
        case 'T':
          e.preventDefault()
          newDate = new Date(today)
          break
        case 'Enter':
        case ' ': {
          e.preventDefault()
          applySelection(y, m, d)
          return
        }
        default:
          return
      }

      if (!newDate) return
      if (newDate.getMonth() !== viewMonth || newDate.getFullYear() !== viewYear) {
        viewMonth = newDate.getMonth()
        viewYear = newDate.getFullYear()
        renderMonth()
      }

      const nd = newDate
      const key = `${nd.getFullYear()}-${nd.getMonth() + 1}-${nd.getDate()}`
      const cell = bodyEl.querySelector<HTMLElement>(`[data-date="${key}"]`)
      if (cell && cell.getAttribute('aria-hidden') !== 'true') {
        bodyEl.querySelectorAll<HTMLElement>('[role="gridcell"]').forEach(c => c.setAttribute('tabindex', '-1'))
        cell.setAttribute('tabindex', '0')
        cell.focus()
      }
    }

    const handleGridClick = (e: MouseEvent) => {
      const cell = (e.target as HTMLElement).closest<HTMLElement>('[role="gridcell"]')
      if (!cell || !bodyEl.contains(cell)) return
      if (cell.getAttribute('aria-hidden') === 'true') return
      const dateAttr = cell.getAttribute('data-date')
      if (!dateAttr) return
      const [y, m, d] = dateAttr.split('-').map(Number)
      applySelection(y, m, d)
    }

    grid.addEventListener('keydown', handleKeyDown)
    grid.addEventListener('click', handleGridClick)
    cleanup.push(() => {
      grid.removeEventListener('keydown', handleKeyDown)
      grid.removeEventListener('click', handleGridClick)
      prevBtn.removeEventListener('click', handlePrev)
      nextBtn.removeEventListener('click', handleNext)
    })
  })

  return () => cleanup.forEach(fn => fn())
}

// Custom Select (button + listbox pattern)
function handleCustomSelect(container: HTMLElement): () => void {
  const cleanup: Array<() => void> = []

  container.querySelectorAll<HTMLElement>('[data-custom-select]').forEach(widget => {
    const trigger = widget.querySelector<HTMLButtonElement>('.cs-trigger')
    const listbox = widget.querySelector<HTMLElement>('[role="listbox"]')
    const valueEl = widget.querySelector<HTMLElement>('.cs-value')
    if (!trigger || !listbox) return

    const options = () => Array.from(listbox.querySelectorAll<HTMLElement>('[role="option"]'))
    const isOpen = () => trigger.getAttribute('aria-expanded') === 'true'

    const open = () => {
      trigger.setAttribute('aria-expanded', 'true')
      listbox.removeAttribute('hidden')
      const selected = listbox.querySelector<HTMLElement>('[aria-selected="true"]') ?? options()[0]
      selected?.focus()
    }

    const close = (returnFocus = true) => {
      trigger.setAttribute('aria-expanded', 'false')
      listbox.setAttribute('hidden', '')
      if (returnFocus) trigger.focus()
    }

    const select = (opt: HTMLElement) => {
      options().forEach(o => o.setAttribute('aria-selected', 'false'))
      opt.setAttribute('aria-selected', 'true')
      if (valueEl) valueEl.textContent = opt.textContent?.trim() ?? ''
      close()
    }

    const onTriggerClick = () => (isOpen() ? close() : open())

    const onTriggerKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        open()
      }
    }

    const onListboxKeyDown = (e: KeyboardEvent) => {
      const opts = options()
      const idx = opts.indexOf(document.activeElement as HTMLElement)
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        opts[Math.min(idx + 1, opts.length - 1)]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        opts[Math.max(idx - 1, 0)]?.focus()
      } else if (e.key === 'Home') {
        e.preventDefault()
        opts[0]?.focus()
      } else if (e.key === 'End') {
        e.preventDefault()
        opts[opts.length - 1]?.focus()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (idx !== -1) select(opts[idx])
      } else if (e.key === 'Escape' || e.key === 'Tab') close()
    }

    const onOptionMouseDown = (e: MouseEvent) => {
      const opt = (e.target as HTMLElement).closest<HTMLElement>('[role="option"]')
      if (opt) {
        e.preventDefault()
        select(opt)
      }
    }

    const onOutsideClick = (e: MouseEvent) => {
      if (!widget.contains(e.target as Node)) close(false)
    }

    // Options need tabindex="-1" to be programmatically focusable
    options().forEach(o => o.setAttribute('tabindex', '-1'))

    trigger.addEventListener('click', onTriggerClick)
    trigger.addEventListener('keydown', onTriggerKeyDown)
    listbox.addEventListener('keydown', onListboxKeyDown)
    listbox.addEventListener('mousedown', onOptionMouseDown)
    document.addEventListener('click', onOutsideClick)
    cleanup.push(() => {
      trigger.removeEventListener('click', onTriggerClick)
      trigger.removeEventListener('keydown', onTriggerKeyDown)
      listbox.removeEventListener('keydown', onListboxKeyDown)
      listbox.removeEventListener('mousedown', onOptionMouseDown)
      document.removeEventListener('click', onOutsideClick)
    })
  })

  return () => cleanup.forEach(fn => fn())
}

// Form validation demo (inline error + error summary)
function handleFormValidation(container: HTMLElement): () => void {
  const cleanup: Array<() => void> = []

  container.querySelectorAll<HTMLFormElement>('[data-form-validation]').forEach(form => {
    const summary = form.querySelector<HTMLElement>('[data-fv-summary]')
    const summaryHeading = form.querySelector<HTMLElement>('[data-fv-summary-heading]')
    const summaryList = form.querySelector<HTMLElement>('[data-fv-summary-list]')
    if (!summary || !summaryHeading || !summaryList) return

    const handleSubmit = (e: Event) => {
      e.preventDefault()

      const errors: Array<{ id: string; label: string; msg: string }> = []

      form.querySelectorAll<HTMLElement>('[data-fv-field]').forEach(fieldEl => {
        const input = fieldEl.querySelector<HTMLInputElement>('input')
        const errorEl = fieldEl.querySelector<HTMLElement>('[data-fv-error]')
        if (!input || !errorEl) return

        const msg = input.dataset.fvErrorMsg || 'This field is required'
        const pattern = input.dataset.fvPattern
        const labelText = fieldEl.querySelector('label')?.textContent?.replace(/\*/g, '').trim() || input.id
        const val = input.value.trim()
        const valid = val !== '' && (!pattern || new RegExp(pattern).test(val))

        if (!valid) {
          input.setAttribute('aria-invalid', 'true')
          input.setAttribute('aria-describedby', errorEl.id)
          errorEl.removeAttribute('hidden')
          errors.push({ id: input.id, label: labelText, msg })
        } else {
          input.removeAttribute('aria-invalid')
          input.removeAttribute('aria-describedby')
          errorEl.setAttribute('hidden', '')
        }
      })

      const successEl = form.querySelector<HTMLElement>('[data-fv-success]')

      if (errors.length > 0) {
        summaryHeading.textContent = `${errors.length} error${errors.length > 1 ? 's' : ''} found`
        summaryList.innerHTML = errors.map(({ id, label, msg }) => `<li><a href="#${id}">${label}: ${msg.charAt(0).toLowerCase() + msg.slice(1)}</a></li>`).join('')
        summary.removeAttribute('hidden')
        summary.focus()
        if (successEl) successEl.setAttribute('hidden', '')
      } else {
        summary.setAttribute('hidden', '')
        if (successEl) {
          successEl.removeAttribute('hidden')
          setTimeout(() => successEl.setAttribute('hidden', ''), 3000)
        }
      }
    }

    form.addEventListener('submit', handleSubmit)
    cleanup.push(() => form.removeEventListener('submit', handleSubmit))
  })

  return () => cleanup.forEach(fn => fn())
}

// Registry of all interaction handlers
const interactionHandlers: InteractionHandler[] = [
  handleAccordions,
  handleTabs,
  handleModals,
  handleNavigation,
  handleCombobox,
  handleCustomSelect,
  handleLiveRegion,
  handleDataGrid,
  handleDatePicker,
  handleFormValidation,
]

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
