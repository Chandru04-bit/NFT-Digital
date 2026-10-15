/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - NFT DETAILS PAGE (js/nft-details.js)
 * Standalone NFT View, Dynamic Query Param Loading & Bid History
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  NFTDetailsPage.init();
});

const NFTDetailsPage = {
  nftId: null,
  activeDetailTab: 'history',

  init() {
    const params = new URLSearchParams(window.location.search);
    this.nftId = params.get('id') || 'nft-1';

    this.renderNFTDetails();
    this.initDetailTabs();
    this.renderRelatedNFTs();

    window.addEventListener('nftDataUpdated', () => {
      this.renderNFTDetails();
    });

    window.addEventListener('savedNFTsUpdated', () => {
      this.updateWishlistBtnState();
    });
  },

  renderNFTDetails() {
    const nft = DataStore.getNFTById(this.nftId);
    if (!nft) {
      window.location.href = 'collections.html';
      return;
    }

    // Artwork & Badges
    document.getElementById('detailsMainImg').src = nft.image;
    document.getElementById('detailsMainTitle').textContent = nft.title;
    document.getElementById('detailsBreadcrumbTitle').textContent = nft.title;
    document.getElementById('detailsCategoryBadge').textContent = nft.category.toUpperCase();
    document.getElementById('detailsRarityBadge').textContent = `★ ${nft.badge}`;

    // Creator & Owner
    document.getElementById('detailsCreatorAvatar').src = nft.creator.avatar;
    document.getElementById('detailsCreatorName').textContent = nft.creator.name;
    document.getElementById('detailsCreatorHandle').textContent = nft.creator.handle;

    // Price & Stats
    document.getElementById('detailsCurrentBid').textContent = `${nft.currentBid.toFixed(2)} ETH`;
    document.getElementById('detailsCurrentUsd').textContent = `≈ $${(nft.currentBid * 2500).toLocaleString()} USD`;
    document.getElementById('detailsStartingPrice').textContent = `${nft.startingPrice.toFixed(2)} ETH`;
    document.getElementById('detailsBidsCount').textContent = nft.bidsCount || 24;
    document.getElementById('detailsLikesCount').textContent = nft.likesCount || 340;

    // Countdown
    const countdownEl = document.getElementById('detailsCountdownTimer');
    if (countdownEl) {
      countdownEl.dataset.hours = nft.endsInHours;
      countdownEl.textContent = App.formatHoursToCountdown(nft.endsInHours);
    }

    // Description
    document.getElementById('detailsDescription').textContent = nft.description;

    // Attributes
    const attrGrid = document.getElementById('detailsAttributesGrid');
    if (attrGrid) {
      attrGrid.innerHTML = nft.attributes.map(attr => `
        <div class="p-3" style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); text-align:center;">
          <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">${attr.trait}</div>
          <div style="font-size:14px; font-weight:700; color:#fff; margin-bottom:2px;">${attr.value}</div>
          <div style="font-size:11px; color:var(--primary-light); font-weight:600;">${attr.rarity} rare</div>
        </div>
      `).join('');
    }

    // Bid Button
    const placeBidBtn = document.getElementById('detailsPlaceBidBtn');
    if (placeBidBtn) {
      placeBidBtn.onclick = () => App.openBidModal(this.nftId);
    }

    // Wishlist Button
    this.updateWishlistBtnState();
  },

  updateWishlistBtnState() {
    const btn = document.getElementById('detailsWishlistBtn');
    if (!btn) return;
    const isSaved = DataStore.isSaved(this.nftId);
    const icon = btn.querySelector('i');
    if (isSaved) {
      btn.classList.add('active');
      icon.className = 'fa-solid fa-heart text-danger';
      btn.title = 'Remove from Saved';
    } else {
      btn.classList.remove('active');
      icon.className = 'fa-regular fa-heart';
      btn.title = 'Add to Saved';
    }

    btn.onclick = () => {
      App.toggleWishlist(this.nftId, btn);
    };
  },

  initDetailTabs() {
    const tabBtns = document.querySelectorAll('.details-tab-btn');
    const historyPane = document.getElementById('detailsBidHistoryPane');
    const provenancePane = document.getElementById('detailsProvenancePane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeDetailTab = btn.dataset.tab;

        if (historyPane && provenancePane) {
          historyPane.style.display = this.activeDetailTab === 'history' ? 'block' : 'none';
          provenancePane.style.display = this.activeDetailTab === 'provenance' ? 'block' : 'none';
        }
      });
    });

    this.renderBidHistory();
  },

  renderBidHistory() {
    const tbody = document.getElementById('detailsBidHistoryBody');
    if (!tbody) return;

    const nft = DataStore.getNFTById(this.nftId);
    const mockBids = [
      { bidder: 'CryptoWhale_01', amount: nft.currentBid, time: '2 hours ago', avatar: 'assets/images/avatars/creator-1.svg' },
      { bidder: 'MetaCollector', amount: (nft.currentBid - 0.2), time: '5 hours ago', avatar: 'assets/images/avatars/creator-2.svg' },
      { bidder: 'CyberKnight', amount: (nft.currentBid - 0.45), time: '12 hours ago', avatar: 'assets/images/avatars/creator-3.svg' },
      { bidder: 'NovaBounty', amount: nft.startingPrice, time: '1 day ago', avatar: 'assets/images/avatars/creator-5.svg' }
    ];

    tbody.innerHTML = mockBids.map(b => `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2">
            <img src="${b.avatar}" class="rounded-circle" width="28" height="28">
            <span style="font-weight:600;">${b.bidder}</span>
          </div>
        </td>
        <td><strong style="color:#fff;"><i class="fa-brands fa-ethereum text-primary"></i> ${b.amount.toFixed(2)} ETH</strong></td>
        <td><span style="color:var(--text-muted); font-size:12px;">$${(b.amount * 2500).toLocaleString()}</span></td>
        <td><span style="color:var(--text-muted); font-size:12px;">${b.time}</span></td>
      </tr>
    `).join('');
  },

  renderRelatedNFTs() {
    const container = document.getElementById('detailsRelatedGrid');
    if (!container) return;

    const all = DataStore.getNFTs();
    const related = all.filter(item => item.id !== this.nftId).slice(0, 4);

    container.innerHTML = related.map(nft => App.renderNFTCardHTML(nft)).join('');
  }
};
