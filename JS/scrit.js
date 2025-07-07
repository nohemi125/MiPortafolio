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
    titulo: "Portal Academico",
    descripcion: "Un sistema academico para gestionar tareas.",
    caracteristicas: [
      "Registro de estudiantes y profesores.",
      "Sistema de inscripcion de estudiantes.",
      "Envio y revision de tareas.",
      "Inscripcion de asignaturas.",
    ],
    tecnologias: ["HTML", "CSS", "JavaScript", "Node.js", "MySql", "Express.js"],
    github: "https://github.com/nohemi125/Ptoyecto.git",
    demo: "../landing-pag.html",
  },
  music: {
    titulo: "Reproductor de Musica",
    descripcion: "Un reproductor de musica con caracteristicas simples pero atractivas",
    caracteristicas: [
      "muestra las canciones por artista",
      "Registro y incio de sesion ",
      "busqueda de cancion y artista ",
      "integracion de API Tunes",
      "Crear lista de reproducion y agregar cancion favorita"
    ],
    tecnologias: ["HTML", "CSS", "JavaScript", "API", "Node.js", "Express.js", "MongoDB"],
    github: "#",
    demo: "https://nohemi125.github.io/Reproductor-de-musica/",
  },
  countries: {
    titulo: "Buscador de Países",
    descripcion: "Proyecto web interactivo que permite buscar información de cualquier país y mostrar el clima actual en su capital.",
    caracteristicas: [
      "Buscar país por nombre",
      "Mostrar datos como: bandera, región, población, capital, idiomas",
      "Mostrar clima actual (temperatura, clima, sensación térmica)",
      "Cambiar color de fondo dinámicamente según el clima",
      "Diseño responsive para móviles y pantallas pequeñas"
    ],
    tecnologias: ["HTML5", "CSS3", "JavaScript", "REST Countries API", "OpenWeatherMap API"],
    github: "https://github.com/nohemi125/BuscadorPaises",
    demo: "https://nohemi125.github.io/BuscadorPaises/",
  },

  gallery: {
    titulo: "Galería de dibujos",
    descripcion: "Mi galería de dibujo personal, donde muestro el proceso que he tenido como artista autodidacta. Aquí se ve la evolución de mis habilidades, desde mis primeros trazos hasta trabajos más recientes.",
    caracteristicas: [
      "Visualización de dibujos en tarjetas organizadas por etapa",
      "Modal que muestra la imagen en tamaño completo al hacer clic",
      "Diseño artístico y estético que refleja mi estilo personal",
      "Fuentes personalizadas para los títulos y textos",
      "Diseño responsivo para adaptarse a móviles y pantallas pequeñas"
    ],
    tecnologias: ["React", "Vite", "HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/nohemi125/galeria-dibujos",
    demo: "https://galeria-dibujos.onrender.com/",
  },
  

  "editor-text": {
    titulo: "Editor de Texto Traductor",
    descripcion: "Editor de texto interactivo con herramientas de edición, traducción automática y exportación.",
    caracteristicas: [
      "Buscador de texto dentro del contenido escrito",
      "Traducción automática usando la API de MyMemory",
      "Estilos: negrita, cursiva, cambio de tamaño de letra",
      "Exportar como archivo PDF",
      "Resalta la palabra buscada en el texto"
    ],
    tecnologias: ["HTML", "CSS", "JavaScript", "MyMemory API", "jsPDF"],
    github: "#",
    demo: "landing-pag.html",
  }
}


