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
  const _rawHash = window.location.hash.toLowerCase();
  const _targetId = _rawHash.startsWith('#') ? _rawHash.slice(1) : '';
  const _isHome = !_targetId || _targetId === 'home';

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
    // Safely retrieve section by ID without risking CSS selector injection or syntax crash
    const _targetSection = document.getElementById(_targetId);
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
      centerPoint.x = lWidth / 2;
      centerPoint.y = lHeight / 2;
    };
    window.addEventListener('resize', handleResize);

    // Calculate responsive font size for "SUDHANSHU" based on viewport width
    // Base desktop font size is 68px (text width ~500px)
    const baseFontSize = 68;
    // Leave at least 28px total horizontal margin on small screens
    const maxAvailableWidth = Math.min(520, lWidth - 28);

    // Measure at base font size to calculate exact scaling factor
    const testCanvas = document.createElement('canvas');
    const testCtx = testCanvas.getContext('2d');
    testCtx.font = `900 ${baseFontSize}px Outfit, sans-serif`;
    const measuredBaseWidth = testCtx.measureText('SUDHANSHU').width || 500;

    let actualFontSize = baseFontSize;
    if (measuredBaseWidth > maxAvailableWidth) {
      actualFontSize = Math.max(26, Math.floor(baseFontSize * (maxAvailableWidth / measuredBaseWidth)));
    }

    // Render text on offscreen canvas to scan pixel data
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const offW = Math.ceil(maxAvailableWidth + 60);
    const offH = Math.ceil(actualFontSize * 2.2);
    const offCenterX = Math.floor(offW / 2);
    const offCenterY = Math.floor(offH / 2);

    offscreenCanvas.width = offW;
    offscreenCanvas.height = offH;

    offscreenCtx.fillStyle = '#0a0e17';
    offscreenCtx.fillRect(0, 0, offW, offH);

    // Use the primary visual font family 'Outfit' or fallback sans-serif
    offscreenCtx.fillStyle = '#ffffff';
    offscreenCtx.font = `900 ${actualFontSize}px Outfit, sans-serif`;
    offscreenCtx.textAlign = 'center';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.fillText('SUDHANSHU', offCenterX, offCenterY);

    // Scan pixel data
    const imgData = offscreenCtx.getImageData(0, 0, offW, offH).data;
    const targetPoints = [];
    // Dynamic scan step: 3 for smaller mobile font sizes for crisp definition, 4 for desktop
    const step = actualFontSize < 45 ? 3 : 4;

    for (let y = 0; y < offH; y += step) {
      for (let x = 0; x < offW; x += step) {
        const index = (y * offW + x) * 4;
        // Check if pixel is white (text pixel)
        if (imgData[index] > 200) {
          targetPoints.push({ x: x - offCenterX, y: y - offCenterY }); // Center coordinate system
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

    // Initialize glowing text particles (dynamically scaled for smaller screens)
    const particleScale = actualFontSize < 45 ? 0.75 : 1.0;
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
        size: (Math.random() * 0.9 + 0.7) * particleScale, // Responsive dot sizing
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
        const currentAlpha = Math.max(0, Math.min(1, p.alpha * ((1 - twinkleFactor) + Math.sin(phaseTimer * p.twinkleSpeed + p.twinkleOffset) * twinkleFactor)));

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
  // ACCESSIBLE MOBILE HAMBURGER MENU
  // ==========================================
  const mobileToggle = document.getElementById('mobileMenuBtn') || document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('mobileDrawer');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.remove('hidden');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  };

  const closeMobileMenu = () => {
    if (!mobileMenu || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('hidden');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  };

  const toggleMobileMenu = () => {
    const isExpanded = mobileToggle && mobileToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close drawer/dropdown when any mobile nav link or action is clicked
  const allMobileLinks = document.querySelectorAll('#mobileMenu a, .mobile-nav-link');
  allMobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Handle escape key to close mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileToggle && mobileToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
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

      // 1. Sticky Header shadow class addition
      if (header) {
        if (scrollTop > 10) {
          header.classList.add('scrolled-header');
        } else {
          header.classList.remove('scrolled-header');
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

      // 3. Continuously synchronize active navigation state on manual scroll
      updateActiveSectionOnScroll();
    });
  };

  // Fire once immediately so header reflects current scroll on load/refresh
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Set current copyright year dynamically
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Back to top scroll execution
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // SCROLL-SPY ACTIVE SECTION INDICATOR ENGINE
  // ==========================================
  const trackedSectionIds = ['home', 'projects', 'skills', 'about', 'contact'];
  const trackedSections = trackedSectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-bottom-link');
  const mobileDrawerNavLinks = document.querySelectorAll('.mobile-nav-link');
  let isClickScrolling = false;
  let clickScrollTimeout = null;
  let currentActiveSectionId = null;

  // Single source of truth for active section state across desktop & mobile
  function setActiveSection(sectionId) {
    if (!sectionId || sectionId === currentActiveSectionId) return;
    currentActiveSectionId = sectionId;

    // 1. Desktop navigation links (Orange indicator underline via .nav-link-active)
    desktopNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('nav-link-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('nav-link-active');
        link.removeAttribute('aria-current');
      }
    });

    // 2. Mobile drawer navigation links
    mobileDrawerNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.remove('text-[#555C68]');
        link.classList.add('text-[#F06D13]');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('text-[#F06D13]', 'text-[#15191E]');
        link.classList.add('text-[#555C68]');
        link.removeAttribute('aria-current');
      }
    });

    // 3. Mobile bottom navigation links (where present)
    mobileNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Pure geometric scroll-spy: computes active section from 35% viewport focal reference
  function updateActiveSectionOnScroll() {
    if (isClickScrolling) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const maxScroll = scrollHeight - viewportHeight;

    // 1. Genuine Top Boundary: Home is ONLY active when genuinely near the top of the page
    if (scrollTop <= 80) {
      setActiveSection('home');
      return;
    }

    // 2. Genuine Bottom Boundary: Contact activates when reaching bottom of page,
    // even if shorter than the viewport or other sections
    if (maxScroll > 0 && scrollTop >= maxScroll - 80) {
      setActiveSection('contact');
      return;
    }

    // 3. Viewport focal reference line at 35% from the top of the viewport
    const focalPoint = viewportHeight * 0.35;

    let bestSectionId = null;
    let minDistance = Infinity;

    for (let i = 0; i < trackedSections.length; i++) {
      const section = trackedSections[i];
      const rect = section.getBoundingClientRect();

      // If section actively spans across the 30% focal line: exact match
      if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
        bestSectionId = section.id;
        minDistance = 0;
        break;
      }

      // If user is in a gap or between sections, measure distance to the nearest section boundary
      let dist;
      if (rect.top > focalPoint) {
        dist = rect.top - focalPoint;
      } else {
        dist = focalPoint - rect.bottom;
      }

      // Home should only be active at genuine top of page, never chosen via distance fallback mid-page
      if (section.id === 'home' && scrollTop > 150) {
        continue;
      }

      if (dist < minDistance) {
        minDistance = dist;
        bestSectionId = section.id;
      }
    }

    if (bestSectionId) {
      setActiveSection(bestSectionId);
    }
  }

  // Immediately set the initial active link from URL hash or current scroll position
  const initNavActiveState = () => {
    const rawHash = window.location.hash.toLowerCase();
    const targetId = rawHash.startsWith('#') ? rawHash.slice(1) : '';
    const initialSection = targetId ? document.getElementById(targetId) : null;
    if (initialSection) {
      setActiveSection(targetId);
    } else {
      updateActiveSectionOnScroll();
    }
  };
  initNavActiveState();

  // Desktop navigation and interactive section anchor click handlers
  const navActionLinks = document.querySelectorAll('.nav-link, header a[href^="#"], #home a[href^="#"], .mobile-nav-link');
  navActionLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetHref = link.getAttribute('href');
      if (!targetHref || !targetHref.startsWith('#')) return;

      const targetId = targetHref.slice(1);
      if (!targetId) return;

      isClickScrolling = true;
      clearTimeout(clickScrollTimeout);

      setActiveSection(targetId);

      clickScrollTimeout = setTimeout(() => {
        isClickScrolling = false;
        updateActiveSectionOnScroll();
      }, 800);
    });
  });

  // Mobile bottom navigation click handlers (smooth scroll + synchronized active state)
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (!targetHref || !targetHref.startsWith('#')) return;

      const targetId = targetHref.slice(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      e.preventDefault();

      isClickScrolling = true;
      clearTimeout(clickScrollTimeout);

      setActiveSection(targetId);

      // Smooth scroll to target section
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // Update URL hash without sudden viewport jumping
      if (history.pushState) {
        history.pushState(null, '', targetHref);
      }

      clickScrollTimeout = setTimeout(() => {
        isClickScrolling = false;
        updateActiveSectionOnScroll();
      }, 800);
    });
  });

  // IntersectionObserver to continuously synchronize active section across intersection changes
  const scrollSpyObserver = new IntersectionObserver(() => {
    if (!isClickScrolling) {
      updateActiveSectionOnScroll();
    }
  }, { threshold: [0, 0.25, 0.5, 0.75, 1.0] });

  trackedSections.forEach(section => scrollSpyObserver.observe(section));

  // Clean up observer if page unloads or navigates away
  window.addEventListener('beforeunload', () => {
    scrollSpyObserver.disconnect();
  }, { once: true });

  // ==========================================
  // TECHNICAL SKILLS - INTERACTIVE TECH ITEMS
  // ==========================================
  const techItems = document.querySelectorAll('.tech-item');
  if (techItems.length > 0) {
    let activeTechItem = null;

    techItems.forEach(item => {
      // Touch and click handler for touch devices / click
      item.addEventListener('click', (e) => {
        // If clicking the currently active item, toggle it off
        if (activeTechItem === item) {
          item.classList.remove('tech-active');
          activeTechItem = null;
          return;
        }

        // Deactivate previously active item
        if (activeTechItem) {
          activeTechItem.classList.remove('tech-active');
        }

        // Activate clicked item
        item.classList.add('tech-active');
        activeTechItem = item;
      });

      // Keyboard support (Enter or Space toggles state)
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    // Dismiss active tech item when tapping or clicking outside
    document.addEventListener('click', (e) => {
      if (activeTechItem && !e.target.closest('.tech-item')) {
        activeTechItem.classList.remove('tech-active');
        activeTechItem = null;
      }
    });

    // Clear active state on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeTechItem) {
        activeTechItem.classList.remove('tech-active');
        activeTechItem = null;
      }
    });
  }

  // ==========================================
  // CONTACT SECTION - COPY EMAIL HANDLER
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');
  let copyTimeout = null;

  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'sudhanshukr388@gmail.com';
      let copied = false;

      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch (clipErr) {
          // Fall through to textarea fallback if permission/focus fails
        }
      }

      if (!copied) {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          textArea.style.top = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          copied = document.execCommand('copy');
          document.body.removeChild(textArea);
        } catch (fallbackErr) {
          // Fallback failed
        }
      }

      // Always show feedback to user on click (fallback or modern)
      clearTimeout(copyTimeout);
      copyEmailText.textContent = 'Copied!';
      copyEmailBtn.setAttribute('aria-label', 'Email address copied to clipboard');

      copyTimeout = setTimeout(() => {
        copyEmailText.textContent = 'Copy';
        copyEmailBtn.setAttribute('aria-label', 'Copy email to clipboard');
      }, 2000);
    });
  }

});
