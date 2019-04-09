$(document).ready(function() {
    $("#btnRegister").click(function() {
   
    auth.createUserWithEmailAndPassword($("#emailValue").val(), $("#passValue").val()).then(cred => {
    registerObject.child(cred.user.uid).set({
    username: $("#nameValue").val(),
    email: $("#emailValue").val(),
    phone:$("#phoneValue").val(),
    password:$("#passValue").val()
    });
  });
        });
    });
