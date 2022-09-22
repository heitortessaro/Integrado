const axios = require('axios');

const fetchData = async (country) => {
  let res;
  try {
    res = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
  } catch (err) {
    console.log('Error: ', err.message);
  }
  return res.data;
};

module.exports = fetchData;
