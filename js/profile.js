/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - USER PROFILE (js/profile.js)
 * User Header, Badges, Tabs (Bought/Collected/Following), Edit Profile
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  ProfilePage.init();
});

const ProfilePage = {
  currentTab: 'bought',

  init() {
    this.renderUserProfileHeader();
    this.renderTabContent();
    this.initTabs();
    this.initEditProfileModal();

    window.addEventListener('savedNFTsUpdated', () => {
      this.renderTabContent();
    });

    window.addEventListener('nftDataUpdated', () => {
      this.renderTabContent();
    });
  },

  renderUserProfileHeader() {
    const profile = DataStore.getUserProfile();

    const nameEl = document.getElementById('profileDisplayName');
    const handleEl = document.getElementById('profileHandle');
    const bioEl = document.getElementById('profileBio');
    const avatarEl = document.getElementById('profileAvatarImg');
    const walletEl = document.getElementById('profileWalletAddress');
    const balanceEl = document.getElementById('profileWalletBalance');

    if (nameEl) nameEl.textContent = profile.name;
    if (handleEl) handleEl.textContent = profile.username;
    if (bioEl) bioEl.textContent = profile.bio;
    if (avatarEl) avatarEl.src = profile.avatar;
    if (walletEl) walletEl.textContent = `${profile.walletAddress.substring(0, 6)}...${profile.walletAddress.substring(38)}`;
    if (balanceEl) balanceEl.textContent = `${profile.walletBalanceEth.toFixed(2)} ETH`;

    // Counts
    const boughtCountEl = document.getElementById('profileCountBought');
    const collectedCountEl = document.getElementById('profileCountCollected');
    const followingCountEl = document.getElementById('profileCountFollowing');

    if (boughtCountEl) boughtCountEl.textContent = profile.itemsBought.length;
    if (collectedCountEl) collectedCountEl.textContent = profile.itemsCollected.length;
    if (followingCountEl) followingCountEl.textContent = profile.followingIds.length;
  },

  initTabs() {
    const tabs = document.querySelectorAll('.profile-nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = tab.dataset.tab;
        this.renderTabContent();
      });
    });
  },

  renderTabContent() {
    const profile = DataStore.getUserProfile();
    const boughtPane = document.getElementById('profileBoughtPane');
    const collectedPane = document.getElementById('profileCollectedPane');
    const followingPane = document.getElementById('profileFollowingPane');

    if (!boughtPane || !collectedPane || !followingPane) return;

    // Toggle panes
    boughtPane.style.display = this.currentTab === 'bought' ? 'block' : 'none';
    collectedPane.style.display = this.currentTab === 'collected' ? 'block' : 'none';
    followingPane.style.display = this.currentTab === 'following' ? 'block' : 'none';

    // 1. My Bought NFTs
    if (this.currentTab === 'bought') {
      const all = DataStore.getNFTs();
      const boughtItems = all.filter(nft => profile.itemsBought.includes(nft.id));
      const boughtGrid = document.getElementById('profileBoughtGrid');
      if (boughtGrid) {
        boughtGrid.innerHTML = boughtItems.map(nft => App.renderNFTCardHTML(nft)).join('');
      }
    }

    // 2. My Collected NFTs
    if (this.currentTab === 'collected') {
      const all = DataStore.getNFTs();
      const collectedItems = all.filter(nft => profile.itemsCollected.includes(nft.id));
      const collectedGrid = document.getElementById('profileCollectedGrid');
      if (collectedGrid) {
        collectedGrid.innerHTML = collectedItems.map(nft => App.renderNFTCardHTML(nft)).join('');
      }
    }

    // 3. Following Creators
    if (this.currentTab === 'following') {
      const creators = DataStore.getCreators();
      const followingList = document.getElementById('profileFollowingList');
      if (followingList) {
        followingList.innerHTML = creators.map(creator => `
          <div class="creator-item">
            <div class="creator-info-left">
              <div class="creator-avatar-wrap">
                <img src="${creator.avatar}" alt="${creator.name}" class="creator-avatar-img">
                ${creator.verified ? '<div class="creator-verified-badge"><i class="fa-solid fa-check"></i></div>' : ''}
              </div>
              <div class="creator-text">
                <h6>${creator.name}</h6>
                <span>${creator.followers} Followers &bull; ${creator.itemsCount} Artworks</span>
              </div>
            </div>
            <button class="btn-follow ${creator.isFollowing ? 'following' : ''}" 
                    onclick="ProfilePage.handleFollowToggle('${creator.id}', this)">
              ${creator.isFollowing ? 'Following' : '+ Follow'}
            </button>
          </div>
        `).join('');
      }
    }
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
    this.renderUserProfileHeader();
  },

  initEditProfileModal() {
    const editBtn = document.getElementById('openEditProfileBtn');
    const modal = document.getElementById('editProfileModalOverlay');
    const form = document.getElementById('editProfileForm');

    if (editBtn && modal) {
      editBtn.addEventListener('click', () => {
        const profile = DataStore.getUserProfile();
        document.getElementById('editNameInput').value = profile.name;
        document.getElementById('editUsernameInput').value = profile.username.replace('@', '');
        document.getElementById('editBioInput').value = profile.bio;
        modal.classList.add('active');
      });
    }

    const closeBtn = document.getElementById('closeEditProfileBtn');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('editNameInput').value.trim();
        const username = document.getElementById('editUsernameInput').value.trim();
        const bio = document.getElementById('editBioInput').value.trim();

        if (!name) {
          App.showToast('Please enter your full name', 'error');
          return;
        }

        DataStore.updateUserProfile({
          name,
          username: username.startsWith('@') ? username : `@${username}`,
          bio
        });

        // Also update auth user session
        DataStore.setCurrentUser({
          name,
          email: DataStore.getUserProfile().email,
          isLoggedIn: true
        });

        this.renderUserProfileHeader();
        App.renderSharedUserHeader();
        modal.classList.remove('active');
        App.showToast('Profile information updated successfully!', 'success');
      });
    }
  }
};
