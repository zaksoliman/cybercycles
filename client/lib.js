var server = {
    host: 'localhost',
    port: '1337'
};
// Actions received via websocket
var actions = {
    start: function(infos) {
        message("Début de la partie : vous êtes le joueur #" + infos.me.id);
        createGrid(infos);
    },
    nextMove: function(params) {
        var m = nextMove(params.moves);
        console.log(m);
        ws.send(m);
    },
    win: function(params) {
        var state;
        victory(params.id);
        message("Victoire du joueur #" + params.id);
    },
    tie: function(params) {
        message("Match nul ! Tous les joueurs sont morts !");
    },
};

var callbacks = {
    open: function() {
        message("En attente du début de partie...");
    },
    error: function() {
        message('Erreur de connexion, vérifiez que le serveur est lancé');
    },
    close: function() {
        message('Déconnexion du serveur');
    },
    message: function(params) {
        if(typeof(params) !== 'string' && "data" in params)
            params = params.data;
        
        params = JSON.parse(params);
        
        if("action" in params && params.action in actions) {
            actions[params.action](params);
        }
    },
};
    