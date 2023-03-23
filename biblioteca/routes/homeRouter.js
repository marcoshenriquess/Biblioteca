const express = require('express');
const HomeController = require('../controller/homeController');

class HomeRota {
    
    #router;

    get router(){
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor(){
        this.#router = express.Router();
        let ctrl = new HomeController();
        this.#router.get('/',ctrl.homeView);
    }
}
module.exports = HomeRota;