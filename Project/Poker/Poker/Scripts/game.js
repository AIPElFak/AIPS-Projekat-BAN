var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
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

    var firstCard = new BABYLON.StandardMaterial("mat4", scene);
    firstCard.alpha = 1;
    firstCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
    firstCard.backFaceCulling = false;
    firstCard.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/2000px-Ace_of_spades.svg.png", scene);

    var secondCard = new BABYLON.StandardMaterial("mat5", scene);
    secondCard.alpha = 1;
    secondCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
    secondCard.backFaceCulling = false;
    secondCard.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Poker-sm-212-Ks.png/220px-Poker-sm-212-Ks.png", scene);

    var blankCard = new BABYLON.StandardMaterial("mat6", scene);
    blankCard.alpha = 1;
    blankCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
    blankCard.backFaceCulling = false;
    blankCard.diffuseTexture = new BABYLON.Texture("http://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-tangent-back-1_grande.png?v=1474345861", scene);

    var position = 0;
    var noShownCards = 2;
    var size = 6;
    var cards = Array(noShownCards);
    cards[0] = firstCard;
    cards[1] = secondCard;

    drawTable(size, mat, mat2, mat3, firstCard, secondCard, blankCard, position);
    drawTableCards(size, noShownCards, cards);

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});