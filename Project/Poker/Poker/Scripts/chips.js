var drawChip = function (size, texture) {
    var iterations = 30;
    var Size = size;
    var yOffset = 0;
    var heightDiff = 3 * Size / 2;
    var jump = Size / 250;
    var curve = 0;
    var height = 0;
    var parts = 30;
    var diff = 0;
    var paths = [];

    heightDiff = 2 * Size;

    drawElipticBase(iterations, heightDiff, height, yOffset, texture);

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

    drawElipticBase(iterations, heightDiff, height, yOffset, texture);

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
}