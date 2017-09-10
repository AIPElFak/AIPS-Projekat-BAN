var gameHub = $.connection.gameHub;
var clientPos = 0;
var gameModel;
var currentHand = [];

function start(model) {
    gameModel = model;

    //functions for client to call hub
    $.connection.hub.start().done(function () {

        gameHub.server.enterGame(gameModel.username, gameModel.gameName);


    });
}

//functions for hub to call
gameHub.client.myPosition = function (position) {
    clientPos = position;
    //draw client
};

gameHub.client.displayPlayer = function (username, position) {
    var i = 5;
    //draw other player in pos
};

gameHub.client.startGame = function (handPositions, lead) {
    currentHand = handPositions;
    var currentHandLeader = 0;
    if (currentHandLeader === clientPos) {
        gameHub.server.newHand();
    }
};

gameHub.client.getCards = function (card1, card2, pos) {
    if (clientPos === pos) {
        //draw cards in front of client
    }
    else {
        //draw cards for other player
    }
};

gameHub.client.showSmallBlind = function (money, pos) {
    if (clientPos === pos) {
        //draw cards in front of client
    }
    else {
        //draw cards for other player
    }
};

gameHub.client.showBigBlind = function (money, pos) {
    if (clientPos === pos) {
        //draw cards in front of client
    }
    else {
        //draw cards for other player
    }
};

gameHub.client.askMe = function (pos) {
    if (clientPos === pos) {
        //draw cards in front of client
    }
    else {
        //draw cards for other player
    }
};