/**
 * VIBES STUDIO — PRODUCTION ANALYTICS CONTROLLER
 * Handles structured conversion event tracking for Google Analytics / Google Tag Manager.
 * Environment placeholder: GOOGLE_ANALYTICS_ID
 */

(function(global) {
  // Placeholder for Google Analytics Tracking ID (e.g. 'G-XXXXXXXXXX')
  const GOOGLE_ANALYTICS_ID = global.GOOGLE_ANALYTICS_ID || null;

  // Initialize dataLayer
  global.dataLayer = global.dataLayer || [];
  function gtag(){ global.dataLayer.push(arguments); }

  if (GOOGLE_ANALYTICS_ID) {
    gtag('js', new Date());
    gtag('config', GOOGLE_ANALYTICS_ID);
  }

  const VibesAnalytics = {
    trackEvent: function(eventName, eventParams = {}) {
      const payload = Object.assign({
        event: eventName,
        timestamp: new Date().toISOString(),
        page_location: window.location.href,
        page_title: document.title
      }, eventParams);

      // Console logging in dev mode
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[VIBES Analytics Event: ${eventName}]`, payload);
      }

      if (GOOGLE_ANALYTICS_ID && typeof gtag === 'function') {
        gtag('event', eventName, payload);
      }
    },

    // Standard Event Handlers
    trackDemoClick: function(label = 'Book a Free Demo') {
      this.trackEvent('cta_demo_click', { cta_label: label });
    },

    trackWhatsAppClick: function(context = 'General Enquiry', message = '') {
      this.trackEvent('whatsapp_click', { whatsapp_context: context, prefilled_message: message });
    },

    trackPhoneClick: function(phoneNumber = '+919876543210') {
      this.trackEvent('phone_click', { phone_number: phoneNumber });
    },

    trackEnquiryStart: function(category = 'General') {
      this.trackEvent('enquiry_start', { selected_category: category });
    },

    trackEnquirySubmit: function(category = 'General', batch = '') {
      this.trackEvent('enquiry_submit', { selected_category: category, selected_batch: batch });
    },

    trackClassView: function(className = '') {
      this.trackEvent('class_view', { class_name: className });
    },

    trackServiceView: function(serviceName = '') {
      this.trackEvent('service_view', { service_name: serviceName });
    },

    trackScheduleView: function(category = 'all') {
      this.trackEvent('schedule_view', { schedule_category: category });
    },

    trackYouTubeClick: function() {
      this.trackEvent('youtube_click', { destination: 'https://youtube.com/@vibesstudiovizag' });
    },

    trackInstagramClick: function() {
      this.trackEvent('instagram_click', { destination: 'https://instagram.com' });
    },

    trackDirectionsClick: function() {
      this.trackEvent('directions_click', { location: 'Aganampudi, Visakhapatnam' });
    }
  };

  // Auto-bind click handlers on page load
  document.addEventListener('DOMContentLoaded', () => {
    // WhatsApp Links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', () => {
        VibesAnalytics.trackWhatsAppClick('Link Click', link.getAttribute('href'));
      });
    });

    // Phone Links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        VibesAnalytics.trackPhoneClick(link.getAttribute('href'));
      });
    });

    // YouTube Links
    document.querySelectorAll('a[href*="youtube.com"]').forEach(link => {
      link.addEventListener('click', () => {
        VibesAnalytics.trackYouTubeClick();
      });
    });

    // Instagram Links
    document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
      link.addEventListener('click', () => {
        VibesAnalytics.trackInstagramClick();
      });
    });

    // Directions Links
    document.querySelectorAll('a[href*="maps.google.com"]').forEach(link => {
      link.addEventListener('click', () => {
        VibesAnalytics.trackDirectionsClick();
      });
    });

    // Free Demo Buttons
    document.querySelectorAll('a[href*="contact"], button[id*="demo"]').forEach(btn => {
      if (btn.textContent.toLowerCase().includes('demo')) {
        btn.addEventListener('click', () => {
          VibesAnalytics.trackDemoClick(btn.textContent.trim());
        });
      }
    });
  });

  global.VibesAnalytics = VibesAnalytics;
})(typeof window !== 'undefined' ? window : this);
