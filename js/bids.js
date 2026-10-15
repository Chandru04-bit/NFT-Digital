/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - BIDS DASHBOARD (js/bids.js)
 * Metric Cards, Active Bids Table, Row Checkbox Selection & Cancel
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  BidsPage.init();
});

const BidsPage = {
  selectedBidIds: new Set(),

  init() {
    this.renderStats();
    this.renderBidsTable();
    this.initTableSelection();

    // Listen for updates
    window.addEventListener('nftDataUpdated', () => {
      this.renderStats();
      this.renderBidsTable();
    });
  },

  renderStats() {
    const nfts = DataStore.getNFTs();
    const creators = DataStore.getCreators();

    const totalArtworksEl = document.getElementById('bidsStatArtworks');
    const totalAuctionsEl = document.getElementById('bidsStatAuctions');
    const totalCreatorsEl = document.getElementById('bidsStatCreators');
    const cancelledBidsEl = document.getElementById('bidsStatCancelled');

    if (totalArtworksEl) totalArtworksEl.textContent = `${nfts.length * 8}K+`;
    if (totalAuctionsEl) totalAuctionsEl.textContent = `${nfts.length} Active`;
    if (totalCreatorsEl) totalCreatorsEl.textContent = `${creators.length * 120}+`;
    if (cancelledBidsEl) cancelledBidsEl.textContent = '14 Bids';
  },

  renderBidsTable() {
    const tbody = document.getElementById('bidsTableBody');
    if (!tbody) return;

    const nfts = DataStore.getNFTs();

    tbody.innerHTML = nfts.map(nft => {
      const isChecked = this.selectedBidIds.has(nft.id);
      return `
        <tr data-id="${nft.id}" class="${isChecked ? 'row-selected' : ''}">
          <td style="width: 40px;">
            <input type="checkbox" class="custom-checkbox row-select-box" data-id="${nft.id}" ${isChecked ? 'checked' : ''}>
          </td>
          <td>
            <div class="nft-table-item">
              <img src="${nft.image}" alt="${nft.title}" class="nft-table-thumb" onclick="App.openNFTDetailsModal('${nft.id}')" style="cursor:pointer;">
              <div>
                <div class="nft-table-title" onclick="App.openNFTDetailsModal('${nft.id}')" style="cursor:pointer;">
                  ${nft.title}
                </div>
                <div class="nft-table-creator">by ${nft.creator.name}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="price-eth-val"><i class="fa-brands fa-ethereum text-primary"></i> ${nft.startingPrice.toFixed(2)} ETH</div>
            <div class="price-usd-sub">$${(nft.startingPrice * 2500).toLocaleString()}</div>
          </td>
          <td>
            <div class="price-eth-val" style="color:var(--primary-light);">
              <i class="fa-brands fa-ethereum"></i> ${nft.yourOffer ? nft.yourOffer.toFixed(2) : '-'} ETH
            </div>
            <div class="price-usd-sub">${nft.yourOffer ? '$' + (nft.yourOffer * 2500).toLocaleString() : '-'}</div>
          </td>
          <td>
            <div class="price-eth-val"><i class="fa-brands fa-ethereum text-success"></i> ${nft.recentOffer.toFixed(2)} ETH</div>
            <div class="price-usd-sub">$${(nft.recentOffer * 2500).toLocaleString()}</div>
          </td>
          <td>
            <span class="time-left-badge">
              <i class="fa-regular fa-clock"></i>
              <span class="countdown-timer" data-hours="${nft.endsInHours}">${App.formatHoursToCountdown(nft.endsInHours)}</span>
            </span>
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn-primary-nft btn-sm-nft" onclick="App.openBidModal('${nft.id}')">
                Place Bid
              </button>
              <button class="btn-outline-nft btn-sm-nft text-danger" title="Cancel Offer" onclick="BidsPage.cancelRowBid('${nft.id}')">
                <i class="fa-solid fa-ban"></i> Cancel
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    this.bindRowCheckboxes();
  },

  initTableSelection() {
    const selectAllBox = document.getElementById('selectAllBids');
    if (selectAllBox) {
      selectAllBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const nfts = DataStore.getNFTs();
        if (isChecked) {
          nfts.forEach(nft => this.selectedBidIds.add(nft.id));
        } else {
          this.selectedBidIds.clear();
        }
        this.renderBidsTable();
        this.updateBatchActionState();
      });
    }

    const batchCancelBtn = document.getElementById('batchCancelBidsBtn');
    if (batchCancelBtn) {
      batchCancelBtn.addEventListener('click', () => {
        if (this.selectedBidIds.size === 0) {
          App.showToast('No bids selected for cancellation.', 'info');
          return;
        }
        const count = this.selectedBidIds.size;
        this.selectedBidIds.clear();
        const selectAllBox = document.getElementById('selectAllBids');
        if (selectAllBox) selectAllBox.checked = false;
        this.renderBidsTable();
        this.updateBatchActionState();
        App.showToast(`Successfully cancelled ${count} selected bids.`, 'success');
      });
    }
  },

  bindRowCheckboxes() {
    const checkboxes = document.querySelectorAll('.row-select-box');
    checkboxes.forEach(box => {
      box.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) {
          this.selectedBidIds.add(id);
        } else {
          this.selectedBidIds.delete(id);
        }
        this.updateBatchActionState();
      });
    });
  },

  updateBatchActionState() {
    const batchBtn = document.getElementById('batchCancelBidsBtn');
    const selectedCountSpan = document.getElementById('selectedBidsCount');
    if (batchBtn) {
      batchBtn.style.display = this.selectedBidIds.size > 0 ? 'inline-flex' : 'none';
    }
    if (selectedCountSpan) {
      selectedCountSpan.textContent = `(${this.selectedBidIds.size})`;
    }
  },

  cancelRowBid(nftId) {
    const nft = DataStore.getNFTById(nftId);
    if (!nft) return;

    if (confirm(`Are you sure you want to cancel your offer on "${nft.title}"?`)) {
      this.selectedBidIds.delete(nftId);
      this.renderBidsTable();
      this.updateBatchActionState();
      App.showToast(`Offer for "${nft.title}" has been cancelled.`, 'info');
    }
  }
};
