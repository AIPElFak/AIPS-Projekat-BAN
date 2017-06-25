var iterations =30;
    var xOffset= 0;
    var size = 5;
    var yOffset =3*size;
    var heightDiff=2*size;
    var jump=0.1;
    var curve=0.004;
    var height = 0;
    var parts = 40;
    var paths = [];

    yOffset = 3*size;
    heightDiff = 2*size;
    for (var bane= 0; bane<parts;++bane)
    {
        var path = [];
	for (var t = iterations; t>=0; t--) {
		for (var k = 0; k <= 1; k++) {
            
            var x = xOffset/2+heightDiff*Math.cos(Math.PI-t*Math.PI/(iterations));
		    var y = height+jump;
		    var z = yOffset/2+heightDiff*Math.sin(Math.PI-t*Math.PI/(iterations));
            if (k==0)
            {
                z=-1*z;
		        path[(iterations-t)]=(new BABYLON.Vector3(x, y, z));
            }
            else
                path[iterations+1+t]=(new BABYLON.Vector3(x, y, z));
		}
	}
    var x = xOffset/2+heightDiff;
	var y = height+jump;
	var z = -yOffset/2;

    height+=jump;
    size=size-curve;
    yOffset = 3*size;
    heightDiff = 2*size;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }