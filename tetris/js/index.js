import Router from '/js/Router.js';


function loadview()
{
    const id = 'view';
    const router = new Router();
    router.addroute("", '/home', id);
    router.addroute("game", '/gameView', id);
    router.addroute("score", '/score', id);
    window.addEventListener('hashchange', router.router());
    window.addEventListener('load', router.router());

}

loadview();


