window.onload = () => {
  startup();
};

async function startup() {
  insertCurrentTime();
  await loadJson();
  reveal();
}

function insertCurrentTime() {
  let timeDiv = document.getElementById('time');
  let timeText = new Date().toLocaleTimeString('en-GB').slice(0, -3);
  timeDiv.textContent = timeText;

  setInterval(insertCurrentTime, 1000);
}

async function loadJson() {
  let dialDiv = document.getElementById('dials')

  const response = await fetch('./dials.json');
  let storedJson = await response.json();
  
  // Background Image
  const body = document.getElementById("body");
  body.style.backgroundImage = `url('${storedJson.background}')`;

  // Dials
  storedJson.dials.forEach( dial => dialDiv.appendChild(renderDial(dial)))
}

function renderDial({ name, url, image }) {
  let dialAnchor = document.createElement('a');
  dialAnchor.href = url;
  
  let dialImg = document.createElement('img'); 
  dialImg.src = image;
  dialImg.alt = name;

  dialAnchor.appendChild(dialImg); 

  return dialAnchor;
}

function reveal() {
  const body = document.getElementById('body');
  body.style.opacity = 1;
}