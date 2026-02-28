export const properties = [
  {
    id: 1,
    slug: "fantabrand-skyline-residence",
    title: "Fantabrand Skyline Residence",
    location: "Victoria Island, Lagos",
    price: "₦480,000,000",
    badge: "Featured",
    type: "Luxury Penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: "520 sqm",
    status: "For Sale",
    heroImage: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    gallery: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
      "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg",
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
    ],
    shortDescription: "A breathtaking penthouse that redefines skyline living with panoramic ocean and city views.",
    description: "Fantabrand Skyline Residence is an exclusive four-bedroom penthouse that seamlessly blends contemporary architecture with timeless luxury. Perched above the heartbeat of Victoria Island, this residence offers wraparound glass walls, a private sky lounge, concierge services, and curated finishes that speak to discerning investors.",
    highlights: [
      "Private sky lounge and infinity plunge pool",
      "24/7 concierge, facility management and smart security",
      "Designer Italian kitchen with integrated appliances",
      "Underground parking and elevator access"
    ]
  },
  {
    id: 2,
    slug: "emerald-boulevard-villas",
    title: "Emerald Boulevard Villas",
    location: "Guzape, Abuja",
    price: "₦320,000,000",
    badge: "New",
    type: "Smart Terrace Villas",
    bedrooms: 5,
    bathrooms: 6,
    area: "450 sqm",
    status: "For Sale",
    heroImage: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    gallery: [
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
      "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
      "https://images.pexels.com/photos/2736834/pexels-photo-2736834.jpeg"
    ],
    shortDescription: "A private collection of smart villas crafted for families who value space, privacy and green living.",
    description: "Emerald Boulevard Villas is a gated luxury community set against the lush backdrop of Abuja's hills. Each villa is delivered with integrated smart home technology, generous balconies, double-volume living areas and landscaped outdoor spaces ideal for entertaining.",
    highlights: [
      "Smart home automation with mobile controls",
      "Clubhouse, gym and children’s play zone",
      "24-hour power with solar-hybrid backup",
      "Water treatment and underground drainage"
    ]
  },
  {
    id: 3,
    slug: "pearl-marina-residences",
    title: "Pearl Marina Residences",
    location: "Lekki Phase 1, Lagos",
    price: "₦185,000,000",
    badge: "Hot",
    type: "Waterfront Apartments",
    bedrooms: 3,
    bathrooms: 4,
    area: "260 sqm",
    status: "For Sale",
    heroImage: "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg",
    gallery: [
      "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg",
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
    ],
    shortDescription: "Waterfront living inspired by resort-style comfort, moments away from the best of Lekki.",
    description: "Pearl Marina Residences offers three-bedroom waterfront apartments carefully planned to maximise natural light and capture uninterrupted water views. Residents enjoy access to a floating jetty, manicured boardwalks and a residents-only lounge.",
    highlights: [
      "Direct waterfront boardwalk and marina access",
      "Resort-style pool deck and wellness studio",
      "Floor-to-ceiling glass with acoustic treatment",
      "Professional facility management and security"
    ]
  }
];

export function getPropertyBySlug(slug) {
  return properties.find((property) => property.slug === slug);
}
