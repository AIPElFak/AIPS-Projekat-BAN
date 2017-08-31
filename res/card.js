var createScene = function () {
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3( 0.5, 0.5, 0.5);
	// camera
	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
	camera.setPosition(new BABYLON.Vector3(0, 10, -50));
	camera.attachControl(canvas, true);
	// light
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
	light.intensity = 1;
	// material
	var mat = new BABYLON.StandardMaterial("mat1", scene);
  	mat.alpha = 1.0;
  	mat.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  	mat.backFaceCulling = false;
    mat.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/2000px-Ace_of_spades.svg.png", scene);

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
    
    var faceUV = new Array(iterations*2+1);
    var maxX = (xOffset-2*heightDiff)/2+heightDiff;
    var minX = -xOffset/2-heightDiff;
    var diffX = maxX-minX;
    var maxZ = yOffset/2+heightDiff;
    var minZ = -maxZ;
    var diffZ = maxZ-minZ;

    for (var i=0; i< iterations*2+2;++i)
    {
        var ulX = (paths[i][0].x - minX)/diffX;
        var ulZ = (paths[i][0].z - minZ)/diffZ;
        var dlX = (paths[i][1].x - minX)/diffX;
        var dlZ = (paths[i][1].z - minZ)/diffZ;
        faceUV[i*2]= new BABYLON.Vector2(ulX,ulZ); 
        faceUV[i*2+1]= new BABYLON.Vector2(dlX,dlZ); 
    }

    var ribbon = BABYLON.MeshBuilder.CreateRibbon("rib", {    pathArray: paths,
    sideOrientation:BABYLON.Mesh.DOUBLESIDE,  offset: 0,uvs:faceUV, invertUV:true }, scene);
    ribbon.material = mat;
	

    return scene;
};