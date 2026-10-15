/**
 * ===================================================================
 * NFT DIGITAL MARKETPLACE - DATA STORE (js/data.js)
 * Centralized Mock Dataset, LocalStorage Persistence & API Helpers
 * ===================================================================
 */

const STORAGE_KEYS = {
  NFTS: 'nova_nfts_v1',
  SAVED_NFTS: 'nova_saved_nfts_v1',
  BIDS: 'nova_bids_v1',
  CREATORS: 'nova_creators_v1',
  USER_PROFILE: 'nova_user_profile_v1',
  ACTIVITIES: 'nova_activities_v1',
  THEME: 'nova_theme_v1',
  SETTINGS: 'nova_settings_v1',
  AUTH_USER: 'nova_current_user_v1'
};

// Initial Mock Dataset for NFTs
const INITIAL_NFTS = [
  {
    id: 'nft-1',
    title: 'Cyber Neon Samurai #042',
    category: 'Artwork',
    badge: 'Trending',
    image: 'assets/images/nft/nft-1.svg',
    currentBid: 2.85,
    minBid: 2.90,
    startingPrice: 1.50,
    yourOffer: 2.70,
    recentOffer: 2.85,
    endsInHours: 14.5,
    creator: {
      id: 'creator-1',
      name: 'Aura_Master',
      handle: '@auramaster',
      avatar: 'assets/images/avatars/creator-1.svg',
      verified: true
    },
    description: 'A futuristic cybernetic samurai immersed in radiant neon aesthetics. Hand-crafted 3D vector geometry blending traditional bushido with cyberpunk reality.',
    attributes: [
      { trait: 'Background', value: 'Neon Violet', rarity: '12%' },
      { trait: 'Character', value: 'Cyber Samurai', rarity: '4%' },
      { trait: 'Weapon', value: 'Plasma Katana', rarity: '2%' },
      { trait: 'Aura', value: 'Quantum Glow', rarity: '8%' }
    ],
    bidsCount: 28,
    likesCount: 342,
    isFeatured: true
  },
  {
    id: 'nft-2',
    title: 'Celestial Odyssey 3D',
    category: '3D Art',
    badge: 'Rare',
    image: 'assets/images/nft/nft-2.svg',
    currentBid: 3.40,
    minBid: 3.50,
    startingPrice: 2.00,
    yourOffer: 3.20,
    recentOffer: 3.40,
    endsInHours: 6.2,
    creator: {
      id: 'creator-2',
      name: 'NovaNebula',
      handle: '@novanebula',
      avatar: 'assets/images/avatars/creator-2.svg',
      verified: true
    },
    description: 'An expansive cosmic sculpture rendered in hyper-dimensional space. Represents the convergence of stellar phenomena and digital consciousness.',
    attributes: [
      { trait: 'Realm', value: 'Deep Cosmos', rarity: '6%' },
      { trait: 'Geometry', value: 'Tesseract Mesh', rarity: '3%' },
      { trait: 'Core', value: 'Supernova Blue', rarity: '9%' }
    ],
    bidsCount: 42,
    likesCount: 512,
    isFeatured: false
  },
  {
    id: 'nft-3',
    title: 'Genesis Codex: The Lost Arc',
    category: 'Book',
    badge: 'Exclusive',
    image: 'assets/images/nft/nft-3.svg',
    currentBid: 1.75,
    minBid: 1.85,
    startingPrice: 1.00,
    yourOffer: 1.60,
    recentOffer: 1.75,
    endsInHours: 22.0,
    creator: {
      id: 'creator-3',
      name: 'CryptoScribe',
      handle: '@cryptoscribe',
      avatar: 'assets/images/avatars/creator-3.svg',
      verified: true
    },
    description: 'The first cryptographic manuscript documenting the dawn of decentralized networks. Includes full unredacted chapter scrolls and audio commentary.',
    attributes: [
      { trait: 'Format', value: 'Encrypted Codex', rarity: '5%' },
      { trait: 'Pages', value: '360 Immutable Pages', rarity: '10%' },
      { trait: 'Language', value: 'Ancient Solidity', rarity: '1%' }
    ],
    bidsCount: 19,
    likesCount: 220,
    isFeatured: false
  },
  {
    id: 'nft-4',
    title: 'Ethereal Dreamscape #108',
    category: 'Artwork',
    badge: 'Hot',
    image: 'assets/images/nft/nft-4.svg',
    currentBid: 4.20,
    minBid: 4.30,
    startingPrice: 2.80,
    yourOffer: 4.00,
    recentOffer: 4.20,
    endsInHours: 3.5,
    creator: {
      id: 'creator-4',
      name: 'Elena_V',
      handle: '@elena_art',
      avatar: 'assets/images/avatars/creator-4.svg',
      verified: true
    },
    description: 'A serene visual exploration of lucidity and ethereal subconsciousness. Features layered prismatic refraction and atmospheric soundscapes.',
    attributes: [
      { trait: 'Palette', value: 'Lilac Aurora', rarity: '7%' },
      { trait: 'Horizon', value: 'Infinite Void', rarity: '15%' }
    ],
    bidsCount: 56,
    likesCount: 689,
    isFeatured: false
  },
  {
    id: 'nft-5',
    title: 'Voxel Metropolis VII',
    category: 'Metaverse',
    badge: 'Popular',
    image: 'assets/images/nft/nft-5.svg',
    currentBid: 5.15,
    minBid: 5.30,
    startingPrice: 3.50,
    yourOffer: 4.90,
    recentOffer: 5.15,
    endsInHours: 18.8,
    creator: {
      id: 'creator-5',
      name: 'MetaArchitect',
      handle: '@metaarchitect',
      avatar: 'assets/images/avatars/creator-5.svg',
      verified: true
    },
    description: 'A high-fidelity virtual land parcel situated at the nexus of the central metaverse hub. Includes 3D building permits and asset rights.',
    attributes: [
      { trait: 'Zone', value: 'Downtown Cyber', rarity: '2%' },
      { trait: 'Area', value: '120x120 Pixels', rarity: '8%' },
      { trait: 'Altitude', value: 'Sky Terrace', rarity: '11%' }
    ],
    bidsCount: 64,
    likesCount: 840,
    isFeatured: false
  },
  {
    id: 'nft-6',
    title: 'Chronicles of Satoshi: Vol I',
    category: 'Book',
    badge: 'Rare',
    image: 'assets/images/nft/nft-6.svg',
    currentBid: 2.10,
    minBid: 2.20,
    startingPrice: 1.20,
    yourOffer: 1.95,
    recentOffer: 2.10,
    endsInHours: 8.4,
    creator: {
      id: 'creator-6',
      name: 'SatoshiLore',
      handle: '@satoshilore',
      avatar: 'assets/images/avatars/creator-6.svg',
      verified: true
    },
    description: 'A comprehensive historic narrative detailing the enigmatic whitepaper release and cipherpunk movement that altered financial history.',
    attributes: [
      { trait: 'Volume', value: 'First Edition', rarity: '1%' },
      { trait: 'Binding', value: 'Digital Leather', rarity: '14%' }
    ],
    bidsCount: 31,
    likesCount: 415,
    isFeatured: false
  },
  {
    id: 'nft-7',
    title: 'Quantum Hologram Phoenix',
    category: '3D Art',
    badge: 'Trending',
    image: 'assets/images/nft/nft-7.svg',
    currentBid: 6.50,
    minBid: 6.70,
    startingPrice: 4.00,
    yourOffer: 6.20,
    recentOffer: 6.50,
    endsInHours: 2.1,
    creator: {
      id: 'creator-6',
      name: 'CyberVertex',
      handle: '@cybervertex',
      avatar: 'assets/images/avatars/creator-6.svg',
      verified: true
    },
    description: 'An immortal cyber-phoenix reborn through quantum particle collision. Holographic depth shifts dynamically with the viewer perspective.',
    attributes: [
      { trait: 'Wingspan', value: 'Infinite Radiant', rarity: '3%' },
      { trait: 'Core', value: 'Solar Plasma', rarity: '5%' }
    ],
    bidsCount: 77,
    likesCount: 920,
    isFeatured: false
  },
  {
    id: 'nft-8',
    title: 'Solitude in Purple Void',
    category: 'Artwork',
    badge: 'Popular',
    image: 'assets/images/nft/nft-8.svg',
    currentBid: 1.95,
    minBid: 2.05,
    startingPrice: 1.10,
    yourOffer: 1.80,
    recentOffer: 1.95,
    endsInHours: 19.5,
    creator: {
      id: 'creator-1',
      name: 'Aura_Master',
      handle: '@auramaster',
      avatar: 'assets/images/avatars/creator-1.svg',
      verified: true
    },
    description: 'A solitary introspective voyage into the deep violet chasm of stillness. Evokes meditative tranquility in digital space.',
    attributes: [
      { trait: 'Tone', value: 'Deep Indigo', rarity: '18%' },
      { trait: 'Echo', value: 'Resonant Ambient', rarity: '7%' }
    ],
    bidsCount: 22,
    likesCount: 310,
    isFeatured: false
  },
  {
    id: 'nft-9',
    title: 'Infinite Realms: Codex II',
    category: 'Book',
    badge: 'Exclusive',
    image: 'assets/images/nft/nft-9.svg',
    currentBid: 2.80,
    minBid: 2.95,
    startingPrice: 1.80,
    yourOffer: 2.60,
    recentOffer: 2.80,
    endsInHours: 27.0,
    creator: {
      id: 'creator-3',
      name: 'CryptoScribe',
      handle: '@cryptoscribe',
      avatar: 'assets/images/avatars/creator-3.svg',
      verified: true
    },
    description: 'Volume two of the cryptographic anthology, featuring prophetic accounts of smart contracts and decentralized autonomous societies.',
    attributes: [
      { trait: 'Cover', value: 'Emerald Parchment', rarity: '4%' },
      { trait: 'Cryptography', value: 'Zero Knowledge Proof', rarity: '2%' }
    ],
    bidsCount: 29,
    likesCount: 388,
    isFeatured: false
  },
  {
    id: 'nft-10',
    title: 'Neural Symphony #99',
    category: 'Artwork',
    badge: 'Hot',
    image: 'assets/images/nft/nft-10.svg',
    currentBid: 3.90,
    minBid: 4.05,
    startingPrice: 2.50,
    yourOffer: 3.75,
    recentOffer: 3.90,
    endsInHours: 11.2,
    creator: {
      id: 'creator-4',
      name: 'Elena_V',
      handle: '@elena_art',
      avatar: 'assets/images/avatars/creator-4.svg',
      verified: true
    },
    description: 'A multi-sensory neural generative audio-visual landscape reflecting brainwave oscillations during deep state creation.',
    attributes: [
      { trait: 'Harmonics', value: 'Theta Wave 7Hz', rarity: '6%' },
      { trait: 'Dimension', value: 'Hyper-Vector', rarity: '9%' }
    ],
    bidsCount: 38,
    likesCount: 460,
    isFeatured: false
  },
  {
    id: 'nft-11',
    title: 'Mecha Titan Prototype',
    category: '3D Art',
    badge: 'Rare',
    image: 'assets/images/nft/nft-11.svg',
    currentBid: 4.75,
    minBid: 4.90,
    startingPrice: 3.00,
    yourOffer: 4.50,
    recentOffer: 4.75,
    endsInHours: 16.0,
    creator: {
      id: 'creator-5',
      name: 'MetaArchitect',
      handle: '@metaarchitect',
      avatar: 'assets/images/avatars/creator-5.svg',
      verified: true
    },
    description: 'The definitive blueprint and 3D rigging of the Class-IV planetary defense mech. Fully compatible with decentralized virtual worlds.',
    attributes: [
      { trait: 'Armor', value: 'Titanium Composite', rarity: '5%' },
      { trait: 'Reactor', value: 'Dark Fusion', rarity: '3%' }
    ],
    bidsCount: 49,
    likesCount: 672,
    isFeatured: false
  },
  {
    id: 'nft-12',
    title: 'Virtual Sanctum Alpha',
    category: 'Metaverse',
    badge: 'Trending',
    image: 'assets/images/nft/nft-12.svg',
    currentBid: 7.20,
    minBid: 7.40,
    startingPrice: 5.00,
    yourOffer: 6.90,
    recentOffer: 7.20,
    endsInHours: 4.8,
    creator: {
      id: 'creator-1',
      name: 'Aura_Master',
      handle: '@auramaster',
      avatar: 'assets/images/avatars/creator-1.svg',
      verified: true
    },
    description: 'A private citadel sanctuary floating in the stratosphere of the primary metaverse cluster. Unrivaled panoramic vistas.',
    attributes: [
      { trait: 'Domain', value: 'High Sanctuary', rarity: '1%' },
      { trait: 'Teleport', value: 'Universal Node', rarity: '8%' }
    ],
    bidsCount: 88,
    likesCount: 1120,
    isFeatured: false
  }
];

