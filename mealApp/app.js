//https://www.themealdb.com/api/json/v1/1/search.php?s=${search}

const searchInput = document.querySelector("input[type='search']");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(e);
  displayMeals();
});

searchInput.addEventListener("input", (e) => {
  fetchMeal(e.target.value);
  displayMeals();
});

console.log(searchInput.value);

fetchMeal(searchInput.value);

async function fetchMeal(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => console.log((meals = data.meals)));

  displayMeals();
}

function displayMeals() {
    container.innerHTML = ''; 
  if (!meals) {
    container.innerHTML = '<p>No meals found.</p>';
    return;
  }

container.innerHTML = meals.map(
  meal => {
    let ingredients = [];
    for (let i = 1; i < 21; i++) {
      if (meal[`strIngredient${i}`]) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        ingredients.push(`<li>${ingredient} - ${measure}</li> `);
      }
    }
    return`
    <div class="meal">
      <h3 class="meal__title">${meal.strMeal}</h3>
      <img class="meal__image" src="${meal.strMealThumb}"/>
      <span class="meal__area">${meal.strArea}</span>
      <ul class="meal__ingredients">${ingredients.join("")}</ul>
    </div>
    `
  }
).join("");
}

// function displayMeals() {
//   container.innerHTML = ''; 
//   if (!meals) {
//     container.innerHTML = '<p>No meals found.</p>';
//     return;
//   }

//   meals.forEach((meal) => {
//     const mealDiv = document.createElement("div");
//     mealDiv.className = "meal";

//     let ingredients = [];
//     for (let i = 1; i < 21; i++) {
//       if (meal[`strIngredient${i}`]) {
//         let ingredient = meal[`strIngredient${i}`];
//         let measure = meal[`strMeasure${i}`];

//         ingredients.push(`<li>${ingredient} - ${measure}</li> `);
//       }
//     }

//     mealDiv.innerHTML = `
//       <div class="meal__header">
//         <h2 class="meal__title">${meal.strMeal}</h2>
//         <img class="meal__image" src="${meal.strMealThumb}"/>
//         <h4 class="meal__area">${meal.strArea}</h4>
//       </div>
//       <ul class="meal__ingredients">${ingredients.join("")}</ul>
//     `;

//     container.appendChild(mealDiv);
//   });
// }

// console.log(menubar);

// async function getArticles(url) {
//   let articles;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) throw Error(`Error : ${response.status}`);

//     articles = await response.json();
//   } catch (error) {
//     const p = document.createElement("p");
//     p.textContent = error.message;
//     grid.appendChild(p);
//   }
//   if (articles) {
//     createArticles(articles);
//   }
// }

// function createArticles(articles) {
//   articles.forEach((article) => {
//     const item = document.createElement("div");
//     item.className = "item";
//     item.innerHTML = `
//     <h2></h2>
//     <a href="#">Lire l'article</a>
//     `;
//     item.querySelector("h2").textContent = article.title;
//     grid.appendChild(item);
//     console.log(article.title);
//   });
// }

// getArticles("https://jsonplaceholder.typicode.com/posts");