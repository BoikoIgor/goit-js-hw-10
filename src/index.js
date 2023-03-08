import './css/styles.css';
// Імпортуємо бібліотеки
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './api/fetchCountries';
// const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v2/';
// знаходимо необхідні елементи DOM
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  DEBOUNCE_DELAY: 300,
};

// додаємо обробники подій
refs.searchBox.addEventListener('input', debounce(onSearch, 300));

// функція-обробник події пошуку
function onSearch(event) {
  // очищаємо список країн і інформацію про країну
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  // отримуємо введену користувачем назву країни та обрізаємо початкові та кінцеві пробіли
  const searchQuery = event.target.value.trim();

  // якщо користувач не ввів нічого або ввів тільки пробіли, то виходимо з функції
  if (!searchQuery) {
    return;
  }

  // робимо HTTP-запит на сервер за допомогою функції fetchCountries та передаємо введену користувачем назву країни
  fetchCountries(searchQuery)
    .then(countries => {
      // якщо результат запиту порожній, виводимо повідомлення про помилку
      if (countries.length === 0) {
        throw new Error('Country not found');
      }
      // якщо результат запиту містить більше 10 країн, виводимо повідомлення про помилку
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      // якщо результат запиту містить від 2 до 10 країн, виводимо список країн
      if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
        return;
      }
      // якщо результат запиту містить тільки одну країну, виводимо інформацію про неї
      renderCountryInfo(countries[0]);
    })
    .catch(error => {
      // якщо сталась помилка, виводимо повідомлення про помилку
      Notiflix.Notify.failure(error.message);
    });
}

function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    return;
  }
}

// Далі реалізуємо функціонал для відображення списку країн. Для цього додамо HTML-елемент, в який ми будемо вставляти список країн. Після цього реалізуємо функцію, яка буде відповідати за створення елементів списку та вставку їх в HTML-елемент.
const countriesList = document.querySelector('.countries-list');

function createCountryListItem(country) {
  const listItem = document.createElement('li');
  listItem.classList.add('country-item');

  const countryFlag = document.createElement('img');
  countryFlag.src = country.flags.svg;
  countryFlag.alt = `Flag of ${country.name.official}`;
  countryFlag.classList.add('country-flag');

  const countryName = document.createElement('h2');
  countryName.textContent = country.name.official;
  countryName.classList.add('country-name');

  listItem.append(countryFlag, countryName);
  return listItem;
}

function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    countriesList.innerHTML = '';
    const countriesListItems = countries.map(createCountryListItem);
    countriesList.append(...countriesListItems);
  }
}

// Тепер реалізуємо функціонал для відображення детальної інформації про країну. Для цього створимо HTML-елемент, в який будемо вставляти дані про країну. Після цього реалізуємо функцію, яка буде відповідати за відображення даних про країну.
const countryDetails = document.querySelector('.country-details');

function renderCountryDetails(country) {
  countryDetails.innerHTML = '';

  const countryFlag = document.createElement('img');
  countryFlag.src = country.flags.svg;
  countryFlag.alt = `Flag of ${country.name.official}`;
  countryFlag.classList.add('country-flag');
  // Create a heading element for the country name
  const countryName = document.createElement('h2');

  // Set the text content of the heading element to the country name
  countryName.textContent = country.name.official;

  // Create a paragraph element for the country capital
  const countryCapital = document.createElement('p');

  // Set the text content of the paragraph element to the country capital
  countryCapital.textContent = `Capital:${country.capital}`;

  // Create a paragraph element for the country population
  const countryPopulation = document.createElement('p');

  // Set the text content of the paragraph element to the country population
  countryPopulation.textContent = `Population: ${country.population}`;

  // Create a paragraph element for the country region
  const countryRegion = document.createElement('p');

  // Set the text content of the paragraph element to the country region
  countryRegion.textContent = `Region: ${country.region}`;

  // Create a paragraph element for the country subregion
  const countrySubregion = document.createElement('p');

  // Set the text content of the paragraph element to the country subregion
  countrySubregion.textContent = `Subregion: ${country.subregion}`;

  // Append the image, heading, and paragraph elements to the countryDetails element
  countryDetails.appendChild(countryFlag);
  countryDetails.appendChild(countryName);
  countryDetails.appendChild(countryCapital);
  countryDetails.appendChild(countryPopulation);
  countryDetails.appendChild(countryRegion);
  countryDetails.appendChild(countrySubregion);
}

// Call the renderCountryDetails function with the first country in the countries array
renderCountryDetails(countries[0]);

const loadCountry = name => {
  let currentCountry;
  return fetchCountries(name)
    .then(data => {
      currentCountry = data;
      console.log(data);
    })
    .catch(err => {
      currentCountry = 'Unknow';
      console.log(err.message);
    });
};
loadCountry('peru');

// fetch('https://restcountries.com/v3.1/all')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });
