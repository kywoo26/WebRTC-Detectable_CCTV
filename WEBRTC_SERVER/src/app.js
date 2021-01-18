const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const httpolyglot = require('httpolyglot')
const https = require('https')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// use it before all route definitions
//////// CONFIGURATION ///////////
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
// insert your own ssl certificate and keys
const options = {
    key: fs.readFileSync(path.join(__dirname,'..','ssl','key.pem'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname,'..','ssl','cert.pem'), 'utf-8')
}

const port = process.env.PORT || 3012

////////////////////////////

require('./routes')(app, changeScreen, changeImage, changeColor)

const httpsServer = httpolyglot.createServer(options, app)
const io = require('socket.io')(httpsServer)
require('./socketController')(io)

function changeScreen(number) {
    io.sockets.emit('changeScreen', number);
  }
function changeImage(number) {
    io.sockets.emit('changeImage', number);
  }
  function changeColor(number) {
      console.log(number)
    io.sockets.emit('changeColor', number);
  }
  
httpsServer.listen(port, () => {
    console.log(`listening on port ${port}`)
})





