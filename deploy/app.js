const mongoose = require('mongoose');

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
};
