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
{ }
var positionPlayer = function (position)
{ }


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
var PlayerTableChips = new Array(16);
var activePlayers = new Array(8);
var PlayerChips = [4444000, 14894624, 245898864, 457864231, 154485632, 24789654, 14785689, 2224564];
var noShownCards = 0;

var scene = new BABYLON.Scene(engine);
resetAllCards();



