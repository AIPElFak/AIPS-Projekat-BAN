var check = function ()
{
    raiseAmount = 0;
    readyToPlay = true;
    disableButtons();
    commitAction();
}
var fold = function () {
    raiseAmount = -1;
    readyToPlay = true;
    disableButtons();
    commitAction();
}
var raise = function () {
    raiseAmount = parseInt(document.getElementById("raiseMoney").value);
    readyToPlay = true;
    disableButtons();
    commitAction();
}

var disableButtons = function () {
    var b1 = document.getElementById("raise");
    var b2 = document.getElementById("call");
    var b3 = document.getElementById("fold");

    b1.disabled = true;
    b2.disabled = true;
    b3.disabled = true;

    b1.style.backgroundColor = "#777";
    b2.style.backgroundColor = "#777";
    b3.style.backgroundColor = "#777";
}
var enableButtons = function () {

    var b1 = document.getElementById("raise");
    var b2 = document.getElementById("call");
    var b3 = document.getElementById("fold");

    b1.disabled = false;
    b2.disabled = false;
    b3.disabled = false;

    b1.style.backgroundColor = "#353534";
    b2.style.backgroundColor = "#353534";
    b3.style.backgroundColor = "#353534";
}