class HomeController{
    constructor(){

    }

    homeView(req, res){
        res.render('home/home', { });
    }
}

module.exports = HomeController;