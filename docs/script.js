document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS animation library
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      })
    } else {
      console.warn("AOS is not defined. Make sure to include the AOS library.")
    }
  
    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".menu-btn")
    const navLinks = document.querySelector(".nav-links")
  
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open")
        navLinks.classList.toggle("open")
      })
    }
  
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (menuBtn && menuBtn.classList.contains("open")) {
          menuBtn.classList.remove("open")
          navLinks.classList.remove("open")
        }
      })
    })
  
    // Sticky Header
    window.addEventListener("scroll", () => {
      const header = document.getElementById("header")
      if (window.scrollY > 100) {
        header.classList.add("sticky")
      } else {
        header.classList.remove("sticky")
      }
    })
  
    // Progress Bar
    window.onscroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      const progressBar = document.getElementById("myBar")
      if (progressBar) {
        progressBar.style.width = scrolled + "%"
      }
  
      // Back to Top Button
      const backToTop = document.getElementById("backToTop")
      if (backToTop) {
        if (winScroll > 300) {
          backToTop.classList.add("show")
        } else {
          backToTop.classList.remove("show")
        }
      }
    }
  
    // Back to Top Button Click
    const backToTop = document.getElementById("backToTop")
    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  
    // Typed Text Effect
    const typedTextSpan = document.querySelector(".typed-text")
    const cursorSpan = document.querySelector(".cursor")
  
    const textArray = ["Web Developer", "System Administrator", "Database Manager", "Problem Solver"]
    const typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000
    let textArrayIndex = 0
    let charIndex = 0
  
    function type() {
      if (typedTextSpan && cursorSpan) {
        if (charIndex < textArray[textArrayIndex].length) {
          if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
          typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
          charIndex++
          setTimeout(type, typingDelay)
        } else {
          cursorSpan.classList.remove("typing")
          setTimeout(erase, newTextDelay)
        }
      }
    }
  
    function erase() {
      if (typedTextSpan && cursorSpan) {
        if (charIndex > 0) {
          if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
          charIndex--
          setTimeout(erase, erasingDelay)
        } else {
          cursorSpan.classList.remove("typing")
          textArrayIndex++
          if (textArrayIndex >= textArray.length) textArrayIndex = 0
          setTimeout(type, typingDelay + 1100)
        }
      }
    }
  
    if (typedTextSpan && cursorSpan) {
      setTimeout(type, newTextDelay + 250)
    }
  
    // Active Navigation Links
    const sections = document.querySelectorAll("section")
    const navLinks2 = document.querySelectorAll(".nav-link")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks2.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  
    // Form Validation and Submission
    const contactForm = document.getElementById("contactForm")
    const formSuccess = document.getElementById("formSuccess")
    const formError = document.getElementById("formError")
    const resetFormBtn = document.getElementById("resetForm")
    const retryFormBtn = document.getElementById("retryForm")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Reset error messages
        document.querySelectorAll(".form-error").forEach((error) => {
          error.style.display = "none"
        })
  
        // Get form values
        const name = document.getElementById("name").value.trim()
        const email = document.getElementById("email").value.trim()
        const subject = document.getElementById("subject").value.trim()
        const message = document.getElementById("message").value.trim()
  
        // Validate form
        let isValid = true
  
        if (name === "") {
          document.getElementById("nameError").textContent = "Please enter your name"
          document.getElementById("nameError").style.display = "block"
          isValid = false
        }
  
        if (email === "") {
          document.getElementById("emailError").textContent = "Please enter your email"
          document.getElementById("emailError").style.display = "block"
          isValid = false
        } else if (!isValidEmail(email)) {
          document.getElementById("emailError").textContent = "Please enter a valid email"
          document.getElementById("emailError").style.display = "block"
          isValid = false
        }
  
        if (subject === "") {
          document.getElementById("subjectError").textContent = "Please enter a subject"
          document.getElementById("subjectError").style.display = "block"
          isValid = false
        }
  
        if (message === "") {
          document.getElementById("messageError").textContent = "Please enter your message"
          document.getElementById("messageError").style.display = "block"
          isValid = false
        }
  
        if (isValid) {
          // Here you would typically send the form data to a server
          // For demonstration, we'll simulate a form submission
          
          const formData = {
            name,
            email,
            subject,
            message
          }
          
          console.log("Form data to be sent:", formData)
          
          // Simulate form submission with 80% success rate for demonstration
          const isSuccess = Math.random() > 0.2
          
          if (isSuccess) {
            // Show success message
            formSuccess.classList.add("show")
            // Reset form
            contactForm.reset()
          } else {
            // Show error message
            formError.classList.add("show")
          }
        }
      })
    }
  
    if (resetFormBtn) {
      resetFormBtn.addEventListener("click", () => {
        formSuccess.classList.remove("show")
      })
    }
    
    if (retryFormBtn) {
      retryFormBtn.addEventListener("click", () => {
        formError.classList.remove("show")
      })
    }
  
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress')
    
    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.3
        
        if (barPosition < screenPosition) {
          const width = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1]
          bar.style.width = '0%'
          setTimeout(() => {
            bar.style.width = width + '%'
          }, 100)
        }
      })
    }
    
    // Call once on page load
    setTimeout(animateSkillBars, 500)
    
    // Call on scroll
    window.addEventListener('scroll', animateSkillBars)
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  })