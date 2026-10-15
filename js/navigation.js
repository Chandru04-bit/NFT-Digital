/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - NAVIGATION (js/navigation.js)
 * Active Route Highlighting, Auth Protection & Session Handling
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});

const Navigation = {
  init() {
    this.highlightActivePage();
    this.initAuthLinks();
    this.initKeyboardShortcuts();
    this.updateUserSessionUI();
  },

  highlightActivePage() {
    const currentPath = window.location.pathname.toLowerCase();
    const navItems = document.querySelectorAll('.sidebar-menu-item');

    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (!link) return;
      const href = link.getAttribute('href')?.toLowerCase() || '';

      if (
        (currentPath.endsWith(href) && href !== 'index.html' && href !== '') ||
        (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === ''))
      ) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  },

  initAuthLinks() {
    const logoutBtns = document.querySelectorAll('.btn-logout, #logoutBtn, #headerLogoutBtn');
    logoutBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        DataStore.logout();
        App.showToast('You have been logged out.', 'info');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 600);
      });
    });
  },

  updateUserSessionUI() {
    const user = DataStore.getCurrentUser();
    const profile = DataStore.getUserProfile();

    if (user && user.name) {
      const userNames = document.querySelectorAll('.session-user-name');
      userNames.forEach(el => el.textContent = user.name);
    }

    if (profile) {
      const avatars = document.querySelectorAll('.session-user-avatar');
      avatars.forEach(el => el.src = profile.avatar);
    }
  },

  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // ESC closes any active modal
      if (e.key === 'Escape') {
        App.closeBidModal();
        App.closeNFTDetailsModal();
      }
      // '/' focuses search
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const search = document.getElementById('globalSearchInput');
        if (search) search.focus();
      }
    });
  }
};
