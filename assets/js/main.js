const donateButton = document.querySelector('.floating-donate');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
let scrollTimer;

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('is-open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => siteNav.classList.remove('is-open'));
  });
}

window.addEventListener('scroll', () => {
  if (!donateButton) return;
  donateButton.classList.add('is-dim');
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => donateButton.classList.remove('is-dim'), 450);
});

document.getElementById('year')?.append(new Date().getFullYear());

async function loadIncludes() {
  const includeTargets = document.querySelectorAll('[data-include]');
  for (const target of includeTargets) {
    const file = target.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Could not load ${file}`);
      target.innerHTML = await response.text();
    } catch (error) {
      target.innerHTML = '<h2>Content not found</h2><p>Please check that this content file exists.</p>';
      console.error(error);
    }
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (event) => {
  const openButton = event.target.closest('.open-modal');
  if (openButton) {
    openModal(openButton.dataset.modal);
  }

  const closeButton = event.target.closest('.modal-close, .modal-close-bottom');
  if (closeButton) {
    closeModal(closeButton.closest('.modal'));
  }

  if (event.target.classList.contains('modal')) {
    closeModal(event.target);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.modal.is-open').forEach(closeModal);
});

loadIncludes();
