let dials = {
  "dials": [
    {
      "name": "Gmail",
      "url": "http://www.gmail.com/",
      "image": "./assets/gmail_icon.png"
    },
    {
      "name": "YouTube",
      "url": "http://www.youtube.com/",
      "image": "./assets/youtube_icon.png"
    },
    {
      "name": "GitHub",
      "url": "http://www.github.com/skylerburger",
      "image": "./assets/github_icon.png"
    },
  ],
}

window.onload = () => {
  insertCurrentTime();
  loadDials();
};

function insertCurrentTime() {
  let timeDiv = document.getElementById('time');
  let timeText = new Date().toLocaleTimeString('en-GB').slice(0, -3);
  timeDiv.textContent = timeText;

  setInterval(insertCurrentTime, 1000);
}

function loadDials() {
  let dialDiv = document.getElementById('dials')

  dials.dials.forEach( dial => {
    dialDiv.appendChild(createDial(dial.name, dial.url, dial.image))
  })
}

function createDial(name, url, image) {
  let dialAnchor = document.createElement('a');
  dialAnchor.href = url;
  
  let dialImg = document.createElement('img'); 
  dialImg.src = image;
  dialImg.alt = name;

  dialAnchor.appendChild(dialImg); 

  return dialAnchor;
}