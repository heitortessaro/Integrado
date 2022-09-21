const axios = require('axios');

const fetchData = async () => {
  let res;
  try {
    res = await axios.get('http://universities.hipolabs.com/search?country=uruguay');
  } catch (err) {
    console.log('Error: ', err.message);
  }
  return res;
};

module.exports = {
  fetchData,
};
