$("#paghome").removeClass("active");$("#pagagenda").removeClass("active");$("#paglances").removeClass("active");$("#pagmodalidade").removeClass("active");$("#pagcategoria").removeClass("active");$("#pagcontato").removeClass("active");
$(window).scrollTop(0);
load();
$('.updateload').click(function() {
	$("#listleiloes").html("<div class='loader'></div>");$("#showcont").text("Carregando...");
	setTimeout(function(){ load(); }, 1000);
});
function load() {
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return decodeURI(results[1]) || 0;
		}
	}
	if($.urlParam('es') == null){
		$("#showcont").text("Nenhum Leilão para Mostrar");
		$("#listleiloes").html("<div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Nenhum Leilão Encontrado Nessa Busca...</h3></div></div></div>");
	}else{
		var estado = $.urlParam('es').replace(/%20/g, " ");
		var cidade = $.urlParam('ci').replace(/%20/g, " ");
		var categoria = $.urlParam('cat');
		doctRef.get().then(function(doct) {
			if (doct.exists) {
				var post = 0;
				if(categoria == "todas"){
					doctRef.collection("leiloes").where("cidade", "==", cidade).where("estado", "==", estado)//.limit(24)
						.onSnapshot(function(querySnapshot) {
						$("#listleiloes").html("");
			            querySnapshot.forEach(function(doc) {
		                                        post++;
		                                        if(doc.data().imagem == null){
		                                                var imagem = "/assets/semimage.png";
		                                        }else{
		                                                var imagem = doc.data().imagem;
												}
												if(doc.data().update =! null){
		                                                var data = new Date(doc.data().update);
		                                                var dia  = data.getDate();
		                                                if (dia< 10) {
		                                                    dia  = "0" + dia;
		                                                }
		                                                var mes  = data.getMonth() + 1;
		                                                if (mes < 10) {
		                                                    mes  = "0" + mes;
		                                                }
		                                                var ano  = data.getFullYear();
		                                                var update = dia + "/" + mes + "/" + ano;
		                                        }else{
		                                                var update = "Não Definido";
		                                        }
												switch(doc.data().modalidade) {
								                    case "1":
								                        var modalidade = "Venda Direta";
								                        break;
								                    case "2":
								                        var modalidade = "Venda Online e Presencial";
								                        break;
													case "3":
								                        var modalidade = "Somente Online";
								                        break;
												}
												switch(doc.data().categoria) {
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
												if(doc.data().modalidade == 2){
													var data = new Date(doc.data().primeiroleilao);
			                                        var dia  = data.getDate();
			                                        if (dia< 10) {
			                                        	dia  = "0" + dia;
			                                        }
			                                        var mes  = data.getMonth() + 1;
			                                        if (mes < 10) {
			                                        	mes  = "0" + mes;
			                                        }
			                                        var ano  = data.getFullYear();
			                                        var hora  = data.getHours();
													var minuto = data.getMinutes();
													if (hora < 10) {
			                							hora  = "0" + hora;
			            							}
													if (minuto < 10) {
			                							minuto  = "0" + minuto;
			            							}
			                                        var primeiradata = dia + "/" + mes + "/" + ano;
			                                        var primeirahora = hora + ":" + minuto;
													var hoje = new Date();
													if(data.getTime() > hoje.getTime()){
														var dataleilao = "1º Leilão - " + primeiradata + " ás " + primeirahora + "h";
													}else{
														var data2 = new Date(doc.data().segundoleilao);
				                                        var dia2  = data2.getDate();
				                                        if (dia2 < 10) {
				                                        	dia2  = "0" + dia2;
				                                        }
				                                        var mes2  = data2.getMonth() + 1;
				                                        if (mes2 < 10) {
				                                        	mes2  = "0" + mes2;
				                                        }
				                                        var ano2  = data2.getFullYear();
				                                        var hora2  = data2.getHours();
														var minuto2 = data2.getMinutes();
														if (hora2 < 10) {
				                							hora2  = "0" + hora2;
				            							}
														if (minuto2 < 10) {
				                							minuto2  = "0" + minuto2;
				            							}
				                                        var segundadata = dia2 + "/" + mes2 + "/" + ano2;
					                                    var segundahora = hora2 + ":" + minuto2;
														if(data2.getTime() > hoje.getTime()){
															var dataleilao = "2º Leilão - " + segundadata + " ás " + segundahora + "h";
														}else{
															var dataleilao = "Somente Online";
														}
													}
												}else{
													var dataleilao = "Somente Online";
												}
		                                        $("#listleiloes").append("<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4'><div class='featured-box'><figure><a href='/#/leilao?id=" + doc.id + "'><img class='img-fluid' src='" + imagem + "' style='min-height: 350px;max-height: 350px;min-width: 100%;'></a></figure><div class='feature-content'><div class='product'><a href='/#/categoria?id=" + doc.data().categoria + "'><i class='fas fa-flag'></i> " + categoria + "</a></div><h4><a href='/#/leilao?id=" + doc.id + "'>" + doc.data().titulo + "</a></h4><span>Ultima Atualização: " + update + "</span><ul class='address'><li><i class='fas fa-balance-scale'></i> " + modalidade + "</li><li><i class='fas fa-map-marked-alt'></i> " + doc.data().local + "</li></ul><div class='listing-bottom'><h3 class='price float-left'>R$ " + doc.data().valor + "</h3><a class='btn-verified float-right'>" + dataleilao + "</a></div></div></div></div>");
												if(post == 1){
		                                                $("#showcont").text("Mostrando (" + post + " Leilão) da Busca por (" + cidade + ", " + estado + ")");
		                                        }else if(post > 1){
		                                                $("#showcont").text("Mostrando (" + post + " Leilões) da Busca por (" + cidade + ", " + estado + ")");
		                                        }
						});
						if(post == "0"){
							$("#showcont").text("Nenhum Leilão para Mostrar");
							$("#listleiloes").html("<div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Nenhum Leilão Encontrado Nessa Busca...</h3></div></div></div>");
						}
					});
				}else{
					doctRef.collection("leiloes").where("categoria", "==", categoria).where("cidade", "==", cidade).where("estado", "==", estado)//.limit(24)
						.onSnapshot(function(querySnapshot) {
						$("#listleiloes").html("");
			            querySnapshot.forEach(function(doc) {
		                                        post++;
		                                        if(doc.data().imagem == null){
		                                                var imagem = "/assets/semimage.png";
		                                        }else{
		                                                var imagem = doc.data().imagem;
												}
												if(doc.data().update =! null){
		                                                var data = new Date(doc.data().update);
		                                                var dia  = data.getDate();
		                                                if (dia< 10) {
		                                                    dia  = "0" + dia;
		                                                }
		                                                var mes  = data.getMonth() + 1;
		                                                if (mes < 10) {
		                                                    mes  = "0" + mes;
		                                                }
		                                                var ano  = data.getFullYear();
		                                                var update = dia + "/" + mes + "/" + ano;
		                                        }else{
		                                                var update = "Não Definido";
		                                        }
												switch(doc.data().modalidade) {
								                    case "1":
								                        var modalidade = "Venda Direta";
								                        break;
								                    case "2":
								                        var modalidade = "Venda Online e Presencial";
								                        break;
													case "3":
								                        var modalidade = "Somente Online";
								                        break;
												}
												switch(doc.data().categoria) {
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
												if(doc.data().modalidade == 2){
													var data = new Date(doc.data().primeiroleilao);
			                                        var dia  = data.getDate();
			                                        if (dia< 10) {
			                                        	dia  = "0" + dia;
			                                        }
			                                        var mes  = data.getMonth() + 1;
			                                        if (mes < 10) {
			                                        	mes  = "0" + mes;
			                                        }
			                                        var ano  = data.getFullYear();
			                                        var hora  = data.getHours();
													var minuto = data.getMinutes();
													if (hora < 10) {
			                							hora  = "0" + hora;
			            							}
													if (minuto < 10) {
			                							minuto  = "0" + minuto;
			            							}
			                                        var primeiradata = dia + "/" + mes + "/" + ano;
			                                        var primeirahora = hora + ":" + minuto;
													var hoje = new Date();
													if(data.getTime() > hoje.getTime()){
														var dataleilao = "1º Leilão - " + primeiradata + " ás " + primeirahora + "h";
													}else{
														var data2 = new Date(doc.data().segundoleilao);
				                                        var dia2  = data2.getDate();
				                                        if (dia2 < 10) {
				                                        	dia2  = "0" + dia2;
				                                        }
				                                        var mes2  = data2.getMonth() + 1;
				                                        if (mes2 < 10) {
				                                        	mes2  = "0" + mes2;
				                                        }
				                                        var ano2  = data2.getFullYear();
				                                        var hora2  = data2.getHours();
														var minuto2 = data2.getMinutes();
														if (hora2 < 10) {
				                							hora2  = "0" + hora2;
				            							}
														if (minuto2 < 10) {
				                							minuto2  = "0" + minuto2;
				            							}
				                                        var segundadata = dia2 + "/" + mes2 + "/" + ano2;
					                                    var segundahora = hora2 + ":" + minuto2;
														if(data2.getTime() > hoje.getTime()){
															var dataleilao = "2º Leilão - " + segundadata + " ás " + segundahora + "h";
														}else{
															var dataleilao = "Somente Online";
														}
													}
												}else{
													var dataleilao = "Somente Online";
												}
		                                        $("#listleiloes").append("<div class='col-xs-12 col-sm-12 col-md-4 col-lg-4'><div class='featured-box'><figure><a href='/#/leilao?id=" + doc.id + "'><img class='img-fluid' src='" + imagem + "' style='min-height: 350px;max-height: 350px;min-width: 100%;'></a></figure><div class='feature-content'><div class='product'><a href='/#/categoria?id=" + doc.data().categoria + "'><i class='fas fa-flag'></i> " + categoria + "</a></div><h4><a href='/#/leilao?id=" + doc.id + "'>" + doc.data().titulo + "</a></h4><span>Ultima Atualização: " + update + "</span><ul class='address'><li><i class='fas fa-balance-scale'></i> " + modalidade + "</li><li><i class='fas fa-map-marked-alt'></i> " + doc.data().local + "</li></ul><div class='listing-bottom'><h3 class='price float-left'>R$ " + doc.data().valor + "</h3><a class='btn-verified float-right'>" + dataleilao + "</a></div></div></div></div>");
												if(post == 1){
		                                                $("#showcont").text("Mostrando (" + post + " Leilão) da Categoria (" + categoria + ") em " + cidade + ", " + estado + "");
		                                        }else if(post > 1){
		                                                $("#showcont").text("Mostrando (" + post + " Leilões) da Categoria (" + categoria + ") em " + cidade + ", " + estado + "");
		                                        }
						});
						if(post == "0"){
							$("#showcont").text("Nenhum Leilão para Mostrar");
							$("#listleiloes").html("<div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Nenhum Leilão Encontrado Nessa Busca...</h3></div></div></div>");
						}
						});
				}
			}else{
				window.location.href = "https://kin.network/";
		    }
		}).catch(function(error) {
			$(".main-container").html("<div class='row'><div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Ocorreu um Erro ao Buscar...</h3></div></div></div></div>");
			console.log("Error ao buscar leiloeiro:", error);
		});
	}
}