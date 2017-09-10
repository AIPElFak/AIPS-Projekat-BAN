var drawAllPlayingChipPositions = function (size, height, yOffset, heightDiff)
{
    var Size = size / 19;
    //1 i 8
    drawChipPile(Size, PlayerChips[0], height, heightDiff * 0.8, -yOffset * 0.3, Math.PI);
    drawChipPile(Size, PlayerChips[1], height, heightDiff * 0.8, yOffset * 0.3, Math.PI);

    //2 i 7
    drawChipPile(Size, PlayerChips[7], height, heightDiff * 0.8, -yOffset / 2, Math.PI * 11 / 15);
    drawChipPile(Size, PlayerChips[2], height, heightDiff * 0.8, yOffset / 2, -Math.PI * 11 / 15);

    //3 i 6
    drawChipPile(Size, PlayerChips[6], height, heightDiff * 0.8, -yOffset / 2, Math.PI * 6 / 15);
    drawChipPile(Size, PlayerChips[3], height, heightDiff * 0.8, yOffset / 2, - Math.PI * 6 / 15);

    //4 i 5
    drawChipPile(Size, PlayerChips[5], height, heightDiff * 0.8, -yOffset / 2, Math.PI / 15);
    drawChipPile(Size, PlayerChips[4], height, heightDiff * 0.8, yOffset / 2, - Math.PI / 15);
}

var drawChip = function (size, texture) {
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

    var ribbon1 = drawElipticBase(iterations, heightDiff, height, yOffset, texture);

    heightDiff = 3 * Size / 2;


    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    height += jump * parts;
    parts = 15;
    curve = 0;
    jump = Size / 2777;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene);
    ribbon.material = texture;


    heightDiff = 2 * Size;

    var ribbon2 = drawElipticBase(iterations, heightDiff, height, yOffset, texture);

    var ribbons = [];
    ribbons.push(ribbon);
    ribbons.push(ribbon1);
    ribbons.push(ribbon2);

    return ribbons;
}

function drawElipticBase(iterations, heightDiff, height, yOffset, texture) {
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
    ribbon.material = texture;

    return ribbon;
}


var drawChipPile = function (size, sum, height, distanceX, distanceY, angle) {
    var tempSum = sum;

    var chips = findChipsForSum(tempSum, 6);
    var xStackOffsets = [0, size *4 , size*3.5, size*7.5];
    var zStackOffsets = [0, -size * 2, size * 2.5, size * 0.5];
    var firstChip;

    for (var i = 0; i < 4; ++i) {
        if (i==0)
            firstChip = drawStackOfChips(size, chips, height, distanceX, distanceY, angle - Math.PI * 3 / 30, xStackOffsets[i], zStackOffsets[i]);
        else
            drawStackOfChips(size, chips, height, distanceX, distanceY, angle - Math.PI * 3 / 30, xStackOffsets[i], zStackOffsets[i]);
        tempSum = removeChipsFromSum(tempSum, chips);
        chips = findChipsForSum(tempSum, 5-i);
    }

    var chipAmount = drawChipAmount(size, sum);

    chipAmount.rotate(BABYLON.Axis.Y, angle - Math.PI * 3 / 30 , BABYLON.Space.LOCAL);
    chipAmount.translate(new BABYLON.Vector3(0, size*6, 0), 1, BABYLON.Space.LOCAL);
    chipAmount.translate(new BABYLON.Vector3(distanceX, 0, 0), 1, BABYLON.Space.LOCAL);
    chipAmount.translate(new BABYLON.Vector3(0, 0, distanceY), 1, BABYLON.Space.WORLD);
    chipAmount.translate(new BABYLON.Vector3(0, height * 1.1, -size * 0.115), 1, BABYLON.Space.LOCAL);
    //chipAmount.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.LOCAL);
    
}
var removeChipsFromSum = function (sum, chips)
{
    var tempSum = sum;
    chips.forEach(function (element) {
        tempSum -= element;
    })

    return tempSum;
}
var drawStackOfChips = function (Size, chips, height, distanceX, distanceY,angle, xStackOffset,zStackOffset) {
    var yOffset = 0;
    var firstChip;
    var first = true;

    chips.forEach(function (element) {


        var texture = new BABYLON.StandardMaterial("mat4", scene);
        texture.alpha = 1;
        texture.diffuseColor = new BABYLON.Color3(1, 1, 1);
        texture.backFaceCulling = false;
        texture.diffuseTexture = new BABYLON.Texture("../Scripts/textures/"+element+".png", scene);

        var chip = drawChip(Size, texture);
        if (first) {
            firstChip = first;
            first = false;
        }
        
        for (var i = 0; i < 3; ++i)
        {
            chip[i].rotate(BABYLON.Axis.Y, angle, BABYLON.Space.LOCAL);
            chip[i].translate(new BABYLON.Vector3(0, yOffset, 0), 1, BABYLON.Space.LOCAL);
            chip[i].translate(new BABYLON.Vector3(distanceX, 0, 0), 1, BABYLON.Space.LOCAL);
            chip[i].translate(new BABYLON.Vector3(0, 0, distanceY), 1, BABYLON.Space.WORLD);
            chip[i].translate(new BABYLON.Vector3(zStackOffset, height * 1.1, -Size * 0.115 + xStackOffset), 1, BABYLON.Space.LOCAL);
        }

        yOffset += 0.75 * Size;
    })
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

var drawChipAmount = function(size, amount)
{
    var str = "$" + amount;
    var options = {
        height: 512,
        width: 350 * str.length
    }
    var mat = new BABYLON.DynamicTexture("dynamic texture", options, scene, true);

    var paths = [];
    var iterations = 10;
    var Size = size /5;
    var xOffset = Size * 5 * (str.length);
    var yOffset = Size * 10;
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

    //ribbon.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    ribbon.material = new BABYLON.StandardMaterial("outputplane", scene);
    ribbon.material.diffuseTexture = mat;
    ribbon.material.specularColor = new BABYLON.Color3(0, 0, 0);
    ribbon.material.emissiveColor = new BABYLON.Color3(1, 1, 1);

    mat.drawText(str, null, 450, "bold " + 500 + "px" + " verdana", "white");


    return ribbon;

}
