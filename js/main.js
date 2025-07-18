// ===== MAIN JAVASCRIPT FOR HOMEPAGE =====

// Wait for the page to load completely
document.addEventListener("DOMContentLoaded", () => {
  // Initialize homepage features
  initializeHeroSlider()
  initializeScrollAnimations()
  initializeSmoothScrolling()
})

// Hero Image Slider Function
function initializeHeroSlider() {
  const slides = document.querySelectorAll(".slide")
  let currentSlide = 0

  // Function to show next slide
  function showNextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove("active")

    // Move to next slide (loop back to first if at end)
    currentSlide = (currentSlide + 1) % slides.length

    // Add active class to new slide
    slides[currentSlide].classList.add("active")
  }

  // Change slide every 4 seconds
  setInterval(showNextSlide, 4000)
}

// Scroll Animations Function
function initializeScrollAnimations() {
  // Options for intersection observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Make element visible and animate
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all feature cards
  const featureCards = document.querySelectorAll(".feature-box")
  featureCards.forEach((card, index) => {
    // Set initial state
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`

    // Start observing
    observer.observe(card)
  })
}

// Smooth Scrolling Function
function initializeSmoothScrolling() {
  // Find all anchor links that start with #
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Get target element
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Add floating animation to icons
function addFloatingAnimation() {
  const floatingIcons = document.querySelectorAll(".float-icon")

  floatingIcons.forEach((icon, index) => {
    // Add different delays for each icon
    icon.style.animationDelay = `${index * 2}s`
  })
}

// Call floating animation when page loads
document.addEventListener("DOMContentLoaded", addFloatingAnimation)
