/**
 * VIBES STUDIO — UNIFIED DATA STORE CONTROLLER
 * Handles local persistence, seed database initialization, and synchronized data access
 * between the Public Website and the Admin Panel.
 */

(function(global) {
  const DB_KEY = 'vibes_studio_db_v1';
  const AUTH_KEY = 'vibes_admin_auth_session';

  // INITIAL SEED DATABASE
  const SEED_DATA = {
    users: [
      {
        id: "usr-01",
        email: "admin@vibesstudio.com",
        password: "VibesAdmin2026!",
        name: "S. Prakash Rao Surisetti",
        role: "admin",
        createdAt: "2026-09-27T00:00:00.000Z"
      }
    ],

    classes: [
      {
        id: "cls-01",
        name: "Kids Creative Dance",
        category: "Kids Dance",
        description: "Fun, energetic dance foundation for young children, building rhythm, coordination, and stage expression.",
        image: "assets/images/class-kids-dance.png",
        ageGroup: "Age 4 – 10 Yrs",
        status: "ACTIVE",
        sortOrder: 1
      },
      {
        id: "cls-02",
        name: "Senior Kids Dance Training",
        category: "Senior / Kids Dance",
        description: "Intermediate choreography, style technique refinement, and performance routines for teens & youth.",
        image: "assets/images/class-senior-kids.png",
        ageGroup: "Age 11 – 15 Yrs",
        status: "ACTIVE",
        sortOrder: 2
      },
      {
        id: "cls-03",
        name: "Adult Hip-Hop & Contemporary",
        category: "Adult Dance",
        description: "Modern adult dance routines combining urban hip-hop grooves and expressive lyrical contemporary movement.",
        image: "assets/images/class-adult-dance.png",
        ageGroup: "Age 16+ Yrs",
        status: "ACTIVE",
        sortOrder: 3
      },
      {
        id: "cls-04",
        name: "Zumba Fitness Workout",
        category: "Zumba Fitness",
        description: "High-calorie burn cardio workouts set to upbeat Latin and international rhythms led by certified instructors.",
        image: "assets/images/class-zumba.png",
        ageGroup: "All Ages",
        status: "ACTIVE",
        sortOrder: 4
      },
      {
        id: "cls-05",
        name: "Creative Art & Craft Workshop",
        category: "Art Classes",
        description: "Hands-on drawing, acrylic painting, craft making, and artistic skill building for kids.",
        image: "assets/images/class-art.png",
        ageGroup: "Age 5 – 14 Yrs",
        status: "ACTIVE",
        sortOrder: 5
      },
      {
        id: "cls-06",
        name: "Academic Tuition Support",
        category: "Tuitions",
        description: "Structured academic tutoring, conceptual study guidance, and subject support for school students.",
        image: "assets/images/dance-card-preview.png",
        ageGroup: "Class 1 – Class 10",
        status: "ACTIVE",
        sortOrder: 6
      }
    ],

    batches: [
      {
        id: "bth-01",
        classId: "cls-01",
        className: "Kids Creative Dance",
        category: ["kids", "dance"],
        batchName: "Junior Beginners Batch",
        ageGroup: "Age 4 – 10 Yrs",
        days: "Mon, Wed, Fri",
        startTime: "4:30 PM",
        endTime: "5:30 PM",
        monthlyFee: "1,500",
        availability: "OPEN",
        description: "Fun, energetic foundation in dance rhythm, balance, and stage expression.",
        isActive: true,
        sortOrder: 1
      },
      {
        id: "bth-02",
        classId: "cls-02",
        className: "Senior Kids Dance Training",
        category: ["kids", "dance"],
        batchName: "Senior Kids Batch",
        ageGroup: "Age 11 – 15 Yrs",
        days: "Tue, Thu, Sat",
        startTime: "5:30 PM",
        endTime: "6:30 PM",
        monthlyFee: "1,800",
        availability: "FEW SEATS",
        description: "Intermediate dance choreography, style technique, and performance routines.",
        isActive: true,
        sortOrder: 2
      },
      {
        id: "bth-03",
        classId: "cls-03",
        className: "Adult Hip-Hop & Contemporary",
        category: ["dance"],
        batchName: "Adult Prime Evening",
        ageGroup: "Age 16+ Yrs",
        days: "Tue, Thu, Sat",
        startTime: "6:40 PM",
        endTime: "7:40 PM",
        monthlyFee: "2,000",
        availability: "OPEN",
        description: "High-energy adult dance training covering urban hip-hop and lyrical contemporary.",
        isActive: true,
        sortOrder: 3
      },
      {
        id: "bth-04",
        classId: "cls-04",
        className: "Zumba Fitness Workout",
        category: ["zumba", "fitness"],
        batchName: "Morning Cardio Batch",
        ageGroup: "All Ages",
        days: "Mon, Wed, Fri",
        startTime: "7:00 AM",
        endTime: "8:00 AM",
        monthlyFee: "1,800",
        availability: "OPEN",
        description: "High-calorie burn dance workout set to upbeat Latin and international rhythms.",
        isActive: true,
        sortOrder: 4
      },
      {
        id: "bth-05",
        classId: "cls-04",
        className: "Zumba Fitness Workout",
        category: ["zumba", "fitness"],
        batchName: "Evening Glow Batch",
        ageGroup: "All Ages",
        days: "Mon, Wed, Fri",
        startTime: "6:30 PM",
        endTime: "7:30 PM",
        monthlyFee: "1,800",
        availability: "FEW SEATS",
        description: "De-stress after work with energetic cardio dance & body toning routines.",
        isActive: true,
        sortOrder: 5
      },
      {
        id: "bth-06",
        classId: "cls-05",
        className: "Creative Art & Craft Workshop",
        category: ["art"],
        batchName: "Weekend Creative Batch",
        ageGroup: "Age 5 – 14 Yrs",
        days: "Saturday & Sunday",
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        monthlyFee: "1,500",
        availability: "OPEN",
        description: "Hands-on drawing, acrylic painting, craft making, and artistic skill building.",
        isActive: true,
        sortOrder: 6
      },
      {
        id: "bth-07",
        classId: "cls-06",
        className: "Academic Tuition Support",
        category: ["tuitions"],
        batchName: "After-School Learning Batch",
        ageGroup: "Class 1 – Class 10",
        days: "Mon to Fri",
        startTime: "4:00 PM",
        endTime: "6:00 PM",
        monthlyFee: "2,500",
        availability: "OPEN",
        description: "Structured academic tutoring, homework assistance, and conceptual study guidance.",
        isActive: true,
        sortOrder: 7
      }
    ],

    services: [
      {
        id: "srv-01",
        name: "Sangeeth Choreography",
        category: "Choreography",
        shortDesc: "Dance choreography and preparation for Sangeeth celebrations.",
        detailedDesc: "Tailored routines for family, friends, bride & groom, and special group performances.",
        image: "assets/images/event-sangeeth.png",
        ctaText: "Enquire for Sangeeth",
        isActive: true,
        sortOrder: 1
      },
      {
        id: "srv-02",
        name: "Pre-Wedding Choreography",
        category: "Choreography",
        shortDesc: "Customized dance preparation for couples and families.",
        detailedDesc: "Graceful romantic routines designed for pre-wedding functions and concept videos.",
        image: "assets/images/event-prewedding.png",
        ctaText: "Enquire for Pre-Wedding",
        isActive: true,
        sortOrder: 2
      },
      {
        id: "srv-03",
        name: "Birthday Events",
        category: "Events",
        shortDesc: "Dance and performance experiences for birthday celebrations.",
        detailedDesc: "Interactive dance routines and animation for kids parties and special birthday galas.",
        image: "assets/images/class-kids-dance.png",
        ctaText: "Enquire for Birthday",
        isActive: true,
        sortOrder: 3
      },
      {
        id: "srv-04",
        name: "Corporate Events",
        category: "Events",
        shortDesc: "Dance, performances and entertainment for corporate occasions.",
        detailedDesc: "Employee dance choreography, team building performances, and annual day galas.",
        image: "assets/images/event-corporate.png",
        ctaText: "Enquire for Corporate",
        isActive: true,
        sortOrder: 4
      },
      {
        id: "srv-05",
        name: "Kitty Parties",
        category: "Events",
        shortDesc: "Dance and entertainment experiences for group celebrations.",
        detailedDesc: "Energetic Zumba workshops and fun group dance choreography sessions.",
        image: "assets/images/class-zumba.png",
        ctaText: "Enquire for Kitty Party",
        isActive: true,
        sortOrder: 5
      },
      {
        id: "srv-06",
        name: "Event Performances",
        category: "Events",
        shortDesc: "Stage dance troupe performances designed for special occasions.",
        detailedDesc: "High-energy dance troupe shows for cultural events, festivals, and launch celebrations.",
        image: "assets/images/physical-studio-preview.png",
        ctaText: "Book Performances",
        isActive: true,
        sortOrder: 6
      },
      {
        id: "srv-07",
        name: "Dance Workshops",
        category: "Workshops",
        shortDesc: "Specialized dance learning masterclasses.",
        detailedDesc: "Intensive workshops conducted across various dance styles, age groups, and fitness trends.",
        image: "assets/images/gallery-workshop.png",
        ctaText: "Enquire for Workshops",
        isActive: true,
        sortOrder: 7
      },
      {
        id: "srv-08",
        name: "Anchoring",
        category: "Events",
        shortDesc: "Event hosting and stage anchoring services.",
        detailedDesc: "Professional stage emcee presence and audience engagement for special occasions.",
        image: "assets/images/class-art.png",
        ctaText: "Book Anchoring",
        isActive: true,
        sortOrder: 8
      }
    ],

    events: [
      {
        id: "evt-01",
        name: "Hip-Hop Intensive Masterclass",
        eventType: "Workshop",
        date: "2026-10-15",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        location: "VIBES STUDIO, Aganampudi",
        description: "Intensive urban hip-hop routine workshop covering isolation, grooves, and stage presentation.",
        image: "assets/images/gallery-workshop.png",
        registrationLink: "https://wa.me/919876543210",
        eventStatus: "Upcoming",
        isActive: true
      },
      {
        id: "evt-02",
        name: "Diwali Celebration Dance Showcase",
        eventType: "Event",
        date: "2026-11-01",
        startTime: "5:00 PM",
        endTime: "8:00 PM",
        location: "Aganampudi Cultural Center",
        description: "Annual festival performance by VIBES STUDIO junior and senior dance batches.",
        image: "assets/images/event-corporate.png",
        registrationLink: "https://wa.me/919876543210",
        eventStatus: "Upcoming",
        isActive: true
      }
    ],

    gallery: [
      {
        id: "gal-01",
        title: "Junior Dance Training Session",
        mediaType: "Image",
        url: "assets/images/class-kids-dance.png",
        category: "Kids",
        description: "Kids building rhythm and coordination in studio.",
        date: "2026-09-10",
        featured: true,
        isActive: true,
        sortOrder: 1
      },
      {
        id: "gal-02",
        title: "Sangeeth Grand Family Dance Routine",
        mediaType: "Image",
        url: "assets/images/event-sangeeth.png",
        category: "Events",
        description: "Choreographed wedding celebration dance performance.",
        date: "2026-09-12",
        featured: true,
        isActive: true,
        sortOrder: 2
      },
      {
        id: "gal-03",
        title: "High Energy Morning Zumba Fitness",
        mediaType: "Image",
        url: "assets/images/class-zumba.png",
        category: "Zumba",
        description: "Cardio workout batch in session.",
        date: "2026-09-15",
        featured: true,
        isActive: true,
        sortOrder: 3
      },
      {
        id: "gal-04",
        title: "Hip Hop Master Workshop",
        mediaType: "Image",
        url: "assets/images/gallery-workshop.png",
        category: "Workshops",
        description: "Intensive workshop with guest choreographers.",
        date: "2026-09-18",
        featured: true,
        isActive: true,
        sortOrder: 4
      },
      {
        id: "gal-05",
        title: "VIBES STUDIO Interior Air-Conditioned Floor",
        mediaType: "Image",
        url: "assets/images/physical-studio-preview.png",
        category: "Studio",
        description: "Wooden floor and air-conditioned environment.",
        date: "2026-09-20",
        featured: true,
        isActive: true,
        sortOrder: 5
      },
      {
        id: "gal-06",
        title: "Pre-Wedding Couple Performance Routine",
        mediaType: "Image",
        url: "assets/images/event-prewedding.png",
        category: "Choreography",
        description: "Romantic couple routine choreography.",
        date: "2026-09-22",
        featured: true,
        isActive: true,
        sortOrder: 6
      }
    ],

    testimonials: [
      {
        id: "tst-01",
        author: "Lakshmi Narayana",
        relationship: "Parent",
        role: "Junior Dance Parent",
        testimonial: "VIBES STUDIO provides a warm, encouraging environment. My daughter has grown so much in confidence, balance, and rhythm.",
        photo: "",
        category: "Kids Dance",
        active: true,
        sortOrder: 1
      },
      {
        id: "tst-02",
        author: "K. Rajesh & Family",
        relationship: "Client",
        role: "Event Choreography Client",
        testimonial: "The team created customized, graceful Sangeeth routines for our entire family. Their patience and choreography made our celebration unforgettable!",
        photo: "",
        category: "Sangeeth Choreography",
        active: true,
        sortOrder: 2
      },
      {
        id: "tst-03",
        author: "P. Sravani",
        relationship: "Student",
        role: "Zumba Class Participant",
        testimonial: "High energy, fantastic music selection, certified instruction, and a genuinely motivating studio atmosphere in Aganampudi.",
        photo: "",
        category: "Zumba Fitness",
        active: true,
        sortOrder: 3
      }
    ],

    enquiries: [
      {
        id: "enq-01",
        name: "Ravi Kumar",
        phone: "9876543210",
        interestedIn: "Kids Dance",
        batchService: "Junior Beginners Batch (4:30 PM – 5:30 PM)",
        preferredTime: "Evening Batch",
        message: "Looking for admission for my 6-year-old son.",
        date: "2026-09-27 10:30 AM",
        status: "NEW",
        note: "Interested in demo class."
      },
      {
        id: "enq-02",
        name: "Anita Verma",
        phone: "9123456789",
        interestedIn: "Sangeeth Choreography",
        batchService: "Bride & Groom Couple Choreography",
        preferredTime: "Weekend Flexible",
        message: "Need choreography for wedding on Nov 15th.",
        date: "2026-09-26 04:15 PM",
        status: "CONTACTED",
        note: "Sent price breakdown on WhatsApp."
      }
    ],

    site_settings: {
      studioName: "VIBES STUDIO",
      tagline: "Feel the way you move",
      phone: "+91 98765 43210",
      whatsappNumber: "919876543210",
      email: "info@vibesstudio.com",
      address: "Aganampudi, Visakhapatnam, Andhra Pradesh, India",
      googleMapsUrl: "https://maps.google.com/?q=Aganampudi,Visakhapatnam,Andhra+Pradesh",
      youtubeUrl: "https://youtube.com/@vibesstudiovizag",
      instagramUrl: "https://instagram.com"
    },

    homepage_content: {
      heroHeadline: "FEEL THE WAY YOU MOVE",
      heroHeadlineAccent: "YOU MOVE",
      heroSupportingText: "Dance. Fitness. Creativity. Experience the VIBES in our high-energy physical studio space in Aganampudi, Visakhapatnam.",
      heroImage: "assets/images/hero-studio-bg.png",
      primaryCtaText: "BOOK A FREE DEMO",
      primaryCtaLink: "#contact",
      secondaryCtaText: "EXPLORE CLASSES",
      secondaryCtaLink: "#classes"
    },

    seo_settings: {
      homepageTitle: "VIBES STUDIO | Dance, Zumba & Choreography in Aganampudi, Vizag",
      homepageMetaDesc: "VIBES STUDIO in Aganampudi, Visakhapatnam offers dance classes, Zumba fitness, choreography, workshops, events and creative learning experiences.",
      homepageOgTitle: "VIBES STUDIO | Dance, Zumba & Choreography in Aganampudi, Vizag",
      homepageOgDesc: "VIBES STUDIO in Aganampudi, Visakhapatnam offers dance classes, Zumba fitness, choreography, workshops, events and creative learning experiences.",
      homepageOgImage: "assets/images/hero-studio-bg.png",

      classesTitle: "Dance & Fitness Classes in Aganampudi | VIBES STUDIO",
      classesMetaDesc: "Explore dance and fitness classes at VIBES STUDIO in Aganampudi, Visakhapatnam. Kids dance, adult dance, Zumba fitness, art classes, and academic tuitions.",

      choreographyTitle: "Sangeeth & Event Choreography in Vizag | VIBES STUDIO",
      choreographyMetaDesc: "Professional event choreography in Visakhapatnam. Sangeeth choreography, pre-wedding dance, birthday events, corporate performances, and workshops.",

      aboutTitle: "About VIBES STUDIO | Dance & Fitness Studio in Vizag",
      aboutMetaDesc: "About VIBES STUDIO in Aganampudi, Visakhapatnam and founder S. Prakash Rao Surisetti. Professional dance, Zumba fitness and event choreography.",

      contactTitle: "Contact VIBES STUDIO | Aganampudi, Visakhapatnam",
      contactMetaDesc: "Contact VIBES STUDIO in Aganampudi, Visakhapatnam. Phone, WhatsApp quick chat, location directions, and online enquiry form."
    }
  };

  // INITIALIZATION HANDLER
  function initDataStore() {
    const existing = localStorage.getItem(DB_KEY);
    if (!existing) {
      localStorage.setItem(DB_KEY, JSON.stringify(SEED_DATA));
    } else {
      // Merge keys if missing
      try {
        const parsed = JSON.parse(existing);
        let updated = false;
        Object.keys(SEED_DATA).forEach(key => {
          if (!parsed[key]) {
            parsed[key] = SEED_DATA[key];
            updated = true;
          }
        });
        if (updated) {
          localStorage.setItem(DB_KEY, JSON.stringify(parsed));
        }
      } catch(e) {
        localStorage.setItem(DB_KEY, JSON.stringify(SEED_DATA));
      }
    }
  }

  function getDB() {
    initDataStore();
    return JSON.parse(localStorage.getItem(DB_KEY));
  }

  function saveDB(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }

  // PUBLIC VIBES DATA STORE API
  const VibesDataStore = {
    getDB: getDB,

    // AUTH MANAGEMENT
    login: function(email, password) {
      const db = getDB();
      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (user) {
        const session = {
          token: "vibes_token_" + Date.now(),
          user: { id: user.id, email: user.email, name: user.name, role: user.role }
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true, session: session };
      }
      return { success: false, message: "Invalid email or password." };
    },

    logout: function() {
      localStorage.removeItem(AUTH_KEY);
    },

    getSession: function() {
      const session = localStorage.getItem(AUTH_KEY);
      if (!session) return null;
      try {
        return JSON.parse(session);
      } catch(e) {
        return null;
      }
    },

    isAuthenticated: function() {
      return this.getSession() !== null;
    },

    // CLASSES
    getClasses: function() {
      return getDB().classes || [];
    },
    saveClass: function(cls) {
      const db = getDB();
      if (cls.id) {
        const idx = db.classes.findIndex(c => c.id === cls.id);
        if (idx !== -1) db.classes[idx] = cls;
      } else {
        cls.id = "cls-" + Date.now();
        db.classes.push(cls);
      }
      saveDB(db);
      return cls;
    },
    deleteClass: function(id) {
      const db = getDB();
      db.classes = db.classes.filter(c => c.id !== id);
      saveDB(db);
    },

    // BATCHES / SCHEDULE
    getBatches: function() {
      return getDB().batches || [];
    },
    saveBatch: function(batch) {
      const db = getDB();
      if (batch.id) {
        const idx = db.batches.findIndex(b => b.id === batch.id);
        if (idx !== -1) db.batches[idx] = batch;
      } else {
        batch.id = "bth-" + Date.now();
        db.batches.push(batch);
      }
      saveDB(db);
      return batch;
    },
    deleteBatch: function(id) {
      const db = getDB();
      db.batches = db.batches.filter(b => b.id !== id);
      saveDB(db);
    },

    // SERVICES
    getServices: function() {
      return getDB().services || [];
    },
    saveService: function(srv) {
      const db = getDB();
      if (srv.id) {
        const idx = db.services.findIndex(s => s.id === srv.id);
        if (idx !== -1) db.services[idx] = srv;
      } else {
        srv.id = "srv-" + Date.now();
        db.services.push(srv);
      }
      saveDB(db);
      return srv;
    },
    deleteService: function(id) {
      const db = getDB();
      db.services = db.services.filter(s => s.id !== id);
      saveDB(db);
    },

    // EVENTS
    getEvents: function() {
      return getDB().events || [];
    },
    saveEvent: function(evt) {
      const db = getDB();
      if (evt.id) {
        const idx = db.events.findIndex(e => e.id === evt.id);
        if (idx !== -1) db.events[idx] = evt;
      } else {
        evt.id = "evt-" + Date.now();
        db.events.push(evt);
      }
      saveDB(db);
      return evt;
    },
    deleteEvent: function(id) {
      const db = getDB();
      db.events = db.events.filter(e => e.id !== id);
      saveDB(db);
    },

    // GALLERY
    getGallery: function() {
      return getDB().gallery || [];
    },
    saveGalleryItem: function(item) {
      const db = getDB();
      if (item.id) {
        const idx = db.gallery.findIndex(g => g.id === item.id);
        if (idx !== -1) db.gallery[idx] = item;
      } else {
        item.id = "gal-" + Date.now();
        db.gallery.push(item);
      }
      saveDB(db);
      return item;
    },
    deleteGalleryItem: function(id) {
      const db = getDB();
      db.gallery = db.gallery.filter(g => g.id !== id);
      saveDB(db);
    },

    // TESTIMONIALS
    getTestimonials: function() {
      return getDB().testimonials || [];
    },
    saveTestimonial: function(tst) {
      const db = getDB();
      if (tst.id) {
        const idx = db.testimonials.findIndex(t => t.id === tst.id);
        if (idx !== -1) db.testimonials[idx] = tst;
      } else {
        tst.id = "tst-" + Date.now();
        db.testimonials.push(tst);
      }
      saveDB(db);
      return tst;
    },
    deleteTestimonial: function(id) {
      const db = getDB();
      db.testimonials = db.testimonials.filter(t => t.id !== id);
      saveDB(db);
    },

    // ENQUIRIES
    getEnquiries: function() {
      return getDB().enquiries || [];
    },
    addEnquiry: function(enq) {
      const db = getDB();
      enq.id = "enq-" + Date.now();
      enq.date = new Date().toLocaleString();
      enq.status = enq.status || "NEW";
      db.enquiries.unshift(enq);
      saveDB(db);
      return enq;
    },
    updateEnquiryStatus: function(id, status, note) {
      const db = getDB();
      const idx = db.enquiries.findIndex(e => e.id === id);
      if (idx !== -1) {
        db.enquiries[idx].status = status;
        if (note !== undefined) db.enquiries[idx].note = note;
        saveDB(db);
      }
    },
    deleteEnquiry: function(id) {
      const db = getDB();
      db.enquiries = db.enquiries.filter(e => e.id !== id);
      saveDB(db);
    },

    // SETTINGS
    getSettings: function() {
      return getDB().site_settings || SEED_DATA.site_settings;
    },
    saveSettings: function(settings) {
      const db = getDB();
      db.site_settings = Object.assign({}, db.site_settings, settings);
      saveDB(db);
    },

    // HOMEPAGE CONTENT
    getHomepageContent: function() {
      return getDB().homepage_content || SEED_DATA.homepage_content;
    },
    saveHomepageContent: function(content) {
      const db = getDB();
      db.homepage_content = Object.assign({}, db.homepage_content, content);
      saveDB(db);
    },

    // SEO SETTINGS
    getSeoSettings: function() {
      return getDB().seo_settings || SEED_DATA.seo_settings;
    },
    saveSeoSettings: function(seo) {
      const db = getDB();
      db.seo_settings = Object.assign({}, db.seo_settings, seo);
      saveDB(db);
    }
  };

  initDataStore();
  global.VibesDataStore = VibesDataStore;
})(typeof window !== 'undefined' ? window : this);
