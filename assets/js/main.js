const donateButton = document.querySelector('.floating-donate')
const header = document.querySelector('[data-header]')
const navToggle = document.querySelector('.nav-toggle')
const siteNav = document.querySelector('.site-nav')
let scrollTimer
let lastFocusedElement = null

function updateHeaderState() {
  if (!header) return
  header.classList.toggle('is-scrolled', window.scrollY > 24)
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open')
    navToggle.setAttribute('aria-expanded', String(isOpen))
  })

  siteNav.querySelectorAll('a, button').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open')
      navToggle.setAttribute('aria-expanded', 'false')
    })
  })
}

window.addEventListener('scroll', () => {
  updateHeaderState()

  if (!donateButton) return
  donateButton.classList.add('is-dim')
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => donateButton.classList.remove('is-dim'), 520)
}, { passive: true })

document.getElementById('year')?.append(new Date().getFullYear())

async function loadIncludes() {
  const includeTargets = document.querySelectorAll('[data-include]')

  for (const target of includeTargets) {
    const file = target.getAttribute('data-include')

    try {
      const response = await fetch(file)
      if (!response.ok) throw new Error(`Could not load ${file}`)
      target.innerHTML = await response.text()
    } catch (error) {
      target.innerHTML = '<h1>Content not found</h1><p>Please view the site through a local server so the letter content can load.</p>'
      console.error(error)
    }
  }
}

function openModal(id, opener) {
  const modal = document.getElementById(id)
  if (!modal) return

  lastFocusedElement = opener || document.activeElement
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('has-modal')
  modal.querySelector('.modal-close')?.focus()
}

function closeModal(modal) {
  if (!modal) return

  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('has-modal')

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus()
  }
}

document.addEventListener('click', (event) => {
  const openButton = event.target.closest('.open-modal')

  if (openButton) {
    openModal(openButton.dataset.modal, openButton)
    return
  }

  const closeButton = event.target.closest('.modal-close, .modal-close-bottom')

  if (closeButton) {
    closeModal(closeButton.closest('.modal'))
    return
  }

  if (event.target.classList.contains('modal')) {
    closeModal(event.target)
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  document.querySelectorAll('.modal.is-open').forEach(closeModal)
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.pushState(null, '', anchor.getAttribute('href'))
  })
})

function setFormStatus(form, message, type = 'info') {
  const status = form.querySelector('.mail-status')

  if (!status) return

  status.textContent = message
  status.dataset.type = type
}

function setupFormSubmitForms() {
  document.querySelectorAll('[data-formsubmit-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault()

      if (!form.reportValidity()) return

      const submitButton = form.querySelector('button[type="submit"]')
      const formData = new FormData(form)

      formData.append('Page URL', window.location.href)

      if (submitButton) {
        submitButton.disabled = true
      }

      setFormStatus(form, 'Sending...', 'info')

      fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('The message could not be sent.')
          }

          return response.json().catch(() => ({}))
        })
        .then(() => {
          form.reset()
          setFormStatus(form, form.dataset.successMessage || 'Thank you. Your message was sent.', 'success')
        })
        .catch((error) => {
          console.error(error)
          setFormStatus(form, 'Something went wrong. Please try again.', 'error')
        })
        .finally(() => {
          if (submitButton) {
            submitButton.disabled = false
          }
        })
    })
  })
}

function setupThankYouPage() {
  const confirmation = document.querySelector('#confirmation-id')
  const paymentReference = document.querySelector('#payment-reference')

  if (!confirmation && !paymentReference) return

  const params = new URLSearchParams(window.location.search)
  const sessionId = params.get('session_id')

  if (sessionId && confirmation) {
    confirmation.textContent = sessionId
  }

  if (sessionId && paymentReference) {
    paymentReference.value = sessionId
  }
}

updateHeaderState()
loadIncludes()
setupThankYouPage()
setupFormSubmitForms()
