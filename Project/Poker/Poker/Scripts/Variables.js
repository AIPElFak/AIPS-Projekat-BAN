var setTableCard = function (position, card) {
    model.setTableCard(position, card);
    model.sounds["flop"].play();
}
var setPlayerChips = function (position, amount) {
    model.setPlayerChips(position, amount);
}
var resetPlayerChips = function()
{
    for (var i = 0; i < 8; ++i)
        model.setPlayerChips(i, 0);
}
var setPlayerTableChips = function (position, amount)
{
    PlayerTableChips[position] = amount;
}

var setPlayerCard = function (position, card1, card2) {
    model.setPlayerCards(position, card1, card2);
}
var setPlayerStats = function (username, position, amount)
{
    Usernames[position] = username;
    PlayerTableChips[position] = amount;
}
// to do
var positionPlayer = function (position)
{
    //fixCamera(position);
}
var playMan = function (position, amount, bigBlind)
{
    
    enableButtons();

    var call = document.getElementById("call");
    if (amount == 0)
        call.innerHTML = "Check";
    else
        call.innerHTML = "Call " + amount;

    var min = document.getElementsByClassName("irs-min");
    var max = document.getElementsByClassName("irs-max");

    min[0].innerHTML = bigBlind;
    max[0].innerHTML = PlayerTableChips[position] - amount;

    
   // timer = setTimeout(commitAction, 20000);
    model.sounds["wait"].play();
}
var commitAction = function()
{
    if (!readyToPlay)
    {
        var call = document.getElementById("call");
        if (call.innerHTML == "Check") {
            gameHub.server.play(0, gameModel.gameName);
            model.sounds["check"].play();
        }
        else {
            call.innerHTML = "Check";
            gameHub.server.play(-1, gameModel.gameName);
            model.sounds["fold"].play();
        }
    }
    else
    {
        clearTimeout(timer);
        readyToPlay = false;
        gameHub.server.play(raiseAmount, gameModel.gameName);
        if (raiseAmount < 0)
            model.sounds["fold"].play();
        if (raiseAmount == 0)
            model.sounds["check"].play();
        if (raiseAmount > 0)
            model.sounds["raise"].play();
    }
}
// to do 
var displayMove = function (position, amount)
{
    model.setPlayerChips(position, amount);
    PlayerChips[position] = amount;
}

var pileUp = function ()
{
    for (var i = 0; i < 8; ++i)
    {
        model.changeTableChips(model.playerChipAmount[i]);
        model.setPlayerChips(i, 0);
    }
}
var resetSceen = function ()
{
    model.resetSceen();
}



var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var timer;
var TableCards = new Array(5);
var PlayerCards = new Array(16);

var Usernames = new Array(8);

var PlayerTableChips = [0, 0, 0, 0, 0, 0, 0, 0];
var PlayerChips = [0, 0, 0, 0, 0, 0, 0, 0];
var PileChips = 0;

var activePlayers = new Array(8);
var noShownCards = 0;

var readyToPlay = false;
var raiseAmount = 0;

var scene = new BABYLON.Scene(engine);
model.scene = scene;
model.init();
resetAllCards();



