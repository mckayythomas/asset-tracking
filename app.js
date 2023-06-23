const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const db = require('./db/connect.js')
const session = require('express-session');
const passport = require('passport')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('./controllers/auth/google.js');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())

app
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

db.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT);
    console.log('Web Server is Listening at port ' + PORT);
  }
});
