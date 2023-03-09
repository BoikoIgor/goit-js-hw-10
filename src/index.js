import './css/styles.css';
// Імпортуємо бібліотеки
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// імпортуємо зовнішні модулі
import { fetchCountries } from './api/fetchCountries';
// визначаємо  елементи HTML-розмітки
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
// додаємо прослуховувач подій на інпут пошуку зі затримкою
searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// Колбек-функція яка викликається при події введення тексту у інпут пошуку
function onSearch(event) {
  // зберігаємо значення з інпуту, видаляючи всі пробіли з кінця і початку рядка
  const searchQuery = event.target.value.trim();
  // якщо інпут порожній, очистимо розмітку
  if (!searchQuery) {
    clearMarkup();
    return; //???
  }
  // отримуємо список країн з API
  fetchCountries(searchQuery)
    // якщо є відповідь - рендеремо
    .then(renderMarkup)
    .catch(error => {
      // При помилці очищаємо та виводимо помилку
      clearMarkup();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
// функція для рендеру розмітки країн на сторінці
function renderMarkup(countries) {
  // // якщо у відповідь "0" країн - вичищаємо, виводимо помилку і виходимо
  // if (countries.length === 0) {
  //   clearMarkup();
  //   Notiflix.Notify.failure('Oops, there is no country with that name');
  //   return;
  // }
  // якщо кількість країн з беку більше 10 од., виводимо повідомлення і вичищаємо
  if (countries.length > 10) {
    clearMarkup();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (countries.length > 1 && countries.length <= 10) {
    renderCountryList(countries);
    return;
  }

  if (countries.length === 1) {
    renderCountryInfo(countries[0]);
    return;
  }
}

function clearMarkup() {
  // очистимо попередній список країн
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
// функція для рендеру списку країн
function renderCountryList(countries) {
  const markup = countries
    .map(
      country =>
        `<li><img src="${country.flags.svg}" alt="${country.name.official} flag"> ${country.name.official}</li>`
    )
    .join('');

  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}

function renderCountryInfo(country) {
  const languages = country.languages.map(lang => lang.name).join(', ');

  const markup = `
    <div class="country-info__flag">
      <img src="${country.flags.svg}" alt="${country.name.official} flag">
    </div>
    <div class="country-info__details">
      <h2>${country.name.official}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> ${languages}</p>
    </div>
  `;

  countryInfo.innerHTML = markup;
  countryList.innerHTML = '';
}
