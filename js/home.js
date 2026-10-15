/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - HOME DASHBOARD (js/home.js)
 * Hero, Trending Filters, Charts (Line & Doughnut), Creators & Bids
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  HomeDashboard.init();
});

const HomeDashboard = {
  activeCategory: 'All',
  ethChartInstance: null,
  doughnutChartInstance: null,

  init() {
    this.renderFeaturedNFT();
    this.renderTrendingNFTs();
    this.initCategoryFilters();
    this.initCharts();
    this.renderTopCreators();
    this.renderRecentActivities();
    this.renderActiveBidsTable();

    // Listen for data updates (e.g. after placing a bid)
    window.addEventListener('nftDataUpdated', () => {
      this.renderFeaturedNFT();
      this.renderTrendingNFTs();
      this.renderActiveBidsTable();
      this.renderRecentActivities();
    });

    window.addEventListener('savedNFTsUpdated', () => {
      this.renderTrendingNFTs();
    });
  },

  // 1. Featured NFT in Hero
  renderFeaturedNFT() {
    const featuredCard = document.getElementById('heroFeaturedCard');
    if (!featuredCard) return;

    const nfts = DataStore.getNFTs();
    const featured = nfts.find(n => n.isFeatured) || nfts[0];

    featuredCard.innerHTML = `
      <div class="featured-img-wrap" onclick="App.openNFTDetailsModal('${featured.id}')" style="cursor:pointer;">
        <img src="${featured.image}" alt="${featured.title}">
        <div class="featured-countdown-badge">
          <i class="fa-regular fa-clock"></i>
          <span class="countdown-timer" data-hours="${featured.endsInHours}">${App.formatHoursToCountdown(featured.endsInHours)}</span>
        </div>
      </div>

      <div class="featured-header-info">
        <div class="featured-title-wrap">
          <h4 title="${featured.title}">${featured.title}</h4>
          <div class="featured-creator-wrap">
            <img src="${featured.creator.avatar}" alt="${featured.creator.name}" class="featured-creator-avatar">
            <span class="featured-creator-name">by ${featured.creator.name}</span>
          </div>
        </div>
      </div>

      <div class="featured-bid-box">
        <div class="featured-bid-val">
          <p>Current Bid</p>
          <h5><i class="fa-brands fa-ethereum"></i> ${featured.currentBid.toFixed(2)} ETH</h5>
        </div>
        <div class="featured-bid-val text-end">
          <p>Starting Price</p>
          <h5 style="color:var(--text-secondary);"><i class="fa-brands fa-ethereum"></i> ${featured.startingPrice.toFixed(2)} ETH</h5>
        </div>
      </div>

      <div class="featured-actions-row">
        <button class="btn-primary-nft" onclick="App.openBidModal('${featured.id}')">
          <i class="fa-solid fa-gavel"></i> Place a Bid
        </button>
        <button class="btn-outline-nft" onclick="App.openNFTDetailsModal('${featured.id}')">
          <i class="fa-regular fa-eye"></i> Details
        </button>
      </div>
    `;
  },

  // 2. Trending Bids Cards & Category Filter
  renderTrendingNFTs() {
    const grid = document.getElementById('trendingNFTGrid');
    if (!grid) return;

    const allNFTs = DataStore.getNFTs();
    let filtered = allNFTs;

    if (this.activeCategory !== 'All') {
      filtered = allNFTs.filter(nft => nft.category.toLowerCase() === this.activeCategory.toLowerCase());
    }

    grid.innerHTML = filtered.map(nft => App.renderNFTCardHTML(nft)).join('');
  },

  initCategoryFilters() {
    const filterPills = document.querySelectorAll('.category-filter-btn');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeCategory = pill.dataset.category || 'All';
        this.renderTrendingNFTs();
      });
    });
  },

  // 3. Chart.js Dashboard Charts
  initCharts() {
    this.initETHPriceChart();
    this.initDoughnutChart();
  },

  initETHPriceChart() {
    const ctx = document.getElementById('ethPriceChart');
    if (!ctx) return;

    if (this.ethChartInstance) {
      this.ethChartInstance.destroy();
    }

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(115, 91, 242, 0.45)');
    gradient.addColorStop(1, 'rgba(115, 91, 242, 0.0)');

    this.ethChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'ETH Price ($)',
          data: [2380, 2420, 2390, 2510, 2480, 2580, 2650],
          borderColor: '#735bf2',
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#735bf2',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e1b38',
            titleColor: '#ffffff',
            bodyColor: '#a78bfa',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (item) => `$${item.formattedValue} USD`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: { color: '#6f6b94', font: { family: 'Inter', size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.04)' },
            ticks: {
              color: '#6f6b94',
              font: { family: 'Inter', size: 11 },
              callback: (v) => `$${v}`
            }
          }
        }
      }
    });

    // Timeframe filter tabs (1D, 7D, 1M, 1Y)
    const chartTabBtns = document.querySelectorAll('.chart-tab-btn');
    const datasets = {
      '1D': [2590, 2610, 2605, 2630, 2640, 2650],
      '7D': [2380, 2420, 2390, 2510, 2480, 2580, 2650],
      '1M': [2100, 2250, 2190, 2340, 2450, 2650],
      '1Y': [1600, 1850, 2100, 2400, 2200, 2650]
    };
    const labels = {
      '1D': ['4h', '8h', '12h', '16h', '20h', '24h'],
      '7D': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Now'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Current']
    };

    chartTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        chartTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const period = btn.dataset.period || '7D';
        if (datasets[period]) {
          this.ethChartInstance.data.labels = labels[period];
          this.ethChartInstance.data.datasets[0].data = datasets[period];
          this.ethChartInstance.update();
        }
      });
    });
  },

  initDoughnutChart() {
    const ctx = document.getElementById('artworksDoughnutChart');
    if (!ctx) return;

    if (this.doughnutChartInstance) {
      this.doughnutChartInstance.destroy();
    }

    this.doughnutChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Artworks Sold', 'Active Auctions', 'Cancelled Bids'],
        datasets: [{
          data: [68, 22, 10],
          backgroundColor: ['#735bf2', '#00d084', '#ff4757'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e1b38',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw}%`
            }
          }
        }
      }
    });
  },

  // 4. Top Creators Section
  renderTopCreators() {
    const container = document.getElementById('topCreatorsList');
    if (!container) return;

    const creators = DataStore.getCreators();

    container.innerHTML = creators.slice(0, 5).map((creator, index) => `
      <div class="creator-item">
        <div class="creator-info-left">
          <span class="creator-rank">0${index + 1}</span>
          <div class="creator-avatar-wrap">
            <img src="${creator.avatar}" alt="${creator.name}" class="creator-avatar-img">
            ${creator.verified ? '<div class="creator-verified-badge"><i class="fa-solid fa-check"></i></div>' : ''}
          </div>
          <div class="creator-text">
            <h6>${creator.name}</h6>
            <span>${creator.followers} Followers &bull; ${creator.totalVolume}</span>
          </div>
        </div>
        <button class="btn-follow ${creator.isFollowing ? 'following' : ''}" 
                onclick="HomeDashboard.handleFollowToggle('${creator.id}', this)">
          ${creator.isFollowing ? 'Following' : '+ Follow'}
        </button>
      </div>
    `).join('');
  },

  handleFollowToggle(creatorId, btnEl) {
    const isNowFollowing = DataStore.toggleFollowCreator(creatorId);
    if (isNowFollowing) {
      btnEl.classList.add('following');
      btnEl.textContent = 'Following';
      App.showToast('You are now following this creator!', 'success');
    } else {
      btnEl.classList.remove('following');
      btnEl.textContent = '+ Follow';
      App.showToast('Unfollowed creator', 'info');
    }
  },

  // 5. Recent Activity List
  renderRecentActivities() {
    const container = document.getElementById('recentActivityList');
    if (!container) return;

    const activities = DataStore.getActivities();

    container.innerHTML = activities.slice(0, 5).map(act => `
      <div class="activity-item">
        <div class="activity-left">
          <img src="${act.image}" alt="${act.title}" class="activity-thumb">
          <div class="activity-info">
            <h6>${act.title}</h6>
            <p>${act.type} by <strong style="color:var(--text-main);">${act.from}</strong> &bull; ${act.time}</p>
          </div>
        </div>
        <div class="activity-price">
          <h6>${act.price}</h6>
          <span>${act.usd}</span>
        </div>
      </div>
    `).join('');
  },

  // 6. Active Bids Table on Home Page
  renderActiveBidsTable() {
    const tableBody = document.getElementById('homeActiveBidsTableBody');
    if (!tableBody) return;

    const nfts = DataStore.getNFTs().slice(0, 5);

    tableBody.innerHTML = nfts.map(nft => `
      <tr>
        <td>
          <div class="nft-table-item">
            <img src="${nft.image}" alt="${nft.title}" class="nft-table-thumb">
            <div>
              <div class="nft-table-title" onclick="App.openNFTDetailsModal('${nft.id}')" style="cursor:pointer;">${nft.title}</div>
              <div class="nft-table-creator">by ${nft.creator.name}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="price-eth-val"><i class="fa-brands fa-ethereum text-primary"></i> ${nft.startingPrice.toFixed(2)} ETH</div>
          <div class="price-usd-sub">$${(nft.startingPrice * 2500).toLocaleString()}</div>
        </td>
        <td>
          <div class="price-eth-val" style="color:var(--primary-light);"><i class="fa-brands fa-ethereum"></i> ${nft.yourOffer ? nft.yourOffer.toFixed(2) : '-'} ETH</div>
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
          <div style="display:flex; gap:8px;">
            <button class="btn-primary-nft btn-sm-nft" onclick="App.openBidModal('${nft.id}')">
              Place Bid
            </button>
            <button class="btn-outline-nft btn-sm-nft" onclick="App.openNFTDetailsModal('${nft.id}')">
              View
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }
};
