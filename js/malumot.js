function getQueryParams() {
  let params = new URLSearchParams(window.location.search);
  return {
    name: params.get("name"),
    population: params.get("population"),
    region: params.get("region"),
    capital: params.get("capital"),
    flag: params.get("flag"),
    subregion: params.get("subregion"),
    nativeName: params.get("nativeName"),
    official: params.get("official"),
  };
}

function displayDetails(details) {
  const container = document.getElementById("details-container");
  container.innerHTML = `
    <img src="${details.flag}"alt="Flag of ${details.name}">
    <div class="words">
      <div class="words1">
        <div class="word1">
          <h1>${details.name}</h1>
          <p><strong>Native Name:</strong> ${details.common}</p>
          <p><strong>Population:</strong> ${details.population}</p>
          <p><strong>Region:</strong> ${details.region}</p>
          <p><strong>Subregion Region:</strong> ${details.subregion}</p>
          <p><strong>Capital:</strong> ${details.capital}</p>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const details = getQueryParams();
  displayDetails(details);
});
