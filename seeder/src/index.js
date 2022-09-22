const { connectToDatabase } = require('./models/connections');
const seeder = require('./seeder');

connectToDatabase()
  .then(() => {
    console.log('connection performed');
  })
  .then(() => {
    seeder();
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });
