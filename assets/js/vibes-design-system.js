/**
 * VIBES STUDIO — DESIGN SYSTEM INTERACTIVE CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle Logic
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      themeToggleBtn.querySelector('.theme-btn-text').textContent = 
        newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
  }

  // 2. Color Swatch Copy to Clipboard
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

  // 3. Simple Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('vibes-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vibes-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.backgroundColor = '#0A0A0C';
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
