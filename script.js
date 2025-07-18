// ===== NEPAL TRAVEL WEBSITE JAVASCRIPT =====

// Enhanced Destinations Database with Nepal Images
const destinations = [
  {
    id: 1,
    name: "Everest Base Camp Trek",
    location: "Khumbu Region",
    image: "img/Staying-at-Everest-Base-Camp js.jpg",
    rating: 4.9,
    price: "25000-30000",
    duration: "12-16 days",
    type: ["Adventure", "Trekking"],
    budget: "High",
    season: ["Spring", "Autumn", "winter"],
    activities: ["Trekking", "Adventure", "Cultural Experience"],
    description: "The ultimate trekking adventure to the base of the world's highest peak.",
    highlights: ["Sherpa Culture", "Stunning Mountain Views", "Namche Bazaar", "Tengboche Monastery"],
  },
  {
    id: 2,
    name: "Pokhara Lake District",
    location: "Gandaki Province",
    image: "img/pokhara lake.jpg",
    rating: 4.7,
    price: "15000-20000",
    duration: "3-7 days",
    type: ["Relaxation", "Adventure"],
    budget: "Medium",
    season: ["Spring", "Summer", "Autumn"],
    activities: ["Boating", "Paragliding", "Adventure", "Hiking"],
    description: "Serene lakes surrounded by the majestic Annapurna range.",
    highlights: ["Phewa Lake", "Paragliding", "World Peace Pagoda", "Sarangkot Sunrise"],
  },
  {
    id: 3,
    name: "Chitwan National Park",
    location: "Chitwan District",
    image: "img/chitwan-national-park.jpgnB3.jpg",
    rating: 4.6,
    price: "20000-25000",
    duration: "2-4 days",
    type: ["Wildlife", "Family"],
    budget: "Medium",
    season: ["Winter", "Spring"],
    activities: ["Safari", "Wildlife Watching", "Cultural Experience"],
    description: "UNESCO World Heritage site famous for rhinos and tigers.",
    highlights: ["One-horned Rhino", "Bengal Tigers", "Elephant Safari", "Tharu Culture"],
  },
  {
    id: 4,
    name: "Annapurna Circuit",
    location: "Annapurna Region",
    image: "img/Annapurna circuit.avif",
    rating: 4.8,
    price: "30000-35000",
    duration: "15-20 days",
    type: ["Adventure", "Trekking"],
    budget: "High",
    season: ["Spring", "Autumn"],
    activities: ["Trekking", "Adventure", "Cultural Experience"],
    description: "Classic trek through diverse landscapes and cultures.",
    highlights: ["Thorong La Pass", "Muktinath Temple", "Hot Springs", "Diverse Landscapes"],
  },
  {
    id: 5,
    name: "Kathmandu Valley",
    location: "Kathmandu",
    image: "img/pashupati.jpeg",
    rating: 4.5,
    price: "15000-18000",
    duration: "2-5 days",
    type: ["Cultural", "Heritage"],
    budget: "Low",
    season: ["Spring", "Summer", "Autumn", "Winter"],
    activities: ["Cultural Experience", "Adventure"],
    description: "Rich cultural heritage with ancient temples and palaces.",
    highlights: ["Durbar Squares", "Swayambhunath", "Boudhanath", "Pashupatinath"],
  },
  {
    id: 6,
    name: "Bandipur Hill Station",
    location: "Tanahu District",
    image: "img/bandipur hill station.jpeg",
    rating: 4.4,
    price: "15000-17000",
    duration: "2-3 days",
    type: ["Cultural", "Relaxation"],
    budget: "Low",
    season: ["Spring", "Summer", "Autumn"],
    activities: ["Hiking", "Cultural Experience", "Adventure"],
    description: "Preserved medieval town with stunning mountain views.",
    highlights: ["Newari Architecture", "Mountain Views", "Siddha Cave", "Traditional Culture"],
  },
  {
    id: 7,
    name: "Lumbini - Birthplace of Buddha",
    location: "Lumbini Province",
    image: "img/lumbini.jpg",
    rating: 4.3,
    price: "15000-16000",
    duration: "1-2 days",
    type: ["Cultural", "Spiritual"],
    budget: "Low",
    season: ["Spring", "Summer", "Autumn", "Winter"],
    activities: [ "Cultural Experience", "Adventure"],
    description: "Sacred birthplace of Lord Buddha and UNESCO World Heritage site.",
    highlights: ["Maya Devi Temple", "Sacred Garden", "Monasteries", "Peace Pagoda"],
  },
  {
    id: 8,
    name: "Gokyo Lakes Trek",
    location: "Khumbu Region",
    image: "img/Gokyo-village_11zon.jpg",
    rating: 4.7,
    price: "30000-40000",
    duration: "12-15 days",
    type: ["Adventure", "Trekking"],
    budget: "High",
    season: ["Spring", "Autumn", "winter"],
    activities: ["Trekking", "Adventure", "Cultural Experience"],
    description: "Alternative to Everest Base Camp with stunning turquoise lakes.",
    highlights: ["Turquoise Lakes", "Gokyo Ri Summit", "Cho Oyu Views", "Less Crowded"],
  },
]

