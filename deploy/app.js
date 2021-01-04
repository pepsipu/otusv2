const mongoose = require('mongoose');
const repl = require('repl');
const user = require('./schemas/User');
const challenge = require('./schemas/Challenge');

require('dotenv').config();
require('colors');

const { MONGO_URI } = process.env;

const banner = [`        _             
   ___ | |_ _   _ ___ 
  / _ \\| __| | | / __|
 | (_) | |_| |_| \\__ \\
  \\___/ \\__|\\__,_|___/
                      
`.split('\n'),
`                                
   ___ _ __   __ _( )_ __   ___ 
  / _ \\ '_ \\ / _\` | | '_ \\ / _ \\
 |  __/ | | | (_| | | | | |  __/
  \\___|_| |_|\\__, |_|_| |_|\\___|
             |___/              
`.split('\n')];

const run = async () => {
  // this is shit but idc
  console.log(banner[0].map((line, i) => `${line.red} ${banner[1][i].white}`).join('\n').bold);
  // mongoose.set('debug', true);
  await mongoose.connect(MONGO_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).catch((err) => {
    console.log(`mongo err: ${err}`);
    process.abort();
  });
  console.log(`[ Total Users ]: ${(await user.userCount()).toString().red}`.bold);
  console.log(`[ Total Challenges ]: ${(await challenge.challengeCount()).toString().cyan}`.bold);
  console.log(`[ Ranked Challenges ]: ${(await challenge.rankedCount()).toString().yellow}`.bold);
  const adminConsole = repl.start('otus console> ');
  Object.assign(adminConsole.context, { user, challenge });
};

run().then(() => {});
