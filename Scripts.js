
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
const promptFormUI = document.querySelector(".prompt-form");
const promptBtn = document.querySelector(".prompt-btn");
const promptInput = document.querySelector(".prompt-input");
const generateBtn = document.querySelector(".generate-btn");
const galleryGrid = document.querySelector(".gallery-grid");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const textArea = document.getElementById("generatedCode");

// Example prompts
const examplePrompts = [
  "Mobile login screen with a clean white background, email and password fields, Google login button, and a 'Forgot password?' link at the bottom.",
  "Modern analytics dashboard with a sidebar, top navbar, dark theme, cards showing revenue, active users, and graphs.",
  "Product detail page for an online clothing store, with large product image, title, price, size selection, and an 'Add to cart' button.",
  "Minimal desktop chat app interface with contacts sidebar, chat bubbles, message input field, and profile avatar at the top.",
  "Simple signup form UI with a full-width layout, fields for name, email, password, confirm password, and a large green signup button.",
  "Responsive e-commerce homepage featuring a hero banner, featured products carousel, navigation bar, and a footer with social links.",
  "Dark mode settings page with toggle switches for notifications, privacy, and language preferences, plus a save changes button.",
  "Mobile food delivery app interface showing nearby restaurants list, filters for cuisine type, search bar, and cart icon with item count.",
  "Clean portfolio website homepage with a grid of project thumbnails, header with logo and menu, and a footer with contact info.",
  "Fitness tracker dashboard with weekly activity graphs, step count, calories burned, and a motivational quote widget.",
  "Booking form UI for a travel website with date pickers, destination dropdown, number of travelers input, and a prominent search button.",
  "Minimal music player UI with album art, play/pause button, progress bar, volume control, and playlist dropdown.",
  "User profile page with circular avatar, editable bio section, follower/following counts, and a tabbed interface for posts and likes.",
  "Mobile banking app dashboard showing account balances, recent transactions, transfer money button, and a quick pay feature.",
  "Task management app UI with columns for To Do, In Progress, and Done tasks, drag-and-drop functionality, and a new task input field.",
  "E-learning platform course page with video player, course outline sidebar, progress bar, and discussion section below the video.",
  "Recipe app interface displaying list of recipes with images, filter by cuisine and difficulty, and a favorite toggle button on each item.",
  "Minimal calendar app UI with month view, daily agenda list, add event button, and color-coded event categories.",
  "News app homepage featuring top headlines carousel, category tabs, article cards with images, and a bottom navigation bar.",
  "Customer support chat widget UI with message history, quick reply buttons, typing indicator, and agent profile info.",
  "Travel itinerary planner with map integration, daily schedule list, add/remove activity buttons, and share itinerary feature.",
  "Minimalistic weather app interface showing current conditions, hourly forecast scroll, and weekly forecast cards with icons.",
  "Job application tracker dashboard with job cards, status labels (applied, interview, offer), and a search/filter panel.",
  "Photo gallery UI with masonry layout, lightbox preview on click, upload button, and filter by date or tags.",
  "Cryptocurrency portfolio dashboard with real-time price charts, portfolio value summary, and buy/sell action buttons.",
  "Event ticket booking page with seat map selector, ticket quantity dropdown, total price display, and checkout button.",
  "Social media feed UI with user posts, like/comment/share buttons, story highlights carousel, and a new post creation modal.",
  "Simple newsletter signup popup with email input, checkbox for terms agreement, and a submit button with success confirmation.",
  "Online bookstore homepage featuring bestseller carousel, search bar, categories sidebar, and user reviews section.",
  "Healthcare appointment booking UI with doctor list, date/time picker, patient info form, and confirmation screen."
];
// using polinations.ai to check if the content that user gave is UI/UX related
async function isValidUIPromptUiMock(prompt) {
  const question = `Only answer with yes or no, is this a UI Design prompt or related to UI designs prompt = (${prompt})`;

  const encodedPrompt = encodeURIComponent(question);
  const url = `https://text.pollinations.ai/prompt/${encodedPrompt}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "text/plain" }
    });

    if (!response.ok) throw new Error("Text generation failed");

    const text = (await response.text()).toLowerCase();

  
    console.log("Pollinations response:", text);
    const trimmedText = text.trim(); 
    return trimmedText === "yes"
  } catch (error) {
    console.error("Error validating prompt:", error);
    return false;
  }
}

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

// Send requests to poli API to create images
const generateImages = async (imageCount, aspectRatio, promptText) => {
  const { width, height } = getImageDimensions(aspectRatio);
  generateBtn.setAttribute("disabled", "true");

  const encodedPrompt = encodeURIComponent(promptText);
  const model ="flux"; // default to flux if none provided

  const baseURL = `https://image.pollinations.ai/prompt`;

  // Create an array of image generation tasks
  const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
    try {
      const seed = Math.floor(Math.random() * 1000000); 
      const imageUrl = `${baseURL}/${encodedPrompt}?model=flux&width=${width}&height=${height}&nologo=true&private=true&enhance=true&safe=true&quality=2&steps=30&seed=${seed}`;

      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Image generation failed");

      const blob = await response.blob();
      updateImageCard(i, URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      const imgCard = document.getElementById(`img-card-${i}`);
      imgCard.classList.replace("loading", "error");
      imgCard.querySelector(".status-text").textContent = "Generation failed! Check console for more details.";

    }
  });
  

  await Promise.all(imagePromises);
};


// sending requests to poli Api to give texts and code related
const generateTextCode = async (promptText) => {
  generateBtn.setAttribute("disabled", "true");
  let i = 0;
  let generatedText = "";

  try {
    const encodedPrompt = encodeURIComponent(promptText);
    const baseURL = `https://text.pollinations.ai/prompt/${encodedPrompt}`;

    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        "Accept": "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error("Text generation failed");
    }

    generatedText = await response.text();
    console.log("Pollinations response:", generatedText);

    const codeTextarea = document.getElementById("generatedCode");
    if (codeTextarea) {
      codeTextarea.value = ""; // Clear before typing

      const typeInterval = setInterval(() => {
        if (i < generatedText.length) {
          codeTextarea.value += generatedText.charAt(i);
          codeTextarea.scrollTop = codeTextarea.scrollHeight; // Auto-scroll
          i++;
        } else {
          clearInterval(typeInterval);
          generateBtn.removeAttribute("disabled");
        }
      }, 5);
    }

  } catch (error) {
    console.error("Error generating text/code:", error);
    const codeTextarea = document.getElementById("generatedCode");
    if (codeTextarea) {
      codeTextarea.value = "// Error generating code. See console.";
    }
  } 
};


// Create placeholder cards with loading spinners
const createImageCards = ( imageCount, aspectRatio, promptText) => {
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
  document.querySelectorAll(".img-card").forEach((card, i) => {
    setTimeout(() => card.classList.add("animate-in"), 100 * i);
  });
  generateImages(imageCount, aspectRatio, promptText);
  generateTextCode(`Please provide a detailed explanation along with the code for what was done and ${promptText} do not ask me further just end the conversation politely`);
  
};


const handleFormSubmit = (e) => {
  e.preventDefault();

  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  if (!isValidUIPromptUiMock(promptText)) {
    alert("Only UI design prompts are allowed. Please describe a UI component or screen.");
    return;
  }

  createImageCards(imageCount, aspectRatio, promptText);
};

// Fill prompt input with random example (typing effect)
promptBtn.addEventListener("click", () => {
  const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  let i = 0;
  promptInput.focus();
  promptInput.value = "";
  promptBtn.disabled = true;
  promptBtn.style.opacity = "0.5";
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
  const generateIcon = document.getElementById('open-generator-icon');

  toggleBtn.addEventListener('click', () => {
    popup.classList.toggle('hidden');
  });
  generateIcon.addEventListener('click', () => {
     event.preventDefault();
    popup.classList.toggle('hidden');
  });
});

document.getElementById('popupCloseBtn').addEventListener('click', () => {
  document.getElementById('generatorPopup').classList.add('hidden');
  document.getElementById('open-generator-icon').classList.add('hidden');
});

promptFormUI.addEventListener("submit", handleFormSubmit);
