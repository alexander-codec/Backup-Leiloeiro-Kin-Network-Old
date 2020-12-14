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
var modalidade = $.urlParam('modalidade');
if(modalidade == null){
	$("#notshow").show();
	$("#load").hide();
}else{
	var d = new Date();
	var n = d.getFullYear();
	$("#cop").text("© 2018-" + n +" - Kin Network");
	$('#editor').summernote({
    	lang: 'pt-BR',
		disableDragAndDrop: true,
		shortcuts: false,
		placeholder: 'Digite seu edital',
        height: 250
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
	switch(modalidade) {
		case "1":
			$(".mod2").hide();
			$("#addmodalidade1").show();
			$("#show").show();
			$("#load").hide();
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
			$("#addmodalidade2").show();
			$("#show").show();
			$("#load").hide();
	    	break;
	    case "3":
	    	$(".mod2").hide();
			$("#addmodalidade3").show();
			$("#show").show();
			$("#load").hide();
	    	break;
	}
}
function getfilename() {
	var files = $("#filesToUpload")[0].files;
	var numfiles = 0;
	for (var i = 0; i < files.length; i++) {
		numfiles++;
		$("#fileList").append("<li class='list-group-item d-flex justify-content-between align-items-center'><code style='color: #39D2B4;'>" + files[i].name + "</code></li>");
	}
	$("#numfiles").text("Você escolheu " + numfiles + " imagens");
	$(".mb-0").css("border-radius","0");
};
$(document).ready(function() {
	var num;
	$('#valor').mask("#.##0,00" , { reverse:true});
	$('#categoria').select2();
	$('#estados').select2();
	$('#cidades').select2();
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
	function conclusion(num) {
		var files = $("#filesToUpload")[0].files;
		if(files.length == num){
			toast({
				type: 'success',
				title: 'Adicionado com Sucesso'
			});
            setTimeout(function(){
            	window.location.href = "/dashboard/#/leiloes/";
            }, 1000);
		}
	}
	function functioncompress(num, docid) {
		var files = $("#filesToUpload")[0].files;
		var listfile = files.length - 1;
		if(num <= listfile){
			var numimg = num + ")";
			toast({
				type: 'info',
				title: 'Efetuando uma compressão da imagem (' + numimg
			});
			var file = files[num];
			var canvas = document.getElementById('canvas');
			var ctx = canvas.getContext("2d");
		    var image = new Image();
		    image.onload = function() {
		        ctx.canvas.width = window.innerWidth;
				ctx.canvas.height = window.innerHeight;
		        ctx.drawImage(image, 0, 0,window.innerWidth,window.innerHeight);
				var compress = canvas.toDataURL('image/jpeg', 0.3);
				upload(num, docid, compress);
		    };
			image.src = URL.createObjectURL(file);
		}
	}
	function upload(num, docid, compress) {
		var uploadTask = storageRef.child('/leiloes/' + docid + '/imagem' + num + '.jpg').putString(compress, 'data_url');
			uploadTask.on('state_changed', function(snapshot){
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				$(".status").text("Enviando imagem (" + num + ") - " + progress + "%");
			}, function(error) {
				toast({
					type: 'warning',
					title: 'Ocorreu um erro ao Adicionar'
				});
				(".status").text("Ocorreu um Erro");
				console.log("Error getting documents: ", error);
			}, function() {
				var url = uploadTask.snapshot.downloadURL;
				saveimage(num, docid, url);
			});
	}
	function saveimage(num, docid, url) {
		if(num == 0){
							doctRef.collection("leiloes").doc(docid).update({
								"imagem": url
							})
							.then(function() {
								doctRef.collection("leiloes").doc(docid).collection("imagens").add({
									"url": url
								})
								.then(function() {
									num++
									conclusion(num);
									functioncompress(num, docid);
								})
								.catch(function(error) {
									toast({
										type: 'warning',
										title: 'Ocorreu um erro ao Adicionar'
									});
									$(".status").text("Ocorreu um Erro");
									console.log("Error getting documents: ", error);
								});
							})
							.catch(function(error) {
								toast({
									type: 'warning',
									title: 'Ocorreu um erro ao Adicionar'
								});
								$(".status").text("Ocorreu um Erro");
								console.log("Error getting documents: ", error);
							});
						}else{
							doctRef.collection("leiloes").doc(docid).collection("imagens").add({
								"url": url
							})
							.then(function() {
								num++
								conclusion(num);
								functioncompress(num, docid);
							})
							.catch(function(error) {
								toast({
									type: 'warning',
									title: 'Ocorreu um erro ao Adicionar'
								});
								$(".status").text("Ocorreu um Erro");
								console.log("Error getting documents: ", error);
							});
						}
	}
	$("#addmodalidade1").click(function() {
		toast({
			type: 'info',
			title: 'Adicionando Leilão...'
		});
		$(".status").text("Adicionando...");
		$(".status").prop('disabled', true);
		var titulo = $("#titulo").val();
		var breve = $("#breve").val();
		var local = $("#local").val();
		var categoria = $("#categoria").val();
		var estado = $("#estados").val();
		var cidade = $("#cidades").val();
		var descricao = $('#editor').summernote('code');
		var valor = $("#valor").val();
		var files = $("#filesToUpload")[0].files;
		if(titulo && modalidade && breve && local && estado && cidade && descricao && valor && categoria != null){
			doctRef.collection("leiloes").add({
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
				imgs: files.length,
				valor: valor
			})
			.then(function(docRef) {
				var docid = docRef.id;
				if(files.length != 0){
					$(".status").text("Carregando imagens...");
					functioncompress(0, docid);
				}else{
					toast({
						type: 'success',
						title: 'Adicionado com Sucesso'
					});
					setTimeout(function(){
						window.location.href = "/dashboard/#/leiloes/";
					}, 1000);
				}
			})
			.catch(function(error) {
				toast({
					type: 'warning',
					title: 'Ocorreu um erro ao Adicionar'
				});
				$(".status").text("Tente Novamente");
				setTimeout(function(){
					$(".status").text("Adicionar Leilão");
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
				$(".status").text("Adicionar Leilão");
				$(".status").prop('disabled', false);
			}, 3000);
		}
	});
	$("#addmodalidade2").click(function() {
		toast({
			type: 'info',
			title: 'Adicionando Leilão...'
		});
		$(".status").text("Adicionando...");
		$(".status").prop('disabled', true);
		var titulo = $("#titulo").val();
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
		var files = $("#filesToUpload")[0].files;
		if(titulo && modalidade && breve && local && primeiro && estado && cidade && descricao && valor && categoria != null){
			doctRef.collection("leiloes").add({
				titulo: titulo,
				modalidade: modalidade,
				brevedescricao: breve,
				local: local,
				dataprimeiro: primeiro,
				datasegundo: segundo,
				categoria: categoria,
				estado: estado,
				cidade: cidade,
				descricao: descricao,
				update: getdata(),
				imgs: files.length,
				valor: valor
			})
			.then(function(docRef) {
				var docid = docRef.id;
				if(files.length != 0){
					$(".status").text("Carregando imagens...");
					functioncompress(0, docid);
				}else{
					toast({
						type: 'success',
						title: 'Adicionado com Sucesso'
					});
					setTimeout(function(){
						window.location.href = "/dashboard/#/leiloes/";
					}, 1000);
				}
			})
			.catch(function(error) {
				toast({
					type: 'warning',
					title: 'Ocorreu um erro ao Adicionar'
				});
				$(".status").text("Tente Novamente");
				setTimeout(function(){
					$(".status").text("Adicionar Leilão");
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
				$(".status").text("Adicionar Leilão");
				$(".status").prop('disabled', false);
			}, 3000);
		}
	});
	$("#addmodalidade3").click(function() {
		toast({
			type: 'info',
			title: 'Adicionando Leilão...'
		});
		$(".status").text("Adicionando...");
		$(".status").prop('disabled', true);
		var titulo = $("#titulo").val();
		var breve = $("#breve").val();
		var local = $("#local").val();
		var categoria = $("#categoria").val();
		var estado = $("#estados").val();
		var cidade = $("#cidades").val();
		var descricao = $('#editor').summernote('code');
		var valor = $("#valor").val();
		var files = $("#filesToUpload")[0].files;
		if(titulo && modalidade && breve && local && estado && cidade && descricao && valor && categoria != null){
			doctRef.collection("leiloes").add({
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
				imgs: files.length,
				valor: valor
			})
			.then(function(docRef) {
				var docid = docRef.id;
				if(files.length != 0){
					$(".status").text("Carregando imagens...");
					functioncompress(0, docid);
				}else{
					toast({
						type: 'success',
						title: 'Adicionado com Sucesso'
					});
					setTimeout(function(){
						window.location.href = "/dashboard/#/leiloes/";
					}, 1000);
				}
			})
			.catch(function(error) {
				toast({
					type: 'warning',
					title: 'Ocorreu um erro ao Adicionar'
				});
				$(".status").text("Tente Novamente");
				setTimeout(function(){
					$(".status").text("Adicionar Leilão");
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
				$(".status").text("Adicionar Leilão");
				$(".status").prop('disabled', false);
			}, 3000);
		}
	});
});