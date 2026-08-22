// admin/js/auth.js — include this on every protected admin page
// Must be included AFTER firebase-config.js
// Protects the page: redirects to login if not authenticated

auth.onAuthStateChanged(function(user) {
  if (!user) {
    // Only redirect if not already on login.html or setup.html
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'login.html' && currentPage !== 'setup.html') {
      window.location.href = 'login.html';
    }
  } else {
    // Set user display
    const nameEl = document.getElementById('sidebar-user-name');
    const emailEl = document.getElementById('sidebar-user-email');
    const avatarEl = document.getElementById('sidebar-avatar-letter');
    if (nameEl) nameEl.textContent = 'Admin Yayasan';
    if (emailEl) emailEl.textContent = user.email;
    if (avatarEl) avatarEl.textContent = user.email ? user.email[0].toUpperCase() : 'A';
  }
});

function doLogout() {
  if (confirm('Yakin ingin keluar dari dashboard?')) {
    auth.signOut().then(() => {
      window.location.href = 'login.html';
    });
  }
}
