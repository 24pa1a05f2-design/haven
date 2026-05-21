/**
 * Haven — Sustainable Modular Architecture
 * Minimalist Landing Page JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const parallaxCard = document.getElementById('parallax-card');
  const cardImages = document.querySelectorAll('.parallax-img');
  const indicatorBars = document.querySelectorAll('.indicator-bar');
  const cardFooterTitle = document.getElementById('card-footer-title');
  const cardFooterDesc = document.getElementById('card-footer-desc');
  const floatingOverlay = document.querySelector('.floating-overlay');
  const featureItems = document.querySelectorAll('.feature-item');
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterInput = document.getElementById('newsletter-input');
  const newsletterSubmit = document.getElementById('newsletter-submit');

  // =========================================================================
  // 1. Scroll-driven Header Glassmorphism
  // =========================================================================
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // =========================================================================
  // 2. Mobile Fullscreen Menu Toggle
  // =========================================================================
  const toggleMobileMenu = () => {
    const isActive = mobileMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('hamburger-active');
    
    // Prevent background body scrolling when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking menu links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburgerBtn.classList.remove('hamburger-active');
      document.body.style.overflow = '';
    });
  });

  // =========================================================================
  // 3. Advanced 3D Mouse Parallax Effect & Image Cycling on Hero Card
  // =========================================================================
  const cardContent = [
    { title: 'Haven Cabin 01', desc: '42m² • Forest Modular Platform' },
    { title: 'Acre Deck Lounge', desc: 'Nordic Wood • Custom Outdoor Deck' },
    { title: 'Mindful Inner Retreat', desc: 'Oak Cladding • Minimalist Warm Lighting' }
  ];

  if (parallaxCard) {
    parallaxCard.addEventListener('mousemove', (e) => {
      const cardRect = parallaxCard.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Calculate mouse coordinates relative to the center of the card
      const mouseX = e.clientX - cardRect.left - cardWidth / 2;
      const mouseY = e.clientY - cardRect.top - cardHeight / 2;
      
      // 1. 3D Tilt rotation (desktop only)
      if (window.innerWidth > 1024) {
        const rotateX = -(mouseY / (cardHeight / 2)) * 8;
        const rotateY = (mouseX / (cardWidth / 2)) * 8;
        parallaxCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      }
      
      // 2. Parallax Image Translations & Floating Badge Translation
      const translateImageX = -(mouseX / (cardWidth / 2)) * 12;
      const translateImageY = -(mouseY / (cardHeight / 2)) * 12;
      cardImages.forEach(img => {
        img.style.transform = `scale(1.06) translate(${translateImageX}px, ${translateImageY}px)`;
      });
      
      const translateOverlayX = (mouseX / (cardWidth / 2)) * 18;
      const translateOverlayY = (mouseY / (cardHeight / 2)) * 18;
      if (floatingOverlay) {
        floatingOverlay.style.transform = `translateZ(40px) translate(${translateOverlayX}px, ${translateOverlayY}px)`;
      }
      
      // 3. Image Cycling based on horizontal mouse position
      const hoverX = e.clientX - cardRect.left;
      const zoneWidth = cardWidth / 3;
      let activeIndex = 0;
      
      if (hoverX < zoneWidth) {
        activeIndex = 0;
      } else if (hoverX < zoneWidth * 2) {
        activeIndex = 1;
      } else {
        activeIndex = 2;
      }
      
      // Only trigger updates if the active index has changed
      if (cardImages[activeIndex] && !cardImages[activeIndex].classList.contains('active')) {
        // Toggle Active Images
        cardImages.forEach((img, idx) => {
          if (idx === activeIndex) {
            img.classList.add('active');
          } else {
            img.classList.remove('active');
          }
        });
        
        // Toggle Progress Indicators
        indicatorBars.forEach((bar, idx) => {
          if (idx === activeIndex) {
            bar.classList.add('active');
          } else {
            bar.classList.remove('active');
          }
        });
        
        // Update Card Details with beautiful smooth fade
        if (cardFooterTitle && cardFooterDesc) {
          cardFooterTitle.style.opacity = '0.3';
          cardFooterDesc.style.opacity = '0.3';
          
          setTimeout(() => {
            cardFooterTitle.textContent = cardContent[activeIndex].title;
            cardFooterDesc.textContent = cardContent[activeIndex].desc;
            cardFooterTitle.style.opacity = '1';
            cardFooterDesc.style.opacity = '1';
          }, 150);
        }
      }
    });

    // Reset card states when mouse leaves
    parallaxCard.addEventListener('mouseleave', () => {
      parallaxCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
      cardImages.forEach(img => {
        img.style.transform = 'scale(1) translate(0px, 0px)';
      });
      if (floatingOverlay) {
        floatingOverlay.style.transform = 'translateZ(30px) translate(0px, 0px)';
      }
      
      // Optionally reset to first image
      cardImages.forEach((img, idx) => {
        if (idx === 0) img.classList.add('active');
        else img.classList.remove('active');
      });
      indicatorBars.forEach((bar, idx) => {
        if (idx === 0) bar.classList.add('active');
        else bar.classList.remove('active');
      });
      if (cardFooterTitle && cardFooterDesc) {
        cardFooterTitle.textContent = cardContent[0].title;
        cardFooterDesc.textContent = cardContent[0].desc;
      }
    });
  }

  // =========================================================================
  // 4. Clean Viewport Scroll Reveals
  // =========================================================================
  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4.2;

    featureItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        // Add dynamic staggered transition delays
        item.style.transitionDelay = `${index * 0.15}s`;
        item.classList.add('reveal');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check on load

  // =========================================================================
  // 5. Interactive Form Submission
  // =========================================================================
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = newsletterInput.value.trim();
      if (!email) return;

      // Animate submit button to loading state
      newsletterSubmit.textContent = '...';
      newsletterSubmit.disabled = true;
      newsletterInput.disabled = true;

      // Simulate a premium smooth subscription response
      setTimeout(() => {
        // Transition form into a elegant checkmark success notification
        newsletterForm.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px; color: var(--color-accent); font-size: 0.9rem; font-weight: 600; padding: 4px 0; animation: fade-slide-up 0.5s ease forwards;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Welcome to the Journal.
          </div>
        `;
      }, 1000);
    });
  }

  // =========================================================================
  // 6. Interactive CTA Button Press Feedback
  // =========================================================================
  const primaryCta = document.getElementById('cta-primary');
  if (primaryCta) {
    primaryCta.addEventListener('click', (e) => {
      if (primaryCta.getAttribute('href').startsWith('#')) {
        // Let it handle default scrolling but add a subtle click effect
        primaryCta.style.transform = 'scale(0.95)';
        setTimeout(() => {
          primaryCta.style.transform = '';
        }, 150);
      }
    });
  }
});
