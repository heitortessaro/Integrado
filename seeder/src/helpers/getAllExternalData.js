const countries = require('./selectedCountries');
const fetchData = require('./fetchData');
const { convertToInternalPatternArray } = require('./objKeyConvertion');

const getAllExternalData = async () => {
  let allUniversitiesData;
  const promises = [];
  countries.forEach((country, index) => {
    promises[index] = fetchData(country);
  });
  try {
    allUniversitiesData = await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
  return convertToInternalPatternArray(allUniversitiesData.flat(1));
};

module.exports = getAllExternalData;
