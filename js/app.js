/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - MAIN APP ENGINE (js/app.js)
 * Global Behaviors, Modals, Search, Theme, Toasts & Reusable Cards
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  activeBidNftId: null,

  init() {
    this.initTheme();
    this.initSidebar();
    this.initHeaderSearch();
    this.initHeaderDropdowns();
    this.initModals();
    this.startCountdownTicker();
    this.renderSharedUserHeader();
  },

  // 1. Theme Toggle
  initTheme() {
    const savedTheme = DataStore.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcons(savedTheme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        DataStore.setTheme(next);
        this.updateThemeIcons(next);
        this.showToast(`Switched to ${next.toUpperCase()} theme`, 'info');
      });
    }
  },

  updateThemeIcons(theme) {
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'fa-solid fa-moon';
      toggleBtn.title = 'Switch to Dark Mode';
    } else {
      icon.className = 'fa-solid fa-sun';
      toggleBtn.title = 'Switch to Light Mode';
    }
  },

  // 2. Sidebar & Mobile Drawer
  initSidebar() {
    const sidebar = document.getElementById('appSidebar');
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show-sidebar');
        if (backdrop) backdrop.classList.toggle('active');
      });
    }

    if (backdrop && sidebar) {
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('show-sidebar');
        backdrop.classList.remove('active');
      });
    }
  },

  // 3. Header Live Search
  initHeaderSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');
    const clearBtn = document.getElementById('searchClearBtn');

    if (!searchInput || !searchDropdown) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = query.length > 0 ? 'block' : 'none';

      if (query.length < 2) {
        searchDropdown.classList.remove('active');
        searchDropdown.innerHTML = '';
        return;
      }

      const allNFTs = DataStore.getNFTs();
      const results = allNFTs.filter(nft => 
        nft.title.toLowerCase().includes(query) ||
        nft.category.toLowerCase().includes(query) ||
        nft.creator.name.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        searchDropdown.innerHTML = `
          <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">
            <i class="fa-solid fa-magnifying-glass mb-2 d-block" style="font-size: 20px;"></i>
            No NFTs found matching "${query}"
          </div>`;
      } else {
        searchDropdown.innerHTML = results.slice(0, 5).map(nft => `
          <div class="search-result-item" onclick="App.openNFTDetailsModal('${nft.id}')">
            <img src="${nft.image}" alt="${nft.title}" class="search-result-thumb">
            <div class="search-result-info">
              <h6>${nft.title}</h6>
              <span>${nft.currentBid.toFixed(2)} ETH &bull; by ${nft.creator.name}</span>
            </div>
          </div>
        `).join('');
      }

      searchDropdown.classList.add('active');
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchDropdown.classList.remove('active');
      });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('active');
      }
    });
  },

  // 4. Header Dropdowns (Notifications & User Profile)
  initHeaderDropdowns() {
    const notifBtn = document.getElementById('notifDropdownBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    const profileBtn = document.getElementById('userProfileTrigger');
    const profileDropdown = document.getElementById('userProfileDropdown');

    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('active');
        if (profileDropdown) profileDropdown.classList.remove('active');
      });
    }

    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        if (notifDropdown) notifDropdown.classList.remove('active');
      });
    }

    // Click outside to close
    document.addEventListener('click', () => {
      if (notifDropdown) notifDropdown.classList.remove('active');
      if (profileDropdown) profileDropdown.classList.remove('active');
    });

    // Mark all as read button
    const markReadBtn = document.getElementById('markAllReadBtn');
    if (markReadBtn) {
      markReadBtn.addEventListener('click', () => {
        const badge = document.querySelector('.action-badge');
        if (badge) badge.style.display = 'none';
        this.showToast('All notifications marked as read', 'info');
      });
    }
  },

  renderSharedUserHeader() {
    const profile = DataStore.getUserProfile();
    const avatarEls = document.querySelectorAll('.header-user-avatar');
    const nameEls = document.querySelectorAll('.header-user-name');

    avatarEls.forEach(el => el.src = profile.avatar);
    nameEls.forEach(el => el.textContent = profile.name);
  },

  // 5. Toast System
  showToast(message, type = 'info') {
    let container = document.getElementById('nftToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'nftToastContainer';
      container.className = 'nft-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `nft-toast ${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check text-success';
    if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation text-danger';

    toast.innerHTML = `
      <i class="${iconClass}" style="font-size: 18px;"></i>
      <div style="flex: 1; font-size: 13px; font-weight: 600;">${message}</div>
      <button style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:12px;" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // 6. Universal Reusable Modals
  initModals() {
    // Bid increment buttons
    const incBtns = document.querySelectorAll('.bid-increment-btn');
    const bidInput = document.getElementById('bidAmountInput');
    incBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const inc = parseFloat(btn.dataset.inc || '0.1');
        const current = parseFloat(bidInput.value || '0');
        bidInput.value = (current + inc).toFixed(2);
        App.updateBidBreakdown();
      });
    });

    if (bidInput) {
      bidInput.addEventListener('input', () => {
        App.updateBidBreakdown();
      });
    }

    // Submit Bid Form
    const bidForm = document.getElementById('placeBidModalForm');
    if (bidForm) {
      bidForm.addEventListener('submit', (e) => {
        e.preventDefault();
        App.submitBidForm();
      });
    }
  },

  openBidModal(nftId) {
    const nft = DataStore.getNFTById(nftId);
    if (!nft) return;

    this.activeBidNftId = nftId;
    const modalOverlay = document.getElementById('bidModalOverlay');
    if (!modalOverlay) return;

    document.getElementById('bidModalImg').src = nft.image;
    document.getElementById('bidModalTitle').textContent = nft.title;
    document.getElementById('bidModalCreator').textContent = `by ${nft.creator.name}`;
    document.getElementById('bidModalCurrentBid').textContent = `${nft.currentBid.toFixed(2)} ETH`;
    document.getElementById('bidModalMinBid').textContent = `${nft.minBid.toFixed(2)} ETH`;
    
    const bidInput = document.getElementById('bidAmountInput');
    bidInput.value = nft.minBid.toFixed(2);
    bidInput.min = nft.minBid.toFixed(2);

    this.updateBidBreakdown();
    modalOverlay.classList.add('active');
  },

  closeBidModal() {
    const modalOverlay = document.getElementById('bidModalOverlay');
    if (modalOverlay) modalOverlay.classList.remove('active');
    this.activeBidNftId = null;
  },

  updateBidBreakdown() {
    const bidInput = document.getElementById('bidAmountInput');
    const val = parseFloat(bidInput?.value || 0);
    const gasFee = 0.008;
    const total = val > 0 ? (val + gasFee).toFixed(3) : '0.000';

    const gasEl = document.getElementById('bidBreakdownGas');
    const totalEl = document.getElementById('bidBreakdownTotal');
    const usdEl = document.getElementById('bidBreakdownUsd');

    if (gasEl) gasEl.textContent = `${gasFee} ETH`;
    if (totalEl) totalEl.textContent = `${total} ETH`;
    if (usdEl) usdEl.textContent = `≈ $${(parseFloat(total) * 2500).toLocaleString()}`;
  },

  submitBidForm() {
    if (!this.activeBidNftId) return;
    const bidInput = document.getElementById('bidAmountInput');
    const amount = parseFloat(bidInput.value);

    const result = DataStore.placeBid(this.activeBidNftId, amount);
    if (result.success) {
      this.showToast(result.message, 'success');
      this.closeBidModal();

      // Trigger custom event so page re-renders table/cards
      window.dispatchEvent(new CustomEvent('nftDataUpdated', { detail: { nftId: this.activeBidNftId } }));
    } else {
      this.showToast(result.message, 'error');
    }
  },

  // 7. Universal NFT Details Modal
  openNFTDetailsModal(nftId) {
    const nft = DataStore.getNFTById(nftId);
    if (!nft) return;

    const modal = document.getElementById('nftDetailsModalOverlay');
    if (!modal) {
      // If modal element not on this page, redirect to standalone details page
      window.location.href = `nft-details.html?id=${nftId}`;
      return;
    }

    document.getElementById('detailsModalImg').src = nft.image;
    document.getElementById('detailsModalTitle').textContent = nft.title;
    document.getElementById('detailsModalCategory').textContent = nft.category.toUpperCase();
    document.getElementById('detailsModalBadge').textContent = `★ ${nft.badge}`;
    document.getElementById('detailsModalCreatorAvatar').src = nft.creator.avatar;
    document.getElementById('detailsModalCreatorName').textContent = nft.creator.name;
    document.getElementById('detailsModalCreatorHandle').textContent = nft.creator.handle;
    document.getElementById('detailsModalDesc').textContent = nft.description;
    document.getElementById('detailsModalCurrentBid').textContent = `${nft.currentBid.toFixed(2)} ETH`;
    document.getElementById('detailsModalUsd').textContent = `($${(nft.currentBid * 2500).toLocaleString()})`;

    // Attributes list
    const attrContainer = document.getElementById('detailsModalAttributes');
    if (attrContainer) {
      attrContainer.innerHTML = nft.attributes.map(attr => `
        <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:8px 12px; text-align:center;">
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">${attr.trait}</div>
          <div style="font-size:12px; font-weight:700; color:#fff;">${attr.value}</div>
          <div style="font-size:10px; color:var(--primary-light); font-weight:600;">${attr.rarity} rare</div>
        </div>
      `).join('');
    }

    // Modal Action Buttons
    const placeBidBtn = document.getElementById('detailsModalBidBtn');
    if (placeBidBtn) {
      placeBidBtn.onclick = () => {
        this.closeNFTDetailsModal();
        this.openBidModal(nftId);
      };
    }

    const fullPageBtn = document.getElementById('detailsModalFullPageBtn');
    if (fullPageBtn) {
      fullPageBtn.onclick = () => {
        window.location.href = `nft-details.html?id=${nftId}`;
      };
    }

    modal.classList.add('active');
  },

  closeNFTDetailsModal() {
    const modal = document.getElementById('nftDetailsModalOverlay');
    if (modal) modal.classList.remove('active');
  },

  // 8. Reusable Card HTML Generator
  renderNFTCardHTML(nft) {
    const isSaved = DataStore.isSaved(nft.id);
    const usd = (nft.currentBid * 2500).toLocaleString();

    return `
      <div class="nft-card" data-id="${nft.id}" data-category="${nft.category}">
        <div class="nft-card-thumb-wrap" onclick="App.openNFTDetailsModal('${nft.id}')">
          <img src="${nft.image}" alt="${nft.title}" loading="lazy">
          <span class="nft-card-badge">${nft.category}</span>
          <button class="nft-card-wishlist ${isSaved ? 'active' : ''}" 
                  onclick="event.stopPropagation(); App.toggleWishlist('${nft.id}', this)" 
                  title="${isSaved ? 'Remove from Saved' : 'Add to Saved'}">
            <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <div class="nft-card-timer">
            <span><i class="fa-regular fa-clock"></i> Ending in</span>
            <strong class="countdown-timer" data-hours="${nft.endsInHours}">${this.formatHoursToCountdown(nft.endsInHours)}</strong>
          </div>
        </div>

        <div class="nft-card-content">
          <div class="nft-card-creator">
            <img src="${nft.creator.avatar}" alt="${nft.creator.name}" class="nft-card-creator-avatar">
            <span class="nft-card-creator-name">${nft.creator.name}</span>
            ${nft.creator.verified ? '<i class="fa-solid fa-circle-check text-primary" style="font-size:11px;"></i>' : ''}
          </div>

          <h5 class="nft-card-title" onclick="App.openNFTDetailsModal('${nft.id}')" title="${nft.title}">
            ${nft.title}
          </h5>

          <div class="nft-card-bid-row">
            <div class="nft-bid-info">
              <span>Current Bid</span>
              <h5><i class="fa-brands fa-ethereum"></i> ${nft.currentBid.toFixed(2)} ETH</h5>
            </div>
            <button class="btn-primary-nft btn-sm-nft" onclick="App.openBidModal('${nft.id}')">
              Place Bid
            </button>
          </div>
        </div>
      </div>
    `;
  },

  toggleWishlist(nftId, buttonEl) {
    const isNowSaved = DataStore.toggleSaveNFT(nftId);
    if (buttonEl) {
      const icon = buttonEl.querySelector('i');
      if (isNowSaved) {
        buttonEl.classList.add('active');
        icon.className = 'fa-solid fa-heart';
        this.showToast('Item saved to your Wishlist!', 'success');
      } else {
        buttonEl.classList.remove('active');
        icon.className = 'fa-regular fa-heart';
        this.showToast('Item removed from Saved', 'info');
      }
    }
    window.dispatchEvent(new CustomEvent('savedNFTsUpdated'));
  },

  // 9. Live Countdown Timers
  formatHoursToCountdown(hours) {
    const totalSeconds = Math.max(0, Math.floor(hours * 3600));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  },

  startCountdownTicker() {
    setInterval(() => {
      const timers = document.querySelectorAll('.countdown-timer');
      timers.forEach(timer => {
        let hrs = parseFloat(timer.dataset.hours || '10');
        hrs = Math.max(0, hrs - (1 / 3600));
        timer.dataset.hours = hrs;
        timer.textContent = this.formatHoursToCountdown(hrs);
      });
    }, 1000);
  }
};
