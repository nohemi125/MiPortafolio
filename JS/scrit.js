// Variables globales
const hamburger = document.getElementById("hamburger")
const navbar = document.getElementById("navbar")
const modal = document.getElementById("projectModal")
const closeModal = document.querySelector(".close")
const contactForm = document.getElementById("contactForm")
const themeToggle = document.getElementById("toggle-dark")
const themeIcon = document.getElementById("theme-icon")

// Datos de los proyectos
const projectsData = {
  portal: {
    title: "Academic Portal",
    description: "An academic system for managing assignments.",
    features: [
      "Student and teacher registration.",
      "Course enrollment system",
      "Assignment submission and review",
      "Enrollment assignment.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySql", "Express.js"],
    github: "https://github.com/nohemi125/Ptoyecto.git",
    demo: "#",
  },
  editor: {
    title: "Text Editor",
    description: "A text editor with simple yet functional features..",
    features: [
      "allows you to create a large number of words",
      "allows you to search for a specific word and highlight it",
      "It shows how many words are repeated and if there are none, it shows a message.",
    ],
    technologies: ["JavaScript", "CSS", "HTML", "MongoDB", "Express.js"],
    github: "https://github.com/nohemi125/Editor-de-Texto.git",
    demo: "#",
  },
  music: {
    title: "Music Player",
    description: "An elegant music player with simple features yet an attractive design",
    features: [
      "muestra las canciones por artista",
      "Registration and login",
      "Search for a specific artist",
      "Spotify API integration",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "API", "Node.js", "Express.js", "MongoDB"],
    github: "#",
    demo: "#",
  },
}

// Datos de los certificados
const certificatesData = {
  javascript: {
    title: "JavaScript Fundamentals Certification",
    courseName: "JavaScript Fundamentals",
    provider: "WomakersCode",
    date: "Completed: June 2025",
    image: "./imagens/certificadoJS.jpg",
    downloadUrl: "#",
    verificationUrl: "/landing-page.html",
    description:
      "This certificate validates proficiency in modern JavaScript programming, including ES6+ features, DOM manipulation, and asynchronous programming concepts.",
  },
  react: {
    title: "React Development Certification",
    courseName: "React Development Masterclass",
    provider: "#",
    date: "Completed: july 2024",
    image: "/placeholder.svg?height=600&width=800&text=React+Certificate",
    downloadUrl: "#",
    verificationUrl: "#",
    description:
      "Advanced certification covering React hooks, context API, state management, and modern React development patterns.",
  },
  database: {
    title: "Database Design & SQL Certification",
    courseName: "Database Design & SQL",
    provider: "#",
    date: "Completed: December 2024",
    image: "/placeholder.svg?height=600&width=800&text=Database+Certificate",
    downloadUrl: "#",
    verificationUrl: "#",
    description:
      "Comprehensive certification in database design principles, SQL optimization, and database management systems.",
  },
  Figma: {
    title: "FIGMA",
    courseName: "TALLER-FIGMA",
    provider: "desafio Latam",
    date: "Completed: 25 february 2025",
    image: "./imagens/desafioLatam.jpg",
    downloadUrl: "#",
  },
  nodejs: {
    title: "Node.js & Express Certification",
    courseName: "Backend Development with Node.js",
    provider: "",
    date: "Completed: October 2024",
    image: "/placeholder.svg?height=600&width=800&text=NodeJS+Certificate",
    downloadUrl: "#",
    verificationUrl: "#",
    description:
      "Backend development certification covering Node.js, Express framework, RESTful APIs, and server-side programming.",
  },
  git: {
    title: "Git & GitHub Mastery Certification",
    courseName: "Version Control with Git",
    provider: "GitHub",
    date: "Completed: june 2025",
    image: "./imagens/GitHubCurso.jpg",
    downloadUrl: "#",
    verificationUrl: "#",
    description:
      "Professional certification in Git version control, collaborative development workflows, and project management.",
  },
}

// Variables para el modal de certificados
const certificateModal = document.getElementById("certificateModal")
const certificateClose = document.querySelector(".certificate-close")
let currentCertificate = null

// Inicialización cuando el DOM está cargado
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  initializeTheme()
})

function initializeApp() {
  setupEventListeners()
  setupScrollAnimations()
  setupTypingEffect()
  setupSmoothScrolling()
  setupCertificateModal()
}

