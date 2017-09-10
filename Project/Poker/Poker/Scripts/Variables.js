var setTableCard = function (position, card) {
    var newCard = new BABYLON.StandardMaterial("mat5", scene);
    newCard.alpha = 1;
    newCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
    newCard.backFaceCulling = false;
    newCard.diffuseTexture = new BABYLON.Texture("../Scripts/textures/" + card + ".png", scene);

    TableCards[position] = newCard;
    noShownCards = position + 1;
}
var setPlayerChips = function (position, amount) {
    PlayerChips[position] = amount;
}
var resetPlayerChips = function()
{
    for (var i = 0; i < 8; ++i)
        activePlayers[i] = false;
}
var setPlayerTableChips = function (position, amount)
{
    PlayerTableChips[position] = amount;
}

var setPlayerCard = function (position, card1, card2) {
    var firstCard = new BABYLON.StandardMaterial("mat6", scene);
    firstCard.alpha = 1;
    firstCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
    firstCard.backFaceCulling = false;
    firstCard.diffuseTexture = new BABYLON.Texture("../Scripts/textures/" + card + ".png", scene);

    var secondCard = new BABYLON.StandardMaterial("mat7", scene);
    secondCard.alpha = 1;
    secondCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
    secondCard.backFaceCulling = false;
    secondCard.diffuseTexture = new BABYLON.Texture("../Scripts/textures/" + card + ".png", scene);

    PlayerCards[position * 2] = firstCard;
    PlayerCards[position * 2 + 1] = secondCard;

    activePlayers[position] = true;
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
    var startTime = new Date().getTime() / 1000;
    var endTIme = new Date().getTime() / 1000;
    enableButtons();

    var call = document.getElementById(call);
    if (amount == 0)
        call.innerHTML = "Check";
    else
        call.innerHTML = "Call " + amount;

    var min = document.getElementsByClassName("irs-min");
    var max = document.getElementsByClassName("irs-max");

    min[0].innerHTML = bigBlind;
    max[0].innerHTML = PlayerTableChips[position] - amount;

    while (!readyToPlay && endTIme - startTime < 30)
    {
        endTIme = new Date().getTime() / 1000;
    }

    readyToPlay = false;

    return raiseAmount;
}

var displayMove = function (position, amount)
{
    PlayerTableChips[position] -= amount;
    PlayerChips[position] = amount;
}

var pileUp = function ()
{
    for (var i = 0; i < 8; ++i)
        if (activePlayers[i])
        {
            PileChips += PlayerChips[i];
            PlayerChips[i] = 0;
        }
}

var resetAllCards = function () {
    noShownCards = 0;

    var blankCard = new BABYLON.StandardMaterial("mat5", scene);
    blankCard.alpha = 1;
    blankCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
    blankCard.backFaceCulling = false;
    blankCard.diffuseTexture = new BABYLON.Texture("../Scripts/textures/back.png", scene);

    for (var i = 0; i < 16; ++i)
        PlayerCards[i] = blankCard;

    for (var i = 0; i < 5; ++i)
        TableCards[i] = blankCard;
}


var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

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
resetAllCards();



