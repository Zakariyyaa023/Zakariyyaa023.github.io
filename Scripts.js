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
