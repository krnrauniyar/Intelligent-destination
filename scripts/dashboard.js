// Check authentication
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn) {
    window.location.href = "login.html"
    return
  }

  // Set welcome message
  const userName = localStorage.getItem("userName") || localStorage.getItem("userEmail")
  if (userName) {
    document.getElementById("welcomeUser").textContent = `Welcome, ${userName.split("@")[0]}!`
  }

  // Initialize dashboard
  initializeDashboard()
})

function initializeDashboard() {
  // Load all destinations
  loadDestinations()

  // Setup search functionality
  setupSearch()

  // Setup recommendation form
  setupRecommendationForm()
}

const destinations = [
  { name: "Paris", rating: 4.5 },
  { name: "Tokyo", rating: 4.7 },
  { name: "New York", rating: 4.3 },
]

function loadDestinations() {
  const destinationsGrid = document.getElementById("destinationsGrid")
  const destinationsHtml = destinations.map((dest) => createDestinationCard(dest)).join("")
  destinationsGrid.innerHTML = destinationsHtml

  // Add animation
  animateCards(destinationsGrid.children)
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput")
  let searchTimeout

  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      const query = this.value.trim()
      const filteredDestinations = filterDestinations(destinations, query)

      const destinationsGrid = document.getElementById("destinationsGrid")
      const destinationsHtml = filteredDestinations.map((dest) => createDestinationCard(dest)).join("")
      destinationsGrid.innerHTML = destinationsHtml

      animateCards(destinationsGrid.children)
    }, 300)
  })
}

function filterDestinations(destinations, query) {
  return destinations.filter((dest) => dest.name.toLowerCase().includes(query.toLowerCase()))
}

function setupRecommendationForm() {
  const form = document.getElementById("recommendationForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(form)
    const preferences = {
      travelType: formData.get("travelType"),
      budget: formData.get("budget"),
      duration: formData.get("duration"),
      travelingWith: formData.get("travelingWith"),
      season: formData.get("season"),
      activities: formData.getAll("activities"),
    }

    // Generate recommendations
    generateRecommendations(preferences)
  })
}

function generateRecommendations(preferences) {
  // Calculate scores for all destinations
  const scoredDestinations = destinations.map((dest) => ({
    ...dest,
    score: calculateRecommendationScore(dest, preferences),
  }))

  // Filter destinations with score > 0 and sort by score and rating
  const recommendations = scoredDestinations
    .filter((dest) => dest.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return b.rating - a.rating
    })
    .slice(0, 6)

  // Display recommendations
  displayRecommendations(recommendations)

  // Show success message
  showNotification("Recommendations generated based on your preferences!", "success")
}

function calculateRecommendationScore(destination, preferences) {
  let score = 0
  // Simple scoring logic based on preferences
  if (destination.name === preferences.travelType) score += 2
  if (destination.rating >= preferences.budget) score += 1
  return score
}

function displayRecommendations(recommendations) {
  const recommendationsSection = document.getElementById("recommendationsSection")
  const recommendationsGrid = document.getElementById("recommendationsGrid")

  if (recommendations.length === 0) {
    recommendationsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #9ca3af; margin-bottom: 20px;"></i>
                <h3 style="color: #6b7280; margin-bottom: 10px;">No recommendations found</h3>
                <p style="color: #9ca3af;">Try adjusting your preferences to get better matches.</p>
            </div>
        `
  } else {
    const recommendationsHtml = recommendations.map((dest) => createDestinationCard(dest, true)).join("")
    recommendationsGrid.innerHTML = recommendationsHtml

    animateCards(recommendationsGrid.children)
  }

  // Show recommendations section
  recommendationsSection.style.display = "block"

  // Scroll to recommendations
  recommendationsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

function createDestinationCard(destination, isRecommendation = false) {
  return `
        <div class="destination-card ${isRecommendation ? "recommendation" : ""}">
            <h2>${destination.name}</h2>
            <p>Rating: ${destination.rating}</p>
        </div>
    `
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

  notification.querySelector("button").style.cssText = `
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

function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userName")
  window.location.href = "index.html"
}
