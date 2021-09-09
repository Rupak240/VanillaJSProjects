const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const famousAthletes = [
  {
    name: "Cristiano Ronaldo",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cristiano-ronaldo-of-real-madrid-celebrating-his-score-the-news-photo-1613226661.?crop=0.599xw:1.00xh;0.104xw,0&resize=640:*",
  },
  {
    name: "Lionel Messi",
    image:
      "https://static01.nyt.com/images/2021/09/03/sports/03soccer-transfer-print2/merlin_193875960_088089d3-545d-4766-8e6c-e9b310b21e46-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
  },
  {
    name: "LeBron James",
    image:
      "https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwODQ5MTMzODk5MjI4NTIw/lebron-james-run.jpg",
  },
  {
    name: "Neymar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh8v2AtU58qnUdUYD28k66hdFXaBhWh_Mu_Q&usqp=CAU",
  },
  {
    name: "Roger Federer",
    image:
      "https://static.toiimg.com/thumb/msid-85300334,width-1200,height-900,resizemode-4/.jpg",
  },
  {
    name: "Conon McGregor",
    image:
      "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F600c27603ffbb25d83b4c85c%2FConor-McGregor-of-Ireland-poses-on-the-scale-during-the-UFC-257-weigh-in-at-Etihad%2F1960x0.jpg%3Ffit%3Dscale",
  },
  {
    name: "Virat Kohli",
    image:
      "https://www.thehindubusinessline.com/news/education/tgh043/article32599466.ece/ALTERNATES/LANDSCAPE_355/virat-kholijpg",
  },
  {
    name: "Rafael Nadal",
    image:
      "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ece8a5c938ec500060aae37%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D503%26cropX2%3D2965%26cropY1%3D156%26cropY2%3D2616",
  },
  {
    name: "John Cena",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyEQp80OzOb5GT9NPah3XlwQgDqRx4EA-FjQ&usqp=CAU",
  },
  {
    name: "Tiger Woods",
    image:
      "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ece6ffa89ee2f0006814bfd%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D2074%26cropY1%3D14%26cropY2%3D2087",
  },
];

// Store listItems
const listItems = [];

let dragStartIndex;

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// Swap list items that are drag & drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
const checkOrder = () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".person-name").innerText.trim();

    if (personName !== famousAthletes[index].name) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
};

// Insert list items into DOM
const createList = () => {
  [...famousAthletes]
    .map((a) => ({ name: a.name, image: a.image, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => ({ name: a.name, image: a.image }))
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
              <img class="person-img"
                src=${person.image}
                alt=${person.name} />
               <div>
                  <p class="person-name">${person.name}</p>
                  <i class="fas fa-grip-lines"></i>
               </div>
            </div>
        `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

check.addEventListener("click", checkOrder);

createList();
