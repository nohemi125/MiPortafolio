// Variables globales
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');

// Datos de los proyectos
const projectsData = {
    portal: {
        title: "Academic Portal",
        description: "An academic system for managing assignments.",
        features: [
            "Student and teacher registration.",
            "Course enrollment system",
            "Assignment submission and review",
            "Enrollment assignment."
        ],
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySql", "Express.js"],
        github: "https://github.com/nohemi125/Ptoyecto.git",
        demo: "#"
    },
    editor: {
        title: "Text Editor",
        description: "A text editor with simple yet functional features..",
        features: [
            "allows you to create a large number of words",
            "allows you to search for a specific word and highlight it",
            "It shows how many words are repeated and if there are none, it shows a message."
        ],
        technologies: ["JavaScript","CSS", "HTML", "MongoDB", "Express.js"],
        github: "https://github.com/nohemi125/Editor-de-Texto.git",
        demo: "#"
    },
    music: {
        title: "Music Player",
        description: "An elegant music player with simple features yet an attractive design",
        features: [
            "muestra las canciones por artista",
            "Registration and login",
            "Search for a specific artist",
            "Spotify API integration"
        ],
        technologies: ["HTML", "CSS", "JavaScript", "API", "Node.js", "Express.js", "MongoDB"],
        github: "#",
        demo: "#"
    }
};

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupScrollAnimations();
    setupTypingEffect();
    setupSmoothScrolling();
}

// Configurar event listeners
function setupEventListeners() {
    // Menú hamburguesa
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú al hacer click en un enlace
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Modal
    closeModal.addEventListener('click', closeProjectModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeProjectModal();
        }
    });

    // Formulario de contacto
    contactForm.addEventListener('submit', handleContactForm);

    // Scroll para header transparente
    window.addEventListener('scroll', handleHeaderScroll);

    // Cerrar menú móvil al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Menú móvil
function toggleMobileMenu() {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    navbar.classList.remove('active');
    hamburger.classList.remove('active');
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(72, 12, 168, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(72, 12, 168, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
}

// Animaciones de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.card, .about-img, .about-text, .tools-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Efecto de escritura
function setupTypingEffect() {
    const textElement = document.getElementById('texto-escritura');
    const texts = [
        'Hello World! I am Nohemi',
        'Software Developer',
        'UI/UX Designer',
        'Creative Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.innerHTML = `
                <span class="texto-uno">Hello World!</span> 
                <span class="texto-dos">${currentText.substring(0, charIndex - 1)}</span>
            `;
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.innerHTML = `
                <span class="texto-uno">Hello World!</span> 
                <span class="texto-dos">${currentText.substring(0, charIndex + 1)}</span>
            `;
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Iniciar después de un pequeño delay
    setTimeout(typeWriter, 1000);
}

// Scroll suave para navegación
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal de proyectos
function openModal(projectKey) {
    const project = projectsData[projectKey];
    if (!project) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2 style="color: #a2d2ff; margin-bottom: 1rem;">${project.title}</h2>
        <p style="color: #fcfcfc; margin-bottom: 2rem; line-height: 1.6;">${project.description}</p>
        
        <h3 style="color: #c77dff; margin-bottom: 1rem;">Features:</h3>
        <ul style="color: #a2d2ff; margin-bottom: 2rem; padding-left: 1.5rem;">
            ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
        </ul>
        
        <h3 style="color: #c77dff; margin-bottom: 1rem;">Technologies:</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${project.technologies.map(tech => 
                `<span style="background: rgba(255,255,255,0.1); padding: 0.3rem 0.8rem; border-radius: 15px; color: #fcfcfc; font-size: 0.9rem;">${tech}</span>`
            ).join('')}
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="${project.github}" style="background: #35007a; color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; transition: all 0.3s ease;">
                <i class="fab fa-github"></i> View Code
            </a>
            <a href="${project.demo}" style="background: transparent; color: #a2d2ff; padding: 0.8rem 1.5rem; border: 2px solid #a2d2ff; border-radius: 25px; text-decoration: none; transition: all 0.3s ease;">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Formulario de contacto
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simular envío del formulario
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(135deg, var(--color-morado), var(--color-azul))';
            contactForm.reset();
            
            // Mostrar mensaje de éxito
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    }, 1500);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Efectos adicionales para mejorar la experiencia
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Lazy loading para imágenes
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading si hay imágenes con data-src
if (document.querySelectorAll('img[data-src]').length > 0) {
    setupLazyLoading();
}

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Función para detectar si el usuario prefiere modo oscuro
function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
}

// Función para manejar el cambio de tema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Inicializar detección de modo oscuro
detectDarkMode();

// Función para manejar errores de carga de imágenes
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = '/placeholder.svg?height=200&width=200&text=Image+Not+Found';
    });
});

console.log('Portfolio loaded successfully! 🚀');

















// Variables globales para el modal de certificados
const certificateModal = document.getElementById('certificateModal');
const certificateClose = document.querySelector('.certificate-close');
let currentCertificate = null;

// Datos de los certificados con imágenes
const certificatesData = {
    javascript: {
        title: "JavaScript Fundamentals Certification",
        courseName: "JavaScript Fundamentals",
        provider: "FreeCodeCamp",
        date: "Completed: March 2024",
        image: "/placeholder.svg?height=600&width=800&text=JavaScript+Certificate",
        downloadUrl: "#",
        verificationUrl: "/landing-page.html",
        description: "This certificate validates proficiency in modern JavaScript programming, including ES6+ features, DOM manipulation, and asynchronous programming concepts."
    },
    react: {
        title: "React Development Certification",
        courseName: "React Development Masterclass",
        provider: "Udemy",
        date: "Completed: February 2024",
        image: "/placeholder.svg?height=600&width=800&text=React+Certificate",
        downloadUrl: "#",
        verificationUrl: "#",
        description: "Advanced certification covering React hooks, context API, state management, and modern React development patterns."
    },
    database: {
        title: "Database Design & SQL Certification",
        courseName: "Database Design & SQL",
        provider: "Coursera",
        date: "Completed: December 2023",
        image: "/placeholder.svg?height=600&width=800&text=Database+Certificate",
        downloadUrl: "#",
        verificationUrl: "#",
        description: "Comprehensive certification in database design principles, SQL optimization, and database management systems."
    },
    Figma: {
        title: "FIGMA",
        courseName: "TALLER-FIGMA",
        provider: "desafio Latam",
        date: "Completed: 25 february 2025",
        image: "/desafioLatam.jpg",
        downloadUrl: "#",
        // verificationUrl: "#",
        // description: "Professional certification in user interface design, user experience research, and design thinking methodologies."
    },
    nodejs: {
        title: "Node.js & Express Certification",
        courseName: "Backend Development with Node.js",
        provider: "Platzi",
        date: "Completed: October 2023",
        image: "/placeholder.svg?height=600&width=800&text=NodeJS+Certificate",
        downloadUrl: "#",
        verificationUrl: "#",
        description: "Backend development certification covering Node.js, Express framework, RESTful APIs, and server-side programming."
    },
    git: {
        title: "Git & GitHub Mastery Certification",
        courseName: "Version Control with Git",
        provider: "GitHub",
        date: "Completed: September 2023",
        image: "/placeholder.svg?height=600&width=800&text=Git+Certificate",
        downloadUrl: "#",
        verificationUrl: "#",
        description: "Professional certification in Git version control, collaborative development workflows, and project management."
    }
};

// Función para abrir el modal de certificado
function openCertificateModal(certificateKey) {
    const certificate = certificatesData[certificateKey];
    if (!certificate) return;

    currentCertificate = certificate;

    // Actualizar contenido del modal
    document.getElementById('certificateTitle').textContent = certificate.title;
    document.getElementById('certificateCourseName').textContent = certificate.courseName;
    document.getElementById('certificateProvider').textContent = `Issued by: ${certificate.provider}`;
    document.getElementById('certificateDate').textContent = certificate.date;

    // Mostrar loading inicialmente
    const imageContainer = document.querySelector('.certificate-image-container');
    const loadingElement = document.querySelector('.certificate-loading');
    const imageElement = document.getElementById('certificateImage');

    loadingElement.style.display = 'flex';
    imageElement.style.display = 'none';

    // Simular carga de imagen
    setTimeout(() => {
        imageElement.src = certificate.image;
        imageElement.alt = certificate.title;
        
        imageElement.onload = () => {
            loadingElement.style.display = 'none';
            imageElement.style.display = 'block';
            imageElement.style.animation = 'fadeIn 0.5s ease';
        };
    }, 1000); // Simular delay de carga

    // Mostrar modal
    certificateModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Agregar efecto de aparición
    setTimeout(() => {
        certificateModal.querySelector('.certificate-modal-content').style.transform = 'scale(1)';
    }, 10);

    // Analytics (opcional)
    console.log(`Certificate viewed: ${certificate.courseName}`);
}

// Función para cerrar el modal de certificado
function closeCertificateModal() {
    certificateModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Limpiar imagen
    const imageElement = document.getElementById('certificateImage');
    imageElement.src = '';
    
    // Resetear loading state
    document.querySelector('.certificate-loading').style.display = 'flex';
    imageElement.style.display = 'none';
    
    currentCertificate = null;
}

// Función para descargar certificado
function downloadCertificate() {
    if (!currentCertificate) return;

    // Simular descarga
    const link = document.createElement('a');
    link.href = currentCertificate.downloadUrl;
    link.download = `${currentCertificate.courseName.replace(/\s+/g, '_')}_Certificate.pdf`;
    
    // Mostrar notificación de descarga
    showNotification('Downloading certificate...', 'info');
    
    setTimeout(() => {
        showNotification('Certificate downloaded successfully!', 'success');
        // link.click(); // Descomenta para descarga real
    }, 1500);

    console.log(`Certificate download initiated: ${currentCertificate.courseName}`);
}

// Función para compartir certificado
function shareCertificate() {
    if (!currentCertificate) return;

    const shareData = {
        title: currentCertificate.title,
        text: `I've completed the ${currentCertificate.courseName} certification from ${currentCertificate.provider}!`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).then(() => {
            showNotification('Certificate shared successfully!', 'success');
        }).catch(() => {
            fallbackShare(shareData);
        });
    } else {
        fallbackShare(shareData);
    }
}

