$("#paghome").removeClass("active");$("#pagagenda").removeClass("active");$("#paglances").removeClass("active");$("#pagmodalidade").removeClass("active");$("#pagcategoria").removeClass("active");$("#pagcontato").removeClass("active");
$(window).scrollTop(0);
$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return decodeURI(results[1]) || 0;
		}
}
function btnleilao() {
	Swal.fire({
		type: 'info',
		title: 'Oops...',
		text: 'Sua conta não é vereficada!',
		footer: '<a href="javascript:void(0)">Por que eu tenho esse problema?</a>'
	})
}
if($.urlParam('id') == null){
	$(".main-container").html("<div class='row'><div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Nenhum Leilão Encontrado...</h3></div></div></div></div>");
}else{
	var postid = $.urlParam('id');
	doctRef.get().then(function(doct) {
	    if (doct.exists) {
			doctRef.collection("leiloes").doc(postid).get().then(function(post) {
	            if (post.exists) {
					$("#titulo").text(post.data().titulo);
					var imgscont = 0;
	                doctRef.collection("leiloes").doc(postid).collection("imagens").onSnapshot(function(querySnapshot) {  
	                	querySnapshot.forEach(function(doc) {
	                    	imgscont++;
							if(imgscont == 1){
								$("#imglist").append("<div class='carousel-item active'><img class='d-block w-100 imagem-display' src='" + doc.data().url + "'></div>");
							}else{
								$("#imglist").append("<div class='carousel-item'><img class='d-block w-100 imagem-display' src='" + doc.data().url + "'></div>");
							}
	                    });
						if (imgscont == "0") {
							$("#imgprev").hide();$("#imgnext").hide();
						    $("#imglist").append("<div class='carousel-item active'><img class='d-block w-100 imagem-display' src='/assets/semimage.png'></div>");
						}
						if(imgscont == 1){
							$("#imgprev").hide();$("#imgnext").hide();
						}
					});
					switch(post.data().categoria) {
	                                                case "1":
	                                                    var categoria = "Automóveis";
	                                                    break;
	                                                case "2":
	                                                    var categoria = "Caminhões";
	                                                    break;
	                                                case "3":
	                                                    var categoria = "Motos";
	                                                    break;
													case "4":
	                                                    var categoria = "Ônibus";
	                                                    break;
													case "5":
	                                                    var categoria = "Computadores";
	                                                    break;
													case "6":
	                                                    var categoria = "Smartphones";
	                                                    break;
													case "7":
	                                                    var categoria = "Terrenos";
	                                                    break;
													case "8":
	                                                    var categoria = "Apartamentos";
	                                                    break;
													case "9":
	                                                    var categoria = "Casas";
	                                                    break;
													case "10":
	                                                    var categoria = "Edificios";
	                                                    break;
													case "11":
	                                                    var categoria = "Agricolas";
	                                                    break;
													case "12":
	                                                    var categoria = "Ferramentas";
	                                                    break;
													case "13":
	                                                    var categoria = "Outros";
	                                                    break;
					}
					firebase.auth().onAuthStateChanged(function(user) {
					  if (user) {
					    if(post.data().modalidade == 1){
							$("#btn-modalidade").html("<a onclick='btnleilao();' href='javascript:void(0)' class='btn btn-common btn-reply buttons'><i class='fas fa-gavel'></i> Adquirir Agora</a>");
						}else{
							$("#btn-modalidade").html("<a onclick='btnleilao();' href='javascript:void(0)' class='btn btn-common btn-reply buttons'><i class='fas fa-gavel'></i> Fazer uma Oferta</a>");
						}
					  } else {
					    $("#btn-modalidade").html("<a href='javascript:void(0)' class='btn btn-common btn-reply buttons disabled'><i class='far fa-user-circle'></i> Não Conectado</a>");
					  }
				  });
					$("#postbreve").text(post.data().brevedescricao);
					$("#descricao").html(post.data().descricao);
					$("#postlocal").html("<i class='fas fa-map-marked-alt'></i> " + post.data().local);
					$("#pluscat").html("<a href='/#/categoria?id=" + post.data().categoria + "'><i class='fas fa-flag'></i> Mais em " + categoria + "</a>");
					$("#pluscity").html("<a href='/#/buscar?es=" + post.data().estado + "&ci=" + post.data().cidade + "&cat=todas'><i class='fas fa-map-marked-alt'></i> Mais em " + post.data().cidade + "</a>");
					$(".loader").hide();
					$(".product-info").show();
					$(".description-info").show();
				}else{
					$(".main-container").html("<div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Nenhum Leilão Encontrado...</h3></div></div></div>");
				}
			}).catch(function(error) {
				$(".main-container").html("<div class='row'><div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Ocorreu um Erro ao Buscar...</h3></div></div></div></div>");
	            console.log("Error ao buscar leilao:", error);
			});
	    }else{
			window.location.href = "https://kin.network/";
		}
	}).catch(function(error) {
		$(".main-container").html("<div class='row'><div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Ocorreu um Erro ao Buscar...</h3></div></div></div></div>");
	    console.log("Error ao buscar leiloeiro:", error);
	});
}