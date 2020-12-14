var config = {
    apiKey: "AIzaSyDcPHMXZ_bu8Tz42wH4wG7ZzGtGNBRiB-M",
    authDomain: "kin-network-internaciona.firebaseapp.com",
    databaseURL: "https://kin-network-internaciona.firebaseio.com",
    projectId: "kin-network-internaciona",
    storageBucket: "kin-network-internaciona.appspot.com",
    messagingSenderId: "503112883954"
};
firebase.initializeApp(config);
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();
var doctRef = db.collection("leiloeiro").doc("O9kwbJRdd1TIaSqlQHcMmukmgMH3");
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#logarclose").click();
		$("#createclose").click();
        $("#logar").hide();
        $("#logado").show();
		$(".loginmob").hide();
        $(".usermob").show();
		if(user.displayName == null){
			$("#profilename").text("Convidado");
			$(".profilenamemob").text("Convidado");
		}else{
			$("#profilename").text(user.displayName);
			$(".profilenamemob").text(user.displayName);
		}
		$("#menuuser").html("");
		if (user) {
			if(user.uid == "O9kwbJRdd1TIaSqlQHcMmukmgMH3"){
				$("#menuuser").append("<a class='dropdown-item' href='/dashboard/'><i class='fas fa-chart-bar'></i> Ir ao Dashboard</a>");
				$("#menuuser").append("<a class='dropdown-item' href='javascript:void(0)' target='_blank'><i class='far fa-user'></i> Minha Conta</a>");
				$("#menuuser").append("<a class='dropdown-item' onclick='firebase.auth().signOut();'><i class='fas fa-sign-out-alt'></i> Sair da Conta</a>");
			}else{
				$("#menuuser").append("<a class='dropdown-item' href='javascript:void(0)' target='_blank'><i class='far fa-user'></i> Minha Conta</a>");
				$("#menuuser").append("<a class='dropdown-item' onclick='firebase.auth().signOut();'><i class='fas fa-sign-out-alt'></i> Sair da Conta</a>");
				$(".admin").hide();
			}
      	}
		$( ".menumobile" ).click(function() {
			$( ".slicknav_open" ).trigger( "click" );
		});
    } else {
        $("#logar").show();
        $("#logado").hide();
		$("#logarmob").show();
        $("#logadomob").hide();
		$( ".menumobile" ).click(function() {
			$( ".slicknav_open" ).trigger( "click" );
		});
		$(".loginmob").show();
        $(".usermob").hide();
	}
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
				case 'auth/email-already-in-use' : $("#signup").prop( "disabled", false);$("#signup").text("Já tem uma conta com esse E-mail.");$("#signup").removeClass("btn-primary");$("#signup").addClass("btn-danger");
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
    $.getJSON('/assets/estados_cidades.json', function (data) {
                                var items = [];
                                var options = '<option value="">Escolha um estado</option>';	
                                $.each(data, function (key, val) {
                                    options += '<option value="' + val.nome + '">' + val.nome + '</option>';
                                });					
                                $("#estados").html(options);				
                                $("#estados").change(function () {				

                                    var options_cidades = '';
                                    var str = "";					

                                    $("#estados option:selected").each(function () {
                                        str += $(this).text();
                                    });

                                    $.each(data, function (key, val) {
                                        if(val.nome == str) {							
                                            $.each(val.cidades, function (key_city, val_city) {
                                                options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                                            });							
                                        }
                                    });
                                    $("#cidades").html(options_cidades);

                                }).change();
								$("#estados").val("Rio Grande do Sul").change();
	});
	$("#buscar").click(function() {
        var estado = $("#estados").val();
        var cidade = $("#cidades").val();
        var categoria = $("#categoria").val();
        if(estado && cidade && categoria != null){
            window.location.href = "/#/buscar?es=" + estado + "&ci=" + cidade + "&cat=" + categoria + "";
        }
    });
	$('#estados').select2();$('#cidades').select2();$('#categoria').select2();
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
	$(window).on('scroll',function(){if($(window).scrollTop()>100){$('.scrolling-navbar').addClass('top-nav-collapse');}else{$('.scrolling-navbar').removeClass('top-nav-collapse');}});
	$('.mobile-menu').slicknav({prependTo:'.navbar-header',parentTag:'liner',allowParentLinks:true,duplicate:true,label:'',closedSymbol:'<i class="fas fa-angle-right"></i>',openedSymbol:'<i class="fas fa-angle-down"></i>',});
});
