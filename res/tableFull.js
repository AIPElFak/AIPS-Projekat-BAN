function drawTablePrimitive(iterations,size,yOffset,heightDiff,jump,curve,height,parts,diff,paths)
{
	
for (var bane= 0; bane<parts;++bane)
    {
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
    yOffset = 3*size;
    heightDiff = 2*size;
    curve = curve +diff;
    path[2*iterations+2]=new BABYLON.Vector3(x,y,z)
	paths.push(path);
	//var lines = BABYLON.Mesh.CreateLines("par", path, scene);
    }
	
	return size;
}	

function drawTable(size,ratio)
{ 

	var iterations =30;
    var Size = size;
    var yOffset = size;
    var heightDiff=3*size/2;
    var jump=size/250;
    var curve=0;
    var height = 0;
    var parts = 30;
    var diff= size/31250;
    var paths = [];
	
    yOffset = size;
    heightDiff=3*size/2;


    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);
	
    parts=10;
    curve = size/2500;
    jump=size/2500;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    parts=15;
    curve = size/3571;
    jump=size/2777;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    parts=15;
    curve = size/2857;
    jump= size/25000;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);
    
	parts=15;
    curve = size/2857;
    jump=-size/25000;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    parts=15;
    curve = size/3571;
    jump=-size/2777;

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);

    parts=17;
    curve = 0;
    jump =-size/250;
    

    Size=drawTablePrimitive(iterations,Size,yOffset,heightDiff,jump,curve,height,parts,diff,paths);
	
    var ribbon = BABYLON.Mesh.CreateRibbon("rib", paths, false, false, 0, scene);
	ribbon.material = mat;

    var paths2 = [];
    size+=curve;
    iterations =30;
    yOffset = 3*size;
    heightDiff = 2*size;
	for (var t = iterations; t>=0; t--) {
		var path = [];
		for (var k = 0; k <= 1; k++) {
            
            var x = heightDiff*Math.cos(Math.PI-t*Math.PI/(iterations));
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
	
}	