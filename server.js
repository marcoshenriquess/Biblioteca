const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const HomeRota = require('./routes/homeRouter');
const UserRouter = require('./routes/usuarioRouter');
const EmprRota = require('./routes/emprRouter');
const TituloRouter = require('./routes/tituloRouter');
const AcervoRoute = require('./routes/acervoRoute');
const LoginRoute = require('./routes/loginRoute');
const Autenticacao = require('./middlewares/autenticacao');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

global.TITULO_IMG_CAMINHO = "/img/Titulos/";
global.RAIZ_PROJETO = __dirname;

app.set('layout', './layout');
app.use(expressLayouts);



let AcervoR = new AcervoRoute();
app.use('/', AcervoR.router);
let loginRota = new LoginRoute()
app.use('/login', loginRota.router);

let auth = new Autenticacao();

app.use(auth.usuarioIsAdmin);

let HomeR = new HomeRota();
app.use('/admin',HomeR.router);

let UserR = new UserRouter();
app.use('/admin/usuario',UserR.router);

let TituloR = new TituloRouter();
app.use('/admin/titulo', TituloR.router);

let ExemR = new EmprRota();
app.use('/admin/emprestimo',ExemR.router);



const server = app.listen('5000', function() {
    console.log('http://    localhost:5000');
})