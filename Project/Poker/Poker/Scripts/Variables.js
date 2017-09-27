var setTableCard = function (position, card) {
    if (model.noShownCards <= position) {

        var delay = 500;
        if (position === 2 || position === 3)
            delay *= position;
        setTimeout(function (position, card) {
            model.setTableCard(position, card);
            model.sounds["flop"].play();
            pileUp();
        }, delay, position, card);
        model.noShownCards++;
    }
}
var setPlayerChips = function (position, amount, simulation) {
    model.changePlayerChipAmount(position, amount);
    if (simulation != 1)
        model.changePlayerTableMoneyAmount(position, -amount);
}
var resetPlayerChips = function()
{
    for (var i = 0; i < 8; ++i)
        model.setPlayerChips(i, 0);
}
var setMoveName = function (position, move)
{
    model.setMoveName(position, move);
}
var setPlayerTableChips = function (position, amount)
{
    PlayerTableChips[position] = amount;
}
var setPlayerCard = function (position, card1, card2) {
    model.setPlayerCards(position, card1, card2);
}
var setPlayerStats = function (username, position, amount, avatar)
{
    model.setUsername(position, username);
    model.setAvatar(position, avatar);
    PlayerTableChips[position] = amount;
    model.setPlayerTableMoneyAmount(position, amount);
}
var positionPlayer = function (position)
{
    myPositon = position;
    if (position < 2 || position > 5) {
        model.camera.setPosition(new BABYLON.Vector3(-50, 45, 0));
        model.avatars[2].position.y *= 3.5;
        model.avatars[3].position.y *= 3.5;
        model.avatars[4].position.y *= 3.5;
        model.avatars[5].position.y *= 3.5;
        model.usernames[2].translate(new BABYLON.Vector3(0, 10, -2), 1, BABYLON.Space.WORLD);
        model.usernames[3].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);
        model.usernames[4].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);
        model.usernames[5].translate(new BABYLON.Vector3(0, 10, 2), 1, BABYLON.Space.WORLD);
        model.usernames[0].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);
        model.usernames[1].translate(new BABYLON.Vector3(0, -8, -2), 1, BABYLON.Space.WORLD);
        model.usernames[6].translate(new BABYLON.Vector3(0, -8, 2), 1, BABYLON.Space.WORLD);
        model.usernames[7].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);

        model.playerTableMoney[2].translate(new BABYLON.Vector3(0, 10, -3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[3].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[4].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[5].translate(new BABYLON.Vector3(0, 10, 3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[0].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[1].translate(new BABYLON.Vector3(0, -8, -3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[6].translate(new BABYLON.Vector3(0, -8, 3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[7].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);
    }
    else
    {
        model.avatars[0].position.y *= 3.5;
        model.avatars[1].position.y *= 3.5;
        model.avatars[6].position.y *= 3.5;
        model.avatars[7].position.y *= 3.5;
        model.usernames[2].translate(new BABYLON.Vector3(0, -8, 2), 1, BABYLON.Space.WORLD);
        model.usernames[3].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);
        model.usernames[4].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);
        model.usernames[5].translate(new BABYLON.Vector3(0, -8, -2), 1, BABYLON.Space.WORLD);
        model.usernames[0].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);
        model.usernames[1].translate(new BABYLON.Vector3(0, 10, 2), 1, BABYLON.Space.WORLD);
        model.usernames[6].translate(new BABYLON.Vector3(0, 10, -2), 1, BABYLON.Space.WORLD);
        model.usernames[7].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);

        model.playerTableMoney[2].translate(new BABYLON.Vector3(0, -8, 3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[3].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[4].translate(new BABYLON.Vector3(0, -8, 0), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[5].translate(new BABYLON.Vector3(0, -8, -3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[0].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[1].translate(new BABYLON.Vector3(0, 10, 3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[6].translate(new BABYLON.Vector3(0, 10, -3.15), 1, BABYLON.Space.WORLD);
        model.playerTableMoney[7].translate(new BABYLON.Vector3(0, 10, 0), 1, BABYLON.Space.WORLD);
    }
}
var playMan = function (position, amount, bigBlind)
{
    
    enableButtons();

    var call = document.getElementById("call");
    if (amount == 0)
        call.innerHTML = "Check";
    else
        call.innerHTML = "Call " + amount;

    maxRaise(position, amount);

    //timer = setTimeout(commitAction, 15000);
    model.sounds["wait"].play();
}
var commitAction = function()
{
    if (!readyToPlay)
    {
        model.sounds["wait"].pause();
        model.sounds["wait"].currentTime = 0;

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
        model.sounds["wait"].pause();
        model.sounds["wait"].currentTime = 0;

        //clearTimeout(timer);

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
var displayMove = function (position, amount, simulation) {
    if (amount < 0)
    {
        model.foldPlayer(position);
        model.sounds["fold"].play();
    }
    else {
        model.changePlayerChipAmount(position, amount);
		if (simulation != 1)
			model.changePlayerTableMoneyAmount(position, -amount);
        PlayerChips[position] += amount;
        if (amount === 0)
            model.sounds["check"].play();
        else
            model.sounds["raise"].play();
    }
}
var pileUp = function ()
{
    var amount = 0;
    for (var i = 0; i < 8; ++i)
    {
        amount += model.playerChipAmount[i];
        model.setPlayerChips(i, 0);
    }
    model.changeTableChips(amount);
}
var resetSceen = function ()
{
    //setTimeout(function () {
        model.resetSceen();
    //}, 2000);
}
var showWinner = function (position, noWinners, simulation)
{
    pileUp();

    var devide = parseInt(noWinners);
    if (noWinners === 'undefined')
        devide = 1;

    if (position === myPositon)
        model.sounds["win"].play();

    if (simulation != 1)
        model.changePlayerTableMoneyAmount(position, model.tableChipAmount / devide);
    card1 = model.playerCards[position][0].material;
    card2 = model.playerCards[position][1].material;
    for (var i = 0; i < 9; ++i) {
        if (i % 2 === 1)
            setTimeout(setPlayerCards, i * 500, position, 'gold', 'gold');
        else
            setTimeout(setPlayerCardMaterials, i * 500, position, card1, card2);
    }
}
var setPlayerCards = function(position, card1, card2)
{
    model.setPlayerCards(position, card1, card2);
}
var setPlayerCardMaterials = function (position, card1, card2)
{
    model.setPlayerCardMaterials(position, card1, card2);
}
var maxRaise = function (position,raise)
{
    var minRaise = model.playerTableMoneyAmount[position]-raise;
    var totalRaise = raise + model.playerChipAmount[position];
    for (var i = 0; i < 8; ++i) {
        if (model.playerChipAmount[i] != 'undefined') {
            var capacity = model.playerTableMoneyAmount[i] - totalRaise + model.playerChipAmount[i];
            if (capacity < minRaise && model.playerTableMoneyAmount[i])
                minRaise = capacity;
        }
    }
    document.getElementById("money").value = minRaise;
}
var removePlayer = function (positon)
{
    model.eliminatePlayer(positon);
}

myPositon = 0;
var card1, card2;
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




