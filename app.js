const header = document.getElementById("header");
const content = document.getElementById("content");

function getJoke() {
  fetch("https://api.blablagues.net/?rub=blagues")
    .then((res) => res.json())
    .then((data) => {
      const joke = data.data.content;
      console.log(data.data);
      header.textContent = joke.text_head;
      content.textContent = joke.text !== "" ? joke.text : joke.text_hidden;
    });
}
const buttonTodoApi =  document.querySelector(".todo-Api");

buttonTodoApi.addEventListener("click", todoApi);

async function todoApi(){

  const response = await fetch('https://jsonplaceholder.typicode.com/todos/')

  // .then(response => response.json())
  // .then(data => {
  //   console.log(data);
  //   // data.forEach((data) => {
  //     //   console.log(data.id);
  //     // })
  //   })
    
    const data = await response.json();

    console.log(data);
  }



const buttonApi = document.querySelector(".buttonApi");
const searchInput = document.getElementById("input");

buttonApi.addEventListener("click", () => {
  fetchWikiApi(input.value);
});

async function fetchWikiApi(searchInput) {
  const response = await fetch(
    `    https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
  );
  // .then((res) => res.json());

  //.then permet de traiter le resultat de l'operation precedente

  const data = await response.json();

  console.log(data.query.search);
  console.log(data.query.search[0]);

  createCards(data.query.search);
}

const resultsDisplay = document.querySelector(".result-display");

function createCards(data) {
  if (!data.length) {
    console.error("error");
    return;
  }

  data.forEach((el) => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `
      <h3 class="result-title">
        <a href=${url} target="_blank">${el.title}</a>
      </h3>
      <a href=${url} class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${el.snippet}</span>
      <br>
    `;
    resultsDisplay.appendChild(card)

    console.log("card: " + card);
  });
}

