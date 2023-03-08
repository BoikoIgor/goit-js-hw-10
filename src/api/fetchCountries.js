export const fetchCountries = name => {
  fetch(`https://restcountries.com/v2/name/${name}`).then(
    response => response.json
  );
};
