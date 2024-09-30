const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-btn');
const clearButton = document.querySelector('.clear-btn');
const resultsContainer = document.querySelector('.results'); // Create a div with class "results" in your HTML file

searchButton.addEventListener('click', handleSearch);
clearButton.addEventListener('click', handleClear);

function handleSearch() {
    const searchQuery = searchInput.value.toLowerCase();
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const results = [];
        if (searchQuery.includes('beach') || searchQuery.includes('beaches')) {
          results.push(...data.beaches);
        } else if (searchQuery.includes('temple') || searchQuery.includes('temples')) {
          results.push(...data.temples);
        } else {
          data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchQuery)) {
              results.push(...country.cities);
            }
          });
        }
        displayResults(results);
      });
  }

  function displayResults(results) {
    const resultsHtml = results.map(result => {
      return `
        <div class="result">
          <h2>${result.name}</h2>
          <img src="${result.imageUrl}" alt="${result.name}">
          <p>${result.description}</p>
          <button class="cta-btn">Visit</button>
        </div>
      `;
    }).join('');
    resultsContainer.innerHTML = resultsHtml;
  }

  function handleClear() {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  }