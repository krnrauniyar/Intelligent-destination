// Destinations data
const destinations = [
  {
    id: 1,
    name: "Everest Base Camp Trek",
    location: "Khumbu Region",
    image: "/placeholder.svg?height=300&width=400&text=Everest+Base+Camp",
    rating: 4.9,
    price: "$1200-2000",
    duration: "12-16 days",
    type: ["Adventure", "Trekking"],
    budget: "High",
    season: ["Spring", "Autumn"],
    activities: ["Trekking", "Photography", "Cultural Experience"],
    description:
      "The ultimate trekking adventure to the base of the world's highest peak. Experience breathtaking mountain views, Sherpa culture, and the challenge of high-altitude trekking.",
    highlights: ["Sherpa Culture", "Stunning Mountain Views", "Namche Bazaar", "Tengboche Monastery"],
  },
  {
    id: 2,
    name: "Pokhara Lake District",
    location: "Gandaki Province",
    image: "/placeholder.svg?height=300&width=400&text=Pokhara+Lake",
    rating: 4.7,
    price: "$300-600",
    duration: "3-7 days",
    type: ["Relaxation", "Adventure"],
    budget: "Medium",
    season: ["Spring", "Summer", "Autumn"],
    activities: ["Boating", "Paragliding", "Photography", "Hiking"],
    description:
      "Serene lakes surrounded by the majestic Annapurna range. Perfect for relaxation and adventure activities with stunning mountain reflections.",
    highlights: ["Phewa Lake", "Paragliding", "World Peace Pagoda", "Sarangkot Sunrise"],
  },
  {
    id: 3,
    name: "Chitwan National Park",
    location: "Chitwan District",
    image: "/placeholder.svg?height=300&width=400&text=Chitwan+Safari",
    rating: 4.6,
    price: "$200-500",
    duration: "2-4 days",
    type: ["Wildlife", "Family"],
    budget: "Medium",
    season: ["Winter", "Spring"],
    activities: ["Safari", "Wildlife Watching", "Cultural Experience"],
    description:
      "UNESCO World Heritage site famous for rhinos and tigers. Experience incredible wildlife and learn about Tharu culture.",
    highlights: ["One-horned Rhino", "Bengal Tigers", "Elephant Safari", "Tharu Culture"],
  },
  {
    id: 4,
    name: "Annapurna Circuit",
    location: "Annapurna Region",
    image: "/placeholder.svg?height=300&width=400&text=Annapurna+Circuit",
    rating: 4.8,
    price: "$800-1500",
    duration: "15-20 days",
    type: ["Adventure", "Trekking"],
    budget: "High",
    season: ["Spring", "Autumn"],
    activities: ["Trekking", "Photography", "Cultural Experience"],
    description:
      "Classic trek through diverse landscapes and cultures. Experience the complete range of Nepal's geography and ethnic diversity.",
    highlights: ["Thorong La Pass", "Muktinath Temple", "Hot Springs", "Diverse Landscapes"],
  },
  {
    id: 5,
    name: "Kathmandu Valley",
    location: "Kathmandu",
    image: "/placeholder.svg?height=300&width=400&text=Kathmandu+Durbar",
    rating: 4.5,
    price: "$100-300",
    duration: "2-5 days",
    type: ["Cultural", "Heritage"],
    budget: "Low",
    season: ["Spring", "Summer", "Autumn", "Winter"],
    activities: ["Sightseeing", "Cultural Experience", "Photography"],
    description:
      "Rich cultural heritage with ancient temples and palaces. Explore the heart of Nepal's history and spirituality.",
    highlights: ["Durbar Squares", "Swayambhunath", "Boudhanath", "Pashupatinath"],
  },
  {
    id: 6,
    name: "Bandipur Hill Station",
    location: "Tanahu District",
    image: "/placeholder.svg?height=300&width=400&text=Bandipur+Village",
    rating: 4.4,
    price: "$150-400",
    duration: "2-3 days",
    type: ["Cultural", "Relaxation"],
    budget: "Low",
    season: ["Spring", "Summer", "Autumn"],
    activities: ["Hiking", "Cultural Experience", "Photography"],
    description:
      "Preserved medieval town with stunning mountain views. Experience traditional Newari architecture and culture.",
    highlights: ["Newari Architecture", "Mountain Views", "Siddha Cave", "Traditional Culture"],
  },
  {
    id: 7,
    name: "Lumbini - Birthplace of Buddha",
    location: "Lumbini Province",
    image: "/placeholder.svg?height=300&width=400&text=Lumbini+Temple",
    rating: 4.3,
    price: "$100-250",
    duration: "1-2 days",
    type: ["Cultural", "Spiritual"],
    budget: "Low",
    season: ["Spring", "Summer", "Autumn", "Winter"],
    activities: ["Sightseeing", "Cultural Experience", "Photography"],
    description:
      "Sacred birthplace of Lord Buddha and UNESCO World Heritage site. A pilgrimage destination for Buddhists worldwide.",
    highlights: ["Maya Devi Temple", "Sacred Garden", "Monasteries", "Peace Pagoda"],
  },
  {
    id: 8,
    name: "Gokyo Lakes Trek",
    location: "Khumbu Region",
    image: "/placeholder.svg?height=300&width=400&text=Gokyo+Lakes",
    rating: 4.7,
    price: "$1000-1800",
    duration: "12-15 days",
    type: ["Adventure", "Trekking"],
    budget: "High",
    season: ["Spring", "Autumn"],
    activities: ["Trekking", "Photography", "Cultural Experience"],
    description:
      "Alternative to Everest Base Camp with stunning turquoise lakes and panoramic mountain views from Gokyo Ri.",
    highlights: ["Turquoise Lakes", "Gokyo Ri Summit", "Cho Oyu Views", "Less Crowded"],
  },
]

