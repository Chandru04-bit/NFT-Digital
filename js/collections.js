/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - COLLECTIONS (js/collections.js)
 * Multi-Category Filter, Search Input, Multi-Sort & NFT Card Grid
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  CollectionsPage.init();
});

const CollectionsPage = {
  currentCategory: 'All',
  searchQuery: '',
  currentSort: 'popular',

  init() {
    this.renderCollectionsGrid();
    this.initCategoryFilters();
    this.initSearchFilter();
    this.initSorting();

    // Listen for updates
    window.addEventListener('nftDataUpdated', () => {
      this.renderCollectionsGrid();
    });

    window.addEventListener('savedNFTsUpdated', () => {
      this.renderCollectionsGrid();
    });
  },

  renderCollectionsGrid() {
    const grid = document.getElementById('collectionsNFTGrid');
    const emptyState = document.getElementById('collectionsEmptyState');
    const countBadge = document.getElementById('collectionsCountBadge');
    if (!grid) return;

    let items = DataStore.getNFTs();

    // Category filter
    if (this.currentCategory !== 'All') {
      items = items.filter(nft => nft.category.toLowerCase() === this.currentCategory.toLowerCase());
    }

    // Search query
    if (this.searchQuery.trim().length > 0) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(nft =>
        nft.title.toLowerCase().includes(q) ||
        nft.creator.name.toLowerCase().includes(q) ||
        nft.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (this.currentSort === 'price-low') {
      items.sort((a, b) => a.currentBid - b.currentBid);
    } else if (this.currentSort === 'price-high') {
      items.sort((a, b) => b.currentBid - a.currentBid);
    } else if (this.currentSort === 'ending-soon') {
      items.sort((a, b) => a.endsInHours - b.endsInHours);
    } else if (this.currentSort === 'popular') {
      items.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    }

    // Update count
    if (countBadge) countBadge.textContent = `${items.length} Artworks`;

    if (items.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    grid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = items.map(nft => App.renderNFTCardHTML(nft)).join('');
  },

  initCategoryFilters() {
    const pills = document.querySelectorAll('.collections-cat-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.dataset.category || 'All';
        this.renderCollectionsGrid();
      });
    });
  },

  initSearchFilter() {
    const searchInput = document.getElementById('collectionsSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderCollectionsGrid();
      });
    }
  },

  initSorting() {
    const sortSelect = document.getElementById('collectionsSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderCollectionsGrid();
      });
    }
  }
};
