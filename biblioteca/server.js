const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const UserController = require('./controller/usuarioController');
const HomeRota = require('./routes/homeRouter');
const LivroRota = require('./routes/livroRouter');
const UserRouter = require('./routes/usuarioRouter');
const usuarioRouter = require('./routes/usuarioRouter');


const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

let HomeR = new HomeRota();
app.use('/',HomeR.router);
let UserR = new UserRouter();
app.use('/usuario',UserR.router);
let LivroR = new LivroRota();
app.use('/livro',LivroR.router);

const server = app.listen('5000', function() {
    console.log('http://localhost:5000');
})