// Get destination by ID
function getDestinationById(id) {
  return destinations.find((dest) => dest.id === Number.parseInt(id))
}

// Generate recommendation score
function calculateRecommendationScore(destination, preferences) {
  let score = 0

  // Travel Type matching
  if (
    preferences.travelType &&
    destination.type.some((t) => t.toLowerCase().includes(preferences.travelType.toLowerCase()))
  ) {
    score += 3
  }

  // Budget matching
  if (preferences.budget && destination.budget.toLowerCase() === preferences.budget.toLowerCase()) {
    score += 2
  }

  // Season matching
  if (preferences.season && destination.season.includes(preferences.season)) {
    score += 2
  }

  // Activities matching
  const activityMatches = preferences.activities.filter((activity) =>
    destination.activities.some((destActivity) => destActivity.toLowerCase().includes(activity.toLowerCase())),
  ).length
  score += activityMatches

  return score
}

// Filter destinations based on search
function filterDestinations(destinations, searchQuery) {
  if (!searchQuery) return destinations

  return destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.activities.some((activity) => activity.toLowerCase().includes(searchQuery.toLowerCase())),
  )
}

// Create destination card HTML
function createDestinationCard(destination, isRecommended = false) {
  const starsHtml = Array.from(
    { length: 5 },
    (_, i) => `<i class="fas fa-star${i < Math.floor(destination.rating) ? "" : "-o"}"></i>`,
  ).join("")

  const tagsHtml = destination.type.map((type) => `<span class="tag">${type}</span>`).join("")

  return `
        <div class="destination-card ${isRecommended ? "recommended" : ""}" onclick="viewDestination(${destination.id})">
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.name}">
            </div>
            <div class="destination-content">
                <div class="destination-header">
                    <h3 class="destination-title">${destination.name}</h3>
                    <div class="destination-rating">
                        ${starsHtml}
                        <span>${destination.rating}</span>
                    </div>
                </div>
                <p class="destination-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${destination.location}
                </p>
                <p class="destination-description">${destination.description}</p>
                <div class="destination-info">
                    <span><i class="fas fa-dollar-sign"></i> ${destination.price}</span>
                    <span><i class="fas fa-clock"></i> ${destination.duration}</span>
                </div>
                <div class="destination-tags">
                    ${tagsHtml}
                </div>
                <button class="destination-button">
                    ${isRecommended ? "View Recommended" : "Explore Now"}
                </button>
            </div>
        </div>
    `
}

// View destination details
function viewDestination(id) {
  window.location.href = `destination-detail.html?id=${id}`
}
