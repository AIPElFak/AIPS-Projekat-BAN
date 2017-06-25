var createScene = function () {
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3( 0.5, 0.5, 0.5);
	// camera
	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
	camera.setPosition(new BABYLON.Vector3(0, 10, -50));
	camera.attachControl(canvas, true);
	// light
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
	light.intensity = 0.7;
	// material
	var mat = new BABYLON.StandardMaterial("mat1", scene);
  	mat.alpha = 1.0;
  	mat.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  	mat.backFaceCulling = false;
    mat.diffuseTexture = new BABYLON.Texture("textures/grass.png", scene);

	// parabola
	var paths = [];
    var iterations =10;
    var xOffset=11;
    var yOffset =20;
    var heightDiff=1.4;
	for (var t = iterations; t>=0; t--) {
		var path = [];
		for (var k = 0; k <= 1; k++) {
            
            var x = (xOffset-2*heightDiff)/2+heightDiff*Math.cos(Math.PI/2-t*Math.PI/(2*iterations));
		    var y = 0;
		    var z = yOffset/2+heightDiff*Math.sin(Math.PI/2-t*Math.PI/(2*iterations));
            if (k==0)
                z=-1*z;
		  path.push(new BABYLON.Vector3(x, y, z));
		}
		paths.push(path);
		//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
	}
    for (var t = iterations; t>=0; t--) {
		var path = [];
		for (var k = 0; k <= 1; k++) {
            
            var x = -xOffset/2+heightDiff*Math.cos(Math.PI-t*Math.PI/(2*iterations));
		    var y = 0;
		    var z = yOffset/2+heightDiff*Math.sin(Math.PI-t*Math.PI/(2*iterations));
            if (k==0)
                z=-1*z;
		  path.push(new BABYLON.Vector3(x, y, z));
		}
		paths.push(path);
		//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
	}
    

	
	var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene, 
    false, BABYLON.Mesh.BACKSIDE);
	ribbon.material = mat;
	

    return scene;
};