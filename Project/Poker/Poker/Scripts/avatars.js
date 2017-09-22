var drawAvatar = function (Size, height, distanceX, distanceY, angle, position)
{
    var avatar = BABYLON.Mesh.CreatePlane("plane", Size, scene, false, BABYLON.Mesh.DEFAULTSIDE);

    avatar.rotate(BABYLON.Axis.Y, angle, BABYLON.Space.LOCAL);
    avatar.translate(new BABYLON.Vector3(distanceX, 0, 0), 1, BABYLON.Space.LOCAL);
    avatar.translate(new BABYLON.Vector3(0, 0, distanceY), 1, BABYLON.Space.WORLD);
    avatar.translate(new BABYLON.Vector3(0, height * 1.1, 0), 1, BABYLON.Space.LOCAL);

    model.avatars[position] = avatar;
}

var drawAllAvatars = function (Size, height, yOffset, heightDiff) {

    //1 i 8  
    drawAvatar(Size, height, heightDiff * 1.3, -yOffset * 0.3, Math.PI, 0);
    drawAvatar(Size, height, heightDiff * 1.3, yOffset * 0.3, Math.PI, 7);

    //2 i 7
    drawAvatar(Size, height, heightDiff * 1.3, -yOffset / 2, Math.PI * 11 / 15, 1);
    drawAvatar(Size, height, heightDiff * 1.3, yOffset / 2, -Math.PI * 11 / 15, 6);

    //3 i 6
    drawAvatar(Size, height, heightDiff * 1.3, -yOffset / 2, Math.PI * 6 / 15, 2);
    drawAvatar(Size, height, heightDiff * 1.3, yOffset / 2, -Math.PI * 6 / 15, 5);

    //4 i 5
    drawAvatar(Size, height, heightDiff * 1.3, -yOffset / 2, Math.PI / 15, 3);
    drawAvatar(Size, height, heightDiff * 1.3, yOffset / 2, -Math.PI / 15, 4);
}