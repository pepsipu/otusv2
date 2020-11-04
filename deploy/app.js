const mongoose = require('mongoose');
const repl = require('repl');
const user = require('./schemas/User');

require('dotenv').config();

const { MONGO_URI } = process.env;

const run = async () => {
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
  adminConsole.context.user = user;
};

run().then(() => {});
