/**
 * VIBES STUDIO — ADMIN CORE CONTROLLER
 * Handles Route Protection, Shared Sidebar Layout, Brand Protection & Confirmation Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.includes('/admin/login');
  const isAdminArea = currentPath.includes('/admin');

  // 1. ROUTE GUARD (Requirement 1)
  if (isAdminArea && !isLoginPage) {
    if (typeof VibesDataStore !== 'undefined' && !VibesDataStore.isAuthenticated()) {
      window.location.href = (currentPath.includes('/admin/') && !currentPath.endsWith('/admin/')) 
        ? '../login' 
        : './login';
      return;
    }
  }

  // If on login page and already logged in, redirect to admin dashboard
  if (isLoginPage && typeof VibesDataStore !== 'undefined' && VibesDataStore.isAuthenticated()) {
    window.location.href = '../';
    return;
  }

  // 2. RENDER ADMIN LAYOUT IF IN ADMIN AREA
  if (isAdminArea && !isLoginPage) {
    renderAdminHeaderAndSidebar();
  }

  function renderAdminHeaderAndSidebar() {
    const adminAppContainer = document.getElementById('admin-app-root');
    if (!adminAppContainer) return;

    // Get current active tab
    const session = VibesDataStore.getSession();
    const userName = session && session.user ? session.user.name : "Studio Owner";

    // Determine path relative depth for clean links
    const isSubdir = currentPath.split('/admin/')[1] && currentPath.split('/admin/')[1].length > 0;
    const baseAdminUrl = isSubdir ? '../' : './';
    const basePublicUrl = isSubdir ? '../../' : '../';

    // Highlight active nav item
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', link: baseAdminUrl },
      { id: 'classes', label: 'Classes', icon: '💃', link: baseAdminUrl + 'classes' },
      { id: 'schedule', label: 'Schedule', icon: '📅', link: baseAdminUrl + 'schedule' },
      { id: 'services', label: 'Services', icon: '🎭', link: baseAdminUrl + 'services' },
      { id: 'events', label: 'Events', icon: '🎪', link: baseAdminUrl + 'events' },
      { id: 'gallery', label: 'Gallery', icon: '🖼️', link: baseAdminUrl + 'gallery' },
      { id: 'testimonials', label: 'Testimonials', icon: '💬', link: baseAdminUrl + 'testimonials' },
      { id: 'enquiries', label: 'Enquiries', icon: '📩', link: baseAdminUrl + 'enquiries' },
      { id: 'homepage', label: 'Homepage', icon: '🏠', link: baseAdminUrl + 'homepage' },
      { id: 'seo', label: 'SEO', icon: '🔍', link: baseAdminUrl + 'seo' },
      { id: 'contact_settings', label: 'Contact Settings', icon: '📞', link: baseAdminUrl + 'settings/contact' },
      { id: 'settings', label: 'Business Settings', icon: '⚙️', link: baseAdminUrl + 'settings' }
    ];

    const currentModule = adminAppContainer.getAttribute('data-admin-module') || 'dashboard';

    // Sidebar HTML
    const sidebarHtml = `
      <aside class="admin-sidebar" role="navigation" aria-label="Admin Navigation">
        <div class="admin-sidebar-header">
          <a href="${basePublicUrl}" target="_blank" class="admin-brand-logo" title="View Public Website">
            <img src="${basePublicUrl}assets/brand/vibes-studio-logo-full.png" alt="VIBES STUDIO Logo">
          </a>
          <div class="brand-lock-tag" title="Strict Brand Compliance Active">
            🔒 Brand Lock Active
          </div>
        </div>

        <nav class="admin-nav">
          <ul class="admin-nav-list">
            ${navItems.map(item => `
              <li>
                <a href="${item.link}" class="admin-nav-link ${currentModule === item.id ? 'active' : ''}">
                  <span class="nav-icon">${item.icon}</span>
                  <span class="nav-text">${item.label}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>

        <div class="admin-sidebar-footer">
          <div class="admin-user-info">
            <div class="admin-avatar">P</div>
            <div class="admin-user-details">
              <span class="admin-user-name">${userName}</span>
              <span class="admin-user-role">Studio Administrator</span>
            </div>
          </div>
          <button id="admin-logout-btn" class="btn-logout" title="Log Out of Admin Panel">
            🚪 Logout
          </button>
        </div>
      </aside>
    `;

    // Header HTML
    const headerHtml = `
      <header class="admin-top-bar">
        <div class="top-bar-left">
          <button class="admin-mobile-toggle" id="admin-mobile-toggle" aria-label="Toggle Navigation">
            ☰
          </button>
          <h2 class="admin-page-heading" id="admin-page-title">
            ${currentModule.toUpperCase().replace('_', ' ')}
          </h2>
        </div>

        <div class="top-bar-right">
          <a href="${basePublicUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
            👁️ View Live Website
          </a>
        </div>
      </header>
    `;

    // Wrap page content in admin layout structure
    const pageInnerHtml = adminAppContainer.innerHTML;
    adminAppContainer.innerHTML = `
      <div class="admin-layout-wrapper">
        ${sidebarHtml}
        <div class="admin-main-viewport">
          ${headerHtml}
          <main class="admin-content-area">
            ${pageInnerHtml}
          </main>
        </div>
      </div>

      <!-- Confirmation Modal Container -->
      <div class="admin-modal-backdrop" id="admin-confirm-modal" role="dialog" aria-modal="true" style="display: none;">
        <div class="admin-modal-box">
          <h3 class="modal-title" id="confirm-modal-title">Confirm Action</h3>
          <p class="modal-body-text" id="confirm-modal-msg">Are you sure you want to delete this item? This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" id="confirm-modal-cancel">Cancel</button>
            <button class="btn btn-danger" id="confirm-modal-action">Delete</button>
          </div>
        </div>
      </div>
    `;

    // Logout Event Listener
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        VibesDataStore.logout();
        window.location.href = isSubdir ? '../login' : './login';
      });
    }

    // Mobile Sidebar Toggle Listener
    const mobileToggle = document.getElementById('admin-mobile-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('is-mobile-open');
      });
    }
  }

  // GLOBAL ADMIN UTILITIES
  window.VibesAdmin = {
    confirmDelete: function(title, message, onConfirm) {
      const modal = document.getElementById('admin-confirm-modal');
      const titleElem = document.getElementById('confirm-modal-title');
      const msgElem = document.getElementById('confirm-modal-msg');
      const actionBtn = document.getElementById('confirm-modal-action');
      const cancelBtn = document.getElementById('confirm-modal-cancel');

      if (!modal || !actionBtn || !cancelBtn) {
        if (confirm(`${title}\n\n${message}`)) {
          onConfirm();
        }
        return;
      }

      if (titleElem) titleElem.textContent = title || "Confirm Delete";
      if (msgElem) msgElem.textContent = message || "Are you sure you want to perform this action?";

      modal.style.display = 'flex';

      const handleConfirm = () => {
        cleanup();
        onConfirm();
      };

      const handleCancel = () => {
        cleanup();
      };

      function cleanup() {
        modal.style.display = 'none';
        actionBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
      }

      actionBtn.addEventListener('click', handleConfirm);
      cancelBtn.addEventListener('click', handleCancel);
    },

    toast: function(message, type = 'info') {
      let toast = document.getElementById('admin-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'admin-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.backgroundColor = type === 'error' ? '#D32F2F' : '#103A18';
        toast.style.color = '#FFFFFF';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.fontSize = '14px';
        toast.style.fontWeight = '700';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        toast.style.zIndex = '9999';
        toast.style.transition = 'all 0.3s ease';
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        document.body.appendChild(toast);
      }

      toast.style.backgroundColor = type === 'error' ? '#D32F2F' : '#103A18';
      toast.textContent = message;
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';

      setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
      }, 2500);
    }
  };
});
