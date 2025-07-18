// ===== DESTINATION DETAIL JAVASCRIPT =====

// Wait for page to load
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  checkAuthentication()

  // Load destination details
  loadDestinationDetails()
})

// Check if user is authenticated
function checkAuthentication() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn) {
    window.location.href = "login.html"
    return
  }
}

// Load destination details from URL parameter
function loadDestinationDetails() {
  // Get destination ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const destinationId = urlParams.get("id")

  if (!destinationId) {
    window.location.href = "dashboard.html"
    return
  }

  // Get destination data
  const destination = window.getDestinationById(destinationId)

  if (!destination) {
    window.location.href = "dashboard.html"
    return
  }

  // Populate page with destination data
  populateDestinationDetails(destination)
}

// Populate page with destination information
function populateDestinationDetails(destination) {
  // Set page title
  document.title = `${destination.name} - NepalTravel`

  // Populate basic information
  document.getElementById("destinationImage").src = destination.image
  document.getElementById("destinationImage").alt = destination.name
  document.getElementById("destinationName").textContent = destination.name
  document.getElementById("destinationLocation").querySelector("span").textContent = destination.location
  document.getElementById("destinationRating").textContent = destination.rating
  document.getElementById("destinationDescription").textContent = destination.description

  // Populate trip information
  document.getElementById("destinationPrice").textContent = destination.price
  document.getElementById("destinationDuration").textContent = destination.duration
  document.getElementById("destinationBudget").textContent = destination.budget
  document.getElementById("destinationSeason").textContent = destination.season.join(", ")

  // Generate and populate star rating
  const starsContainer = document.getElementById("destinationStars")
  starsContainer.innerHTML = generateStarsHtml(destination.rating)

  // Populate highlights list
  const highlightsList = document.getElementById("destinationHighlights")
  highlightsList.innerHTML = destination.highlights.map((highlight) => `<li>${highlight}</li>`).join("")

  // Populate activities tags
  const activitiesContainer = document.getElementById("destinationActivities")
  activitiesContainer.innerHTML = destination.activities
    .map((activity) => `<span class="activity-tag">${activity}</span>`)
    .join("")

  // Populate travel types
  const typesContainer = document.getElementById("destinationTypes")
  typesContainer.innerHTML = destination.type.map((type) => `<span class="type-tag">${type}</span>`).join("")

  // Add animation to content
  animateDetailContent()
}

// Generate star rating HTML
function generateStarsHtml(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let starsHtml = ""

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star star"></i>'
  }

  // Add half star if needed
  if (hasHalfStar) {
    starsHtml += '<i class="fas fa-star-half-alt star"></i>'
  }

  // Add empty stars to make 5 total
  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="far fa-star star inactive"></i>'
  }

  return starsHtml
}

// Animate detail content
function animateDetailContent() {
  const contentCards = document.querySelectorAll(".content-card")

  contentCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, 100)
  })
}

// Logout function
function logoutUser() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  localStorage.removeUser("userName")
  window.location.href = "index.html"
}
