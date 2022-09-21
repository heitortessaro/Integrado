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

function convertToExternalPattern(obj) {
  const { alphaTwoCode, webPages, name, country, domains, stateProvince } = obj;
  const auxObject = { alphaTwoCode, webPages, name, country, domains, stateProvince };
  const keys = Object.keys(auxObject);
  const values = Object.values(auxObject);
  const entitiesDic = Object.entries(dictionary);
  const finalObj = {};
  entitiesDic.forEach((e) => {
    const auxIndex = keys.indexOf(e[0]);
    finalObj[e[1]] = values[auxIndex];
  });
  finalObj._id = obj._id;
  return finalObj;
}

function convertToExternalArrayPattern(universitiesArray) {
  const finalArray = [];
  universitiesArray.forEach((university) => {
    finalArray.push(convertToExternalPattern(university));
  });
  return finalArray;
}

export { 
  convertToInternalPattern, 
  convertToExternalPattern,
  convertToExternalArrayPattern,
};