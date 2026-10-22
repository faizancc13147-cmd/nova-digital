
const menuToggle = document.getElementById('menuToggle');
const navigation = document.getElementById('navigation');

// Mobile navigation
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    );
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.textContent = '☰';
    });
  });
}

// Project filters
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      card.hidden = filter !== 'all' &&
        card.dataset.category !== filter;
    });
  });
});

// Automatic footer year
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Opening animation
const introScreen = document.getElementById('introScreen');

if (introScreen) {
  document.body.classList.add('intro-active');

  window.addEventListener('load', () => {
    setTimeout(() => {
      introScreen.classList.add('intro-finished');
      document.body.classList.remove('intro-active');
    }, 1200);
  });
}

// Sign in / Sign up modal
const authOverlay = document.getElementById('authOverlay');
const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const authClose = document.getElementById('authClose');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authDescription = document.getElementById('authDescription');
const authSubmit = document.getElementById('authSubmit');
const authSwitch = document.getElementById('authSwitch');
const switchText = document.getElementById('switchText');
const nameField = document.getElementById('nameField');
const authName = document.getElementById('authName');
const authPassword = document.getElementById('authPassword');
const togglePassword = document.getElementById('togglePassword');
const authMessage = document.getElementById('authMessage');

let authMode = 'signin';

function openAuth(mode) {
  if (!authOverlay) return;

  authMode = mode;
  updateAuthMode();

  authOverlay.classList.add('visible');
  authOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('auth-open');

  setTimeout(() => {
    const firstInput = mode === 'signup' ? authName :
      document.getElementById('authEmail');

    if (firstInput && !firstInput.hidden) firstInput.focus();
  }, 100);
}

function closeAuth() {
  if (!authOverlay) return;

  authOverlay.classList.remove('visible');
  authOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('auth-open');
}

function updateAuthMode() {
  const isSignup = authMode === 'signup';

  if (authTitle) {
    authTitle.textContent = isSignup ? 'Join NOVA.' : 'Welcome back.';
  }

  if (authDescription) {
    authDescription.textContent = isSignup
      ? 'Create your account to get started.'
      : 'Sign in to continue your journey.';
  }

  if (authSubmit) {
    authSubmit.textContent = isSignup ? 'Create Account ↗' : 'Sign In ↗';
  }

  if (nameField) nameField.hidden = !isSignup;
  if (authName) authName.required = isSignup;

  if (authPassword) {
    authPassword.autocomplete = isSignup
      ? 'new-password'
      : 'current-password';
  }

  if (switchText) {
    switchText.textContent = isSignup
      ? 'Already have an account?'
      : 'New to NOVA?';
  }

  if (authSwitch) {
    authSwitch.textContent = isSignup
      ? 'Sign in instead'
      : 'Create an account';
  }

  if (authMessage) authMessage.textContent = '';
}

if (signInBtn) {
  signInBtn.addEventListener('click', () => openAuth('signin'));
}

if (signUpBtn) {
  signUpBtn.addEventListener('click', () => openAuth('signup'));
}

if (authClose) authClose.addEventListener('click', closeAuth);

if (authSwitch) {
  authSwitch.addEventListener('click', () => {
    openAuth(authMode === 'signin' ? 'signup' : 'signin');
  });
}

if (authOverlay) {
  authOverlay.addEventListener('click', event => {
    if (event.target === authOverlay) closeAuth();
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeAuth();
});

// Show or hide password
if (togglePassword && authPassword) {
  togglePassword.addEventListener('click', () => {
    const isVisible = authPassword.type === 'text';
    authPassword.type = isVisible ? 'password' : 'text';
    togglePassword.textContent = isVisible ? 'Show' : 'Hide';
  });
}

// Demo form: validates fields but does not create real accounts
if (authForm) {
  authForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!authForm.reportValidity()) return;

    if (authMessage) {
      authMessage.textContent = authMode === 'signup'
        ? 'Demo only: connect a secure authentication service to create an account.'
        : 'Demo only: connect a secure authentication service to sign in.';
    }
  });
}
