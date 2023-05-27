class HomeController{
    constructor(){

    }

    homeView(req, res){
        res.render('home/home', { layout: "acervo/acervo"});
    }
}

module.exports = HomeController;