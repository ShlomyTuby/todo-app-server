process.send({message: 'APPLICATION_START'})
require("@babel/register");
require('./src/index');