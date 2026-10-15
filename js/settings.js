/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - SETTINGS (js/settings.js)
 * 6 Interactive Tabs: Profile, App, Security, Activity, Payment, API
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  SettingsPage.init();
});

const SettingsPage = {
  currentTab: 'profile',
  apiKeys: [
    { id: 'key-1', name: 'Production Mainnet Key', key: 'nova_live_8f93e271a04b12c8e', created: '2026-09-12', masked: true },
    { id: 'key-2', name: 'Dev Sandbox Testnet Key', key: 'nova_test_190a4bc88e10d481f', created: '2026-10-02', masked: true }
  ],

  init() {
    this.initTabs();
    this.loadProfileData();
    this.initProfileForm();
    this.initAppPreferences();
    this.initSecurityForm();
    this.renderActivityTable();
    this.initPaymentMethods();
    this.renderApiKeys();
    this.initApiManagement();
  },

  initTabs() {
    const tabBtns = document.querySelectorAll('.settings-nav-btn');
    const tabPanes = document.querySelectorAll('.settings-tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;

        const targetPane = document.getElementById(`settingsPane_${this.currentTab}`);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  },

  // 1. Profile Tab
  loadProfileData() {
    const profile = DataStore.getUserProfile();
    const fullNameInput = document.getElementById('settingsFullName');
    const emailInput = document.getElementById('settingsEmail');
    const usernameInput = document.getElementById('settingsUsername');
    const bioInput = document.getElementById('settingsBio');

    if (fullNameInput) fullNameInput.value = profile.name;
    if (emailInput) emailInput.value = profile.email;
    if (usernameInput) usernameInput.value = profile.username.replace('@', '');
    if (bioInput) bioInput.value = profile.bio;
  },

  initProfileForm() {
    const form = document.getElementById('settingsProfileForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('settingsFullName').value.trim();
      const email = document.getElementById('settingsEmail').value.trim();
      const username = document.getElementById('settingsUsername').value.trim();
      const bio = document.getElementById('settingsBio').value.trim();

      if (!name || !email) {
        App.showToast('Please fill in your name and email.', 'error');
        return;
      }

      DataStore.updateUserProfile({
        name,
        email,
        username: username.startsWith('@') ? username : `@${username}`,
        bio
      });

      DataStore.setCurrentUser({
        name,
        email,
        isLoggedIn: true
      });

      App.renderSharedUserHeader();
      App.showToast('Profile settings saved successfully!', 'success');
    });
  },

  // 2. Application Tab
  initAppPreferences() {
    const themeRadios = document.querySelectorAll('input[name="appThemePref"]');
    const currentTheme = DataStore.getTheme();

    themeRadios.forEach(radio => {
      if (radio.value === currentTheme) radio.checked = true;
      radio.addEventListener('change', () => {
        DataStore.setTheme(radio.value);
        App.updateThemeIcons(radio.value);
        App.showToast(`Application theme set to ${radio.value.toUpperCase()}`, 'info');
      });
    });

    const appForm = document.getElementById('settingsAppForm');
    if (appForm) {
      appForm.addEventListener('submit', (e) => {
        e.preventDefault();
        App.showToast('Application preferences saved.', 'success');
      });
    }
  },

  // 3. Security Tab
  initSecurityForm() {
    const passForm = document.getElementById('settingsSecurityPassForm');
    if (passForm) {
      passForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const curPass = document.getElementById('secCurrentPass').value;
        const newPass = document.getElementById('secNewPass').value;
        const confPass = document.getElementById('secConfirmPass').value;

        if (!curPass || !newPass || !confPass) {
          App.showToast('Please fill in all password fields.', 'error');
          return;
        }

        if (newPass.length < 8) {
          App.showToast('New password must be at least 8 characters.', 'error');
          return;
        }

        if (newPass !== confPass) {
          App.showToast('New passwords do not match.', 'error');
          return;
        }

        passForm.reset();
        App.showToast('Password updated successfully! (Simulated)', 'success');
      });
    }

    const twoFaToggle = document.getElementById('twoFactorSwitch');
    if (twoFaToggle) {
      twoFaToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          App.showToast('Two-Factor Authentication is now ENABLED.', 'success');
        } else {
          App.showToast('Two-Factor Authentication has been disabled.', 'warning');
        }
      });
    }
  },

  // 4. Activity Tab
  renderActivityTable() {
    const tbody = document.getElementById('settingsActivityTableBody');
    if (!tbody) return;

    const mockActivities = [
      { action: 'Dashboard Login', ip: '192.168.1.104', location: 'San Francisco, US', device: 'Chrome / Windows 11', time: 'Today at 21:14', status: 'Success' },
      { action: 'Bid Placed on Cyber Samurai', ip: '192.168.1.104', location: 'San Francisco, US', device: 'Chrome / Windows 11', time: 'Today at 20:30', status: 'Success' },
      { action: 'Profile Bio Updated', ip: '192.168.1.104', location: 'San Francisco, US', device: 'Chrome / Windows 11', time: 'Yesterday at 15:22', status: 'Success' },
      { action: 'API Key Created', ip: '192.168.1.104', location: 'San Francisco, US', device: 'Chrome / Windows 11', time: '12 Oct 2026', status: 'Success' },
      { action: 'Password Verification', ip: '192.168.1.104', location: 'San Francisco, US', device: 'Chrome / Windows 11', time: '08 Oct 2026', status: 'Success' }
    ];

    tbody.innerHTML = mockActivities.map(item => `
      <tr>
        <td><strong>${item.action}</strong></td>
        <td><code>${item.ip}</code></td>
        <td>${item.location}</td>
        <td><i class="fa-solid fa-laptop text-muted me-1"></i> ${item.device}</td>
        <td>${item.time}</td>
        <td><span class="badge bg-success">${item.status}</span></td>
      </tr>
    `).join('');
  },

  // 5. Payment Method Tab
  initPaymentMethods() {
    const addCardBtn = document.getElementById('btnAddPaymentMethod');
    if (addCardBtn) {
      addCardBtn.addEventListener('click', () => {
        App.showToast('Demo payment method added (Visa •••• 5821)', 'success');
      });
    }

    const removeBtns = document.querySelectorAll('.btn-remove-payment');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cardBox = e.target.closest('.payment-card-box');
        if (cardBox) {
          cardBox.remove();
          App.showToast('Payment method removed (Demo).', 'info');
        }
      });
    });
  },

  // 6. API Tab
  renderApiKeys() {
    const container = document.getElementById('apiKeysContainer');
    if (!container) return;

    container.innerHTML = this.apiKeys.map(k => `
      <div class="api-key-item p-3 mb-3" style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md);">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <strong style="color:#fff; font-size:14px;">${k.name}</strong>
          <span style="font-size:11px; color:var(--text-muted);">Created: ${k.created}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="api-key-code font-monospace p-2 flex-grow-1" style="background:var(--bg-primary); border-radius:var(--radius-sm); font-size:13px; color:var(--primary-light);">
            ${k.masked ? k.key.substring(0, 10) + '••••••••••••••••' : k.key}
          </div>
          <button class="btn btn-sm btn-outline-secondary" onclick="SettingsPage.toggleMaskApiKey('${k.id}')" title="Show/Hide">
            <i class="fa-solid ${k.masked ? 'fa-eye' : 'fa-eye-slash'}"></i>
          </button>
          <button class="btn btn-sm btn-outline-primary" onclick="SettingsPage.copyApiKey('${k.key}')" title="Copy Key">
            <i class="fa-regular fa-copy"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="SettingsPage.deleteApiKey('${k.id}')" title="Revoke">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  },

  toggleMaskApiKey(id) {
    const target = this.apiKeys.find(k => k.id === id);
    if (target) {
      target.masked = !target.masked;
      this.renderApiKeys();
    }
  },

  copyApiKey(key) {
    navigator.clipboard.writeText(key).then(() => {
      App.showToast('API key copied to clipboard!', 'success');
    }).catch(() => {
      App.showToast('Copied: ' + key, 'success');
    });
  },

  deleteApiKey(id) {
    this.apiKeys = this.apiKeys.filter(k => k.id !== id);
    this.renderApiKeys();
    App.showToast('API Key revoked successfully.', 'info');
  },

  initApiManagement() {
    const genBtn = document.getElementById('btnGenerateApiKey');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        const rand = Math.random().toString(36).substring(2, 15);
        const newKey = {
          id: 'key-' + Date.now(),
          name: 'Generated Key #' + (this.apiKeys.length + 1),
          key: `nova_live_${rand}`,
          created: 'Just now',
          masked: true
        };
        this.apiKeys.unshift(newKey);
        this.renderApiKeys();
        App.showToast('New API Key generated successfully (Demo)!', 'success');
      });
    }
  }
};
