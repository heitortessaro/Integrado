const dictionary = {
  alphaTwoCode: 'alpha_two_code',
  webPages: 'web_pages‌',
  name: 'name',
  country: 'country',
  domains: 'domains',
  stateProvince: 'state-province‌',
};

export default function convertToInternalPattern(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const entitiesDic = Object.entries(dictionary);
  const finalObj = {};
  entitiesDic.forEach((e) => {
    const auxIndex = keys.indexOf(e[1]);
    finalObj[e[0]] = values[auxIndex];
  });
  return finalObj;
}

module.exports = {
  convertToInternalPattern,
};
