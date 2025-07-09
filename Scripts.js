
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");


function opentab(tabname){
  for (let tablink of tablinks){
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
  sidemenu.style.right = "0";
}

function closemenu(){
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

document.querySelector(".btn").addEventListener('click', (e) => {
  e.preventDefault(); 
  const hiddenWork = document.querySelector(".hidden-work-list");

  // Toggle the "active" class only
  hiddenWork.classList.toggle("active");
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


 const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('top-menu');

hamburger.addEventListener('click', () => {
  const isActive = menu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isActive);
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent normal form submission

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
            messageBox.style.color = 'green';
            messageBox.textContent = "Email sent successfully!";
            messageBox.style.display = 'block';
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    messageBox.style.color = 'red';
                    messageBox.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    messageBox.style.color = 'red';
                    messageBox.textContent = "Oops! There was a problem submitting your form.";
                }
                messageBox.style.display = 'block';
            });
        }
    }).catch(() => {
        messageBox.style.color = 'red';
        messageBox.textContent = "Oops! There was a problem submitting your form.";
        messageBox.style.display = 'block';
    });
});
