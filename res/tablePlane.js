var paths = [];
	var iterations =30;
    var xOffset= 0;
    var yOffset =15;
    var heightDiff=10;
	for (var t = iterations; t>=0; t--) {
		var path = [];
		for (var k = 0; k <= 1; k++) {
            
            var x = xOffset/2+heightDiff*Math.cos(Math.PI-t*Math.PI/(iterations));
		    var y = 0;
		    var z = yOffset/2+heightDiff*Math.sin(Math.PI-t*Math.PI/(iterations));
            if (k==0)
                z=-1*z;
		  path.push(new BABYLON.Vector3(x, y, z));
		}
		paths.push(path);
		var lines = BABYLON.Mesh.CreateLines("par", path, scene);
	}