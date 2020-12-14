var config = {
    apiKey: "AIzaSyDcPHMXZ_bu8Tz42wH4wG7ZzGtGNBRiB-M",
    authDomain: "kin-network-internaciona.firebaseapp.com",
    databaseURL: "https://kin-network-internaciona.firebaseio.com",
    projectId: "kin-network-internaciona",
    storageBucket: "kin-network-internaciona.appspot.com",
    messagingSenderId: "503112883954"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = "/";
    }
});
$(document).ready(function () {
	var d = new Date();
	var n = d.getFullYear();
	$("#cop").html("© 2018-" + n +" - <a href='https://kin.network' target='_blank' style='color:#6c757d;'>Kin Network</a>");
});
function cadastraruser() {
	var pass = $("#createpassword").hasClass("is-valid");
	var email = document.getElementById('createemail').value;
	var password = document.getElementById('createpassword').value;
	if (email.length < 4) {
		$("#signup").prop( "disabled", false);$("#signup").text("Você não digitou seu E-mail.");$("#signup").removeClass("btn-primary");$("#signup").addClass("btn-danger");
	}else if (password.length < 4) {
		$("#signup").prop( "disabled", false);$("#signup").text("Você não digitou sua senha.");$("#signup").removeClass("btn-primary");$("#signup").addClass("btn-danger");
	}else if (pass != true) {
		$("#signup").prop( "disabled", false);$("#signup").text("Sua senha é muito fraca.");$("#signup").removeClass("btn-primary");$("#signup").addClass("btn-danger");
	}else{
		$("#signup").prop( "disabled", true);$("#signup").text("Criando...");
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			var errorCode = error.code; 
			var errorMessage = error.message;
			switch (errorCode) {
				case 'auth/email-already-in-use' : $("#signup").prop( "disabled", false);$("#signup").text("Já tem uma conta.");$("#signup").removeClass("btn-primary");$("#signup").addClass("btn-danger");
				break;
				case 'auth/invalid-email' : $("#signup").prop( "disabled", false);$("#signup").text("Esse e-mail não é valido.");$("#signup").removeClass("btn-primary");$("#signup").addClass("btn-danger");
				break;
				default : $("#signup").prop( "disabled", false);$("#signup").text(errorMessage);$("#signup").removeClass("btn-primary");$("#signup").addClass("btn-danger");
			}
			console.log(error); 
		}); 
	}
	setTimeout(function(){ $("#signup").text("Criar Conta");$("#signup").removeClass("btn-danger");$("#signup").addClass("btn-primary");}, 3000);
}
$(document).ready(function () {
	$('#createpassword').keyup(function(e) { 
		var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		var enoughRegex = new RegExp("(?=.{6,}).*", "g");
		if (false == enoughRegex.test($(this).val())) { 
			$("#createpassword").addClass("is-invalid");
			$("#createpassword").removeClass("is-valid");
		}else if (strongRegex.test($(this).val())) {
			$("#createpassword").addClass("is-valid");
			$("#createpassword").removeClass("is-invalid");
		} else if (mediumRegex.test($(this).val())) {
			$("#createpassword").addClass("is-invalid");
			$("#createpassword").removeClass("is-valid");
		} else { 
			$("#createpassword").addClass("is-invalid");
			$("#createpassword").removeClass("is-valid");
		}
		return true;
	});
	$("#createemail").keyup(function(){
		var email = $("#createemail").val();
	    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if (!filter.test(email)) {
	    	$("#createemail").addClass("is-invalid");
			$("#createemail").removeClass("is-valid");
	    } else {
	    	$("#createemail").addClass("is-valid");
			$("#createemail").removeClass("is-invalid");
	    }
	});
});
