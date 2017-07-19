const PORT = process.env.PORT || 1337; //default port to 1337

let 
  app = require('./server.js'), //express
  chalk = require('chalk'); //great CL text coloring module

app.listen(process.env.PORT || 1337, () => console.log( 
  //sets server to listen to PORT and outputs to the CL
  chalk.green.bold('Server listening on port: ') 
  + chalk.cyan.bold(PORT)
));