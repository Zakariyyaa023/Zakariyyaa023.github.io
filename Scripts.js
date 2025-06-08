
function showTab(tabId, element) {
  document.querySelectorAll('.tab-content').forEach(el => {
    el.style.display = 'none';
  });

  document.querySelectorAll('.toggle-tab').forEach(el => {
    el.classList.remove('active');
  });

  // Show the selected tab
  document.getElementById(tabId).style.display = 'block';
  element.classList.add('active');
}

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
      window.botpress.init({
        botId: "c5128946-89a5-4f55-841a-c9f988f781ed",
        clientId: "7158fe27-8e4c-47e7-bf9b-fb5caa4dccc5",
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
    } else {
      setTimeout(waitForBotpress, 100);
    }
  };

  waitForBotpress();
});
const promptForm = document.querySelector(".prompt-form");
const promptBtn = document.querySelector(".prompt-btn");
const promptInput = document.querySelector(".prompt-input");
const generateBtn = document.querySelector(".generate-btn");
const galleryGrid = document.querySelector(".gallery-grid");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const API_KEY = ""; // Hugging Face API Key
// Example prompts
const examplePrompts = [
  "Mobile login screen with a clean white background, email and password fields, Google login button, and a 'Forgot password?' link at the bottom.",
  "Modern analytics dashboard with a sidebar, top navbar, dark theme, cards showing revenue, active users, and graphs.",
  "Product detail page for an online clothing store, with large product image, title, price, size selection, and an 'Add to cart' button.",
  "Minimal desktop chat app interface with contacts sidebar, chat bubbles, message input field, and profile avatar at the top.",
  "Simple signup form UI with a full-width layout, fields for name, email, password, confirm password, and a large green signup button."

];
const allowedUIKeywords = [
  "screen", "form", "dashboard", "button", "login", "signup", "input", "card",
  "navbar", "sidebar", "interface", "profile", "chart", "table", "modal",
  "field", "auth", "ecommerce", "chat", "message", "calendar", "ui", "ux"
];
const isValidUIPrompt = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  return allowedUIKeywords.some(keyword => lowerPrompt.includes(keyword));
};

// Calculate width/height based on chosen ratio
const getImageDimensions = (aspectRatio, baseSize = 512) => {
  const [width, height] = aspectRatio.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);
  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);
  // Ensure dimensions are multiples of 16 (AI model requirements)
  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;
  return { width: calculatedWidth, height: calculatedHeight };
};
// Replace loading spinner with the actual image
const updateImageCard = (index, imageUrl) => {
  const imgCard = document.getElementById(`img-card-${index}`);
  if (!imgCard) return;
  imgCard.classList.remove("loading");
  imgCard.innerHTML = `<img class="result-img" src="${imageUrl}" />
                <div class="img-overlay">
                  <a href="${imageUrl}" class="img-download-btn" title="Download Image" download>
                    <i class="fa-solid fa-download"></i>
                  </a>
                </div>`;
};
// Send requests to Hugging Face API to create images
const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
  const MODEL_URL = `https://api-inference.huggingface.co/models/${selectedModel}`;
  const { width, height } = getImageDimensions(aspectRatio);
  generateBtn.setAttribute("disabled", "true");
  // Create an array of image generation promises
  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    try {
      // Send request to the AI model API
      const response = await fetch(MODEL_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "x-use-cache": "false",
        },
        body: JSON.stringify({
          inputs: promptText,
          parameters: { width, height },
        }),
      });
      if (!response.ok) throw new Error((await response.json())?.error);
      // Convert response to an image URL and update the image card
      const blob = await response.blob();
      updateImageCard(i, URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      const imgCard = document.getElementById(`img-card-${i}`);
      imgCard.classList.replace("loading", "error");
      imgCard.querySelector(".status-text").textContent = "Generation failed! Check console for more details.";
    }
  });
  await Promise.allSettled(imagePromises);
  generateBtn.removeAttribute("disabled");
};
// Create placeholder cards with loading spinners
const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
  galleryGrid.innerHTML = "";
  for (let i = 0; i < imageCount; i++) {
    galleryGrid.innerHTML += `
      <div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
        <div class="status-container">
          <div class="spinner"></div>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p class="status-text">Generating...</p>
        </div>
      </div>`;
  }
  // Stagger animation
  document.querySelectorAll(".img-card").forEach((card, i) => {
    setTimeout(() => card.classList.add("animate-in"), 100 * i);
  });
  generateImages(selectedModel, imageCount, aspectRatio, promptText); // Generate Images
};
// Handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault();

  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  if (!isValidUIPrompt(promptText)) {
    alert("Only UI design prompts are allowed. Please describe a UI component or screen.");
    return;
  }

  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};

// Fill prompt input with random example (typing effect)
promptBtn.addEventListener("click", () => {
  const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  let i = 0;
  promptInput.focus();
  promptInput.value = "";
  // Disable the button during typing animation
  promptBtn.disabled = true;
  promptBtn.style.opacity = "0.5";
  // Typing effect
  const typeInterval = setInterval(() => {
    if (i < prompt.length) {
      promptInput.value += prompt.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
      promptBtn.disabled = false;
      promptBtn.style.opacity = "0.8";
    }
  }, 10); // Speed of typing
});
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatToggleBtn');
  const popup = document.getElementById('generatorPopup');

  toggleBtn.addEventListener('click', () => {
    popup.classList.toggle('hidden');
  });
});

promptForm.addEventListener("submit", handleFormSubmit);