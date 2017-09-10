function drawElipticWraper(iterations, size, yOffset, heightDiff, jump, curve, height, parts, diff, paths) {

    for (var bane = 0; bane < parts; ++bane) {

        
        heightDiff = 2 * size;

        var path = [];
        for (var t = iterations; t >= 0; t--) {
            for (var k = 0; k <= 1; k++) {

                var x = heightDiff * Math.cos(Math.PI - t * Math.PI / (iterations));
                var y = height + jump;
                var z = yOffset / 2 + heightDiff * Math.sin(Math.PI - t * Math.PI / (iterations));
                if (k == 0) {
                    z = -1 * z;
                    path[(iterations - t)] = (new BABYLON.Vector3(x, y, z));
                }
                else
                    path[iterations + 1 + t] = (new BABYLON.Vector3(x, y, z));
            }
        }
        var x = heightDiff;
        var y = height + jump;
        var z = -yOffset / 2;

        height += jump;
        size = size - curve;
        curve = curve + diff;
        path[2 * iterations + 2] = new BABYLON.Vector3(x, y, z)
        paths.push(path);
        //var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }


    return size;
}	