// ===== PAGE INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Check which page we're on and initialize accordingly
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  switch (currentPage) {
    case "index.html":
    case "":
      initializeHomePage()
      break
    case "login.html":
      initializeLoginPage()
      break
    case "register.html":
      initializeRegisterPage()
      break
    case "dashboard.html":
      initializeDashboard()
      break
  }
})

// ===== HOMEPAGE FUNCTIONS =====
function initializeHomePage() {
  // Initialize hero slider with more Nepal images
  initializeHeroSlider()

  // Initialize scroll animations
  initializeScrollAnimations()

  // Initialize gallery interactions
  initializeGallery()
}

function initializeHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide")
  let currentSlide = 0

  function nextSlide() {
    slides[currentSlide].classList.remove("active")
    currentSlide = (currentSlide + 1) % slides.length
    slides[currentSlide].classList.add("active")
  }

  // Change slide every 5 seconds to show more Nepal images
  setInterval(nextSlide, 5000)
}

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe feature cards and gallery items
  document.querySelectorAll(".feature-card, .gallery-item").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
}

function initializeGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img")
      const overlay = item.querySelector(".gallery-overlay")

      // Add click animation
      item.style.transform = "scale(0.95)"
      setTimeout(() => {
        item.style.transform = "scale(1)"
      }, 150)
    })
  })
}

// ===== AUTHENTICATION FUNCTIONS =====
function initializeLoginPage() {
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }
}

function initializeRegisterPage() {
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }
}

function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Simple validation
  if (!email || !password) {
    showNotification("Please fill in all fields", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  // Store user data (simple authentication)
  localStorage.setItem("isLoggedIn", "true")
  localStorage.setItem("userEmail", email)
  localStorage.setItem("userName", email.split("@")[0])

  showNotification("Login successful! Redirecting...", "success")

  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1500)
}

function handleRegister(e) {
  e.preventDefault()

  const fullName = document.getElementById("fullName").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    showNotification("Please fill in all fields", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  if (password.length < 6) {
    showNotification("Password must be at least 6 characters long", "error")
    return
  }

  if (password !== confirmPassword) {
    showNotification("Passwords do not match", "error")
    return
  }

  // Store user data
  localStorage.setItem("isLoggedIn", "true")
  localStorage.setItem("userEmail", email)
  localStorage.setItem("userName", fullName)

  showNotification("Account created successfully! Redirecting...", "success")

  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 1500)
}

// ===== DASHBOARD FUNCTIONS =====
function initializeDashboard() {
  // Check authentication
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html"
    return
  }

  // Set welcome message
  const userName = localStorage.getItem("userName") || localStorage.getItem("userEmail")
  if (userName) {
    document.getElementById("welcomeUser").textContent = `Welcome, ${userName.split("@")[0]}!`
  }

  // Load destinations
  loadDestinations()

  // Setup search
  setupSearch()

  // Setup recommendation form
  setupRecommendationForm()
}

function loadDestinations() {
  const destinationsGrid = document.getElementById("destinationsGrid")
  if (!destinationsGrid) return

  const destinationsHtml = destinations.map((destination) => createDestinationCard(destination, false)).join("")

  destinationsGrid.innerHTML = destinationsHtml
  animateCards(destinationsGrid.children)
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  let searchTimeout

  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
      const query = this.value.trim()
      const filteredDestinations = filterDestinations(destinations, query)

      const destinationsGrid = document.getElementById("destinationsGrid")
      const destinationsHtml = filteredDestinations
        .map((destination) => createDestinationCard(destination, false))
        .join("")

      destinationsGrid.innerHTML = destinationsHtml
      animateCards(destinationsGrid.children)
    }, 300)
  })
}

