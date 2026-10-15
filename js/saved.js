/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - SAVED ITEMS (js/saved.js)
 * Wishlist Grid, Filter & Sorting, Remove Action, Empty State
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  SavedPage.init();
});

const SavedPage = {
  currentFilter: 'All',
  currentSort: 'recent',

  init() {
    this.renderSavedGrid();
    this.initFilters();
    this.initSorting();

    // Listen for updates
    window.addEventListener('savedNFTsUpdated', () => {
      this.renderSavedGrid();
    });

    window.addEventListener('nftDataUpdated', () => {
      this.renderSavedGrid();
    });
  },

  renderSavedGrid() {
    const grid = document.getElementById('savedNFTGrid');
    const emptyState = document.getElementById('savedEmptyState');
    const countBadge = document.getElementById('savedTotalCount');
    if (!grid) return;

    let items = DataStore.getSavedNFTs();

    // Update count in header
    if (countBadge) countBadge.textContent = `${items.length} Items`;

    if (items.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    grid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    // Apply category filter
    if (this.currentFilter !== 'All') {
      items = items.filter(item => item.category.toLowerCase() === this.currentFilter.toLowerCase());
    }

    // Apply sorting
    if (this.currentSort === 'price-high') {
      items.sort((a, b) => b.currentBid - a.currentBid);
    } else if (this.currentSort === 'price-low') {
      items.sort((a, b) => a.currentBid - b.currentBid);
    } else if (this.currentSort === 'ending-soon') {
      items.sort((a, b) => a.endsInHours - b.endsInHours);
    }

    grid.innerHTML = items.map(nft => App.renderNFTCardHTML(nft)).join('');
  },

  initFilters() {
    const filterPills = document.querySelectorAll('.saved-filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentFilter = pill.dataset.category || 'All';
        this.renderSavedGrid();
      });
    });
  },

  initSorting() {
    const sortSelect = document.getElementById('savedSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderSavedGrid();
      });
    }
  }
};
