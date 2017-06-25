function checkPasswordMatch() {
    var password = $("#txtNewPassword").val();
    var confirmPassword = $("#txtConfirmPassword").val();

    if (password != confirmPassword)
	{
		document.getElementById("divCheckPasswordMatch").style.visibility = 'visible';
        $("#divCheckPasswordMatch").html("Passwords do not match!");
    }
	else
	{
		document.getElementById("divCheckPasswordMatch").style.visibility = 'visible';
     	$("#divCheckPasswordMatch").html("Passwords match.");
	}
}


$(document).ready(function () {
   $("#txtConfirmPassword").keyup(checkPasswordMatch);
});