function setupRecommendationForm() {
  const form = document.getElementById("recommendationForm")
  if (!form) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const preferences = {
      travelType: formData.get("travelType"),
      budget: formData.get("budget"),
      duration: formData.get("duration"),
      travelingWith: formData.get("travelingWith"),
      season: formData.get("season"),
      activities: formData.getAll("activities"),
    }

    generateRecommendations(preferences)
  })
}

function generateRecommendations(preferences) {
  // Calculate scores for destinations
  const scoredDestinations = destinations.map((destination) => ({
    ...destination,
    score: calculateRecommendationScore(destination, preferences),
  }))

  // Filter and sort recommendations
  const recommendations = scoredDestinations
    .filter((destination) => destination.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return b.rating - a.rating
    })
    .slice(0, 6)

  displayRecommendations(recommendations)
  showNotification("Recommendations generated based on your preferences!", "success")
}

function displayRecommendations(recommendations) {
  const recommendationsSection = document.getElementById("recommendationsSection")
  const recommendationsGrid = document.getElementById("recommendationsGrid")

  if (!recommendationsSection || !recommendationsGrid) return

  if (recommendations.length === 0) {
    recommendationsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <i class="fas fa-search" style="font-size: 3rem; color: #9ca3af; margin-bottom: 20px;"></i>
        <h3 style="color: #6b7280; margin-bottom: 10px;">No recommendations found</h3>
        <p style="color: #9ca3af;">Try adjusting your preferences to get better matches.</p>
      </div>
    `
  } else {
    const recommendationsHtml = recommendations.map((destination) => createDestinationCard(destination, true)).join("")

    recommendationsGrid.innerHTML = recommendationsHtml
    animateCards(recommendationsGrid.children)
  }

  recommendationsSection.style.display = "block"
  recommendationsSection.scrollIntoView({ behavior: "smooth", block: "start" })
}

// ===== UTILITY FUNCTIONS =====
function createDestinationCard(destination, isRecommended = false) {
  const starsHtml = generateStarsHtml(destination.rating)
  const tagsHtml = destination.type.map((type) => `<span class="tag">${type}</span>`).join("")

  return `
    <div class="destination-card ${isRecommended ? "recommended" : ""}">
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

function generateStarsHtml(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHtml = ""

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star"></i>'
  }

  if (hasHalfStar) {
    starsHtml += '<i class="fas fa-star-half-alt"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="far fa-star"></i>'
  }

  return starsHtml
}

function filterDestinations(destinations, searchQuery) {
  if (!searchQuery) return destinations

  return destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.activities.some((activity) => activity.toLowerCase().includes(searchQuery.toLowerCase())),
  )
}

function calculateRecommendationScore(destination, preferences) {
  let score = 0

  // Travel Type matching (3 points)
  if (
    preferences.travelType &&
    destination.type.some((type) => type.toLowerCase().includes(preferences.travelType.toLowerCase()))
  ) {
    score += 3
  }

  // Budget matching (2 points)
  if (preferences.budget && destination.budget.toLowerCase() === preferences.budget.toLowerCase()) {
    score += 2
  }

  // Season matching (2 points)
  if (preferences.season && destination.season.includes(preferences.season)) {
    score += 2
  }

  // Activities matching (1 point per match)
  if (preferences.activities && preferences.activities.length > 0) {
    const activityMatches = preferences.activities.filter((activity) =>
      destination.activities.some((destActivity) => destActivity.toLowerCase().includes(activity.toLowerCase())),
    ).length
    score += activityMatches
  }

  return score
}

function animateCards(cards) {
  Array.from(cards).forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, 50)
  })
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideInRight 0.3s ease-out;
    ${type === "success" ? "background: #10b981;" : "background: #ef4444;"}
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  `

  // Style the close button
  const closeButton = notification.querySelector("button")
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    margin-left: 10px;
  `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }
  }, 5000)
}

// ===== PASSWORD TOGGLE FUNCTION =====
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const button = input.nextElementSibling
  const icon = button.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.classList.remove("fa-eye")
    icon.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    icon.classList.remove("fa-eye-slash")
    icon.classList.add("fa-eye")
  }
}

// ===== LOGOUT FUNCTION =====
function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userName")
  window.location.href = "index.html"
}