// Función de fallback para compartir
function fallbackShare(shareData) {
    // Copiar al portapapeles
    const textToCopy = `${shareData.text}\n${shareData.url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Certificate link copied to clipboard!', 'success');
        });
    } else {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Certificate link copied to clipboard!', 'success');
    }
}

// Función para verificar certificado
function verifyCertificate() {
    if (!currentCertificate) return;

    // Simular verificación
    showNotification('Verifying certificate authenticity...', 'info');
    
    setTimeout(() => {
        const isVerified = Math.random() > 0.1; // 90% de probabilidad de verificación exitosa
        
        if (isVerified) {
            showNotification('✅ Certificate verified successfully!', 'success');
            
            // Agregar badge de verificación
            const imageContainer = document.querySelector('.certificate-image-container');
            if (!imageContainer.querySelector('.certificate-verified')) {
                const verifiedBadge = document.createElement('div');
                verifiedBadge.className = 'certificate-verified';
                verifiedBadge.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
                imageContainer.appendChild(verifiedBadge);
            }
        } else {
            showNotification('❌ Certificate verification failed. Please contact support.', 'error');
        }
    }, 2000);

    console.log(`Certificate verification initiated: ${currentCertificate.courseName}`);
}

// Función para hacer zoom en la imagen del certificado
function setupCertificateImageZoom() {
    const imageContainer = document.querySelector('.certificate-image-container');
    const image = document.getElementById('certificateImage');

    if (imageContainer && image) {
        image.addEventListener('click', function() {
            imageContainer.classList.toggle('zoomed');
            
            if (imageContainer.classList.contains('zoomed')) {
                image.style.cursor = 'zoom-out';
            } else {
                image.style.cursor = 'zoom-in';
            }
        });
    }
}

// Event listeners para el modal de certificados
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modal
    certificateClose.addEventListener('click', closeCertificateModal);
    
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(event) {
        if (event.target === certificateModal) {
            closeCertificateModal();
        }
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && certificateModal.style.display === 'block') {
            closeCertificateModal();
        }
    });

    // Configurar zoom de imagen
    setupCertificateImageZoom();

    // Configurar lazy loading para imágenes de certificados
    setupCertificateLazyLoading();
});

// Lazy loading para imágenes de certificados
function setupCertificateLazyLoading() {
    const certificateButtons = document.querySelectorAll('.view-certificate');
    
    certificateButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const courseCard = this.closest('.course-card');
            const courseKey = courseCard.getAttribute('data-course');
            const certificate = certificatesData[courseKey];
            
            if (certificate) {
                // Pre-cargar imagen en background
                const img = new Image();
                img.src = certificate.image;
            }
        });
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        info: '#17a2b8',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107'
    };
    
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
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Estadísticas de visualización de certificados
let certificateViews = {};

function trackCertificateView(certificateKey) {
    if (!certificateViews[certificateKey]) {
        certificateViews[certificateKey] = 0;
    }
    certificateViews[certificateKey]++;
    
    console.log('Certificate views:', certificateViews);
}

// Función para exportar estadísticas (para análisis)
function exportCertificateStats() {
    return {
        totalViews: Object.values(certificateViews).reduce((a, b) => a + b, 0),
        mostViewed: Object.keys(certificateViews).reduce((a, b) => 
            certificateViews[a] > certificateViews[b] ? a : b, Object.keys(certificateViews)[0]),
        viewsByCategory: certificateViews
    };
}

console.log('Certificate modal system loaded successfully! 🎓');