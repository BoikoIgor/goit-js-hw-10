export const fetchCountries = name => {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  });
};
// ?fields=name.official,capital,population,flags.svg,languages
