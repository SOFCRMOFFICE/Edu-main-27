// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Floating animations for profile badges
const floatingBadges = document.querySelectorAll('.floating-badge');
floatingBadges.forEach((badge, index) => {
  gsap.to(badge, {
    y: gsap.utils.random(-20, 20),
    x: gsap.utils.random(-10, 10),
    rotation: gsap.utils.random(-5, 5),
    duration: gsap.utils.random(3, 5),
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: index * 0.2
  });
});

// Hero text animation
gsap.from('.hero-text', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

// Stats Counter Animation (Unlocking the section)
gsap.utils.toArray('.counter').forEach(counter => {
  const target = parseFloat(counter.getAttribute('data-target'));
  const rawObj = { val: 0 };

  gsap.to(rawObj, {
    val: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: counter,
      start: 'top 85%',
    },
    onUpdate: function () {
      let formatted;
      if (target >= 1000000) {
        formatted = (rawObj.val / 1000000).toFixed(1) + 'M+';
      } else if (target >= 1000) {
        formatted = Math.floor(rawObj.val / 1000) + 'k+';
      } else {
        formatted = Math.floor(rawObj.val) + '+';
      }
      // Clean up .0 for millions if needed, but toFixed(1) is okay for now.
      // Actually let's make it cleaner:
      if (formatted.endsWith('.0M+')) {
        formatted = formatted.replace('.0M+', 'M+');
      }

      counter.innerText = formatted;
    }
  });
});

// Stats cards appearance
gsap.from('.stat-card', {
  opacity: 0,
  y: 50,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '#stats-section',
    start: 'top 80%'
  }
});

// About/Mission items animation
const aboutItems = document.querySelectorAll('.about-item');
if (aboutItems.length > 0) {
  gsap.from(aboutItems, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%'
    }
  });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile Menu & Lenis
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
    // Close on link click (improves UX)
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    });
  });

  // Split text hero animation
  if (window.SplitType) {
    document.querySelectorAll('.split-text-target').forEach((target) => {

      const splitInstance = new SplitType(target, { types: 'words, chars' });

      gsap.from(splitInstance.chars, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: 'back.in',
        stagger: 0.02,
        scrollTrigger: {
          trigger: target,
          start: 'top 80%',
        }
      });
    });
  }

  // Partners Section - Swiper Initialization
  const partnersSwiper = new Swiper('.partnersSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 3000,
    
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    on: {
      init: function() {
        // Animate slides on init
        gsap.from('.swiper-slide', {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    }
  });

  // Partners Section - GSAP Animations
  const partnerItems = document.querySelectorAll('.partner-item');
  if (partnerItems.length > 0) {
    gsap.from(partnerItems, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#partners',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Animate partner cards on slide change
  partnersSwiper.on('slideChange', function() {
    const activeSlides = document.querySelectorAll('.swiper-slide-active, .swiper-slide-next, .swiper-slide-prev');
    activeSlides.forEach((slide, index) => {
      gsap.fromTo(slide.querySelector('.partner-card'), 
        {
          scale: 0.9,
          opacity: 0.7
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out'
        }
      );
    });
  });

  // Contact form animations
  const contactItems = document.querySelectorAll('.contact-item');
  if (contactItems.length > 0) {
    gsap.from(contactItems, {
      opacity: 1,
      y: 30,
      duration: 0.2,
      stagger: 1,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 5%'
      }
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Show success message (in a real application, you would send this to a server)
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>';
      submitButton.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
});
