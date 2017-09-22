var drawAllPlayingChipPositions = function (size, height, yOffset, heightDiff)
{
    var Size = size / 19;
    //1 i 8
    drawChipPile(Size, height, heightDiff * 0.8, -yOffset * 0.3, Math.PI, 0);
    drawChipPile(Size, height, heightDiff * 0.8, yOffset * 0.3, Math.PI, 7);

    //2 i 7
    drawChipPile(Size, height, heightDiff * 0.8, -yOffset / 2, Math.PI * 11 / 15, 1);
    drawChipPile(Size, height, heightDiff * 0.8, yOffset / 2, -Math.PI * 11 / 15, 6);

    //3 i 6
    drawChipPile(Size, height, heightDiff * 0.8, -yOffset / 2, Math.PI * 6 / 15, 2);
    drawChipPile(Size, height, heightDiff * 0.8, yOffset / 2, - Math.PI * 6 / 15, 5);

    //4 i 5
    drawChipPile(Size, height, heightDiff * 0.8, -yOffset / 2, Math.PI / 15, 3);
    drawChipPile(Size, height, heightDiff * 0.8, yOffset / 2, - Math.PI / 15, 4);
}
var drawChip = function (size) {
    var iterations = 30;
    var Size = size;
    var yOffset = 0;
    var heightDiff = 3 * Size / 2;
    var jump = Size / 50;
    var curve = 0;
    var height = 0;
    var parts = 30;
    var diff = 0;
    var paths = [];

    heightDiff = 2 * Size;

    var ribbon1 = drawElipticBase(iterations, heightDiff, height, yOffset);

    heightDiff = 3 * Size / 2;


    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    height += jump * parts;
    parts = 15;
    curve = 0;
    jump = Size / 2777;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene);


    heightDiff = 2 * Size;

    var ribbon2 = drawElipticBase(iterations, heightDiff, height, yOffset);

    var ribbons = [];
    ribbons.push(ribbon);
    ribbons.push(ribbon1);
    ribbons.push(ribbon2);

    return ribbons;
}
function drawElipticBase(iterations, heightDiff, height, yOffset) {
    var paths = [];

    for (var t = iterations; t >= 0; t--) {
        var path = [];
        for (var k = 0; k <= 1; k++) {

            var x = heightDiff * Math.cos(Math.PI - t * Math.PI / (iterations));
            var y = height;
            var z = yOffset / 2 + heightDiff * Math.sin(Math.PI - t * Math.PI / (iterations));
            if (k == 0)
                z = -1 * z;
            path.push(new BABYLON.Vector3(x, y, z));
        }
        paths.push(path);
        //var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }

    var faceUV = new Array(iterations * 2 + 1);
    var maxX = heightDiff;
    var minX = -heightDiff;
    var diffX = maxX - minX;
    var maxZ = yOffset / 2 + heightDiff;
    var minZ = -maxZ;
    var diffZ = maxZ - minZ;

    for (var i = 0; i < iterations + 1; ++i) {
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
var drawChipPile = function (size, height, distanceX, distanceY, angle, position) {
    
    
    var xStackOffsets = [0, size *4 , size*3.5, size*7.5];
    var zStackOffsets = [0, -size * 2, size * 2.5, size * 0.5];
    var firstChip;

    model.playerChips[position] = new Array();
    for (var i = 0; i < 4; ++i) {
        if (i==0)
            firstChip = drawStackOfChips(0,size, 5, height, distanceX, distanceY, angle - Math.PI * 3 / 30, xStackOffsets[i], zStackOffsets[i], position);
        else
            drawStackOfChips(i, size, 5, height, distanceX, distanceY, angle - Math.PI * 3 / 30, xStackOffsets[i], zStackOffsets[i], position);
        
    }

    var chipAmount = drawChipAmount(size);

    //chipAmount.position = firstChip.position;
    model.playerStakes[position] = chipAmount;
    //chipAmount.rotate(BABYLON.Axis.Y, angle - Math.PI * 3 / 30 , BABYLON.Space.LOCAL);
    //chipAmount.translate(new BABYLON.Vector3(0, size*6, 0), 1, BABYLON.Space.LOCAL);
    //chipAmount.translate(new BABYLON.Vector3(distanceX, 0, 0), 1, BABYLON.Space.LOCAL);
    //chipAmount.translate(new BABYLON.Vector3(0, 0, distanceY), 1, BABYLON.Space.WORLD);
    //chipAmount.translate(new BABYLON.Vector3(0, height * 1.1, -size * 0.115), 1, BABYLON.Space.LOCAL);
    //chipAmount.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.LOCAL);
    
}
var drawStackOfChips = function (stackNumber, Size, chips, height, distanceX, distanceY,angle, xStackOffset,zStackOffset, position) {
    var yOffset = 0;
    var firstChip;
    var first = true;
    for (var i = 0; i < chips;++i)
    {    

        var chip = drawChip(Size);
        if (first) {
            firstChip = first;
            first = false;
        }
        model.playerChips[position][stackNumber * chips + i] = new Array();
        for (var j = 0; j < 3; ++j)
        {
            chip[j].rotate(BABYLON.Axis.Y, angle, BABYLON.Space.LOCAL);
            chip[j].translate(new BABYLON.Vector3(0, yOffset, 0), 1, BABYLON.Space.LOCAL);
            chip[j].translate(new BABYLON.Vector3(distanceX, 0, 0), 1, BABYLON.Space.LOCAL);
            chip[j].translate(new BABYLON.Vector3(0, 0, distanceY), 1, BABYLON.Space.WORLD);
            chip[j].translate(new BABYLON.Vector3(zStackOffset, height * 1.1, -Size * 0.115 + xStackOffset), 1, BABYLON.Space.LOCAL);
            model.playerChips[position][stackNumber * chips + i].push(chip[j]);
        }

        yOffset += 0.75 * Size;
    }
    return firstChip;
}
var findChipsForSum = function (sum, limit) {
    var niz = [100, 500, 1000, 5000, 25000, 100000, 250000, 500000, 1000000];
    var values = [];
    var i = 0;
    var j = 8;
    var sumCopy = sum;

    while (sumCopy != 0 && i != limit && j >= 0) {
        if (sumCopy >= niz[j]) {
            sumCopy -= niz[j];
            values.push(niz[j]);
            i++;
        }
        else
            j--;
    }

    return values;
}
var drawChipAmount = function (Size) {
    var size = Size / 15;
    var str = "";
    var options = {
        height: 512,
        width: 355 * 15
    }
    var mat = new BABYLON.DynamicTexture("dynamic texture", options, scene, true);

    var paths = [];
    var iterations = 10;
    var Size = size / 5;
    var xOffset = Size * 5 * 15;
    var yOffset = Size * 10;
    var heightDiff = Size * 1.4;
    for (var t = iterations; t >= 0; t--) {
        var path = [];
        for (var k = 0; k <= 1; k++) {

            var x = (xOffset - 2 * heightDiff) / 2 + heightDiff * Math.cos(Math.PI / 2 - t * Math.PI / (2 * iterations));
            var z = 0;
            var y = yOffset / 2 + heightDiff * Math.sin(Math.PI / 2 - t * Math.PI / (2 * iterations));
            if (k == 0)
                y = -1 * y;
            path.push(new BABYLON.Vector3(x, y, z));
        }
        paths.push(path);
        //var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }
    for (var t = iterations; t >= 0; t--) {
        var path = [];
        for (var k = 0; k <= 1; k++) {

            var x = -xOffset / 2 + heightDiff * Math.cos(Math.PI - t * Math.PI / (2 * iterations));
            var z = 0;
            var y = yOffset / 2 + heightDiff * Math.sin(Math.PI - t * Math.PI / (2 * iterations));
            if (k == 0)
                y = -1 * y;
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
        var ulZ = (paths[i][0].y - minZ) / diffZ;
        var dlX = (paths[i][1].x - minX) / diffX;
        var dlZ = (paths[i][1].y - minZ) / diffZ;
        faceUV[i * 2] = new BABYLON.Vector2(ulX, ulZ);
        faceUV[i * 2 + 1] = new BABYLON.Vector2(dlX, dlZ);
    }



    var ribbon = BABYLON.MeshBuilder.CreateRibbon("rib", {
        pathArray: paths,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE, offset: 0, uvs: faceUV, invertUV: true
    }, scene);

    ribbon.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    ribbon.material = new BABYLON.StandardMaterial("outputplane", scene);
    ribbon.material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", options, scene, true);;
    ribbon.material.diffuseTexture.drawText(str + str, null, 450, "bold " + 500 + "px" + " verdana", "white");
    ribbon.material.diffuseTexture.hasAlpha = true;

    return ribbon;

}
var setStakes = function (position, amount)
{
    var options = {
        height: 512,
        width: 355 * 15
    }

    model.playerStakes[position].material.diffuseTexture.dispose();
    model.playerStakes[position].material.diffuseTexture = new BABYLON.DynamicTexture("dynamic texture", options, scene, true);;
    model.playerStakes[position].material.diffuseTexture.drawText("$"+amount, null, 450, "bold " + 500 + "px" + " verdana", "white");
    model.playerStakes[position].material.diffuseTexture.hasAlpha = true;
}
