$("#paghome").removeClass("active");$("#pagleiloes").removeClass("active");$("#pagpreferencias").removeClass("active");$("#paglances").removeClass("active");$("#pagestatisticas").removeClass("active");
$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return decodeURI(results[1]) || 0;
		}
}
var id = $.urlParam('id');
var mod = $.urlParam('modalidade');
if(id == null){
	$("#notshow").show();
	$("#load").hide();
}else{
	var d = new Date();
	var n = d.getFullYear();
	$("#cop").text("© 2018-" + n +" - Kin Network");
	$('#editor').summernote({
    	lang: 'pt-BR',
		disableDragAndDrop: true,
		shortcuts: false
	});
	$.getJSON('/dashboard/js/estados_cidades.json', function (data) {
                                var items = [];
                                var options = '<option value="">Escolha um estado</option>';	
                                $.each(data, function (key, val) {
                                    options += '<option value="' + val.nome + '">' + val.nome + '</option>';
                                });					
                                $("#estados").html(options);	
                                $("#apperestado").html(options);				
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
	doctRef.collection("leiloes").doc(id).get().then(function(post) {
		if (post.exists) {
			$("#estados").val(post.data().estado).change();
			$("#cidades").val(post.data().cidade).change();
			$("#titulo").val(post.data().titulo);
			$("#modalidade").val(post.data().modalidade).change();
			$("#breve").val(post.data().brevedescricao);
			$("#local").val(post.data().local);
			//
			var data = new Date(post.data().primeiroleilao);
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
	        var primeiradata = dia + "-" + mes + "-" + ano + " " + hora + ":" + minuto;
			//
			var data2 = new Date(post.data().segundoleilao);
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
	        var segundadata = dia2 + "-" + mes2 + "-" + ano2 + " " + hora2 + ":" + minuto2;
			//
			$("#primeiradata").val(primeiradata).change();
			$("#segundadata").val(segundadata).change();
			$("#categoria").val(post.data().categoria).change();
			$('#editor').summernote('code', post.data().descricao);
			$("#valor").val(post.data().valor);
			$('#valor').mask("#.##0,00" , { reverse:true});
			setTimeout(function(){
				$( "#load" ).hide();
				$( "#show").show();
			}, 500);
		}else{
			$("#load").hide();
			$("#notshow").show();
		}
	});
	switch(mod) {
		case "1":
			$(".mod2").hide();
			$("#attmodalidade1").show();
			break;
	    case "2":
	    	$('#datetimepicker1').datetimepicker({
	            language:  'pt-BR',
	            format: 'dd-mm-yyyy hh:ii'
	        });
	        $('#datetimepicker2').datetimepicker({
	            language:  'pt-BR',
	            format: 'dd-mm-yyyy hh:ii'
	        });
			$("#attmodalidade2").show();
	    	break;
	    case "3":
	    	$(".mod2").hide();
			$("#attmodalidade3").show();
	    	break;
	}
}
$(document).ready(function() {
	const toast = swal.mixin({
    	toast: true,
    	position: 'top-end',
    	showConfirmButton: false,
    	timer: 3000
	});
	function getdata() {
		var hoje = new Date();
		return hoje;
	}
	$("#attmodalidade1").click(function() {
		toast({
			type: 'info',
			title: 'Atualizando Leilão...'
		});
		$(".status").text("Atualizando...");
		$(".status").prop('disabled', true);
		var titulo = $("#titulo").val();
		var modalidade = $("#modalidade").val();
		var breve = $("#breve").val();
		var local = $("#local").val();
		var categoria = $("#categoria").val();
		var estado = $("#estados").val();
		var cidade = $("#cidades").val();
		var descricao = $('#editor').summernote('code');
		var valor = $("#valor").val();
		if(titulo && modalidade && breve && local && estado && cidade && descricao && valor && categoria != null){
			doctRef.collection("leiloes").doc(id).update({
				titulo: titulo,
				modalidade: modalidade,
				brevedescricao: breve,
				local: local,
				primeiroleilao: "",
				segundoleilao: "",
				categoria: categoria,
				estado: estado,
				cidade: cidade,
				descricao: descricao,
				update: getdata(),
				valor: valor
			})
			.then(function(docRef) {
				toast({
					type: 'success',
					title: 'Atualizado com Sucesso'
				});
				setTimeout(function(){
					window.location.href = "/dashboard/#/leiloes/";
				}, 500);
			})
			.catch(function(error) {
				toast({
					type: 'warning',
					title: 'Ocorreu um erro ao Atualizar'
				});
				$(".status").text("Tente Novamente");
				setTimeout(function(){
					$(".status").text("Atualizar Leilão");
					$(".status").prop('disabled', false);
				}, 3000);
				console.error("Error adding document: ", error);
			});  
		}else{
			toast({
				type: 'warning',
				title: 'Você esqueceu de alguma coisa'
			});
			$(".status").text("Tente Novamente");
			setTimeout(function(){
				$(".status").text("Atualizar Leilão");
				$(".status").prop('disabled', false);
			}, 3000);
		}
	});
	$("#attmodalidade2").click(function() {
		toast({
			type: 'info',
			title: 'Atualizando Leilão...'
		});
		$(".status").text("Atualizando...");
		$(".status").prop('disabled', true);
		var titulo = $("#titulo").val();
		var modalidade = $("#modalidade").val();
		var breve = $("#breve").val();
		var local = $("#local").val();
		//
		var d=$("#primeiradata").val();
	    var d1=d.split(" ");
	    var date=d1[0].split("-");
	    var time=d1[1].split(":");
	    var dd=date[0];
	    var mm=date[1]-1;
	    var yy=date[2];
	    var hh=time[0];
	    var min=time[1];
	    var data= new Date(yy,mm,dd,hh,min);
		var primeiro = data.getTime();
		//
		if($("#segundadata").val() == ""){
			var segundo = "";
		}else{
			var d2=$("#segundadata").val();
			var d21=d2.split(" ");
			var date2=d21[0].split("-");
			var time2=d21[1].split(":");
			var dd2=date2[0];
			var mm2=date2[1]-1;
			var yy2=date2[2];
			var hh2=time2[0];
			var min2=time2[1];
			var data2= new Date(yy2,mm2,dd2,hh2,min2);
			var segundo = data2.getTime();
		}
		//
		var categoria = $("#categoria").val();
		var estado = $("#estados").val();
		var cidade = $("#cidades").val();
		var descricao = $('#editor').summernote('code');
		var valor = $("#valor").val();
		if(titulo && modalidade && breve && local && primeiro && estado && cidade && descricao && valor && categoria != null){
			doctRef.collection("leiloes").doc(id).update({
				titulo: titulo,
				modalidade: modalidade,
				brevedescricao: breve,
				local: local,
				primeiroleilao: primeiro,
				segundoleilao: segundo,
				categoria: categoria,
				estado: estado,
				cidade: cidade,
				descricao: descricao,
				update: getdata(),
				valor: valor
			})
			.then(function(docRef) {
				toast({
					type: 'success',
					title: 'Atualizado com Sucesso'
				});
				setTimeout(function(){
					window.location.href = "/dashboard/#/leiloes/";
				}, 500);
			})
			.catch(function(error) {
				toast({
					type: 'warning',
					title: 'Ocorreu um erro ao Atualizar'
				});
				$(".status").text("Tente Novamente");
				setTimeout(function(){
					$(".status").text("Atualizar Leilão");
					$(".status").prop('disabled', false);
				}, 3000);
				console.error("Error adding document: ", error);
			});  
		}else{
			toast({
				type: 'warning',
				title: 'Você esqueceu de alguma coisa'
			});
			$(".status").text("Tente Novamente");
			setTimeout(function(){
				$(".status").text("Atualizar Leilão");
				$(".status").prop('disabled', false);
			}, 3000);
		}
	});
	$("#attmodalidade3").click(function() {
		toast({
			type: 'info',
			title: 'Atualizando Leilão...'
		});
		$(".status").text("Atualizando...");
		$(".status").prop('disabled', true);
		var titulo = $("#titulo").val();
		var modalidade = $("#modalidade").val();
		var breve = $("#breve").val();
		var local = $("#local").val();
		var categoria = $("#categoria").val();
		var estado = $("#estados").val();
		var cidade = $("#cidades").val();
		var descricao = $('#editor').summernote('code');
		var valor = $("#valor").val();
		if(titulo && modalidade && breve && local && estado && cidade && descricao && valor && categoria != null){
			doctRef.collection("leiloes").doc(id).update({
				titulo: titulo,
				modalidade: modalidade,
				brevedescricao: breve,
				local: local,
				primeiroleilao: "",
				segundoleilao: "",
				categoria: categoria,
				estado: estado,
				cidade: cidade,
				descricao: descricao,
				update: getdata(),
				valor: valor
			})
			.then(function(docRef) {
				toast({
					type: 'success',
					title: 'Atualizado com Sucesso'
				});
				setTimeout(function(){
					window.location.href = "/dashboard/#/leiloes/";
				}, 500);
			})
			.catch(function(error) {
				toast({
					type: 'warning',
					title: 'Ocorreu um erro ao Atualizar'
				});
				$(".status").text("Tente Novamente");
				setTimeout(function(){
					$(".status").text("Atualizar Leilão");
					$(".status").prop('disabled', false);
				}, 3000);
				console.error("Error adding document: ", error);
			});  
		}else{
			toast({
				type: 'warning',
				title: 'Você esqueceu de alguma coisa'
			});
			$(".status").text("Tente Novamente");
			setTimeout(function(){
				$(".status").text("Atualizar Leilão");
				$(".status").prop('disabled', false);
			}, 3000);
		}
	});
});