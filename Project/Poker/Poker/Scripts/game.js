var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var drawCardSide = function (xSize, ySize, mat, scene, y) {
    var paths = [];
    var iterations = 10;
    var xOffset = xSize;
    var yOffset = ySize;
    //var y = 0;
    var heightDiff = 0.4;

    for (var t = iterations; t >= 0; t--) {
        var path = [];

        var x = (xOffset - 2 * heightDiff) / 2 + heightDiff * Math.cos(Math.PI / 2 - t * Math.PI / (2 * iterations));
        var z = yOffset / 2 + heightDiff * Math.sin(Math.PI / 2 - t * Math.PI / (2 * iterations));

        path.push(new BABYLON.Vector3(x, y, -z));
        path.push(new BABYLON.Vector3(x, y, z));
  
        paths.push(path);
    }
    for (var t = iterations; t >= 0; t--) {
        var path = [];

        var x = -xOffset / 2 + heightDiff * Math.cos(Math.PI - t * Math.PI / (2 * iterations));
        var z = yOffset / 2 + heightDiff * Math.sin(Math.PI - t * Math.PI / (2 * iterations));

        path.push(new BABYLON.Vector3(x, y, -z));
        path.push(new BABYLON.Vector3(x, y, z));
   
        paths.push(path);
    }

    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene,
        false, BABYLON.Mesh.BACKSIDE);
    ribbon.material = mat;

    return ribbon;
};

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
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
    mat.diffuseTexture = new BABYLON.Texture("../../Scripts/textures/ace_of_spades.png", scene);

    var mat1 = new BABYLON.StandardMaterial("mat2", scene);
    mat1.alpha = 1.0;
    mat1.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    mat1.backFaceCulling = false;
    mat1.diffuseTexture = new BABYLON.Texture("../../Scripts/textures/back.png", scene);

    var frontSide = drawCardSide(18, 10, mat, scene, 0);
    var backSide = drawCardSide(18, 10, mat1, scene, 0.001);

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});