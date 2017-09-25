var express = require('express')
  , app = express()
  , router = express.Router();

app.use(require('./controllers'));

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})