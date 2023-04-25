const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const HomeRota = require('./routes/homeRouter');
const LivroRota = require('./routes/livroRouter');
const UserRouter = require('./routes/usuarioRouter');
const ExemplarRouter = require('./routes/exemplarRouter');
const EmprRota = require('./routes/emprRouter');
const ExemplarRota = require('./routes/exemplarRouter');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

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

let ExemR = new EmprRota();
app.use('/emprestimo',ExemR.router);

let ExemplarR = new ExemplarRota();
app.use('/exemplar', ExemplarR.router); 

const server = app.listen('5000', function() {
    console.log('http://localhost:5000');
})