// Configurar event listeners
function setupEventListeners() {
  // Menú hamburguesa
  hamburger.addEventListener("click", toggleMobileMenu)

  // Cerrar menú al hacer click en un enlace
  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Modal de proyectos
  closeModal.addEventListener("click", closeProjectModal)
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeProjectModal()
    }
  })

  // Formulario de contacto
  contactForm.addEventListener("submit", handleContactForm)

  // Scroll para header transparente
  window.addEventListener("scroll", handleHeaderScroll)

  // Cerrar menú móvil al redimensionar ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove("active")
      hamburger.classList.remove("active")
    }
  })

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)
}

// === FUNCIONES DE TEMA ===
function initializeTheme() {
  // Verificar preferencia guardada
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme) {
    setTheme(savedTheme)
  } else if (prefersDark) {
    setTheme("dark")
  } else {
    setTheme("light")
  }

  // Escuchar cambios en la preferencia del sistema
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light")
    }
  })
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  setTheme(newTheme)

  // Guardar preferencia
  localStorage.setItem("theme", newTheme)

  // Animación del botón mejorada
  themeToggle.style.transform = "scale(0.8) rotate(180deg)"
  setTimeout(() => {
    themeToggle.style.transform = "scale(1) rotate(0deg)"
  }, 200)
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)

  // Actualizar icono
  if (theme === "dark") {
    themeIcon.className = "fa-solid fa-sun"
    themeToggle.title = "Cambiar a modo claro"
  } else {
    themeIcon.className = "fa-solid fa-moon"
    themeToggle.title = "Cambiar a modo oscuro"
  }

  // Efecto de transición suave
  document.body.style.transition = "all 0.3s ease"
  setTimeout(() => {
    document.body.style.transition = ""
  }, 300)
}

// Menú móvil
function toggleMobileMenu() {
  navbar.classList.toggle("active")
  hamburger.classList.toggle("active")
}

function closeMobileMenu() {
  navbar.classList.remove("active")
  hamburger.classList.remove("active")
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.querySelector("header")
  const currentTheme = document.documentElement.getAttribute("data-theme")

  if (window.scrollY > 100) {
    if (currentTheme === "dark") {
      header.style.background = "rgba(26, 26, 46, 0.98)"
    } else {
      header.style.background = "rgba(72, 12, 168, 0.98)"
    }
    header.style.backdropFilter = "blur(15px)"
  } else {
    if (currentTheme === "dark") {
      header.style.background = "rgba(26, 26, 46, 0.95)"
    } else {
      header.style.background = "rgba(72, 12, 168, 0.95)"
    }
    header.style.backdropFilter = "blur(10px)"
  }
}

// Animaciones de scroll
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
      }
    })
  }, observerOptions)

  // Observar elementos que necesitan animación
  const animatedElements = document.querySelectorAll(".card, .course-card, .about-img, .about-text, .tools-content")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Efecto de escritura
function setupTypingEffect() {
  const textElement = document.getElementById("texto-escritura")
  const texts = [
    "Soy Nohemi",
    "Compilo... luego existo",
    "Funciona en mi máquina ",
    "Mi superpoder: encontrar errores a las 3AM",
    "Lo hice funcionar, no preguntes cómo "
  ];
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typeSpeed = 100

  function typeWriter() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      textElement.innerHTML = `
                <span class="texto-uno">Hello World!</span> 
                <span class="texto-dos">${currentText.substring(0, charIndex - 1)}</span>
            `
      charIndex--
      typeSpeed = 50
    } else {
      textElement.innerHTML = `
                <span class="texto-uno">Hello World!</span> 
                <span class="texto-dos">${currentText.substring(0, charIndex + 1)}</span>
            `
      charIndex++
      typeSpeed = 100
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeWriter, typeSpeed)
  }

  // Iniciar después de un pequeño delay
  setTimeout(typeWriter, 1000)
}

// Scroll suave para navegación
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Modal de proyectos
function openModal(projectKey) {
  const project = projectsData[projectKey]
  if (!project) return

  const modalBody = document.getElementById("modalBody")
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const textColor = currentTheme === "dark" ? "#eee" : "#fcfcfc"
  const accentColor = currentTheme === "dark" ? "#a2d2ff" : "#a2d2ff"
  const secondaryColor = currentTheme === "dark" ? "#a2d2ff" : "#c77dff"

  modalBody.innerHTML = `
        <h2 style="color: ${accentColor}; margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: ${textColor}; margin-bottom: 2rem; line-height: 1.6;">${project.description}</p>
        
        <h3 style="color: ${secondaryColor}; margin-bottom: 1rem;">Features:</h3>
        <ul style="color: ${accentColor}; margin-bottom: 2rem; padding-left: 1.5rem;">
            ${project.features.map((feature) => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join("")}
        </ul>
        
        <h3 style="color: ${secondaryColor}; margin-bottom: 1rem;">Technologies:</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${project.technologies
              .map(
                (tech) =>
                  `<span style="background: rgba(255,255,255,0.1); padding: 0.3rem 0.8rem; border-radius: 15px; color: ${textColor}; font-size: 0.9rem;">${tech}</span>`,
              )
              .join("")}
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="${project.github}" style="background: #35007a; color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; transition: all 0.3s ease;">
                <i class="fab fa-github"></i> View Code
            </a>
            <a href="${project.demo}" style="background: transparent; color: ${accentColor}; padding: 0.8rem 1.5rem; border: 2px solid ${accentColor}; border-radius: 25px; text-decoration: none; transition: all 0.3s ease;">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeProjectModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// === FUNCIONES DE CERTIFICADOS ===
function setupCertificateModal() {
  // Cerrar modal
  certificateClose.addEventListener("click", closeCertificateModal)

  // Cerrar modal al hacer click fuera
  window.addEventListener("click", (event) => {
    if (event.target === certificateModal) {
      closeCertificateModal()
    }
  })

  // Cerrar modal con Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && certificateModal.style.display === "block") {
      closeCertificateModal()
    }
  })
}

function openCertificateModal(certificateKey) {
  const certificate = certificatesData[certificateKey]
  if (!certificate) return

  currentCertificate = certificate

  // Actualizar contenido del modal
  document.getElementById("certificateTitle").textContent = certificate.title
  document.getElementById("certificateCourseName").textContent = certificate.courseName
  document.getElementById("certificateProvider").textContent = `Issued by: ${certificate.provider}`
  document.getElementById("certificateDate").textContent = certificate.date

  // Mostrar loading inicialmente
  const loadingElement = document.querySelector(".certificate-loading")
  const imageElement = document.getElementById("certificateImage")

  loadingElement.style.display = "flex"
  imageElement.style.display = "none"

  // Simular carga de imagen
  setTimeout(() => {
    imageElement.src = certificate.image
    imageElement.alt = certificate.title

    imageElement.onload = () => {
      loadingElement.style.display = "none"
      imageElement.style.display = "block"
      imageElement.style.animation = "fadeIn 0.5s ease"
    }
  }, 1000)

  // Mostrar modal
  certificateModal.style.display = "block"
  document.body.style.overflow = "hidden"

  // Agregar efecto de aparición
  setTimeout(() => {
    certificateModal.querySelector(".certificate-modal-content").style.transform = "scale(1)"
  }, 10)

  console.log(`Certificate viewed: ${certificate.courseName}`)
}

function closeCertificateModal() {
  certificateModal.style.display = "none"
  document.body.style.overflow = "auto"

  // Limpiar imagen
  const imageElement = document.getElementById("certificateImage")
  imageElement.src = ""

  // Resetear loading state
  document.querySelector(".certificate-loading").style.display = "flex"
  imageElement.style.display = "none"

  currentCertificate = null
}

function downloadCertificate() {
  if (!currentCertificate) return

  // Simular descarga
  showNotification("Downloading certificate...", "info")

  setTimeout(() => {
    showNotification("Certificate downloaded successfully!", "success")
  }, 1500)

  console.log(`Certificate download initiated: ${currentCertificate.courseName}`)
}

// Formulario de contacto
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simular envío del formulario
  const submitBtn = contactForm.querySelector(".btn-submit")
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.textContent = "Message Sent!"
    submitBtn.style.background = "linear-gradient(135deg, #28a745, #20c997)"

    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
      submitBtn.style.background = "linear-gradient(135deg, var(--color-morado), var(--color-azul))"
      contactForm.reset()

      // Mostrar mensaje de éxito
      showNotification("Message sent successfully! I'll get back to you soon.", "success")
    }, 2000)
  }, 1500)
}

// Sistema de notificaciones
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const colors = {
    info: "#17a2b8",
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
  }

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 4000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `

  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 4000)
}

// Función para manejar errores de carga de imágenes
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.src = "https://img.freepik.com/vector-premium/diseno-plano-espera-minuto_108061-1610.jpg?semt=ais_hybrid&w=740"
  })
})

// Lazy loading para imágenes
function setupLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Inicializar lazy loading si hay imágenes con data-src
if (document.querySelectorAll("img[data-src]").length > 0) {
  setupLazyLoading()
}

// Preloader (opcional)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

console.log("Portfolio with dark mode loaded successfully! 🚀")
