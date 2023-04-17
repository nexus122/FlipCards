class Flashcard {
  constructor() {
    this.cardsList = [];
    this.cardCounter = 0;
    this.maxCards = 0;
  }

  createInteractions(text) {
    let card = document.querySelector(".card");
    let flip = document.querySelectorAll(".flipButton");

    flip.forEach((flipButton) => {
      flipButton.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });

    let sayButtons = document.querySelectorAll(".say");

    sayButtons.forEach((sayButton) => {
      sayButton.addEventListener("click", () => {
        this.sayThePhrase(text);
      });
    });

    let elemento = document.querySelector(".card");
    let hammertime = new Hammer(elemento);

    hammertime.on("swipeleft", (event) => {
      if (this.cardCounter === this.maxCards) return;
      this.cardCounter++;
      this.drawCard(this.cardsList[this.cardCounter]);
    });

    hammertime.on("swiperight", (event) => {
      if (this.cardCounter === 0) return;
      this.cardCounter--;
      this.drawCard(this.cardsList[this.cardCounter]);
    });
  }

  createCard(question, response, example) {
    let card = `
      <article class="card">
        <div class="sideA">
          <h1 class="say">${question}</h1>
          <button class="flipButton">Flip Card</button>
        </div>
        <div class="sideB">
          <h1 class="say">${question}</h1>           
          <p>${response}</p>
          <p>${example}</p>
          <button class="flipButton">Flip Card</button>
        </div>
      </article>
    `;

    this.cardsList.push(card);
  }

  async fetchData(url) {
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

  async init() {
    let cards = await this.fetchData("./data.json");

    cards.forEach((data) => {
      this.createCard(data.question, data.response, data.example);
    });

    this.maxCards = cards.length - 1;
    this.drawCard(this.cardsList[this.cardCounter]);
  }

  drawCard(card) {
    document.querySelector(".deck").innerHTML = card;

    let text = card.split('<h1 class="say">')[1].split("</h1>")[0];
    this.createInteractions(text);
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  sayThePhrase(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = "it-IT";
    synth.speak(utterThis);
  }

  handleBackButtonClick() {
    if (this.cardCounter === 0) return;

    this.cardCounter--;
    this.drawCard(this.cardsList[this.cardCounter]);
  }

  handleNextButtonClick() {
    if (this.cardCounter === this.maxCards) return;

    this.cardCounter++;
    this.drawCard(this.cardsList[this.cardCounter]);
  }
}

const flashcard = new Flashcard();

document.querySelector(".backButton").addEventListener("click", () => {
  flashcard.handleBackButtonClick();
});