// Datos de los certificados
const certificatesData = {
  javascript: {
    titulo: "Fundamentos de JavaScript",
    nombreCurso: "Fundamentos de JavaScript",
    proveedor: "WomakersCode",
    fecha: "Completado: Junio 2025",
    imagen: "./imagens/certificadoJS.jpg",
    descargarUrl: "#",
    verificarUrl: "/landing-pag.html",
    descripcion:
      "Certificacion en programacion moderna en JavaScript, manipulacion de DOM, y conceptos de programacion asincrona.",
  },
  react: {
    titulo: "Desarrollo con React",
    nombreCurso: "Masterclass de Desarrollo React",
    proveedor: "#",
    fecha: "Completado: Julio 2024",
    imagen: "/placeholder.svg?height=600&width=800&text=React+Certificate",
    descargarUrl: "#",
    verificarUrl: "#",
    descripcion:
      "Certificacion en React, context API, manejo de estado, y patrones de desarrollo modernos.",
  },
  database: {
    titulo: "Bases de Datos & SQL Certificacion",
    nombreCurso: "Diseño de Bases de Datos & SQL",
    proveedor: "#",
    fecha: "Completado: Diciembre 2024",
    imagen: "/placeholder.svg?height=600&width=800&text=Database+Certificate",
    descargarUrl: "#",
    verificarUrl: "#",
    descripcion:
      "Certificacion en bases de datos, optimizacion de SQL y sistemas de gestion de bases de datos.",
  },
  Figma: {
    titulo: "FIGMA",
    nombreCurso: "TALLER-FIGMA",
    proveedor: "desafio Latam",
    fecha: "Completado: 25 febrero 2025",
    imagen: "./imagens/desafioLatam.jpg",
    descargarUrl: "#",
  },
  nodejs: {
    titulo: "Node.js & Express Certificación 2024",
    nombreCurso: "Desarrollo Backend con Node.js",
    proveedor: "desafio Latam",
    fecha: "Completado: Octubre 2024",
    imagen: "./imagens/desafioLatam.jpg",
    descargarUrl: "#",
    verificarUrl: "#",
    descripcion:
      "Certificación en desarrollo backend cubriendo Node.js, framework Express, APIs RESTful, y programación del lado del servidor.",
  },
  git: {
    titulo: "Certificación en Git & GitHub",
    nombreCurso: "Control de Versiones con Git",
    proveedor: "GitHub",
    fecha: "Completado: Junio 2025",
    imagen: "./imagens/GitHubCurso.jpg",
    descargarUrl: "#",
    verificarUrl: "#",
    descripcion:
      "Certificación en control de versiones con Git, flujos de trabajo colaborativos y gestión de proyectos.",
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
  if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      const submitBtn = this.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      
      try {
        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;
        
        const response = await fetch('http://localhost:3000/enviar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          submitBtn.textContent = "¡Mensaje Enviado!";
          submitBtn.style.background = "linear-gradient(135deg, #28a745, #20c997)";
          contactForm.reset();
          showNotification("¡Mensaje enviado con éxito! Te responderé pronto.", "success");
        } else {
          throw new Error(data.message || 'Error al enviar el mensaje');
        }
      } catch (error) {
        console.error('Error en el envío:', error);
        submitBtn.textContent = "Error al Enviar";
        submitBtn.style.background = "linear-gradient(135deg, #dc3545, #c82333)";
        showNotification("No se pudo enviar el mensaje. Por favor, intenta más tarde.", "error");
      } finally {
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "linear-gradient(135deg, var(--color-morado), var(--color-azul))";
        }, 3000);
      }
    });
  }

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
    "Funciona en mi máquina ",
    "Encuentro errores a las 3AM",
    "Lo hice funcionar, no preguntes cómo "
  ];
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typeSpeed = 100

  function typeWriter() {
    const currentText = texts[textIndex]
    const isMobile = window.innerWidth <= 768

    if (isDeleting) {
      textElement.innerHTML = `
        <span class="texto-uno">¡Hola Mundo!</span> 
        <span class="texto-dos">${currentText.substring(0, charIndex - 1)}</span>
      `
      charIndex--
      typeSpeed = 50
    } else {
      textElement.innerHTML = `
        <span class="texto-uno">¡Hola Mundo!</span> 
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

  // Manejar cambios de tamaño de ventana
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        textElement.style.textAlign = 'center'
      } else {
        textElement.style.textAlign = 'left'
      }
    }, 250)
  })
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
        <h2 style="color: ${accentColor}; margin-bottom: 1rem;">${project.titulo}</h2>
        <p style="color: ${textColor}; margin-bottom: 2rem; line-height: 1.6;">${project.descripcion}</p>
        
        <h3 style="color: ${secondaryColor}; margin-bottom: 1rem;">Características:</h3>
        <ul style="color: ${accentColor}; margin-bottom: 2rem; padding-left: 1.5rem;">
            ${project.caracteristicas.map((feature) => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join("")}
        </ul>
        
        <h3 style="color: ${secondaryColor}; margin-bottom: 1rem;">Tecnologías:</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${project.tecnologias
              .map(
                (tech) =>
                  `<span style="background: rgba(255,255,255,0.1); padding: 0.3rem 0.8rem; border-radius: 15px; color: ${textColor}; font-size: 0.9rem;">${tech}</span>`,
              )
              .join("")}
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="${project.github}" style="background: #35007a; color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; transition: all 0.3s ease;">
                <i class="fab fa-github"></i> Ver Código
            </a>
            <a href="${project.demo}" style="background: transparent; color: ${accentColor}; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; border: 2px solid ${accentColor}; transition: all 0.3s ease;">
                <i class="fas fa-external-link-alt"></i> Ver Demo
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
  document.getElementById("certificateTitle").textContent = certificate.titulo
  document.getElementById("certificateCourseName").textContent = certificate.nombreCurso
  document.getElementById("certificateProvider").textContent = `Emitido por: ${certificate.proveedor}`
  document.getElementById("certificateDate").textContent = certificate.fecha

  // Mostrar loading inicialmente
  const loadingElement = document.querySelector(".certificate-loading")
  const imageElement = document.getElementById("certificateImage")

  loadingElement.style.display = "flex"
  imageElement.style.display = "none"

  // Simular carga de imagen
  setTimeout(() => {
    imageElement.src = certificate.imagen
    imageElement.alt = certificate.titulo

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

  console.log(`Certificate viewed: ${certificate.nombreCurso}`)
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

function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
  `

  // Agregar al DOM
  document.body.appendChild(notification)

  // Mostrar con animación
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Remover después de 5 segundos
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 5000)
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
