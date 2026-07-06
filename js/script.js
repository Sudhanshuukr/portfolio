/**
 * Sudhanshu Kumar Portfolio - Core Client Logic
 * Author: Senior Full Stack Developer (5+ Years Experience)
 * Focus: High Performance, Accessibility (WCAG 2.1), Smooth CSS-first animations, Optimized DOM Repaints.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // STAR CONSTELLATION INTRO LOADER SCREEN
  // ==========================================
  const introLoader = document.getElementById('introLoader');
  const loaderCanvas = document.getElementById('loaderCanvas');
  const appContent = document.getElementById('appContent');

  // ── Section-aware loader gate ─────────────────────────────────────────────
  // Only play the star animation when the user is on the home section.
  // If the page is refreshed while scrolled to any other section (#about,
  // #skills, #projects, #contact) we skip the animation entirely and jump
  // straight to that section with a normal interface.
  const _hash = window.location.hash.toLowerCase();
  const _isHome = _hash === '' || _hash === '#home';

  if (!_isHome) {
    // Instantly bypass loader and reveal the page
    if (introLoader) {
      introLoader.style.transition = 'none';
      introLoader.style.opacity = '0';
      introLoader.style.pointerEvents = 'none';
      introLoader.style.display = 'none';
    }
    if (appContent) {
      appContent.classList.remove('opacity-0', 'pointer-events-none');
    }
    // Scroll to the correct section after the browser has painted the page
    const _targetSection = document.querySelector(_hash);
    if (_targetSection) {
      requestAnimationFrame(() => {
        _targetSection.scrollIntoView({ behavior: 'instant' });
      });
    }
  }
  // ─────────────────────────────────────────────────────────────────────────

  if (_isHome && introLoader && loaderCanvas) {
    const lCtx = loaderCanvas.getContext('2d');
    let lWidth = window.innerWidth;
    let lHeight = window.innerHeight;
    
    // Scale canvas for retina display
    const dpr = window.devicePixelRatio || 1;
    loaderCanvas.width = lWidth * dpr;
    loaderCanvas.height = lHeight * dpr;
    lCtx.scale(dpr, dpr);

    // Dynamic sizing helper
    const handleResize = () => {
      lWidth = window.innerWidth;
      lHeight = window.innerHeight;
      loaderCanvas.width = lWidth * dpr;
      loaderCanvas.height = lHeight * dpr;
      lCtx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    // Render text on offscreen canvas to scan pixel data
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    
    // Set offscreen canvas dimension
    offscreenCanvas.width = 600;
    offscreenCanvas.height = 150;
    
    offscreenCtx.fillStyle = '#000000';
    offscreenCtx.fillRect(0, 0, 600, 150);
    
    // Use the primary visual font family 'Outfit' or fallback sans-serif
    offscreenCtx.fillStyle = '#ffffff';
    offscreenCtx.font = '900 68px Outfit, sans-serif';
    offscreenCtx.textAlign = 'center';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.fillText('SUDHANSHU', 300, 75);

    // Scan pixel data
    const imgData = offscreenCtx.getImageData(0, 0, 600, 150).data;
    const targetPoints = [];
    const step = 4; // Scan spacing to control particle count (4 = denser/bolder text without extra brightness)

    for (let y = 0; y < 150; y += step) {
      for (let x = 0; x < 600; x += step) {
        const index = (y * 600 + x) * 4;
        // Check if pixel is white (text pixel)
        if (imgData[index] > 200) {
          targetPoints.push({ x: x - 300, y: y - 75 }); // Center coordinate system
        }
      }
    }

    // Initialize ambient background particles
    const bgParticles = [];
    const bgCount = 160;
    for (let i = 0; i < bgCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.6 + 0.4; // 0.4px to 1.0px drift speed
      bgParticles.push({
        isText: false,
        tx: 0,
        ty: 0,
        x: Math.random() * lWidth,
        y: Math.random() * lHeight,
        size: Math.random() * 0.8 + 0.6, // 0.6px to 1.4px
        alpha: 0, // Starts at 0 for fade-in
        targetAlpha: Math.random() * 0.15 + 0.20, // Faint 0.20 to 0.35 opacity
        color: '#ffffff',
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        twinkleSpeed: 0.03 + Math.random() * 0.04,
        twinkleOffset: Math.random() * Math.PI
      });
    }

    // Initialize glowing text particles
    const textParticles = targetPoints.map(pt => {
      const startX = Math.random() * lWidth;
      const startY = Math.random() * lHeight;
      return {
        isText: true,
        tx: pt.x,
        ty: pt.y,
        startX: startX,
        startY: startY,
        x: startX,
        y: startY,
        size: Math.random() * 0.9 + 0.7, // Slightly larger (0.7px to 1.6px) for bolder text appearance
        alpha: 0, // Starts at 0 for soft fade-in
        targetAlpha: Math.random() * 0.15 + 0.70, // Softer 0.70 to 0.85 opacity
        color: '#ffffff', // White stars only
        vx: 0,
        vy: 0,
        twinkleSpeed: 0.015 + Math.random() * 0.02, // Slower twinkle (3x slower)
        twinkleOffset: Math.random() * Math.PI
      };
    });

    const particles = [...textParticles, ...bgParticles];

    let phase = 0; // 0 = Fade In & Gather, 1 = Twinkle Static, 2 = Scatter/Mix/Decelerate, 3 = Infinite Static Twinkle
    let phaseTimer = 0;
    const centerPoint = { x: lWidth / 2, y: lHeight / 2 };

    const animateLoader = () => {
      // Loop runs indefinitely to maintain twinkling background on canvas

      lCtx.clearRect(0, 0, lWidth, lHeight);
      
      // Update viewport center dynamically
      centerPoint.x = lWidth / 2;
      centerPoint.y = lHeight / 2;

      phaseTimer++;

      if (phase === 0) {
        // Phase 0: Gathering phase over 120 frames (2s).
        // Stars start at scattered positions and slowly slide inward to merge in the center.
        const t = Math.min(1, phaseTimer / 120);
        // Smooth ease-out curve
        const ease = t * (2 - t);

        particles.forEach(p => {
          // Fade in softly during the first 30 frames
          p.alpha = p.targetAlpha * Math.min(1, phaseTimer / 30);

          if (p.isText) {
            const targetX = centerPoint.x + p.tx;
            const targetY = centerPoint.y + p.ty;
            p.x = p.startX + (targetX - p.startX) * ease;
            p.y = p.startY + (targetY - p.startY) * ease;
          } else {
            // Background stars drift and wrap around screen edges
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = lWidth;
            if (p.x > lWidth) p.x = 0;
            if (p.y < 0) p.y = lHeight;
            if (p.y > lHeight) p.y = 0;
          }
        });

        if (phaseTimer >= 120) {
          phase = 1;
          phaseTimer = 0;
        }
      } else if (phase === 1) {
        // Phase 1: Twinkle statically for 1.5s (90 frames)
        particles.forEach(p => {
          p.alpha = p.targetAlpha;
          if (p.isText) {
            p.x = centerPoint.x + p.tx;
            p.y = centerPoint.y + p.ty;
          } else {
            // Background stars continue drifting and wrapping
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = lWidth;
            if (p.x > lWidth) p.x = 0;
            if (p.y < 0) p.y = lHeight;
            if (p.y > lHeight) p.y = 0;
          }
        });

        if (phaseTimer >= 90) {
          phase = 2;
          phaseTimer = 0;
          
          // Trigger the page reveal and push canvas to background of home section only
          if (introLoader) {
            introLoader.style.backgroundColor = 'transparent';
            introLoader.className = 'absolute top-0 left-0 w-full h-screen bg-transparent z-0 pointer-events-none overflow-hidden transition-all duration-1000';
          }
          if (appContent) {
            appContent.classList.remove('opacity-0', 'pointer-events-none');
          }

          // Assign scatter destinations and drifting speeds
          particles.forEach(p => {
            if (p.isText) {
              p.targetX = Math.random() * lWidth;
              p.targetY = Math.random() * lHeight;
              // Dim down text stars to merge as background stars
              p.initialAlpha = p.alpha;
              p.finalAlpha = Math.random() * 0.1 + 0.1;
            } else {
              // Background stars get random move directions
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 1.5 + 0.8;
              p.vx = Math.cos(angle) * speed;
              p.vy = Math.sin(angle) * speed;
            }
          });
        }
      } else if (phase === 2) {
        // Phase 2: Stars scatter and mix for 5s, then decelerate to a stop over 1s (total 360 frames / 6s)
        let speedFactor = 1.0;
        if (phaseTimer > 300) {
          const decay = (phaseTimer - 300) / 60;
          speedFactor = Math.max(0, 1 - decay);
        }

        particles.forEach(p => {
          if (p.isText) {
            // Interpolate toward random scatter coordinates
            p.x += (p.targetX - p.x) * 0.035 * speedFactor;
            p.y += (p.targetY - p.y) * 0.035 * speedFactor;
            
            // Linear interpolate opacity down
            const opacityProgress = Math.min(1, phaseTimer / 120);
            p.alpha = p.initialAlpha + (p.finalAlpha - p.initialAlpha) * opacityProgress;
          } else {
            // Drift background stars
            p.x += p.vx * speedFactor;
            p.y += p.vy * speedFactor;
            
            // Wrap around edges
            if (p.x < 0) p.x = lWidth;
            if (p.x > lWidth) p.x = 0;
            if (p.y < 0) p.y = lHeight;
            if (p.y > lHeight) p.y = 0;
          }
        });

        if (phaseTimer >= 360) {
          phase = 3;
          phaseTimer = 0;
          
          // Freeze final positions
          particles.forEach(p => {
            p.vx = 0;
            p.vy = 0;
          });
          
          // Clean up DOM wrapper of loader since it is now transparent
          if (introLoader) {
            introLoader.style.pointerEvents = 'none';
          }
          window.removeEventListener('resize', handleResize);
        }
      } else if (phase === 3) {
        // Phase 3: Infinite static twinkle phase (acts as background)
        // No coordinate shifts, stars remain static and twinkle in final coordinates
      }

      // Draw all active particles
      particles.forEach(p => {
        // Apply twinkling variations
        // Text stars twinkle stably; background stars twinkle softly
        const twinkleFactor = p.isText && phase < 2 ? 0.18 : 0.25;
        const currentAlpha = Math.max(0, Math.min(1, p.alpha * ( (1 - twinkleFactor) + Math.sin(phaseTimer * p.twinkleSpeed + p.twinkleOffset) * twinkleFactor )));

        lCtx.beginPath();
        lCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        lCtx.fillStyle = '#ffffff'; // White stars only
        lCtx.globalAlpha = currentAlpha;
        lCtx.fill();
      });
      lCtx.globalAlpha = 1.0;

      requestAnimationFrame(animateLoader);
    };

    // Kick off animation loop
    animateLoader();
  } else {
    // Fail-safe: if elements are missing, immediately reveal main page content
    if (appContent) {
      appContent.classList.remove('opacity-0', 'pointer-events-none');
    }
  }

  // ==========================================
  // HELPER FUNCTIONS & DEBOUNCING
  // ==========================================
  
  /**
   * Debounces continuous event calls (like scroll or resize) to prevent rendering thread congestion.
   * @param {Function} func - Function to execute
   * @param {number} wait - Delay in milliseconds
   * @returns {Function}
   */
  const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ==========================================
  // THEME SWITCHER (DARK / LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggle');
  
  // Initialize theme setup based on local storage or system preference
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  // Listen for operating system theme changes in real-time
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  initTheme();

  // ==========================================
  // ACCESSIBLE MOBILE HAMBURGER MENU
  // ==========================================
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const hamburgerPath = document.getElementById('hamburgerPath');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = () => {
    const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
    
    mobileToggle.setAttribute('aria-expanded', !isOpen);
    mobileDrawer.setAttribute('aria-hidden', isOpen);
    
    if (!isOpen) {
      // Open state: Slide in drawer and transform hamburger lines into an 'X'
      mobileDrawer.classList.remove('translate-x-full');
      hamburgerPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      // Trap focus
      document.body.style.overflow = 'hidden';
      mobileDrawer.focus();
    } else {
      // Close state: Slide out drawer and restore hamburger lines
      mobileDrawer.classList.add('translate-x-full');
      hamburgerPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close drawer when any mobile nav link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggle.getAttribute('aria-expanded') === 'true') {
        toggleMobileMenu();
      }
    });
  });

  // Handle escape key to close mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
      toggleMobileMenu();
    }
  });

  // ==========================================
  // STICKY HEADER
  // ==========================================
  const header = document.getElementById('mainHeader');
  const backToTopBtn = document.getElementById('backToTop');

  // rAF-throttled scroll handler — synced to browser paint cycle, zero lag
  let _rafPending = false;
  const handleScroll = () => {
    if (_rafPending) return;
    _rafPending = true;
    requestAnimationFrame(() => {
      _rafPending = false;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;


      // 1. Sticky Header shadow class addition
      if (header) {
        if (scrollTop > 20) {
          header.classList.add('glass-nav', 'shadow-md');
          header.querySelector('div').classList.remove('py-4');
          header.querySelector('div').classList.add('py-3');
        } else {
          header.classList.remove('glass-nav', 'shadow-md');
          header.querySelector('div').classList.remove('py-3');
          header.querySelector('div').classList.add('py-4');
        }
      }

      // 2. Back to Top Button display threshold
      if (backToTopBtn) {
        if (scrollTop > 500) {
          backToTopBtn.classList.remove('opacity-0', 'translate-y-6', 'pointer-events-none');
          backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
          backToTopBtn.classList.add('opacity-0', 'translate-y-6', 'pointer-events-none');
          backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
      }
    });
  };

  // Fire once immediately so header reflects current scroll on load/refresh
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Back to top scroll execution
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // INTERSECTION OBSERVER: SCROLL SPY (ACTIVE LINKS)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let isClickScrolling = false;
  let clickScrollTimeout = null;

  // Immediately set the correct active nav link from the URL hash so there
  // is zero flash-of-wrong-active-state on page refresh.
  const initNavActiveState = () => {
    const currentHash = window.location.hash || '#home';
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('nav-link-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav-link-active');
        link.removeAttribute('aria-current');
      }
    });
  };
  initNavActiveState();

  // Attach click listeners to temporarily disable scroll spy updates during smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      isClickScrolling = true;
      clearTimeout(clickScrollTimeout);

      // Instantly highlight only the clicked link
      navLinks.forEach(l => {
        if (l === link) {
          l.classList.add('nav-link-active');
          l.setAttribute('aria-current', 'page');
        } else {
          l.classList.remove('nav-link-active');
          l.removeAttribute('aria-current');
        }
      });

      // Mute scroll spy until smooth scroll completes (approx 800ms)
      clickScrollTimeout = setTimeout(() => {
        isClickScrolling = false;
      }, 800);
    });
  });

  const scrollSpyOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Target trigger area centered in middle viewport
    threshold: 0
  };

  const scrollSpyCallback = (entries) => {
    if (isClickScrolling) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeSectionId = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeSectionId}`) {
            link.classList.add('nav-link-active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('nav-link-active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  };

  const scrollSpyObserver = new IntersectionObserver(scrollSpyCallback, scrollSpyOptions);
  sections.forEach(section => scrollSpyObserver.observe(section));

  // ==========================================
  // TYPING EFFECT (HERO HEADLINE CAROUSEL)
  // ==========================================
  const typedSubtitle = document.getElementById('typedSubtitle');
  const roles = [
    'Full Stack Developer',
    'Open Source Contributor'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const handleTyping = () => {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Remove character
      typedSubtitle.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster than types
    } else {
      // Add character
      typedSubtitle.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Toggle typing / deleting state switches
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at full text word before deletion starts
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length; // Loop back to start role
      typingSpeed = 500; // Pause before typing new word
    }

    setTimeout(handleTyping, typingSpeed);
  };

  if (typedSubtitle) {
    setTimeout(handleTyping, 1000);
  }

  // ==========================================
  // INTERSECTION OBSERVER: ANIMATE ON SCROLL (FADE IN/UP)
  // ==========================================
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  
  // Set starting state in JS to ensure CSS styles gracefully degrade if JS is disabled
  scrollRevealElements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700', 'ease-out');
  });

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target); // Trigger animation only once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.12
  });

  scrollRevealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // BUTTON RIPPLE CLICK EFFECT
  // ==========================================
  const rippleButtons = document.querySelectorAll('.ripple-btn');

  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Create element
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      
      // Calculate coordinates relative to clicked button
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      // Clean up ripple element from DOM
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ==========================================
  // HERO CONSTELLATION CANVAS ANIMATION
  // ==========================================
  const constellationCanvas = document.getElementById('constellationCanvas');
  if (constellationCanvas) {
    const ctx = constellationCanvas.getContext('2d');
    let width = constellationCanvas.offsetWidth;
    let height = constellationCanvas.offsetHeight;
    
    // Set high-DPI canvas size
    const resizeConstellation = () => {
      const dpr = window.devicePixelRatio || 1;
      width = constellationCanvas.clientWidth;
      height = constellationCanvas.clientHeight;
      constellationCanvas.width = width * dpr;
      constellationCanvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeConstellation();
    window.addEventListener('resize', resizeConstellation);
    
    // Tech nodes data
    const techs = [
      { name: 'React', color: '#06b6d4' },
      { name: 'Node.js', color: '#10b981' },
      { name: 'MongoDB', color: '#10b981' },
      { name: 'Express', color: '#8b5cf6' },
      { name: 'C++', color: '#6366f1' },
      { name: 'JavaScript', color: '#eab308' },
      { name: 'Tailwind', color: '#38bdf8' },
      { name: 'Git', color: '#f43f5e' }
    ];
    
    const nodes = techs.map(tech => ({
      name: tech.name,
      color: tech.color,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: 4,
      pulse: Math.random() * Math.PI
    }));
    
    let cMouse = { x: null, y: null, active: false };
    
    constellationCanvas.addEventListener('mousemove', (e) => {
      const rect = constellationCanvas.getBoundingClientRect();
      cMouse.x = e.clientX - rect.left;
      cMouse.y = e.clientY - rect.top;
      cMouse.active = true;
    });
    
    constellationCanvas.addEventListener('mouseleave', () => {
      cMouse.active = false;
    });
    
    const drawConstellation = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Measure text width to calculate dynamic safety boundaries
        ctx.font = '600 12px Inter, sans-serif';
        const textWidth = ctx.measureText(node.name).width;
        
        const minX = 10;
        const maxX = width - textWidth - 20; // 12px text offset + width + padding
        const minY = 15;
        const maxY = height - 15;

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;
        
        // Gentle attraction to mouse
        if (cMouse.active) {
          const dx = cMouse.x - node.x;
          const dy = cMouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            node.x += (dx / dist) * 0.3;
            node.y += (dy / dist) * 0.3;
          }
        }

        // Bounce and clamp within dynamic text boundaries
        if (node.x < minX) {
          node.x = minX;
          node.vx = Math.abs(node.vx);
        } else if (node.x > maxX) {
          node.x = maxX;
          node.vx = -Math.abs(node.vx);
        }
        
        if (node.y < minY) {
          node.y = minY;
          node.vy = Math.abs(node.vy);
        } else if (node.y > maxY) {
          node.y = maxY;
          node.vy = -Math.abs(node.vy);
        }
        
        // Pulse radius slightly
        node.pulse += 0.02;
        const currentRadius = node.radius + Math.sin(node.pulse) * 1.5;
        
        // Draw glow path
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color + '1a'; // 10% opacity
        ctx.fill();
        
        // Draw core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw Text Label
        ctx.font = '600 12px Inter, sans-serif';
        ctx.fillStyle = '#e4e4e7';
        ctx.textAlign = 'left';
        ctx.fillText(node.name, node.x + 12, node.y + 4);
      });
      
      // Draw links between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // Opacity fades with distance
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Draw links from mouse to nearby nodes
      if (cMouse.active) {
        nodes.forEach(node => {
          const dx = cMouse.x - node.x;
          const dy = cMouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(cMouse.x, cMouse.y);
            ctx.lineTo(node.x, node.y);
            
            // Draw a gradient line from mouse (indigo/cyan) to node color
            const grad = ctx.createLinearGradient(cMouse.x, cMouse.y, node.x, node.y);
            const alpha = (1 - dist / 150) * 0.35;
            grad.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
            grad.addColorStop(1, node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }
      
      requestAnimationFrame(drawConstellation);
    };
    
    drawConstellation();
  }

  // ==========================================
  // TWINKLING GALAXY STARS BACKGROUND
  // ==========================================
  const galaxyStars = document.getElementById('galaxyStars');
  if (galaxyStars) {
    const starCount = 35;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random size (1px to 3px)
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random animation duration (2.5s to 5.5s)
      const duration = Math.random() * 3 + 2.5;
      star.style.animationDuration = `${duration}s`;
      
      // Random animation delay (0s to 5s)
      const delay = Math.random() * 5;
      star.style.animationDelay = `${delay}s`;
      
      galaxyStars.appendChild(star);
    }
  }

});