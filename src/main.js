const gallery = document.getElementById('gallery')
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')

let lastFocused = null

function openLightbox(src, alt = '') {
  lastFocused = document.activeElement

  lightboxImg.src = src
  lightboxImg.alt = alt

  lightbox.classList.add('is-open')
  lightbox.setAttribute('aria-hidden', 'false')

  document.documentElement.style.overflow = 'hidden'

  const closeBtn = lightbox.querySelector('[data-close]')
  closeBtn?.focus()
}

function closeLightbox() {
  lightbox.classList.remove('is-open')
  lightbox.setAttribute('aria-hidden', 'true')

  lightboxImg.src = ''
  lightboxImg.alt = ''

  document.documentElement.style.overflow = ''

  lastFocused?.focus?.()
}

gallery.addEventListener('click', (e) => {
  const card = e.target.closest('.card')
  if (!card) return

  const full = card.dataset.full || card.querySelector('img')?.src
  const img = card.querySelector('img')
  openLightbox(full, img?.alt || '')
})

lightbox.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]') || e.target.hasAttribute('data-close')) {
    closeLightbox()
  }
})

lightbox.addEventListener('click', (e) => {
  if (e.target.classList.contains('lightbox__backdrop')) closeLightbox()
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox()
  }
})
