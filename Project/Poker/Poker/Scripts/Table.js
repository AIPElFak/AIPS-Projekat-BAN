function drawTable(size, mat, mat2, mat3, firstCard, secondCard, blankCard, position) {

    var iterations = 30;
    var Size = size;
    var yOffset = 3*Size;
    var heightDiff = 3 * Size / 2;
    var jump = Size / 250;
    var curve = 0;
    var height = 0;
    var parts = 30;
    var diff = Size / 31250;
    var paths = [];
    


    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    yOffset = 3 * Size;
    height += jump * parts;
    parts = 10;
    curve = Size / 2500;
    jump = Size / 2500;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    yOffset = 3 * Size;
    height += jump * parts;
    parts = 15;
    curve = Size / 3571;
    jump = Size / 2777;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    yOffset = 3 * Size;
    height += jump * parts;
    parts = 15;
    curve = Size / 2857;
    jump = Size / 25000;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    yOffset = 3 * Size;
    height += jump * parts;
    parts = 15;
    curve = Size / 2857;
    jump = -Size / 25000;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    yOffset = 3 * Size;
    height += jump * parts;
    parts = 15;
    curve = Size / 3571;
    jump = -Size / 2777;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths);

    yOffset = 3 * Size;
    height += jump * parts;
    parts = 17;
    curve = 0;
    jump = -Size / 250;


    var paths2 = [];

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths2);

    yOffset = 3 * Size;
    height += jump * parts;
    parts = 17;
    curve = Size / 680;
    jump = -Size / 2500;

    paths.push(paths2[0]);
    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene);
    ribbon.material = mat;

    Size = drawElipticWraper(iterations, Size, yOffset, heightDiff, jump, curve, height, parts, diff, paths2);


    var ribbon2 = BABYLON.Mesh.CreateRibbon("rib2", paths2, false, false, 0, scene);
    ribbon2.material = mat2;


    var paths3 = [];
    Size += curve;
    iterations = 30;
    yOffset = 3.1 * Size;
    heightDiff = 2 * Size;
    for (var t = iterations; t >= 0; t--) {
        var path = [];
        for (var k = 0; k <= 1; k++) {

            var x = heightDiff * Math.cos(Math.PI - t * Math.PI / (iterations));
            var y = height;
            var z = yOffset / 2 + heightDiff * Math.sin(Math.PI - t * Math.PI / (iterations));
            if (k == 1)
                z = -1 * z;
            path.push(new BABYLON.Vector3(x, y, z));
        }
        paths3.push(path);
        //var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }

    var ribbon3 = BABYLON.Mesh.CreateRibbon("rib3", paths3, false, false, 0, scene);
    ribbon3.material = mat3;

    drawAllPlayingCardPositions(Size, height, yOffset, heightDiff);
    drawAllPlayingChipPositions(Size, height, yOffset, heightDiff);
    drawAllAvatars(Size, height, yOffset, heightDiff);

}