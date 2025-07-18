// ===== AUTHENTICATION JAVASCRIPT =====

// Wait for page to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize login form if it exists
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    initializeLoginForm()
  }

  // Initialize register form if it exists
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    initializeRegisterForm()
  }
})

// Password Toggle Function
function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId)
  const toggleButton = passwordInput.nextElementSibling
  const toggleIcon = toggleButton.querySelector("i")

  if (passwordInput.type === "password") {
    // Show password
    passwordInput.type = "text"
    toggleIcon.classList.remove("fa-eye")
    toggleIcon.classList.add("fa-eye-slash")
  } else {
    // Hide password
    passwordInput.type = "password"
    toggleIcon.classList.remove("fa-eye-slash")
    toggleIcon.classList.add("fa-eye")
  }
}

// Initialize Login Form
function initializeLoginForm() {
  const loginForm = document.getElementById("loginForm")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
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

    // Store user data in localStorage (simple authentication)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)
    localStorage.setItem("userName", email.split("@")[0])

    // Show success message
    showNotification("Login successful! Redirecting...", "success")

    // Redirect to dashboard after short delay
    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 1500)
  })
}

// Initialize Register Form
function initializeRegisterForm() {
  const registerForm = document.getElementById("registerForm")

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
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

    // Store user data in localStorage
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)
    localStorage.setItem("userName", fullName)

    // Show success message
    showNotification("Account created successfully! Redirecting...", "success")

    // Redirect to dashboard after short delay
    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 1500)
  })
}

// Email Validation Function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Show Notification Function
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

  // Add to page
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
