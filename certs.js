// Generate random twinkling stars
const starsContainer = document.querySelector('.stars');
for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDuration = (Math.random() * 2 + 1) + 's';
    starsContainer.appendChild(star);
}

const zoomOverlay = document.getElementById('zoomOverlay');
const zoomedImg = zoomOverlay.querySelector('img');

// Select all certificate images inside .certificate-card divs
document.querySelectorAll('.certificate-card img').forEach(img => {
    img.style.cursor = 'zoom-in'; // change cursor to indicate zoom available
    img.addEventListener('click', () => {
        zoomedImg.src = img.src;   // Use the image's src for zoom (or data-large if you have)
        zoomOverlay.classList.add('active');
        zoomOverlay.setAttribute('aria-hidden', 'false');
    });
});

// Close overlay on click
zoomOverlay.addEventListener('click', () => {
    zoomOverlay.classList.remove('active');
    zoomOverlay.setAttribute('aria-hidden', 'true');
    zoomedImg.src = '';
});

// Close overlay on Esc key
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
        zoomOverlay.classList.remove('active');
        zoomOverlay.setAttribute('aria-hidden', 'true');
        zoomedImg.src = '';
    }
});

const viewMoreBtn = document.querySelector('.view-more-btn');
const grid = document.querySelector('.certificates-grid');
let showingAll = false;
// Select ALL view more buttons
document.querySelectorAll('.view-more-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const grid = btn.closest('.view-more-container').previousElementSibling;
        // ^ assumes .view-more-container is directly after .certificates-grid (like your HTML)

        // Toggle show-all
        const showingAll = grid.classList.toggle('show-all');

        // Update button text
        btn.textContent = showingAll ? 'View Less' : 'View More';

        // If we're collapsing (View Less), scroll smoothly to this button
        if (!showingAll) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const menuContainer = document.getElementById('menuContainer');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('#top-menu a');

    function toggleMenu() {
        const isActive = menuContainer.classList.contains('active');

        if (isActive) {
            // Close menu
            hamburger.classList.remove('active');
            menuContainer.classList.remove('active');
            menuOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        } else {
            // Open menu
            hamburger.classList.add('active');
            menuContainer.classList.add('active');
            menuOverlay.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
        }
    }

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when overlay is clicked
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            toggleMenu();
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuContainer.classList.contains('active')) {
            toggleMenu();
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      const yOffset = -80; // Adjust for header
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});
