import os

def create_svg(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())

# 1. Logo
logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="200" height="50">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#735bf2"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <!-- Hexagon Icon -->
  <polygon points="25,5 42,15 42,35 25,45 8,35 8,15" fill="url(#logoGrad)" filter="url(#glow)"/>
  <polygon points="25,12 36,19 36,31 25,38 14,31 14,19" fill="#121025"/>
  <circle cx="25" cy="25" r="5" fill="#735bf2"/>
  <!-- Text -->
  <text x="52" y="32" font-family="'Inter', 'Segoe UI', sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="0.5">
    Nova<tspan fill="#735bf2">NFT</tspan>
  </text>
</svg>"""

create_svg("assets/images/logo/logo.svg", logo_svg)

# Favicon / Mark
mark_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
  <defs>
    <linearGradient id="markGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#735bf2"/>
      <stop offset="100%" stop-color="#00f2fe"/>
    </linearGradient>
  </defs>
  <polygon points="25,4 45,15 45,35 25,46 5,35 5,15" fill="url(#markGrad)"/>
  <polygon points="25,12 38,19 38,31 25,38 12,31 12,19" fill="#121025"/>
  <circle cx="25" cy="25" r="6" fill="#735bf2"/>
</svg>"""
create_svg("assets/images/logo/favicon.svg", mark_svg)

# Avatars
avatars = {
    "user.svg": ("#735bf2", "#22d3ee", "AR", "Alex Rivera"),
    "creator-1.svg": ("#ec4899", "#8b5cf6", "AM", "Aura_Master"),
    "creator-2.svg": ("#3b82f6", "#10b981", "NN", "NovaNebula"),
    "creator-3.svg": ("#f59e0b", "#ef4444", "CS", "CryptoScribe"),
    "creator-4.svg": ("#8b5cf6", "#d946ef", "EV", "Elena_V"),
    "creator-5.svg": ("#06b6d4", "#3b82f6", "MA", "MetaArchitect"),
    "creator-6.svg": ("#10b981", "#6366f1", "CV", "CyberVertex"),
}

for filename, (c1, c2, initials, name) in avatars.items():
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="g_{initials}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c1}"/>
      <stop offset="100%" stop-color="{c2}"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="48" fill="url(#g_{initials})" stroke="#ffffff" stroke-width="2"/>
  <circle cx="50" cy="40" r="18" fill="#ffffff" opacity="0.9"/>
  <path d="M 22 84 C 22 62, 78 62, 78 84 Z" fill="#ffffff" opacity="0.9"/>
  <text x="50" y="94" font-family="'Segoe UI', sans-serif" font-size="9" fill="#ffffff" text-anchor="middle" font-weight="bold">{initials}</text>
