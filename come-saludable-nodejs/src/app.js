const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');






const app = express();

// connection to db


/*mongoose.connect('mongodb://localhost/crud-menu')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));
*/

mongoose.connect('mongodb+srv://dannyacv10:dannyacv10@cluster0.6qmys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));




app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));
app.use(flash());

// importing routes
const indexRoutes = require('./routes/index');
const ProductRoutes = require('./routes/product');
const InicioAdmin = require('./routes/paginaInicio');
const paginaInicial = require('./routes/login');
const paginaUsuario = require('./routes/paginaUsuario');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//passport



// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.locals.id = "";


// routes

app.use('/index', indexRoutes);
app.use('/product', ProductRoutes);
app.use('/paginaInicio', InicioAdmin);
app.use('/', paginaInicial);
app.use('/paginaUsuario', paginaUsuario);


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
