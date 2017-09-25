var drawAvatar = function (size, X, Y, Z, position)
{
    var Size = 0.8 * size;
    var avatar = BABYLON.Mesh.CreatePlane("plane"+position, Size, scene, false, BABYLON.Mesh.DOUBLESIDE);

    avatar.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    avatar.material = new BABYLON.StandardMaterial("outputplane" + position, scene);
    avatar.position = new BABYLON.Vector3(X, Y, Z);   
    avatar.setEnabled(0);

    model.avatars[position] = avatar;
    var b = avatar.position;
}

var drawAllAvatars = function (Size, height, yOffset, heightDiff) {

    //1 i 8
    drawAvatar(Size, -Size * 2.6, 0.089973 * Size, -0.916 * Size, 0);
    drawAvatar(Size, -Size * 2.6, 0.089973 * Size, 0.916 * Size, 7);

    //2 i 7
    drawAvatar(Size, -Size * 1.73974, 0.089973 * Size, -3.43066 * Size, 1);
    drawAvatar(Size, -Size * 1.73974, 0.089973 * Size, 3.43066 * Size, 6);

    //3 i 6
    drawAvatar(Size, Size * 0.80344, 0.089973 * Size, -3.96073 * Size, 2);
    drawAvatar(Size, Size * 0.80344, 0.089973 * Size, 3.96073 * Size, 5);

    //4 i 5
    drawAvatar(Size, Size * 2.54318, 0.089973 * Size, -2.06608 * Size, 3);
    drawAvatar(Size, Size * 2.54318, 0.089973 * Size, 2.06608 * Size, 4);
}