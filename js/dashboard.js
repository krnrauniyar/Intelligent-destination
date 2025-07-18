// ===== DASHBOARD JAVASCRIPT =====

// Wait for page to load
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  checkAuthentication()

  // Initialize dashboard
  initializeDashboard()
})

// Check if user is authenticated
function checkAuthentication() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn) {
    window.location.href = "login.html"
    return
  }

  // Set welcome message
  const userName = localStorage.getItem("userName") || localStorage.getItem("userEmail")
  if (userName) {
    const welcomeElement = document.getElementById("userWelcome")
    if (welcomeElement) {
      welcomeElement.textContent = `Welcome, ${userName.split("@")[0]}!`
    }
  }
}

// Initialize dashboard functionality
function initializeDashboard() {
  // Load all destinations
  loadAllDestinations()

  // Setup search functionality
  setupSearchFunction()

  // Setup recommendation form
  setupRecommendationForm()
}

// Load all destinations into the grid
function loadAllDestinations() {
  const destinationsGrid = document.getElementById("destinationsGrid")
  if (!destinationsGrid) return

  const destinationsHtml = window.nepalDestinations
    .map((destination) => createDestinationCard(destination, false))
    .join("")

  destinationsGrid.innerHTML = destinationsHtml

  // Add animation to cards
  animateDestinationCards(destinationsGrid.children)
}

// Setup search functionality
function setupSearchFunction() {
  const searchInput = document.getElementById("searchInput")
  if (!searchInput) return

  let searchTimeout

  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout)

    // Debounce search to avoid too many calls
    searchTimeout = setTimeout(() => {
      const query = this.value.trim()
      const filteredDestinations = filterDestinations(window.nepalDestinations, query)

      const destinationsGrid = document.getElementById("destinationsGrid")
      const destinationsHtml = filteredDestinations
        .map((destination) => createDestinationCard(destination, false))
        .join("")

      destinationsGrid.innerHTML = destinationsHtml
      animateDestinationCards(destinationsGrid.children)
    }, 300)
  })
}

// Setup recommendation form
function setupRecommendationForm() {
  const form = document.getElementById("recommendationForm")
  if (!form) return

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

    // Generate and display recommendations
    generateRecommendations(preferences)
  })
}

// Generate recommendations based on user preferences
function generateRecommendations(preferences) {
  // Calculate scores for all destinations
  const scoredDestinations = window.nepalDestinations.map((destination) => ({
    ...destination,
    score: calculateRecommendationScore(destination, preferences),
  }))

  // Filter destinations with score > 0 and sort by score and rating
  const recommendations = scoredDestinations
    .filter((destination) => destination.score > 0)
    .sort((a, b) => {
      // Sort by score first, then by rating
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return b.rating - a.rating
    })
    .slice(0, 6) // Take top 6 recommendations

  // Display recommendations
  displayRecommendations(recommendations)

  // Show success notification
  showNotification("Recommendations generated based on your preferences!", "success")
}

// Display recommendations in the results section
function displayRecommendations(recommendations) {
  const recommendationsSection = document.getElementById("recommendationsSection")
  const recommendationsGrid = document.getElementById("recommendationsGrid")

  if (!recommendationsSection || !recommendationsGrid) return

  if (recommendations.length === 0) {
    // Show no results message
    recommendationsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #9ca3af; margin-bottom: 20px;"></i>
                <h3 style="color: #6b7280; margin-bottom: 10px;">No recommendations found</h3>
                <p style="color: #9ca3af;">Try adjusting your preferences to get better matches.</p>
            </div>
        `
  } else {
    // Display recommendation cards
    const recommendationsHtml = recommendations.map((destination) => createDestinationCard(destination, true)).join("")

    recommendationsGrid.innerHTML = recommendationsHtml
    animateDestinationCards(recommendationsGrid.children)
  }

  // Show recommendations section
  recommendationsSection.classList.remove("hidden")

  // Scroll to recommendations
  recommendationsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Animate destination cards
function animateDestinationCards(cards) {
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

// Show notification to user
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

// Logout function
function logoutUser() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userName")
  window.location.href = "index.html"
}

// Declare the missing functions
function createDestinationCard(destination, isRecommendation) {
  // Implementation for creating destination card
  return `<div class="destination-card">${destination.name}</div>`
}

function filterDestinations(destinations, query) {
  // Implementation for filtering destinations
  return destinations.filter((destination) => destination.name.toLowerCase().includes(query.toLowerCase()))
}

function calculateRecommendationScore(destination, preferences) {
  // Implementation for calculating recommendation score
  return 0
}
