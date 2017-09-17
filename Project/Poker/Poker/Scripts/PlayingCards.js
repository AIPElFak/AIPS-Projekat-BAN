var drawAllPlayingCardPositions = function (Size, height, yOffset, heightDiff) {
    

    //1 i 8  
    drawAParOfCCards(Size, height, heightDiff * 0.8, -yOffset * 0.3, Math.PI, 0);
    drawAParOfCCards(Size, height, heightDiff * 0.8, yOffset * 0.3, Math.PI, 7);

    //2 i 7
    drawAParOfCCards(Size, height, heightDiff * 0.8, -yOffset / 2, Math.PI * 11 / 15, 1);
    drawAParOfCCards(Size, height, heightDiff * 0.8, yOffset / 2, -Math.PI * 11 / 15, 6);

    //3 i 6
    drawAParOfCCards(Size, height, heightDiff * 0.8, -yOffset / 2, Math.PI * 6 / 15, 2);
    drawAParOfCCards(Size, height, heightDiff * 0.8, yOffset / 2, -Math.PI * 6 / 15, 5);

    //4 i 5
    drawAParOfCCards(Size, height, heightDiff * 0.8, -yOffset / 2, Math.PI / 15, 3);
    drawAParOfCCards(Size, height, heightDiff * 0.8, yOffset / 2, -Math.PI / 15, 4);

}
var drawAParOfCCards = function (Size, height, distanceX, distanceY, angle, position) {

    var card1 = drawCardPosition(Size);
    var card2 = drawCardPosition(Size);

    card1.rotate(BABYLON.Axis.Y, angle, BABYLON.Space.LOCAL);
    card1.translate(new BABYLON.Vector3(distanceX, 0, 0), 1, BABYLON.Space.LOCAL);
    card1.translate(new BABYLON.Vector3(0, 0, distanceY), 1, BABYLON.Space.WORLD);
    card1.translate(new BABYLON.Vector3(0, height * 1.1, -Size * 0.115), 1, BABYLON.Space.LOCAL);
    card1.rotate(BABYLON.Axis.Y, Math.PI * 0.8 / 2, BABYLON.Space.LOCAL);

    card2.rotate(BABYLON.Axis.Y, angle, BABYLON.Space.LOCAL);
    card2.translate(new BABYLON.Vector3(distanceX, 0, 0), 1, BABYLON.Space.LOCAL);
    card2.translate(new BABYLON.Vector3(0, 0.1, distanceY), 1, BABYLON.Space.WORLD);
    card2.translate(new BABYLON.Vector3(0, height * 1.1, Size * 0.115), 1, BABYLON.Space.LOCAL);
    card2.rotate(BABYLON.Axis.Y, Math.PI * 1.2 / 2, BABYLON.Space.LOCAL);

    model.playerCards[position] = new Array();
    model.playerCards[position][0] = card1;
    model.playerCards[position][1] = card2;
}
var drawCardPosition = function (size) {
    var paths = [];
    var iterations = 10;
    var Size = size / 45;
    var xOffset = Size * 11;
    var yOffset = Size * 20;
    var heightDiff = Size * 1.4;
    for (var t = iterations; t >= 0; t--) {
        var path = [];
        for (var k = 0; k <= 1; k++) {

            var x = (xOffset - 2 * heightDiff) / 2 + heightDiff * Math.cos(Math.PI / 2 - t * Math.PI / (2 * iterations));
            var y = 0;
            var z = yOffset / 2 + heightDiff * Math.sin(Math.PI / 2 - t * Math.PI / (2 * iterations));
            if (k == 0)
                z = -1 * z;
            path.push(new BABYLON.Vector3(x, y, z));
        }
        paths.push(path);
        //var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }
    for (var t = iterations; t >= 0; t--) {
        var path = [];
        for (var k = 0; k <= 1; k++) {

            var x = -xOffset / 2 + heightDiff * Math.cos(Math.PI - t * Math.PI / (2 * iterations));
            var y = 0;
            var z = yOffset / 2 + heightDiff * Math.sin(Math.PI - t * Math.PI / (2 * iterations));
            if (k == 0)
                z = -1 * z;
            path.push(new BABYLON.Vector3(x, y, z));
        }
        paths.push(path);
        //var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }

    var faceUV = new Array(iterations * 2 + 1);
    var maxX = (xOffset - 2 * heightDiff) / 2 + heightDiff;
    var minX = -xOffset / 2 - heightDiff;
    var diffX = maxX - minX;
    var maxZ = yOffset / 2 + heightDiff;
    var minZ = -maxZ;
    var diffZ = maxZ - minZ;

    for (var i = 0; i < iterations * 2 + 2; ++i) {
        var ulX = (paths[i][0].x - minX) / diffX;
        var ulZ = (paths[i][0].z - minZ) / diffZ;
        var dlX = (paths[i][1].x - minX) / diffX;
        var dlZ = (paths[i][1].z - minZ) / diffZ;
        faceUV[i * 2] = new BABYLON.Vector2(ulX, ulZ);
        faceUV[i * 2 + 1] = new BABYLON.Vector2(dlX, dlZ);
    }

    var ribbon = BABYLON.MeshBuilder.CreateRibbon("rib", {
        pathArray: paths,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE, offset: 0, uvs: faceUV, invertUV: true
    }, scene);

    return ribbon;
}
var drawTableCards = function (Size) {

    for (var i = 0; i < 5; ++i) {
        var card = drawCardPosition(Size);
        card.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.LOCAL);
        card.translate(new BABYLON.Vector3(-Size + Size / 2 * i, Size * 0.1, 0), 1, BABYLON.Space.LOCAL);
        model.tableCards[i] = card; 
    }

}