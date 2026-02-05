// Inicializar AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: false,
  offset: 100,
});


const swiper = new Swiper('.projects-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: false,
    loop: true,
    grabCursor: true,
    speed: 800,
    breakpoints: {
        320: {
            spaceBetween: 20
        },
        768: {
            spaceBetween: 40
        }
    }
});

const steps = document.querySelectorAll(".step");
const progress = document.getElementById("timeline-progress");
const timeline = document.querySelector(".timeline-minimal");

window.addEventListener("scroll", () => {
    let activeIndex = -1;

    steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
            step.classList.add("active");
            activeIndex = index;
        }
    });

    if (activeIndex >= 0) {
        const lastStep = steps[activeIndex];
        const height = lastStep.offsetTop + lastStep.offsetHeight / 2;
        progress.style.height = `${height}px`;
    }
});


// Script para la interactividad mejorada
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const contactPreview = document.querySelector('.contact-preview p');
    
    // Textos para el preview
    const previewMessages = {
        linkedin: "Let's connect professionally",
        github: "Explore my code and projects",
        whatsapp: "Chat with me directly",
        email: "Send me an email"
    };
    
    // Efecto al pasar el mouse
    contactItems.forEach(item => {
        const contactType = item.getAttribute('data-contact');
        
        item.addEventListener('mouseenter', function() {
            // Actualizar preview
            contactPreview.textContent = previewMessages[contactType];
            
            // Actualizar indicador
            indicatorDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-target') === contactType) {
                    dot.classList.add('active');
                }
            });
            
            // Efecto de sonido sutil (opcional)
            if ('vibrate' in navigator && window.innerWidth > 768) {
                navigator.vibrate(10);
            }
        });
        
        // Efecto de clic
        item.addEventListener('click', function(e) {
            // Prevenir si se hace clic en el enlace directamente
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            // Efecto visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Abrir enlace
            const link = this.querySelector('a');
            if (link) {
                setTimeout(() => {
                    window.open(link.href, link.target || '_blank');
                }, 300);
            }
        });
        
        // Efecto de teclado
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Hacer cada item enfocable para accesibilidad
        item.setAttribute('tabindex', '0');
    });
    
    // Interacción con los puntos indicadores
    indicatorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const targetItem = document.querySelector(`[data-contact="${target}"]`);
            
            if (targetItem) {
                targetItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Efecto visual en el item
                targetItem.style.boxShadow = '0 0 0 3px rgba(243, 220, 251, 0.5)';
                setTimeout(() => {
                    targetItem.style.boxShadow = '';
                }, 1000);
            }
        });
    });
    
    // Efecto de brillo aleatorio en los items
    setInterval(() => {
        const randomItem = contactItems[Math.floor(Math.random() * contactItems.length)];
        randomItem.style.filter = 'brightness(1.05)';
        
        setTimeout(() => {
            randomItem.style.filter = '';
        }, 500);
    }, 3000);
});