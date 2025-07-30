var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");


function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / maxScroll;

    const r = Math.floor(100 * (1 - scrollPercent));
    const g = Math.floor(150 * (1 - scrollPercent));
    const b = Math.floor(200 * (1 - scrollPercent));
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
document.addEventListener("DOMContentLoaded", function () {
    const waitForBotpress = () => {
        if (window.botpress && window.botpress.init) {
            document.getElementById("open-chatbot").addEventListener("click", function (e) {
                e.preventDefault();
                if (window.botpress && window.botpress.toggle) {
                    window.botpress.toggle();
                }
            });

            // Fetch clientId and botId from your Netlify function
            fetch('/.netlify/functions/get-botpress-config')
                .then(res => res.json())
                .then(({ clientId, botId }) => {
                    window.botpress.init({
                        clientId,
                        botId,
                        configuration: {
                            botName: "Chatfolio",
                            botDescription: "Welcome! I'm a smart assistant here to help you learn more about Zakariyyaa",
                            fabImage: "https://files.bpcontent.cloud/2025/05/25/14/20250525145941-FA9G7G2O.jpeg",
                            color: "#3290d8",
                            variant: "solid",
                            themeMode: "dark",
                            fontFamily: "rubik",
                            radius: 4,
                            allowFileUpload: false
                        }
                    });
                })
                .catch(err => console.error("Failed to get botpress config:", err));

        } else {
            // Retry after 100ms if botpress is not ready yet
            setTimeout(waitForBotpress, 100);
        }
    };

    waitForBotpress();
});

document.querySelector(".view_more_work").addEventListener('click', (e) => {
    e.preventDefault();

    const hiddenWorks = document.querySelectorAll(".hidden-work-list");
    const button = e.target;

    // Toggle the "active" class for each hidden section
    hiddenWorks.forEach((hiddenWork) => {
        hiddenWork.classList.toggle("active");
    });

    // Check the first one to determine button state
    if (hiddenWorks[0].classList.contains("active")) {
        button.textContent = "View Less";
    } else {
        button.textContent = "View More";
    }
});



const starfield = document.getElementById('starfield');
// const fog = document.querySelector('.fog');
let shootingStarInterval;

// Create stars immediately on load
createStars(150); // increase or decrease as you like

// Show the starfield and fog immediately if you want
starfield.classList.remove('hidden');
// fog.style.display = 'block';

// Start shooting stars interval immediately
shootingStarInterval = setInterval(() => {
    createShootingStar();
}, 1500 + Math.random() * 1500);


// Keep your existing functions unchanged:
function createStars(num) {
    for (let i = 0; i < num; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.animationDuration = (Math.random() * 3 + 1) + 's';
        starfield.appendChild(star);
    }
}

function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    shootingStar.style.top = Math.random() * 200 + 'px';
    shootingStar.style.left = Math.random() * (window.innerWidth / 2) + 'px';
    const duration = 1000 + Math.random() * 1000;
    shootingStar.style.animation = `shooting ${duration}ms linear forwards`;
    document.body.appendChild(shootingStar);
    setTimeout(() => shootingStar.remove(), duration);
}

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


