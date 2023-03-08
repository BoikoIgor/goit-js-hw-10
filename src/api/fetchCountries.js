export const fetchCountries = name => {
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  ).then(response => response.json);
};