// Initial Top Creators
const INITIAL_CREATORS = [
  {
    id: 'creator-1',
    name: 'Aura_Master',
    handle: '@auramaster',
    avatar: 'assets/images/avatars/creator-1.svg',
    followers: '24.8K',
    followerCount: 24800,
    itemsCount: 48,
    totalVolume: '320.5 ETH',
    isFollowing: true,
    verified: true
  },
  {
    id: 'creator-2',
    name: 'NovaNebula',
    handle: '@novanebula',
    avatar: 'assets/images/avatars/creator-2.svg',
    followers: '19.4K',
    followerCount: 19400,
    itemsCount: 32,
    totalVolume: '245.2 ETH',
    isFollowing: false,
    verified: true
  },
  {
    id: 'creator-3',
    name: 'CryptoScribe',
    handle: '@cryptoscribe',
    avatar: 'assets/images/avatars/creator-3.svg',
    followers: '15.2K',
    followerCount: 15200,
    itemsCount: 26,
    totalVolume: '180.8 ETH',
    isFollowing: false,
    verified: true
  },
  {
    id: 'creator-4',
    name: 'Elena_V',
    handle: '@elena_art',
    avatar: 'assets/images/avatars/creator-4.svg',
    followers: '31.6K',
    followerCount: 31600,
    itemsCount: 64,
    totalVolume: '490.1 ETH',
    isFollowing: true,
    verified: true
  },
  {
    id: 'creator-5',
    name: 'MetaArchitect',
    handle: '@metaarchitect',
    avatar: 'assets/images/avatars/creator-5.svg',
    followers: '28.1K',
    followerCount: 28100,
    itemsCount: 52,
    totalVolume: '395.0 ETH',
    isFollowing: false,
    verified: true
  },
  {
    id: 'creator-6',
    name: 'CyberVertex',
    handle: '@cybervertex',
    avatar: 'assets/images/avatars/creator-6.svg',
    followers: '22.3K',
    followerCount: 22300,
    itemsCount: 39,
    totalVolume: '288.4 ETH',
    isFollowing: false,
    verified: true
  }
];

// Initial Recent Activities
const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    nftId: 'nft-1',
    title: 'Cyber Neon Samurai #042',
    image: 'assets/images/nft/nft-1.svg',
    type: 'Bid Placed',
    from: 'CryptoWhale',
    price: '2.85 ETH',
    usd: '$7,125',
    time: '2 mins ago'
  },
  {
    id: 'act-2',
    nftId: 'nft-4',
    title: 'Ethereal Dreamscape #108',
    image: 'assets/images/nft/nft-4.svg',
    type: 'Purchased',
    from: 'ArtCollector_X',
    price: '4.20 ETH',
    usd: '$10,500',
    time: '18 mins ago'
  },
  {
    id: 'act-3',
    nftId: 'nft-7',
    title: 'Quantum Hologram Phoenix',
    image: 'assets/images/nft/nft-7.svg',
    type: 'Offer Made',
    from: 'Alex Rivera',
    price: '6.50 ETH',
    usd: '$16,250',
    time: '1 hour ago'
  },
  {
    id: 'act-4',
    nftId: 'nft-2',
    title: 'Celestial Odyssey 3D',
    image: 'assets/images/nft/nft-2.svg',
    type: 'Bid Placed',
    from: 'CyberKnight',
    price: '3.40 ETH',
    usd: '$8,500',
    time: '3 hours ago'
  }
];

