$(document).ready(function() {
    $("#btnLogin").click(function() {
   auth.signInWithEmailAndPassword($("#userNmaeValue").val(), $("#passwordLoginValue").val()).then(function(){
   window.location.href = "index.html";
    }).catch(function(error){ alert("this "+error);});
        });
    });
