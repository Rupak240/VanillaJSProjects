const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");

const createUserCard = (user) => {
  const { avatar_url, name, bio, followers, following, public_repos } = user;

  const cardHtml = `
        <div class="card">
            <div class="img-contaner">
                <img class="avatar" src=${avatar_url} alt=${name} />
            </div>
            <div class="user-info">
                <h2>${name}</h2>
                <p>${bio}</p>
                <ul class="info">
                    <li>${followers} &nbsp; <span>followers</span></li>
                    <li>${following} &nbsp;<span>following</span></li>
                    <li>${public_repos} &nbsp;<span>repos</span></li>
                </ul>
                <div class="repos" id="repos"></div>
            </div>
        </div>
    `;
  main.innerHTML = cardHtml;
};

const addReposToCard = (repos) => {
  const reposEl = document.getElementById("repos");
  console.log(repos);

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
};

const getRepos = async (user) => {
  const response = await fetch(`${APIURL}${user}/repos`);
  const resData = await response.json();

  addReposToCard(resData);
};

const getUser = async (user) => {
  const response = await fetch(`${APIURL}${user}`);
  const resData = await response.json();

  createUserCard(resData);

  getRepos(user);
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = searchEl.value;
  if (user) {
    getUser(user);

    searchEl.value = "";
  }
});

getUser("Rupak240");
