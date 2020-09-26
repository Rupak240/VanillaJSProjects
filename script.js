const mealsEl = document.getElementById("meals");
const favContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const popupCloseBtn = document.getElementById("close-popup");
const mealContentEl = document.getElementById("meal-content");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const getRandomMeal = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const resData = await response.json();
  const randomMeal = resData.meals[0];

  //   console.log(randomMeal);

  loadRandomMeal(randomMeal, true);
};

const getMealById = async (id) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const resData = await response.json();
  const meal = resData.meals[0];

  return meal;
};

const getMealsBySearch = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );

  const resData = await response.json();
  const meals = resData.meals;

  return meals;
};

const loadRandomMeal = (mealData, random = false) => {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
        ${random ? '<span class="random"> Random Recipe </span>' : ""}
        <img
            src=${mealData.strMealThumb}
            alt=${mealData.strMeal}
        />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn" onclick=><i class="fas fa-heart"></i></button>
    </div>`;

  const btn = meal.querySelector(".fav-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLS(mealData.idMeal);
      btn.classList.toggle("active");
    }

    fetchFavMeals();
  });

  meal.addEventListener("click", () => {
    showMealContent(mealData);
  });

  mealsEl.appendChild(meal);

  // const mealHeaderEl = document.querySelector(".meal-header");
  // mealHeaderEl.addEventListener("click", () => {
  //   showMealContent(mealData);
  // });
};

const addMealToLS = (mealId) => {
  const mealIds = getMealFromLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
};

const getMealFromLS = () => {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
};

const removeMealFromLS = (mealId) => {
  const mealIds = getMealFromLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
};

const fetchFavMeals = async () => {
  // Clean the container
  favContainer.innerHTML = "";

  const mealIds = getMealFromLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMealById(mealId);

    addMealToFav(meal);
  }
};

const addMealToFav = (mealData) => {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
        <img class="img-el"
            src=${mealData.strMealThumb}
            alt=${mealData.strMeal}
        />
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
        `;

  const btn = favMeal.querySelector(".clear");

  btn.addEventListener("click", () => {
    removeMealFromLS(mealData.idMeal);

    fetchFavMeals();
  });

  // favMeal.addEventListener("click", () => {
  //   showMealContent(mealData);
  // });

  favContainer.appendChild(favMeal);

  const clickEl = document.querySelector(".img-el");
  clickEl.addEventListener("click", () => {
    showMealContent(mealData);
  });
};

searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = "";
  const search = searchTerm.value;

  //   console.log(await getMealsBySearch(search));

  //   meals.innerHTML = "";
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach((meal) => {
      loadRandomMeal(meal);
    });
  }
});

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});

const showMealContent = (mealData) => {
  console.log(mealData);

  mealContentEl.innerHTML = "";

  // const mealContent = document.createElement("div");

  const ingredients = [];
  for (let i = 1; i < 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      ingredients.push(
        `${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);

  mealContentEl.innerHTML = `
    <div class="content-left">
        <h1>${mealData.strMeal}</h1>
        <img
        src=${mealData.strMealThumb}
        alt=${mealData.strMeal}
        />
    </div>
    <div class="content-right">
      <p>
        ${mealData.strInstructions}
      </p>
      <h3>Ingredients: </h3>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </div>
      `;

  // mealContentEl.appendChild(mealContent);

  mealPopup.classList.remove("hidden");
};

// ======= CALL FUNCTIONS ====== //

getRandomMeal();
fetchFavMeals();
