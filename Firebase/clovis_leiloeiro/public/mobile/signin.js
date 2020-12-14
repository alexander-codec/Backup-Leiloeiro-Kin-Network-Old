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
$(document).ready(function () {
	$("#resetpassword").click(function() {
        var email = $("#email").val();
		if(email != ""){
			firebase.auth().sendPasswordResetEmail(email).then(function() {
				$("#conect").addClass("btn-success");$("#conect").removeClass("btn-primary");
				$("#conect").text("Email de redefinição enviado.");
				setTimeout(function(){
					$("#conect").addClass("btn-primary");$("#conect").removeClass("btn-success");$("#conect").text("Acessar");
				}, 3000);
			}).catch(function(error) {
				$("#conect").addClass("btn-danger");$("#conect").removeClass("btn-primary");
				$("#conect").text("ERRO: Email Invalido");
				setTimeout(function(){
					$("#conect").addClass("btn-primary");$("#conect").removeClass("btn-danger");$("#conect").text("Acessar");
				}, 3000);
			});
		}else{
			$("#conect").addClass("btn-danger");$("#conect").removeClass("btn-primary");
			$("#conect").text("Digite um email para redefinir.");
			setTimeout(function(){
				$("#conect").addClass("btn-primary");$("#conect").removeClass("btn-danger");$("#conect").text("Acessar");
			}, 3000);
		}
    });
	$("#conect").click(function() {
		$("#conect").text("Acessando...");
		$("#conect").prop('disabled', true);
			var email = $("#email").val();
			var senha = $("#senha").val();
			if(email && senha != ""){
				firebase.auth().signInWithEmailAndPassword(email, senha).catch(function(error) {
					var errorCode = error.code;
					console.log(errorCode);
					switch (errorCode) {
					    case "auth/invalid-email":
					        $("#conect").text("Você erro o seu email.");
					        break;
					    case "auth/user-disabled":
					        $("#conect").text("Sua conta está desativada.");
					        break;
					    case "auth/user-not-found":
					        $("#conect").text("Você não tem uma conta.");
					        break;
					    case "auth/wrong-password":
					        $("#conect").text("Você erro sua senha.");
					        break;
					    default:
					        $("#conect").text("Algo de errado não está certo");
					}
					$("#conect").addClass("btn-danger");$("#conect").removeClass("btn-primary");
					setTimeout(function(){
						$("#conect").addClass("btn-primary");$("#conect").removeClass("btn-danger");$("#conect").text("Acessar");$("#conect").prop('disabled', false);
					}, 3000);
			  	});
				setTimeout(function(){
					$("#conect").addClass("btn-primary");$("#conect").removeClass("btn-danger");$("#conect").text("Acessar");$("#conect").prop('disabled', false);
				}, 3000);
			}else{
				$("#conect").addClass("btn-danger");$("#conect").removeClass("btn-primary");
				$("#conect").text("Você esqueceu de algo.");
				setTimeout(function(){
					$("#conect").addClass("btn-primary");$("#conect").removeClass("btn-danger");$("#conect").text("Acessar");$("#conect").prop('disabled', false);
				}, 3000);
			}
	});
});
