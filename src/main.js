import { getPageNumber, setPageNumber } from './paginator';

const cityListElement = document.getElementById('city-list');
const prevLink = document.getElementById('prev');
const nextLink = document.getElementById('next');
const pageSize = 30;
const apiUrl = 'https://demo-backendcities.azurewebsites.net/?cuid=hajIUIksk983LLP11112220&size=100&start=50';

async function fetchCities(page) {
  const start = (page - 1) * pageSize;
  const url = `${apiUrl}&size=${pageSize}&start=${start}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function renderCities(cities) {
  cityListElement.innerHTML = '';
  cities.forEach(city => {
    const cityElement = document.createElement('div');
    cityElement.textContent = city.name;
    cityListElement.appendChild(cityElement);
  });
}

async function loadCities() {
  const page = getPageNumber();
  const cities = await fetchCities(page);
  renderCities(cities);
}

prevLink.addEventListener('click', (event) => {
  event.preventDefault();
  const currentPage = getPageNumber();
  if (currentPage > 1) {
    setPageNumber(currentPage - 1);
    loadCities();
  }
});

nextLink.addEventListener('click', (event) => {
  event.preventDefault();
  const currentPage = getPageNumber();
  setPageNumber(currentPage + 1);
  loadCities();
});

window.addEventListener('popstate', loadCities);

document.addEventListener('DOMContentLoaded', loadCities);
