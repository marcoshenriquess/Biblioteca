const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const EmprRota = require('./routes/emprRouter');
const HomeRota = require('./routes/homeRouter');
const LivroRota = require('./routes/livroRouter');
const UserRouter = require('./routes/usuarioRouter');


const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', './views');


app.set('layout', './layout');
app.use(expressLayouts);

let HomeR = new HomeRota();
app.use('/',HomeR.router);
let UserR = new UserRouter();
app.use('/usuario',UserR.router);
let LivroR = new LivroRota();
app.use('/livro',LivroR.router);
let EmprR = new EmprRota();
app.use('/emprestimo',EmprR.router);

const server = app.listen('5000', function() {
    console.log('http://localhost:5000');
})