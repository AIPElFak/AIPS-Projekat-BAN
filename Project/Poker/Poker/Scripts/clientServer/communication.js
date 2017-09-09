var gameHub = $.connection.gameHub;
var clientPos;
var gameModel;
var currentHand = [];

function start(model) {
    gameModel = model;
}

//functions for client to call hub
$.connection.hub.start().done(function () {

    gameHub.server.enterGame(gameModel.username, gameModel.tableName);


});



//functions for hub to call
gameHub.client.myPosition = function (position)
{
    clientPos = position;
    //draw client
}

gameHub.client.displayPlayer = function(username, position)
{
    var i = 5;
    //draw other player in pos
}

gameHub.client.startGame = function (handPositions, lead) {
    currentHand = handPositions;
    currentHandLeader = 0;
    if (currentHandLeader == clientPos)
    {
        //start game
    }
}