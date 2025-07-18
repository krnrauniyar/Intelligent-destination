// Password toggle functionality
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

// Login form handler
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation
      if (email && password) {
        // Store user data
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userName", email.split("@")[0])

        // Show success message
        showMessage("Login successful! Redirecting...", "success")

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = "dashboard.html"
        }, 1500)
      } else {
        showMessage("Please fill in all fields", "error")
      }
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fullName = document.getElementById("fullName").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value

      // Validation
      if (!fullName || !email || !password || !confirmPassword) {
        showMessage("Please fill in all fields", "error")
        return
      }

      if (password !== confirmPassword) {
        showMessage("Passwords do not match", "error")
        return
      }

      if (password.length < 6) {
        showMessage("Password must be at least 6 characters long", "error")
        return
      }

      // Store user data
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", fullName)

      // Show success message
      showMessage("Account created successfully! Redirecting...", "success")

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 1500)
    })
  }
})

// Show message function
function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".auth-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // Create message element
  const messageDiv = document.createElement("div")
  messageDiv.className = `auth-message ${type}`
  messageDiv.textContent = message

  // Style the message
  messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        ${type === "success" ? "background: #10b981;" : "background: #ef4444;"}
    `

  document.body.appendChild(messageDiv)

  // Remove message after 3 seconds
  setTimeout(() => {
    messageDiv.style.animation = "slideOutRight 0.3s ease-out"
    setTimeout(() => {
      messageDiv.remove()
    }, 300)
  }, 3000)
}

// Add CSS for message animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
