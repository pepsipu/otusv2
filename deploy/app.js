const mongoose = require('mongoose');
const repl = require('repl');
const user = require('./schemas/User');

require('dotenv').config();

const { MONGO_URI } = process.env;

const run = async () => {
  mongoose.set('debug', true);
  await mongoose.connect(MONGO_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).catch((err) => {
    console.log(`mongo err: ${err}`);
    process.abort();
  });
  const adminConsole = repl.start('otus console> ');
  Object.assign(adminConsole.context, user);
};

run().then(() => {});