// Initial Demo User Profile
const INITIAL_USER_PROFILE = {
  name: 'Alex Rivera',
  username: '@alex_rivera',
  email: 'alex.rivera@novanft.demo',
  avatar: 'assets/images/avatars/user.svg',
  bio: 'Digital art enthusiast, 3D collector, and Web3 builder. Exploring the boundaries of algorithmic aesthetics.',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  walletBalanceEth: 18.45,
  isVerified: true,
  twoFactorEnabled: true,
  itemsBought: ['nft-2', 'nft-6', 'nft-10'],
  itemsCollected: ['nft-1', 'nft-7', 'nft-12'],
  followingIds: ['creator-1', 'creator-4']
};

// ===================================================================
// DATA STORE REPOSITORY API
// ===================================================================

const DataStore = {
  // Initialize storage if needed
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.NFTS)) {
      localStorage.setItem(STORAGE_KEYS.NFTS, JSON.stringify(INITIAL_NFTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_NFTS)) {
      // Default saved items
      localStorage.setItem(STORAGE_KEYS.SAVED_NFTS, JSON.stringify(['nft-1', 'nft-3', 'nft-7']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CREATORS)) {
      localStorage.setItem(STORAGE_KEYS.CREATORS, JSON.stringify(INITIAL_CREATORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(INITIAL_USER_PROFILE));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUTH_USER)) {
      // Set default demo session
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify({
        email: 'alex.rivera@novanft.demo',
        name: 'Alex Rivera',
        isLoggedIn: true
      }));
    }
  },

  // NFTs API
  getNFTs() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.NFTS)) || INITIAL_NFTS;
    } catch (e) {
      return INITIAL_NFTS;
    }
  },

  getNFTById(id) {
    const nfts = this.getNFTs();
    return nfts.find(item => item.id === id) || null;
  },

  // Saved / Wishlist API
  getSavedIds() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_NFTS)) || [];
    } catch (e) {
      return [];
    }
  },

  isSaved(id) {
    const saved = this.getSavedIds();
    return saved.includes(id);
  },

  toggleSaveNFT(id) {
    let saved = this.getSavedIds();
    const index = saved.indexOf(id);
    let isNowSaved = false;
    if (index > -1) {
      saved.splice(index, 1);
      isNowSaved = false;
    } else {
      saved.push(id);
      isNowSaved = true;
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_NFTS, JSON.stringify(saved));
    return isNowSaved;
  },

  getSavedNFTs() {
    const savedIds = this.getSavedIds();
    const all = this.getNFTs();
    return all.filter(nft => savedIds.includes(nft.id));
  },

  // Bidding API
  placeBid(nftId, bidAmount, bidderName = 'Alex Rivera') {
    const nfts = this.getNFTs();
    const nft = nfts.find(item => item.id === nftId);
    if (!nft) return { success: false, message: 'NFT item not found.' };

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      return { success: false, message: 'Please enter a valid bid amount.' };
    }
    if (amount < nft.minBid) {
      return { success: false, message: `Bid must be at least ${nft.minBid.toFixed(2)} ETH.` };
    }

    // Update NFT
    nft.currentBid = amount;
    nft.minBid = parseFloat((amount + 0.1).toFixed(2));
    nft.recentOffer = amount;
    nft.yourOffer = amount;
    nft.bidsCount = (nft.bidsCount || 0) + 1;

    localStorage.setItem(STORAGE_KEYS.NFTS, JSON.stringify(nfts));

    // Add activity entry
    this.addActivity({
      nftId: nft.id,
      title: nft.title,
      image: nft.image,
      type: 'Bid Placed',
      from: bidderName,
      price: `${amount.toFixed(2)} ETH`,
      usd: `$${(amount * 2500).toLocaleString()}`,
      time: 'Just now'
    });

    return {
      success: true,
      message: `Bid of ${amount.toFixed(2)} ETH placed successfully on "${nft.title}"!`,
      nft
    };
  },

  // Creators API
  getCreators() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CREATORS)) || INITIAL_CREATORS;
    } catch (e) {
      return INITIAL_CREATORS;
    }
  },

  toggleFollowCreator(creatorId) {
    const creators = this.getCreators();
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return false;

    creator.isFollowing = !creator.isFollowing;
    if (creator.isFollowing) {
      creator.followerCount = (creator.followerCount || 20000) + 1;
    } else {
      creator.followerCount = Math.max(0, (creator.followerCount || 20000) - 1);
    }
    creator.followers = `${(creator.followerCount / 1000).toFixed(1)}K`;

    localStorage.setItem(STORAGE_KEYS.CREATORS, JSON.stringify(creators));
    return creator.isFollowing;
  },

  // Activities API
  getActivities() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) || INITIAL_ACTIVITIES;
    } catch (e) {
      return INITIAL_ACTIVITIES;
    }
  },

  addActivity(act) {
    const list = this.getActivities();
    const newAct = {
      id: 'act-' + Date.now(),
      ...act
    };
    list.unshift(newAct);
    if (list.length > 20) list.pop();
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(list));
  },

  // User Profile API
  getUserProfile() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) || INITIAL_USER_PROFILE;
    } catch (e) {
      return INITIAL_USER_PROFILE;
    }
  },

  updateUserProfile(updatedData) {
    const profile = this.getUserProfile();
    const merged = { ...profile, ...updatedData };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(merged));
    return merged;
  },

  // Auth Session API
  getCurrentUser() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH_USER)) || null;
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(userData) {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(userData));
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },

  // Theme API
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
};

// Initialize on load
DataStore.init();
