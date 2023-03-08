import './css/styles.css';
// Імпортуємо бібліотеку Notiflix
import Notiflix from 'notiflix';
import { fetchCountries } from './api/fetchCountries';
const DEBOUNCE_DELAY = 300;
let debounce = require('lodash.debounce');

const loadCountry = name => {
  let currentCountry;
  return fetchCountries(name)
    .then(data => {
      currentCountry = data;
      console.log(currentCountry);
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
