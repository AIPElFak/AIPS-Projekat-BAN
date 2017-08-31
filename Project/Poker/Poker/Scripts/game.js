

var createScene = function () {
    
    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.8);
    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 10, -50));
    camera.attachControl(canvas, true);
    // light
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
    light.intensity = 0.9;
    // material
    var mat = new BABYLON.StandardMaterial("mat1", scene);

    mat.alpha = 1.0;
    mat.diffuseColor = new BABYLON.Color3(0.2067, 0.0432, 0.0432);
    mat.backFaceCulling = false;
    //mat.diffuseTexture = new BABYLON.Texture("textures/grass.png", scene);

    var mat2 = new BABYLON.StandardMaterial("mat2", scene);
    mat2.alpha = 1;
    mat2.diffuseColor = new BABYLON.Color3(0.4, 0.2980, 0.0314);
    mat2.backFaceCulling = false;
    // parabola

    var mat3 = new BABYLON.StandardMaterial("mat3", scene);
    mat3.alpha = 1;
    mat3.diffuseColor = new BABYLON.Color3(0.6863, 0.0824, 0.0824);
    mat3.backFaceCulling = false;

    var size = 6;

    drawTable(size, mat, mat2, mat3, PlayerCards);
    drawTableCards(size, noShownCards, TableCards);

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});