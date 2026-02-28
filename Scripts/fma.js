// Performance Optimized JavaScript with Error Handling - Apostolic Fire and Faith Assembly

// Cache DOM elements to avoid repeated queries
const DOM = {
  slides: null,
  video: null,
  menu: null,
  footer: null,
  header: null,
  init() {
    this.slides = document.querySelectorAll('.slide');
    this.video = document.querySelector('.header-video');
    this.menu = document.getElementById('mobileMenu');
    this.footer = document.querySelector('.site-footer');
    this.header = document.querySelector('header');
  }
};

// Slideshow functionality with performance optimizations
class SlideShow {
  constructor() {
    this.slideIndex = 0;
    this.slideInterval = null;
    this.isInitialized = false;
  }

  init() {
    if (!DOM.slides || !DOM.video || this.isInitialized) {
      console.warn('SlideShow: Required elements not found or already initialized');
      return;
    }
    
    // Reset all slides
    DOM.slides.forEach(slide => {
      slide.style.opacity = '0';
      slide.classList.remove('active');
    });

    this.isInitialized = true;
    this.bindEvents();
  }

  bindEvents() {
    // Use passive event listeners for better performance
    if (DOM.video) {
      DOM.video.addEventListener('ended', () => this.start(), { passive: true });
    }
  }

  start() {
    this.slideIndex = 0;
    
    if (DOM.slides[this.slideIndex]) {
      DOM.slides[this.slideIndex].style.opacity = '1';
      DOM.slides[this.slideIndex].classList.add('active');
    }

    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    if (!DOM.slides[this.slideIndex]) return;

    DOM.slides[this.slideIndex].classList.remove('active');
    DOM.slides[this.slideIndex].style.opacity = '0';

    this.slideIndex++;
    
    if (this.slideIndex < DOM.slides.length) {
      DOM.slides[this.slideIndex].classList.add('active');
      DOM.slides[this.slideIndex].style.opacity = '1';
    } else {
      this.stop();
      this.resetToVideo();
    }
  }

  stop() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  resetToVideo() {
    setTimeout(() => {
      DOM.slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
      });
      
      if (DOM.video) {
        DOM.video.currentTime = 0;
        DOM.video.play().catch(e => console.log('Video autoplay prevented:', e));
      }
    }, 1000);
  }
}

// Mobile menu functionality
class MobileMenu {
  static toggle() {
    if (DOM.menu) {
      DOM.menu.classList.toggle('show');
    } else {
      console.warn('Mobile menu element not found');
    }
  }
}

// Performance optimizations
class PerformanceOptimizer {
  static init() {
    this.addLastUpdated();
    this.optimizeMobileHeader();
    this.setBackgroundImages();
    this.setupIntersectionObserver();
  }

  static addLastUpdated() {
    if (!DOM.footer) {
      console.warn('Footer element not found for last updated timestamp');
      return;
    }

    try {
      const lastUpdated = new Date(document.lastModified);
      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

      const formattedDate = lastUpdated.toLocaleDateString(undefined, dateOptions);
      const formattedTime = lastUpdated.toLocaleTimeString(undefined, timeOptions);

      const updatedPara = document.createElement('p');
      updatedPara.textContent = `Last updated: ${formattedDate}, ${formattedTime}`;
      updatedPara.style.cssText = 'font-size: 0.8rem; color: #fff; margin-top: 5px;';

      DOM.footer.appendChild(updatedPara);
    } catch (error) {
      console.error('Error adding last updated timestamp:', error);
    }
  }

  static optimizeMobileHeader() {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      if (window.innerWidth <= 600 && DOM.header) {
        DOM.header.style.height = '970px';
        DOM.header.style.backgroundSize = 'cover';
      }
    });
  }

  static setBackgroundImages() {
    // Use requestAnimationFrame to avoid layout thrashing
    requestAnimationFrame(() => {
      const leadPastorSection = document.querySelector(".lead-pastor-section");
      if (leadPastorSection) {
        leadPastorSection.style.cssText += `
          background-image: url('Images/image2.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `;
      }

      const greatnessSection = document.querySelector(".greatness-section");
      if (greatnessSection) {
        greatnessSection.style.cssText += `
          background-image: url('Images/IMG-20250818-WA0060.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `;
      }
    });
  }

  // Intersection Observer for lazy loading optimization
  static setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// Error handling wrapper
function safeExecute(fn, context = 'Unknown') {
  try {
    return fn();
  } catch (error) {
    console.error(`Error in ${context}:`, error);
    return null;
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  safeExecute(() => {
    DOM.init();
    
    const slideShow = new SlideShow();
    slideShow.init();
    
    PerformanceOptimizer.init();
    
  }, 'DOMContentLoaded initialization');
}, { passive: true });

// Global function for mobile menu (keeping for backward compatibility)
function toggleMenu() {
  safeExecute(() => {
    MobileMenu.toggle();
  }, 'toggleMenu');
}

// Optimize window load event
window.addEventListener('load', () => {
  safeExecute(() => {
    PerformanceOptimizer.optimizeMobileHeader();
  }, 'window load optimization');
}, { passive: true });

// Add resize handler with debouncing for better performance
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    safeExecute(() => {
      PerformanceOptimizer.optimizeMobileHeader();
    }, 'resize optimization');
  }, 250);
}, { passive: true });

// Expression page specific functionality
if (window.location.pathname.includes('expression.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    safeExecute(() => {
      // Any expression page specific code can go here
      console.log('Expression page loaded successfully');
    }, 'Expression page initialization');
  });
}

//
// Simple version - adjust lead pastor padding
(function() {
  function setPastorPadding() {
    const section = document.querySelector('.lead-pastor-section');
    if (section && window.innerWidth > 1024) {
      section.style.padding = '650px 30px';
    }
  }
  
  // Run on load and resize
  window.addEventListener('load', setPastorPadding);
  window.addEventListener('resize', setPastorPadding);
})();