document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const messageBox = document.getElementById('formMessage');

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            messageBox.classList.remove('error');
            messageBox.classList.add('success');
            messageBox.textContent = "Email sent successfully!";
            messageBox.style.display = 'block'; // show message
            form.reset();
        } else {
            response.json().then(data => {
                messageBox.classList.remove('success');
                messageBox.classList.add('error');
                if (data && data.errors) {
                    messageBox.textContent = data.errors.map(error => error.message).join(", ");
                } else {
                    messageBox.textContent = "Oops! There was a problem submitting your form.";
                }
                messageBox.style.display = 'block'; // show message
            });
        }
    }).catch(() => {
        messageBox.classList.remove('success');
        messageBox.classList.add('error');
        messageBox.textContent = "Oops! There was a problem submitting your form.";
        messageBox.style.display = 'block'; // show message
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const messageBox = document.getElementById('formMessage');
    const emailInput = form.querySelector('input[name="email"]');

    // Remove error class while typing
    emailInput.addEventListener('input', function () {
        this.classList.remove('error');
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                messageBox.className = 'success';
                messageBox.textContent = "Email sent successfully!";
                messageBox.style.display = 'block';
                emailInput.classList.remove('error');
                form.reset();
            } else {
                response.json().then(data => {
                    messageBox.className = 'error';
                    messageBox.style.display = 'block';

                    if (data && data.errors) {
                        messageBox.textContent = data.errors.map(e => e.message).join(", ");

                        // If email error, highlight input
                        const hasEmailError = data.errors.some(e => e.message.toLowerCase().includes("email"));
                        if (hasEmailError) {
                            emailInput.classList.add('error');
                        }
                    } else {
                        messageBox.textContent = "Oops! There was a problem submitting your form.";
                    }
                });
            }
        }).catch(() => {
            messageBox.className = 'error';
            messageBox.textContent = "Oops! There was a problem submitting your form.";
            messageBox.style.display = 'block';
        });
    });
});

const images = [
    'assets/achievements/practical/AWS/Introduction_to_aws.png',
    'assets/achievements/verbal/Active_Listening_Enhancing_Communication_Skills.png',
    'assets/achievements/practical/AI_For_Everyone.png'
    // '',
    // '',
    // '',
    // '',
    // '',
    // '',
    // 'assets/achievements/practical/Human_Factors_in_AI.png',
    // '',
    // 'assets/achievements/practical/Developing_Interpersonal_Skills.png',
    // 
    // '',
    
    // '',
    // '',
    // '',
    
];

let current = 0;

// ⬇️ Minimal addition: dynamically create the image elements
const carousel = document.querySelector('.carousel');
carousel.innerHTML = `
  <div class="image half-image left-image" id="leftImg" title="View Larger"></div>
  <div class="image full-image" id="centerImg" title="View Larger"></div>
  <div class="image half-image right-image" id="rightImg" title="View Larger"></div>
`;

// ⬇️ No changes here
const leftImg = document.querySelector(".left-image");
const centerImg = document.querySelector(".full-image");
const rightImg = document.querySelector(".right-image");

function updateCarousel() {
    const prev = (current - 1 + images.length) % images.length;
    const next = (current + 1) % images.length;

    leftImg.style.backgroundImage = `url(${images[prev]})`;
    centerImg.style.backgroundImage = `url(${images[current]})`;
    rightImg.style.backgroundImage = `url(${images[next]})`;

    leftImg.setAttribute('data-large', images[prev]);
    centerImg.setAttribute('data-large', images[current]);
    rightImg.setAttribute('data-large', images[next]);
}

// ⬇️ No changes here
updateCarousel();

function prevImage() {
    current = (current - 1 + images.length) % images.length;
    updateCarousel();
}

function nextImage() {
    current = (current + 1) % images.length;
    updateCarousel();
}

const zoomOverlay = document.getElementById('zoomOverlay');
const zoomedImg = zoomOverlay.querySelector('img');

document.querySelectorAll('.carousel .image').forEach(imgDiv => {
    imgDiv.addEventListener('click', () => {
        const largeSrc = imgDiv.dataset.large;
        if (!largeSrc) return;
        zoomedImg.src = largeSrc;
        zoomOverlay.classList.add('active');
        zoomOverlay.setAttribute('aria-hidden', 'false');
    });
});

zoomOverlay.addEventListener('click', () => {
    zoomOverlay.classList.remove('active');
    zoomOverlay.setAttribute('aria-hidden', 'true');
    zoomedImg.src = '';
});

// Optional: close on Esc key
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
        zoomOverlay.classList.remove('active');
        zoomOverlay.setAttribute('aria-hidden', 'true');
        zoomedImg.src = '';
    }
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
