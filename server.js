// Path 
const path = require('path');

// Express Packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

//Helper
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;

// Reoutes
const routes = require("./controllers");

//Sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Session
const sess = {
  secret: 'Super secret secret',
  cookie: {maxAge: 10000000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
