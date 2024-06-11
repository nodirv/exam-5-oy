let icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "../images/oy2.svg";
  } else {
    icon.src = "../images/oy.svg";
  }
};

const dataProduct = document.querySelector(".products");

const filter = document.getElementById("filter");

let countries = [];

const Api_url = "https://restcountries.com/v3.1/all";

async function getProduct(api) {
  try {
    let data = await fetch(api);
    let res = await data.json();
    cread(res);
  } catch (err) {}
}

getProduct(Api_url);

function cread(card) {
  let fragment = document.createDocumentFragment();
  card.forEach((el) => {
    const nativeName = el.name.nativeName
      ? Object.values(el.name.nativeName)[0].common
      : el.name.common;
    const product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `
      <div class="product" data-name="${el.name.common}" 
            data-population="${el.population}" 
            data-region="${el.region}" 
            data-capital="${el.capital}" 
            data-flag="${el.flags.png}"
            data-subregion="${el.subregion}"
            data-nativeName="${nativeName}"
            data-official="${el.name.official}">

        <img name="product-images" src="${el.flags.png}" width="267px" height="160px" alt="">
        <h1>${el.name.common}</h1>
        <p><strong>Aholi soni:</strong> ${el.population}</p>
        <p><strong>Hudud:</strong> ${el.region}</p>
        <p><strong>Poytaxt:</strong> ${el.capital}</p>
      </div>
    `;
    fragment.appendChild(product);
  });
  dataProduct.appendChild(fragment);
}

async function getAllCountries(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    countries = data;
    cread(data);
  } catch (error) {
    console.log(error);
  }
}

getAllCountries("https://restcountries.com/v3.1/all");

filter.addEventListener("change", function (e) {
  let value = filter.value;
  let filteredCountries;
  if (value === "All") {
    filteredCountries = countries;
  } else {
    filteredCountries = countries.filter((c) => c.region == value);
  }
  dataProduct.innerHTML = "";
  cread(filteredCountries);
});

dataProduct.addEventListener("click", (e) => {
  if (e.target.name === "product-images") {
    let product = e.target.closest(".product");
    let name = product.dataset.name;
    let population = product.dataset.population;
    let region = product.dataset.region;
    let capital = product.dataset.capital;
    let flag = product.dataset.flag;
    let subregion = product.dataset.subregion;
    let nativeName = product.dataset.nativeName;
    let official = product.dataset.official;
    createAll(
      name,
      population,
      region,
      capital,
      flag,
      subregion,
      nativeName,
      official
    );
  }
});

const createAll = (
  name,
  population,
  region,
  capital,
  flag,
  subregion,
  nativeName,
  official
) => {
  let queryParams = new URLSearchParams({
    name: name,
    population: population,
    region: region,
    capital: capital,
    flag: flag,
    subregion: subregion,
    nativeName: nativeName,
    official: official,
  }).toString();
  window.open(`/pages/malumot.html?${queryParams}`, "_self");
};

const inputVal = document.querySelector(".inputVal");
async function getSearch() {
  let response = await fetch("https://restcountries.com/v3.1/all", {
    method: "GET",
  });
  datas = await response.json();

  return datas;
}

inputVal.addEventListener("input", async (event) => {
  const currentUser = event.target.value.toLowerCase();
  let users = await getSearch();
  users = users.filter((user) =>
    user.name.common.toLowerCase().includes(currentUser)
  );
  dataProduct.innerHTML = "";

  users.forEach((user) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="product" 
      data-name="${user.name.common}"
      data-population="${user.population}"
      data-region="${user.region}"
      data-capital="${user.capital}"
      data-flag="${user.flags.png}"
      data-subregion="${user.subregion}"
      data-official="${user.name.official}">
      <img name="product-images" src=${user.flags.png} alt="">
      <h1>${user.name.common}</h1>
      <p> <strong>Population: </strong> ${user.population}</p>
      <p> <strong>Region: </strong> ${user.region}</p>
      <p><strong>Capital: </strong> ${user.capital}</p>
    </div>
      `;
    dataProduct.appendChild(div);
  });
});

window.onscroll = function () {
  scrollFunction();
};
