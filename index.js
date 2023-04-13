let cardsList = [];
let cardCounter = 0;
let maxCards = 0;
function createInteractions(text) {
  let card = document.querySelector(`.card`);
  document.querySelector(".flip").addEventListener("click", function () {
    card.classList.toggle("flipped");
  });

  document.querySelector(".say").addEventListener("click", () => {
    sayThePhrase(text);
  });
}

function createCard(question, response, example) {
  let card = `
      <article class="card">
      <div class="sideA">
          <h1>${question}</h1>
          <button class="flip">Flip Card</button>
      </div>
      <div class="sideB">
      <h1>${question}</h1>           
          <p>${response}</p>
          <p class="say">${example}</p>
          <button class="flip">Flip Card</button>
      </div>
  </article>
  `;
  cardsList.push(card);
}

// Función que permite dibujar una unica carta
function drawCard(card) {
  document.querySelector(".deck").innerHTML = card;
  let text = card.split('<p class="say">')[1].split("</p>")[0];
  createInteractions(text);
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function init() {
  let cards = await fetchData("./data.json");
  cards.forEach((data) => {
    createCard(data.question, data.response, data.example);
  });
  maxCards = cards.length - 1;
  drawCard(cardsList[cardCounter]);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function sayThePhrase(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.lang = "en-EN";
  synth.speak(utterThis);
}

document.querySelector(".backButton").addEventListener("click", () => {
  if (cardCounter == 0) return;
  cardCounter--;
  drawCard(cardsList[cardCounter]);
});

document.querySelector(".nextButton").addEventListener("click", () => {
  if (cardCounter == maxCards) return;
  cardCounter++;
  drawCard(cardsList[cardCounter]);
});

init();
