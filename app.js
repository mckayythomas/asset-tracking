const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;
const db = require('./db/connect.js')

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

    db.initDb((err) => {
        if (err) {
          console.error(err);
        } else {
          app.listen(PORT);
          console.log('Web Server is Listening at port ' + PORT);
        }
      });
      