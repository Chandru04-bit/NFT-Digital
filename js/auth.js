/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - AUTHENTICATION (js/auth.js)
 * Login, Registration, Validation, Show/Hide Password, Demo Login
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});

const Auth = {
  init() {
    this.initPasswordToggles();
    this.initLoginForm();
    this.initRegisterForm();
    this.initDemoLoginBtn();
  },

  initPasswordToggles() {
    const toggleBtns = document.querySelectorAll('.password-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const icon = btn.querySelector('i');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          icon.className = 'fa-solid fa-eye-slash';
        } else {
          input.type = 'password';
          icon.className = 'fa-solid fa-eye';
        }
      });
    });
  },

  initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value.trim();
      const feedback = document.getElementById('authFeedbackMessage');

      if (!email || !pass) {
        this.showFeedback('Please fill in both email and password.', 'danger');
        return;
      }

      // Successful Demo Login
      DataStore.setCurrentUser({
        email,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        isLoggedIn: true
      });

      this.showFeedback('Login successful! Redirecting to dashboard...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    });
  },

  initRegisterForm() {
    const regForm = document.getElementById('registerForm');
    if (!regForm) return;

    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const pass = document.getElementById('regPassword').value;
      const confirmPass = document.getElementById('regConfirmPassword').value;
      const terms = document.getElementById('regTermsCheckbox');

      if (!name || !email || !pass || !confirmPass) {
        this.showFeedback('All fields are required.', 'danger');
        return;
      }

      if (pass.length < 6) {
        this.showFeedback('Password must be at least 6 characters.', 'danger');
        return;
      }

      if (pass !== confirmPass) {
        this.showFeedback('Passwords do not match.', 'danger');
        return;
      }

      if (terms && !terms.checked) {
        this.showFeedback('Please accept the Terms of Service.', 'danger');
        return;
      }

      // Create user and auto log in
      DataStore.updateUserProfile({
        name,
        email,
        username: `@${name.toLowerCase().replace(/\s+/g, '_')}`
      });

      DataStore.setCurrentUser({
        name,
        email,
        isLoggedIn: true
      });

      this.showFeedback('Account created successfully! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  },

  initDemoLoginBtn() {
    const demoBtn = document.getElementById('btnUseDemoAccount');
    if (!demoBtn) return;

    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('loginEmail');
      const passInput = document.getElementById('loginPassword');

      if (emailInput) emailInput.value = 'alex.rivera@novanft.demo';
      if (passInput) passInput.value = 'NovaNFT@2026';

      DataStore.setCurrentUser({
        email: 'alex.rivera@novanft.demo',
        name: 'Alex Rivera',
        isLoggedIn: true
      });

      this.showFeedback('Demo credentials filled! Logging in...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 700);
    });
  },

  showFeedback(msg, type) {
    const el = document.getElementById('authFeedbackMessage');
    if (!el) return;
    el.className = `alert alert-${type} mt-3 mb-0`;
    el.style.display = 'block';
    el.textContent = msg;
  }
};
