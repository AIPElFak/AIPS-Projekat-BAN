drawAllUsernamesAndAmounts = function (Size)
{
    var size = Size / 15;
    for (var i = 0; i < 8; ++i) {
        var username = drawBubble(size);
        var money = drawBubble(size);

        username.position.x = model.avatars[i].position.x;
        username.position.y = model.avatars[i].position.y;
        username.position.z = model.avatars[i].position.z;
        money.position.x = model.avatars[i].position.x;
        money.position.y = model.avatars[i].position.y;
        money.position.z = model.avatars[i].position.z;
        money.translate(new BABYLON.Vector3(0, -size*6, -size*2), 1, BABYLON.Space.WORLD);
        model.usernames[i] = username;
        model.playerTableMoney[i]=money
    }
}
var setUsername = function (position, name) {

    var ctx = model.usernames[position].material.diffuseTexture.getContext();
    ctx.clearRect(0, 0, 355 * 15, 355 * 15);
    if (name != "")
        model.usernames[position].material.diffuseTexture.drawText("   "+name, null, 450, "bold " + 500 + "px" + " verdana", "white");
    else
        model.usernames[position].material.diffuseTexture.update();
}
var setMoneyAmount = function (position, amount) {
    /*
    var options = {
        height: 512,
        width: 355 * 15
    }

    model.playerStakes[position].material.diffuseTexture.dispose();
    model.playerStakes[position].material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", options, scene, true);
    model.playerStakes[position].material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    if (amount != 0)
        model.playerStakes[position].material.diffuseTexture.drawText("$"+amount, null, 450, "bold " + 500 + "px" + " verdana", "white");
    */


    var ctx = model.playerTableMoney[position].material.diffuseTexture.getContext();
    ctx.clearRect(0, 0, 355 * 15, 355 * 15);
    if (amount != 0)
        model.playerTableMoney[position].material.diffuseTexture.drawText("$" + amount, null, 450, "bold " + 500 + "px" + " verdana", "white");
    else
        model.playerTableMoney[position].material.diffuseTexture.update();
}
var setMoneyAmountToText = function (position, amount) {
    
    var ctx = model.playerTableMoney[position].material.diffuseTexture.getContext();
    ctx.clearRect(0, 0, 355 * 15, 355 * 15);
    if (amount != 0)
        model.playerTableMoney[position].material.diffuseTexture.drawText("" + amount, null, 450, "bold " + 500 + "px" + " verdana", "white");
    else
        model.playerTableMoney[position].material.diffuseTexture.update();
}