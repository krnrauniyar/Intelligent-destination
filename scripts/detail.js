// Load destination details
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn) {
    window.location.href = "login.html"
    return
  }

  // Get destination ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const destinationId = urlParams.get("id")

  if (!destinationId) {
    window.location.href = "dashboard.html"
    return
  }

  // Load destination details
  loadDestinationDetails(destinationId)
})

function loadDestinationDetails(id) {
  const destination = window.getDestinationById(id) // Assuming getDestinationById is a global function

  if (!destination) {
    window.location.href = "dashboard.html"
    return
  }

  // Populate destination details
  document.getElementById("destinationImage").src = destination.image
  document.getElementById("destinationImage").alt = destination.name
  document.getElementById("destinationName").textContent = destination.name
  document.getElementById("destinationLocation").querySelector("span").textContent = destination.location
  document.getElementById("destinationRating").textContent = destination.rating
  document.getElementById("destinationDescription").textContent = destination.description
  document.getElementById("destinationPrice").textContent = destination.price
  document.getElementById("destinationDuration").textContent = destination.duration
  document.getElementById("destinationBudget").textContent = destination.budget

  // Generate stars
  const starsContainer = document.getElementById("destinationStars")
  const starsHtml = Array.from(
    { length: 5 },
    (_, i) => `<i class="fas fa-star star${i < Math.floor(destination.rating) ? " active" : ""}"></i>`,
  ).join("")
  starsContainer.innerHTML = starsHtml

  // Add CSS for active stars
  const style = document.createElement("style")
  style.textContent = `
        .star.active {
            color: #fbbf24;
        }
        .star {
            color: #d1d5db;
        }
    `
  document.head.appendChild(style)

  // Populate season
  document.getElementById("destinationSeason").textContent = destination.season.join(", ")

  // Populate highlights
  const highlightsList = document.getElementById("destinationHighlights")
  highlightsList.innerHTML = destination.highlights.map((highlight) => `<li>${highlight}</li>`).join("")

  // Populate activities
  const activitiesContainer = document.getElementById("destinationActivities")
  activitiesContainer.innerHTML = destination.activities
    .map((activity) => `<span class="activity-tag">${activity}</span>`)
    .join("")

  // Populate types
  const typesContainer = document.getElementById("destinationTypes")
  typesContainer.innerHTML = destination.type.map((type) => `<span class="type-tag">${type}</span>`).join("")

  // Add page title
  document.title = `${destination.name} - NepalTravel`

  // Animate content
  animateDetailContent()
}

function animateDetailContent() {
  const elements = document.querySelectorAll(".detail-card")
  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = `all 0.6s ease ${index * 0.1}s`

    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, 100)
  })
}

function logout() {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userName")
  window.location.href = "index.html"
}
