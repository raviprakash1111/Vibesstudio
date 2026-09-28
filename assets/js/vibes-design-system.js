/**
 * VIBES STUDIO — OFFICIAL INTERACTIVE CONTROLLER
 * Header Scroll, Mobile Drawer, Dynamic Gallery Filters, Lightbox Modal & Testimonials Carousel
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Scroll Reveal Animation Observer (Step 13 Responsive UX & Premium Motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Active Navigation Highlight Controller
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link, .mobile-nav-link');

  function highlightActiveNav() {
    const scrollPosition = window.scrollY + 140;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // 1. Header Scroll Effect
  const header = document.querySelector('.vibes-site-header');
  
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 2. Mobile Drawer Navigation Controller
  const mobileToggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-drawer a, .mobile-nav-link');

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  function openMobileMenu() {
    if (!mobileToggleBtn || !mobileDrawer) return;
    mobileToggleBtn.classList.add('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileToggleBtn || !mobileDrawer) return;
    mobileToggleBtn.classList.remove('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // 3. Dynamic Gallery Category Filter Tabs & Empty State (Step 7)
  const filterTabs = document.querySelectorAll('.gallery-filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-item-card, .gallery-featured-hero');
  const galleryEmptyMsg = document.getElementById('gallery-empty-msg');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');
      let visibleCount = 0;

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || (itemCategory && itemCategory.includes(filterValue))) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (galleryEmptyMsg) {
        galleryEmptyMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
      }
    });
  });

  // 4. Interactive Lightbox Modal with Next/Prev & Keyboard/Swipe Navigation (Step 7)
  const lightboxModal = document.getElementById('vibes-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  let currentGalleryIndex = 0;
  let galleryMediaList = [];

  function updateGalleryMediaList() {
    galleryMediaList = Array.from(galleryItems)
      .filter(item => item.style.display !== 'none')
      .map(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-item-title, h3');
        return {
          src: img ? img.src : '',
          alt: img ? img.alt : 'VIBES STUDIO Gallery Preview',
          title: title ? title.textContent : ''
        };
      });
  }

  function openLightboxIndex(index) {
    updateGalleryMediaList();
    if (galleryMediaList.length === 0 || !lightboxModal || !lightboxImg) return;
    currentGalleryIndex = (index + galleryMediaList.length) % galleryMediaList.length;
    const media = galleryMediaList[currentGalleryIndex];
    lightboxImg.src = media.src;
    lightboxImg.alt = media.alt;
    lightboxModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightboxIndex(index);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => openLightboxIndex(currentGalleryIndex - 1));
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => openLightboxIndex(currentGalleryIndex + 1));

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    // Touch Swipe Support for Mobile Lightbox
    let touchStartX = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) openLightboxIndex(currentGalleryIndex + 1);
      if (touchEndX > touchStartX + 40) openLightboxIndex(currentGalleryIndex - 1);
    }, { passive: true });
  }

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('is-active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') openLightboxIndex(currentGalleryIndex + 1);
      if (e.key === 'ArrowLeft') openLightboxIndex(currentGalleryIndex - 1);
    }
  });

  // 5. Testimonial Controller (Step 8 Dynamic Data & Strict Empty State Rule)
  const testimonialsGrid = document.getElementById('testimonials-grid');
  const testimonialsDisplayWrapper = document.getElementById('testimonials-display-wrapper');
  const testimonialsEmptyState = document.getElementById('testimonials-empty-state');

  const rawTestimonials = (typeof VibesDataStore !== 'undefined')
    ? VibesDataStore.getTestimonials().filter(t => t.active !== false && t.isActive !== false)
    : [];

  if (rawTestimonials.length === 0) {
    if (testimonialsDisplayWrapper) testimonialsDisplayWrapper.style.display = 'none';
    if (testimonialsEmptyState) testimonialsEmptyState.style.display = 'block';
  } else {
    if (testimonialsEmptyState) testimonialsEmptyState.style.display = 'none';
    if (testimonialsDisplayWrapper) testimonialsDisplayWrapper.style.display = 'block';

    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = rawTestimonials.map(t => {
        const name = t.author || t.name || 'VIBES Student';
        const role = t.role || (t.relationship ? `${t.relationship} Review` : 'Verified Community Member');
        const cat = t.category || t.className || 'General Review';
        const quote = t.testimonial || t.quote || '';
        const initial = name.charAt(0).toUpperCase();

        return `
          <div class="testimonial-card">
            <p class="testimonial-card-quote">“${quote}”</p>
            <div class="testimonial-card-author">
              <div class="testimonial-author-info">
                <div class="testimonial-avatar-badge">${initial}</div>
                <div>
                  <h4 class="testimonial-author-name" style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 800; margin: 0; color: var(--brand-black);">${name}</h4>
                  <p class="testimonial-author-role" style="font-size: 0.78rem; color: var(--brand-muted); margin: 0;">${role}</p>
                  <span class="testimonial-verified-tag">✓ Verified Experience</span>
                </div>
              </div>
              <span class="testimonial-cat-badge" style="background: rgba(38, 97, 39, 0.12); color: var(--brand-green); font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: var(--radius-full); font-family: var(--font-heading); text-transform: uppercase;">${cat}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    });
  }

  // Create dot indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        currentTestimonialIndex = idx;
        renderTestimonial(currentTestimonialIndex);
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Initial render
  renderTestimonial(0);

  // 6. Color Swatch Copy to Clipboard (Design System Board)
  const colorSwatches = document.querySelectorAll('.color-swatch-card');
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const colorCode = swatch.getAttribute('data-color');
      if (colorCode) {
        navigator.clipboard.writeText(colorCode).then(() => {
          showToast(`Copied ${colorCode} to clipboard!`);
        });
      }
    });
  });

  // 7. Schedule & Fees Controller (Step 9)
  const VIBES_SCHEDULE_DATA = [
    {
      id: "skd-01",
      className: "Kids Creative Dance",
      category: ["kids", "dance"],
      batchName: "Junior Beginners Batch",
      ageGroup: "Age 4 – 10 Yrs",
      days: "Mon, Wed, Fri",
      startTime: "4:30 PM",
      endTime: "5:30 PM",
      monthlyFee: "1,500",
      status: "OPEN",
      description: "Fun, energetic foundation in dance rhythm, balance, and stage expression.",
      isActive: true,
      sortOrder: 1
    },
    {
      id: "skd-02",
      className: "Senior Kids Dance Training",
      category: ["kids", "dance"],
      batchName: "Senior Kids Batch",
      ageGroup: "Age 11 – 15 Yrs",
      days: "Tue, Thu, Sat",
      startTime: "5:30 PM",
      endTime: "6:30 PM",
      monthlyFee: "1,800",
      status: "FEW SEATS",
      description: "Intermediate dance choreography, style technique, and performance routines.",
      isActive: true,
      sortOrder: 2
    },
    {
      id: "adh-01",
      className: "Adult Hip-Hop & Contemporary",
      category: ["dance"],
      batchName: "Adult Prime Evening",
      ageGroup: "Age 16+ Yrs",
      days: "Tue, Thu, Sat",
      startTime: "6:40 PM",
      endTime: "7:40 PM",
      monthlyFee: "2,000",
      status: "OPEN",
      description: "High-energy adult dance training covering urban hip-hop and lyrical contemporary.",
      isActive: true,
      sortOrder: 3
    },
    {
      id: "zmb-01",
      className: "Zumba Fitness Workout",
      category: ["zumba", "fitness"],
      batchName: "Morning Cardio Batch",
      ageGroup: "All Ages",
      days: "Mon, Wed, Fri",
      startTime: "7:00 AM",
      endTime: "8:00 AM",
      monthlyFee: "1,800",
      status: "OPEN",
      description: "High-calorie burn dance workout set to upbeat Latin and international rhythms.",
      isActive: true,
      sortOrder: 4
    },
    {
      id: "zmb-02",
      className: "Zumba Fitness Workout",
      category: ["zumba", "fitness"],
      batchName: "Evening Glow Batch",
      ageGroup: "All Ages",
      days: "Mon, Wed, Fri",
      startTime: "6:30 PM",
      endTime: "7:30 PM",
      monthlyFee: "1,800",
      status: "FEW SEATS",
      description: "De-stress after work with energetic cardio dance & body toning routines.",
      isActive: true,
      sortOrder: 5
    },
    {
      id: "art-01",
      className: "Creative Art & Craft Workshop",
      category: ["art"],
      batchName: "Weekend Creative Batch",
      ageGroup: "Age 5 – 14 Yrs",
      days: "Saturday & Sunday",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      monthlyFee: "1,500",
      status: "OPEN",
      description: "Hands-on drawing, acrylic painting, craft making, and artistic skill building.",
      isActive: true,
      sortOrder: 6
    },
    {
      id: "tui-01",
      className: "Academic Tuition Support",
      category: ["tuitions"],
      batchName: "After-School Learning Batch",
      ageGroup: "Class 1 – Class 10",
      days: "Mon to Fri",
      startTime: "4:00 PM",
      endTime: "6:00 PM",
      monthlyFee: "2,500",
      status: "OPEN",
      description: "Structured academic tutoring, homework assistance, and conceptual study guidance.",
      isActive: true,
      sortOrder: 7
    }
  ];

  const scheduleContainer = document.getElementById('schedule-list');
  
  let currentScheduleCategory = 'all';
  let currentScheduleDay = 'all';

  function buildWhatsAppUrl(className, batchName, days, startTime, endTime) {
    const phoneNumber = "919876543210";
    let textMessage = `Hi VIBES STUDIO,\nI would like to enquire about:\nClass: ${className}\nBatch: ${batchName}`;
    if (days) textMessage += `\nDays: ${days}`;
    if (startTime && endTime) textMessage += `\nTime: ${startTime} – ${endTime}`;
    textMessage += `\nPlease share the details.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;
  }

  function getStatusBadgeHtml(status) {
    if (!status) return `<span class="status-badge status-available">AVAILABLE</span>`;
    const cleanStatus = String(status).toUpperCase();
    if (cleanStatus === 'OPEN' || cleanStatus === 'AVAILABLE') {
      return `<span class="status-badge status-available">AVAILABLE</span>`;
    } else if (cleanStatus === 'FEW SEATS' || cleanStatus === 'FEW' || cleanStatus === 'LIMITED') {
      return `<span class="status-badge status-limited">LIMITED</span>`;
    } else if (cleanStatus === 'FULL') {
      return `<span class="status-badge status-full">FULL</span>`;
    } else if (cleanStatus === 'COMING SOON' || cleanStatus === 'COMING_SOON') {
      return `<span class="status-badge status-coming-soon">COMING SOON</span>`;
    }
    return `<span class="status-badge status-available">${cleanStatus}</span>`;
  }

  function batchMatchesDay(daysString, selectedDay) {
    if (!selectedDay || selectedDay === 'all') return true;
    if (!daysString) return false;
    const str = String(daysString).toLowerCase();
    
    if (str.includes('mon to fri') || str.includes('monday to friday')) {
      return ['mon', 'tue', 'wed', 'thu', 'fri'].includes(selectedDay);
    }
    if (str.includes('saturday & sunday') || str.includes('sat & sun')) {
      return ['sat', 'sun'].includes(selectedDay);
    }

    const dayMap = {
      'mon': ['mon', 'monday'],
      'tue': ['tue', 'tuesday'],
      'wed': ['wed', 'wednesday'],
      'thu': ['thu', 'thursday'],
      'fri': ['fri', 'friday'],
      'sat': ['sat', 'saturday'],
      'sun': ['sun', 'sunday']
    };

    const targets = dayMap[selectedDay] || [selectedDay];
    return targets.some(target => str.includes(target));
  }

  function renderSchedule() {
    if (!scheduleContainer) return;

    const scheduleData = (typeof VibesDataStore !== 'undefined')
      ? VibesDataStore.getBatches().map(b => ({
          id: b.id,
          className: b.className,
          category: Array.isArray(b.category) ? b.category : [b.category],
          batchName: b.batchName,
          ageGroup: b.ageGroup || 'All Ages',
          days: b.days || 'Flexible',
          startTime: b.startTime || '',
          endTime: b.endTime || '',
          monthlyFee: b.monthlyFee,
          status: b.availability || b.status || 'AVAILABLE',
          description: b.description,
          isActive: b.isActive !== undefined ? b.isActive : true,
          sortOrder: b.sortOrder || 1
        }))
      : VIBES_SCHEDULE_DATA;

    const filteredItems = scheduleData.filter(item => {
      if (!item.isActive) return false;
      
      // Category filter
      let matchesCat = (currentScheduleCategory === 'all');
      if (!matchesCat && item.category) {
        matchesCat = item.category.some(c => String(c).toLowerCase() === currentScheduleCategory.toLowerCase() || item.className.toLowerCase().includes(currentScheduleCategory.toLowerCase()));
      }

      // Day filter
      const matchesDay = batchMatchesDay(item.days, currentScheduleDay);

      return matchesCat && matchesDay;
    }).sort((a, b) => a.sortOrder - b.sortOrder);

    if (filteredItems.length === 0) {
      scheduleContainer.innerHTML = `
        <div class="schedule-empty-card">
          <div class="empty-state-icon">🗓️</div>
          <h3 class="empty-state-heading">Schedule Coming Soon</h3>
          <p class="empty-state-text">
            No active class batches match your selected criteria. Please contact VIBES STUDIO for current class availability and timings.
          </p>
          <a href="#contact" class="btn btn-primary">CONTACT VIBES STUDIO</a>
        </div>
      `;
      return;
    }

    scheduleContainer.innerHTML = filteredItems.map(item => {
      const waUrl = buildWhatsAppUrl(item.className, item.batchName, item.days, item.startTime, item.endTime);
      const statusHtml = getStatusBadgeHtml(item.status);

      let feeHtml = '';
      if (item.monthlyFee && String(item.monthlyFee).trim() !== '' && String(item.monthlyFee).trim() !== '0') {
        const cleanFee = String(item.monthlyFee).replace(/^₹\s*/, '');
        feeHtml = `
          <span class="fee-amount">₹${cleanFee}</span>
          <span class="fee-period">per month</span>
        `;
      } else {
        feeHtml = `<span class="fee-contact-text">Contact us for fee details</span>`;
      }

      const timingText = (item.startTime && item.endTime)
        ? `${item.startTime.replace(/ /g, '&nbsp;')}&nbsp;–&nbsp;${item.endTime.replace(/ /g, '&nbsp;')}`
        : 'Contact for timings';

      return `
        <div class="schedule-card" data-category="${item.category.join(' ')}">
          <div class="schedule-card-main">
            <h3 class="schedule-class-name">${item.className}</h3>
            <div class="schedule-batch-name">${item.batchName}</div>
            <div class="schedule-status-row">
              ${statusHtml}
            </div>
          </div>

          <div class="schedule-card-details">
            <div class="detail-item">
              <span class="detail-label">AGE GROUP</span>
              <span class="detail-value">${item.ageGroup}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">DAYS</span>
              <span class="detail-value">${item.days}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">TIMING</span>
              <span class="detail-value">${timingText}</span>
            </div>
          </div>

          <div class="schedule-card-action">
            <div class="schedule-fee-box">
              ${feeHtml}
            </div>

            <div class="schedule-actions-group">
              <a href="#contact" data-class="${item.className}" data-batch="${item.batchName}" class="btn btn-primary btn-sm schedule-enquire-btn">
                ENQUIRE NOW
              </a>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-outline" aria-label="Ask on WhatsApp" title="Enquire on WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.96 9.96 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.985A9.98 9.98 0 0012.012 2zm.003 16.297h-.003a8.28 8.28 0 01-4.223-1.157l-.303-.18-3.137.742.827-3.053-.197-.314a8.275 8.275 0 01-1.267-4.354c.001-4.57 3.72-8.285 8.293-8.285 2.215 0 4.298.863 5.864 2.43 1.566 1.568 2.428 3.652 2.427 5.867 0 4.57-3.719 8.284-8.285 8.284zm4.542-6.197c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062-.249-.125-1.052-.388-2.003-1.237-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.015-.384.11-.508.112-.112.249-.29.373-.435.124-.145.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.202-.486-.407-.42-.56-.428h-.477c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075 0 1.224.892 2.407 1.016 2.573.124.166 1.756 2.681 4.254 3.761.594.257 1.058.411 1.42.526.597.19 1.14.163 1.57.099.479-.071 1.472-.602 1.679-1.183.208-.581.208-1.079.145-1.183-.062-.104-.228-.166-.477-.291z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind dynamic ENQUIRE NOW clicks to pre-fill enquiry form
    scheduleContainer.querySelectorAll('.schedule-enquire-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const clsName = btn.getAttribute('data-class');
        const bthName = btn.getAttribute('data-batch');
        const categorySelect = document.getElementById('enquiry-category');
        const msgField = document.getElementById('enquiry-message');
        if (categorySelect && clsName) {
          const matchOpt = Array.from(categorySelect.options).find(opt => 
            opt.value.toLowerCase() === clsName.toLowerCase() || 
            clsName.toLowerCase().includes(opt.value.toLowerCase()) || 
            opt.value.toLowerCase().includes(clsName.toLowerCase())
          );
          if (matchOpt) {
            categorySelect.value = matchOpt.value;
            categorySelect.dispatchEvent(new Event('change'));
          }
        }
        if (msgField && clsName) {
          msgField.value = `Enquiring about ${clsName}${bthName ? ' (' + bthName + ')' : ''}. Please share class schedule and admission details.`;
        }
      });
    });
  }

  // Bind Category & Day Tab Clicks
  document.querySelectorAll('.schedule-tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.schedule-tab-btn').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentScheduleCategory = tab.getAttribute('data-filter') || 'all';
      renderSchedule();
    });
  });

  document.querySelectorAll('.schedule-day-btn').forEach(dayBtn => {
    dayBtn.addEventListener('click', () => {
      document.querySelectorAll('.schedule-day-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      dayBtn.classList.add('active');
      dayBtn.setAttribute('aria-selected', 'true');
      currentScheduleDay = dayBtn.getAttribute('data-day') || 'all';
      renderSchedule();
    });
  });

  // Initial Schedule Render
  renderSchedule('all');

  // 8. FAQ Accordion Controller (Step 11)
  const faqAccordion = document.getElementById('faq-accordion');
  if (faqAccordion) {
    const faqItems = faqAccordion.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');

      if (btn && panel) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-active');

          // Close all items for clean accordion UX
          faqItems.forEach(otherItem => {
            otherItem.classList.remove('is-active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = '0px';
          });

          // Toggle clicked item
          if (!isOpen) {
            item.classList.add('is-active');
            btn.setAttribute('aria-expanded', 'true');
            panel.style.maxHeight = panel.scrollHeight + 30 + 'px';
          }
        });
      }
    });
  }

  // 9. Enquiry Form & Dynamic Batch Handler (Step 11)
  const categorySelect = document.getElementById('enquiry-category');
  const batchSelect = document.getElementById('enquiry-batch');
  const enquiryForm = document.getElementById('vibes-enquiry-form');
  const whatsappBtn = document.getElementById('btn-whatsapp-dynamic');
  const successMsgBox = document.getElementById('enquiry-success-msg');

  const BATCH_MAP = {
    "Kids Dance": [
      "Junior Beginners Batch (4:30 PM – 5:30 PM)",
      "Senior Kids Batch (5:30 PM – 6:30 PM)",
      "Weekend Special Kids Batch"
    ],
    "Senior / Kids Dance": [
      "Senior Kids Batch (5:30 PM – 6:30 PM)",
      "General Training Batch"
    ],
    "Adult Dance": [
      "Adult Prime Evening (6:40 PM – 7:40 PM)",
      "Hip-Hop & Contemporary Special"
    ],
    "Zumba Fitness": [
      "Morning Cardio Batch (7:00 AM – 8:00 AM)",
      "Evening Glow Batch (6:30 PM – 7:30 PM)"
    ],
    "Art Classes": [
      "Weekend Creative Batch (10:00 AM – 11:30 AM)",
      "Custom Drawing & Painting Workshop"
    ],
    "Tuitions": [
      "After-School Learning Batch (4:00 PM – 6:00 PM)",
      "Class 1 - 5 Foundation",
      "Class 6 - 10 Subject Mastery"
    ],
    "Sangeeth Choreography": [
      "Bride & Groom Couple Choreography",
      "Family & Group Theme Dance",
      "Sangeeth Complete Event Package"
    ],
    "Pre-Wedding Choreography": [
      "Couples Romantic Routine",
      "Concept Video Choreography"
    ],
    "Birthday Events": [
      "Kids Party Dance Animation",
      "Surprise Group Performance"
    ],
    "Corporate Events": [
      "Employee Team Building Choreography",
      "Annual Day Stage Performance"
    ],
    "Kitty Parties": [
      "Fun Zumba & Dance Session",
      "Theme Choreography"
    ],
    "Event Performance": [
      "Professional Studio Troupe Show",
      "Custom Stage Performance"
    ],
    "Dance Workshop": [
      "Weekend Masterclass",
      "School / College Special Workshop"
    ],
    "Anchoring": [
      "Stage Anchoring & Emcee Services",
      "Event Coordination"
    ],
    "Other": [
      "General Studio Enquiry",
      "Custom Requirement"
    ]
  };

  if (categorySelect && batchSelect) {
    categorySelect.addEventListener('change', () => {
      const selectedCat = categorySelect.value;
      const availableBatches = BATCH_MAP[selectedCat] || ["General Batch / Flexible"];

      batchSelect.innerHTML = availableBatches.map(b => `<option value="${b}">${b}</option>`).join('');
    });

    // Auto Pre-select from URL Parameters (Step 16 Flow Preservation)
    const urlParams = new URLSearchParams(window.location.search);
    const preCat = urlParams.get('category') || urlParams.get('class') || urlParams.get('service');
    const preBatch = urlParams.get('batch');

    if (preCat) {
      const matchOpt = Array.from(categorySelect.options).find(opt => opt.value.toLowerCase() === preCat.toLowerCase());
      if (matchOpt) {
        categorySelect.value = matchOpt.value;
        categorySelect.dispatchEvent(new Event('change'));
        if (preBatch && batchSelect) {
          const matchBatch = Array.from(batchSelect.options).find(opt => opt.value.toLowerCase().includes(preBatch.toLowerCase()));
          if (matchBatch) batchSelect.value = matchBatch.value;
        }
      }
    }
  }

  // Pre-select Class/Service Category when clicking [data-class] or [data-service] buttons
  document.querySelectorAll('[data-class], [data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetVal = btn.getAttribute('data-class') || btn.getAttribute('data-service');
      if (categorySelect && targetVal) {
        const matchOpt = Array.from(categorySelect.options).find(opt => opt.value.toLowerCase() === targetVal.toLowerCase() || opt.value.toLowerCase().includes(targetVal.toLowerCase()));
        if (matchOpt) {
          categorySelect.value = matchOpt.value;
          categorySelect.dispatchEvent(new Event('change'));
        }
      }
    });
  });

  // Dynamic WhatsApp Chat Button Action
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('enquiry-fullname');
      const catVal = categorySelect ? categorySelect.value : '';
      const batchVal = batchSelect ? batchSelect.value : '';
      const nameVal = nameInput && nameInput.value ? nameInput.value.trim() : '';

      let textMsg = "Hi VIBES STUDIO, I would like to enquire about ";
      if (catVal) {
        textMsg += `${catVal}`;
        if (batchVal) textMsg += ` (${batchVal})`;
      } else {
        textMsg += "your dance classes and event services";
      }

      if (nameVal) {
        textMsg += `. My name is ${nameVal}`;
      }

      textMsg += ". Please share the details.";

      const settings = (typeof VibesDataStore !== 'undefined') ? VibesDataStore.getSettings() : {};
      const waNumber = settings.whatsappNumber || "919876543210";
      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(textMsg)}`;
      
      if (typeof VibesAnalytics !== 'undefined') {
        VibesAnalytics.trackWhatsAppClick(catVal || 'Form Button', textMsg);
      }
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Form Validation & Honeypot Spam Submission
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Lightweight Honeypot Spam Check (Step 16)
      const hpField = document.getElementById('enquiry-hp-field');
      if (hpField && hpField.value.trim() !== '') {
        console.warn("Spam bot detected via honeypot field.");
        enquiryForm.reset();
        return;
      }

      const nameInput = document.getElementById('enquiry-fullname');
      const phoneInput = document.getElementById('enquiry-phone');
      const catInput = document.getElementById('enquiry-category');

      let isValid = true;

      // Validate Full Name
      const nameGroup = nameInput ? nameInput.closest('.form-group') : null;
      if (!nameInput || !nameInput.value.trim()) {
        if (nameGroup) nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (nameGroup) nameGroup.classList.remove('has-error');
      }

      // Validate Phone Number (10 digits)
      const phoneGroup = phoneInput ? phoneInput.closest('.form-group') : null;
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
        if (phoneGroup) phoneGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (phoneGroup) phoneGroup.classList.remove('has-error');
      }

      // Validate Category
      const catGroup = catInput ? catInput.closest('.form-group') : null;
      if (!catInput || !catInput.value) {
        if (catGroup) catGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (catGroup) catGroup.classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = document.getElementById('btn-submit-enquiry');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>SUBMITTING ENQUIRY...</span>`;
        }

        const enquiryPayload = {
          name: nameInput.value.trim(),
          phone: phoneInput.value.trim(),
          interestedIn: catInput.value,
          batchService: batchSelect ? batchSelect.value : '',
          preferredTime: document.getElementById('enquiry-time') ? document.getElementById('enquiry-time').value.trim() : '',
          message: document.getElementById('enquiry-message') ? document.getElementById('enquiry-message').value.trim() : '',
          status: 'NEW'
        };

        if (typeof VibesDataStore !== 'undefined') {
          VibesDataStore.addEnquiry(enquiryPayload);
        }

        if (typeof VibesAnalytics !== 'undefined') {
          VibesAnalytics.trackEnquirySubmit(enquiryPayload.interestedIn, enquiryPayload.batchService);
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>SEND ENQUIRY</span>`;
          }

          if (successMsgBox) {
            successMsgBox.style.display = 'flex';
          }

          enquiryForm.reset();
          showToast("Thank you for contacting VIBES STUDIO.");

          setTimeout(() => {
            if (successMsgBox) successMsgBox.style.display = 'none';
          }, 6000);
        }, 800);
      }
    });
  }

  // 10. Footer Privacy Policy & Terms Modal Dialog (Step 16)
  const privacyBtn = document.getElementById('btn-privacy');
  const termsBtn = document.getElementById('btn-terms');

  function showLegalModal(title, textContent) {
    let modal = document.getElementById('vibes-legal-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'vibes-legal-modal';
      modal.className = 'admin-modal-backdrop';
      modal.innerHTML = `
        <div class="admin-modal-box" style="max-width: 650px;">
          <h3 class="modal-title" id="legal-modal-title" style="color: var(--brand-black);"></h3>
          <div id="legal-modal-body" style="font-size: 0.9rem; line-height: 1.6; color: var(--brand-muted); margin-bottom: 20px;"></div>
          <div class="modal-actions">
            <button class="btn btn-primary" id="btn-close-legal">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('btn-close-legal').addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    document.getElementById('legal-modal-title').textContent = title;
    document.getElementById('legal-modal-body').innerHTML = textContent;
    modal.style.display = 'flex';
  }

  if (privacyBtn) {
    privacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showLegalModal(
        "VIBES STUDIO — Privacy Policy",
        `<p>At VIBES STUDIO, we respect your personal privacy. Information collected through our enquiry forms (such as your Name and Phone Number) is strictly used to communicate class schedules, batch openings, and event choreography details.</p>
         <p>We do NOT sell, rent, or share your contact details with third-party marketers. All enquiry records are managed securely within our studio administrative system.</p>`
      );
    });
  }

  if (termsBtn) {
    termsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showLegalModal(
        "VIBES STUDIO — Terms & Conditions",
        `<p>1. Class Enrolment: Admission to dance, Zumba, and creative batches is subject to seat availability in our Aganampudi studio.</p>
         <p>2. Complimentary Trials: Free trial demo classes must be booked in advance via WhatsApp or online enquiry form.</p>
         <p>3. Safety & Hygiene: Students and visitors must adhere to studio guidelines to maintain a clean, encouraging, and safe learning environment.</p>`
      );
    });
  }

  function showToast(message) {
    let toast = document.getElementById('vibes-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vibes-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.backgroundColor = '#111111';
      toast.style.color = '#FFFFFF';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '9999px';
      toast.style.fontSize = '14px';
      toast.style.fontWeight = '700';
      toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
      toast.style.zIndex = '9999';
      toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 2500);
  }
});



