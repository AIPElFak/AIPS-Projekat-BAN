	var mat = new BABYLON.StandardMaterial("mat1", scene);
  	mat.alpha = 1.0;
  	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
  	mat.backFaceCulling = false;

    var mat2 = new BABYLON.StandardMaterial("mat2", scene);
  	mat2.alpha = 1.0;
  	mat2.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
  	mat2.backFaceCulling = false;  

	// parabola
	var iterations =30;
    var xOffset= 0;
    var size = 7;
    var yOffset =3.5*size;
    var heightDiff=2*size;
    var jump=0.1;
    var curve=0;
    var height = 0;
    var parts = 30;
    var diff= 0.0008;
    var paths = [];

    yOffset = 3.5*size;
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
    yOffset = 3.5*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }
	
    parts=10;
    curve = 0.01;
    jump=0.04;

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
    yOffset = 3.5*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }

    parts=15;
    curve = 0.007;
    jump=0.009;

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
    yOffset = 3.5*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }

    parts=15;
    curve = 0.00875;
    jump=0.001;

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
    yOffset = 3.5*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }
    parts=15;
    curve = 0.00875;
    jump=-0.001;

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
    yOffset = 3.5*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }

    parts=15;
    curve = 0.007;
    jump=-0.009;

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
    yOffset = 3.5*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }

    parts=17;
    curve = 0;
    jump =-0.1;
    

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
    yOffset = 3.5*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }
    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene);
	ribbon.material = mat;

    var paths2 = [];
    size+=curve;
    iterations =30;
    yOffset = 3.5*size;
    heightDiff = 2*size;
	for (var t = iterations; t>=0; t--) {
		var path = [];
		for (var k = 0; k <= 1; k++) {
            
            var x = xOffset/2+heightDiff*Math.cos(Math.PI-t*Math.PI/(iterations));
		    var y = height;
		    var z = yOffset/2+heightDiff*Math.sin(Math.PI-t*Math.PI/(iterations));
            if (k==0)
                z=-1*z;
		  path.push(new BABYLON.Vector3(x, y, z));
		}
		paths2.push(path);
		//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
	}

    var ribbon2 = BABYLON.Mesh.CreateRibbon("rib2", paths2, false, false, 0, scene);
	ribbon2.material = mat2;