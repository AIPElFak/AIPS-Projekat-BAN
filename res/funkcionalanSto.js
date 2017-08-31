var createScene = function () {
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3( 0.5, 0.5, 0.8);
	// camera
	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
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

	drawTable(size,mat,mat2,mat3,firstCard, secondCard, blankCard, position);
    drawTableCards(size, noShownCards, cards);

    return scene;
};
function drawTablePrimitive(iterations,size,yOffset,heightDiff,jump,curve,height,parts,diff,paths)
{
	
for (var bane= 0; bane<parts;++bane)
    {
        
        yOffset = 3*size;
        heightDiff = 2*size;

        var path = [];
	for (var t = iterations; t>=0; t--) {
		for (var k = 0; k <= 1; k++) {
            
            var x = heightDiff*Math.cos(Math.PI-t*Math.PI/(iterations));
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
    var x = heightDiff;
	var y = height+jump;
	var z = -yOffset/2;

    height+=jump;
    size=size-curve;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }
	

	return size;
}	

function drawTable(size,mat,mat2,mat3,firstCard, secondCard, blankCard, position)
{ 

	var iterations =30;
    var Size = size;
    var yOffset = size;
    var heightDiff=3*size/2;
    var jump=size/250;
    var curve=0;
    var height = 0;
    var parts = 30;
    var diff= Size/31250;
    var paths = [];
	
    yOffset = Size;
    heightDiff=3*Size/2;


    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);
	
    height+=jump*parts;
    parts=10;
    curve = Size/2500;
    jump=Size/2500;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    height+=jump*parts;
    parts=15;
    curve = Size/3571;
    jump=Size/2777;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    height+=jump*parts;
    parts=15;
    curve = Size/2857;
    jump= Size/25000;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);
    
    height+=jump*parts;
	parts=15;
    curve = Size/2857;
    jump=-Size/25000;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    height+=jump*parts;
    parts=15;
    curve = Size/3571;
    jump=-Size/2777;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    height+=jump*parts;
    parts=17;
    curve = 0;
    jump =-Size/250;

    
    var paths2 = [];

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths2);
	
    height+=jump*parts;
    parts=17;
    curve = Size/680;
    jump =-Size/2500;
    
    paths.push(paths2[0]);
    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene);
	ribbon.material = mat;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths2);
	

    var ribbon2 = BABYLON.Mesh.CreateRibbon("rib2", paths2, false, false, 0, scene);
	ribbon2.material = mat2;


    var paths3 = [];
    Size+=curve;
    iterations =30;
    yOffset = 3.1*Size;
    heightDiff = 2*Size;
	for (var t = iterations; t>=0; t--) {
		var path = [];
		for (var k = 0; k <= 1; k++) {
            
            var x = heightDiff*Math.cos(Math.PI-t*Math.PI/(iterations));
		    var y = height;
		    var z = yOffset/2+heightDiff*Math.sin(Math.PI-t*Math.PI/(iterations));
            if (k==1)
                z=-1*z;
		  path.push(new BABYLON.Vector3(x, y, z));
		}
		paths3.push(path);
		//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
	}

    var ribbon3 = BABYLON.Mesh.CreateRibbon("rib3", paths3, false, false, 0, scene);
	ribbon3.material = mat3;

    drawAllPlayingCardPositions(Size,height, yOffset, heightDiff, firstCard, secondCard, blankCard, position);
	
}	
var drawAllPlayingCardPositions = function(Size, height, yOffset, heightDiff,firstCard, secondCard, blankCard, position)
{
    var mat = new Array(16);
    for (var i=0; i< 16;++i)
        mat[i]= blankCard;

    mat[position*2] = firstCard;
    mat[position*2+1] = secondCard;
    
    //1 i 8  
    drawAParOfCCards(Size, height, heightDiff*0.8 ,-yOffset*0.3,Math.PI, mat[0], mat[1]); 
    drawAParOfCCards(Size, height, heightDiff*0.8 ,yOffset*0.3,Math.PI, mat[14], mat[15]);
   
   //2 i 7
    drawAParOfCCards(Size, height, heightDiff*0.8 ,-yOffset/2,Math.PI*11/15, mat[2], mat[3]);   
    drawAParOfCCards(Size, height, heightDiff*0.8 ,yOffset/2,-Math.PI*11/15, mat[12], mat[13]);

   //3 i 6
    drawAParOfCCards(Size, height, heightDiff*0.8 ,-yOffset/2,Math.PI*6/15, mat[4], mat[5]);   
    drawAParOfCCards(Size, height, heightDiff*0.8 ,yOffset/2,-Math.PI*6/15, mat[10], mat[11]);

   //4 i 5
    drawAParOfCCards(Size, height, heightDiff*0.8 ,-yOffset/2,Math.PI/15, mat[6], mat[7]);   
    drawAParOfCCards(Size, height, heightDiff*0.8 ,yOffset/2,-Math.PI/15, mat[8], mat[9]);

}
var drawAParOfCCards = function(Size, height, distanceX,distanceY, angle, firstCard, secondCard)
{

    var card1 = drawCardPosition(Size, firstCard);
    var card2 = drawCardPosition(Size, secondCard);

    card1.rotate(BABYLON.Axis.Y, angle  , BABYLON.Space.LOCAL);
    card1.translate(new BABYLON.Vector3(distanceX,0,0),1, BABYLON.Space.LOCAL);
    card1.translate(new BABYLON.Vector3(0,0,distanceY),1, BABYLON.Space.WORLD);
    card1.translate(new BABYLON.Vector3(0,height*1.1,-Size*0.115),1, BABYLON.Space.LOCAL);
    card1.rotate(BABYLON.Axis.Y, Math.PI*0.8/2  , BABYLON.Space.LOCAL);

    card2.rotate(BABYLON.Axis.Y, angle  , BABYLON.Space.LOCAL);
    card2.translate(new BABYLON.Vector3(distanceX,0,0),1, BABYLON.Space.LOCAL);
    card2.translate(new BABYLON.Vector3(0,0.1,distanceY),1, BABYLON.Space.WORLD);
    card2.translate(new BABYLON.Vector3(0,height*1.1,Size*0.115),1, BABYLON.Space.LOCAL);
    card2.rotate(BABYLON.Axis.Y, Math.PI*1.2/2  , BABYLON.Space.LOCAL);

}
var drawCardPosition= function(size, mat)
{
    var paths = [];
    var iterations =10;
    var Size = size/45;
    var xOffset=Size*11;
    var yOffset =Size*20;
    var heightDiff=Size*1.4;
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

    return ribbon;
}
var drawTableCards = function(Size, noShownCards, cardTextures)
{
    var cards = Array(noShownCards);
    for (var i=0; i< noShownCards; ++i)
    {
        cards[i] = drawCardPosition(Size, cardTextures[i]);
        cards[i].rotate(BABYLON.Axis.Y, Math.PI/2  , BABYLON.Space.LOCAL);
        cards[i].translate(new BABYLON.Vector3(-Size + Size/2 *i,Size*0.1,0),1, BABYLON.Space.LOCAL);
    }

}
