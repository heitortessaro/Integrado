const { connectToDatabase } = require('./models/connections');

connectToDatabase()
  .then(() => {
    console.log('connection performed');
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });
