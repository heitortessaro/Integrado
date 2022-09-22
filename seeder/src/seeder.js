const getAllExternalData = require('./helpers/getAllExternalData');
const University = require('./models/university');

const seeder = async () => {
  const allUniversities = await getAllExternalData();
  await University.deleteMany({});
  await University.insertMany(allUniversities);
  console.log('seeder finished');
  process.exit(0);
};

module.exports = seeder;