</svg>"""
    create_svg(f"assets/images/avatars/{filename}", svg)

# 12 NFT Artworks (Distinct visual themes, gradients, geometric patterns, glowing orbs, cyber grids, abstract books, 3d cubes)
nft_designs = [
    {
        "id": "nft-1.svg",
        "title": "Cyber Neon Samurai #042",
        "theme": "samurai",
        "c1": "#7928ca", "c2": "#ff0080", "c3": "#4338ca",
        "badge": "ARTWORK"
    },
    {
        "id": "nft-2.svg",
        "title": "Celestial Odyssey 3D",
        "theme": "odyssey",
        "c1": "#0070f3", "c2": "#00dfd8", "c3": "#1e1b4b",
        "badge": "3D ART"
    },
    {
        "id": "nft-3.svg",
        "title": "Genesis Codex: The Lost Arc",
        "theme": "codex",
        "c1": "#f59e0b", "c2": "#d97706", "c3": "#78350f",
        "badge": "BOOK"
    },
    {
        "id": "nft-4.svg",
        "title": "Ethereal Dreamscape #108",
        "theme": "dreamscape",
        "c1": "#a855f7", "c2": "#ec4899", "c3": "#3b82f6",
        "badge": "ARTWORK"
    },
    {
        "id": "nft-5.svg",
        "title": "Voxel Metropolis VII",
        "theme": "metropolis",
        "c1": "#06b6d4", "c2": "#3b82f6", "c3": "#1d4ed8",
        "badge": "METAVERSE"
    },
    {
        "id": "nft-6.svg",
        "title": "Chronicles of Satoshi: Vol I",
        "theme": "satoshi",
        "c1": "#f97316", "c2": "#eab308", "c3": "#451a03",
        "badge": "BOOK"
    },
    {
        "id": "nft-7.svg",
        "title": "Quantum Hologram Phoenix",
        "theme": "phoenix",
        "c1": "#ec4899", "c2": "#f43f5e", "c3": "#fbbf24",
        "badge": "3D ART"
    },
    {
        "id": "nft-8.svg",
        "title": "Solitude in Purple Void",
        "theme": "void",
        "c1": "#6366f1", "c2": "#8b5cf6", "c3": "#1e1b4b",
        "badge": "ARTWORK"
    },
    {
        "id": "nft-9.svg",
        "title": "Infinite Realms: Codex II",
        "theme": "infinite",
        "c1": "#10b981", "c2": "#06b6d4", "c3": "#064e3b",
        "badge": "BOOK"
    },
    {
        "id": "nft-10.svg",
        "title": "Neural Symphony #99",
        "theme": "neural",
        "c1": "#8b5cf6", "c2": "#3b82f6", "c3": "#1e293b",
        "badge": "ARTWORK"
    },
    {
        "id": "nft-11.svg",
        "title": "Mecha Titan Prototype",
        "theme": "titan",
        "c1": "#3b82f6", "c2": "#6366f1", "c3": "#0f172a",
        "badge": "3D ART"
    },
    {
        "id": "nft-12.svg",
        "title": "Virtual Sanctum Alpha",
        "theme": "sanctum",
        "c1": "#8b5cf6", "c2": "#ec4899", "c3": "#050515",
        "badge": "METAVERSE"
    }
]

for item in nft_designs:
    c1, c2, c3 = item["c1"], item["c2"], item["c3"]
    badge = item["badge"]
    title = item["title"]
    idx = item["id"].replace(".svg", "")
    
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_{idx}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c3}"/>
      <stop offset="50%" stop-color="#14112e"/>
      <stop offset="100%" stop-color="{c1}"/>
    </linearGradient>
    <linearGradient id="mesh_{idx}" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="{c2}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="{c1}" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="glow_{idx}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="25" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="600" fill="url(#bg_{idx})" rx="16"/>

  <!-- Cyber Grid Lines -->
  <g stroke="rgba(255,255,255,0.08)" stroke-width="1">
    <line x1="0" y1="100" x2="600" y2="100"/>
    <line x1="0" y1="200" x2="600" y2="200"/>
    <line x1="0" y1="300" x2="600" y2="300"/>
    <line x1="0" y1="400" x2="600" y2="400"/>
    <line x1="0" y1="500" x2="600" y2="500"/>
    <line x1="100" y1="0" x2="100" y2="600"/>
    <line x1="200" y1="0" x2="200" y2="600"/>
    <line x1="300" y1="0" x2="300" y2="600"/>
    <line x1="400" y1="0" x2="400" y2="600"/>
    <line x1="500" y1="0" x2="500" y2="600"/>
  </g>

  <!-- Glowing Orb Backing -->
  <circle cx="300" cy="300" r="160" fill="url(#mesh_{idx})" filter="url(#glow_{idx})"/>

  <!-- Abstract Geometry based on Badge -->
  <!-- Center Main 3D Shape -->
  <g transform="translate(300, 290)">
    <polygon points="0,-130 115,-65 115,65 0,130 -115,65 -115,-65" fill="{c2}" opacity="0.35"/>
    <polygon points="0,-110 95,-55 95,55 0,110 -95,55 -95,-55" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.8"/>
    
    <!-- Isometric Cube / Sphere Inner -->
    <path d="M 0 0 L 95 -55 L 95 55 L 0 110 Z" fill="{c1}" opacity="0.7"/>
    <path d="M 0 0 L -95 -55 L -95 55 L 0 110 Z" fill="{c2}" opacity="0.85"/>
    <path d="M 0 0 L 95 -55 L 0 -110 L -95 -55 Z" fill="#ffffff" opacity="0.4"/>
    
    <circle cx="0" cy="0" r="28" fill="#ffffff" filter="url(#glow_{idx})"/>
    <circle cx="0" cy="0" r="16" fill="{c1}"/>
  </g>

  <!-- Floating Rings and Particles -->
  <ellipse cx="300" cy="460" rx="180" ry="35" fill="none" stroke="{c2}" stroke-width="2" opacity="0.4"/>
  <ellipse cx="300" cy="480" rx="130" ry="22" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>

  <circle cx="120" cy="180" r="6" fill="#ffffff" opacity="0.8"/>
  <circle cx="480" cy="160" r="8" fill="{c2}" opacity="0.9"/>
  <circle cx="460" cy="420" r="5" fill="#ffffff" opacity="0.7"/>
  <circle cx="150" cy="440" r="7" fill="{c1}" opacity="0.8"/>

  <!-- Tag Pill in Corner -->
  <rect x="30" y="30" width="105" height="32" rx="16" fill="rgba(18, 16, 37, 0.75)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="82" y="51" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">{badge}</text>

  <!-- Rarity / Token ID in Corner -->
  <rect x="470" y="30" width="100" height="32" rx="16" fill="rgba(115, 91, 242, 0.3)" stroke="#735bf2" stroke-width="1"/>
  <text x="520" y="51" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#a78bfa" text-anchor="middle">★ RARE</text>
</svg>"""
    create_svg(f"assets/images/nft/{item['id']}", svg)

print("Assets generated successfully!")
