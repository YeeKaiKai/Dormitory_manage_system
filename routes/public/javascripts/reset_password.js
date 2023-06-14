function checkSame() {
    var password = document.getElementById("Password")
    var confirmPassword = document.getElementById("confirmPassword")
    var errorMessage = document.getElementById("errorMessage")
    var successMessage = document.getElementById("successMessage")
    var submitButton = document.getElementById("Submit")
    var backButton = document.getElementById("backIndex")
    var form1 = document.getElementById("form1")

    if(password.value != confirmPassword.value || password.value == "" || confirmPassword.value == ""){
        errorMessage.style.display = "";
        password.value = "";
        confirmPassword.value = "";
    }
    else{
        form1.submit();
        alert("成功更改密碼，請重新登入！");
    }
}