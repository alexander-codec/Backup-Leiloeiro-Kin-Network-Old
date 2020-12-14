$("#paghome").removeClass("active");$("#pagleiloes").addClass("active");
var postcont = 0;
function excluir(elem){
		var postid = elem.id;
		var imgs = elem.getAttribute("imgs");
		swal({
              title: 'Você tem certeza?',
              text: "Depois de excluir não pode recuperar!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Sim, quero excluir!',
              cancelButtonText: 'Não quero excluir',
		}).then((result) => {
        	if (result.value) {
				if(imgs > 0){
					var i = 0;
					while (i < imgs) {
						excluirimg(postid, i);
						setTimeout(i++, 500);
					}
					if(i == imgs){
						excluirdoc(postid);
					}
				}else{
					excluirdoc(postid);
				}
            }
		})
}
function excluirdoc(id){
	doctRef.collection("leiloes").doc(id).delete().then(function() {
		swal(
			'Leilão Excluido!',
			'Seu leilão foi excluido com sucesso.',
			'success'
		)
	}).catch(function(error) {
		swal(
			'Oops...',
			'Seu leilão não foi excluido.',
			'error'
		)
		onsole.error("Error removing document: ", error);
	});
}
function excluirimg(postid, id){
	storageRef.child('/leiloes/' + postid + '/imagem' + id + '.jpg').delete().then(function() {}).catch(function(error) {
		Swal({
			type: 'error',
			title: 'Oops...',
			text: 'Algo deu errado!',
			footer: '<a href="https://kin.network/" target="_blank">Precisando de Ajuda?</a>'
		})
		console.error("Error removing document: ", error);
	});
}
function create(){
	(async function getmodalidade () {
		const inputOptions = new Promise((resolve) => {
		  setTimeout(() => {
		    resolve({
		      '1': 'Venda Direta',
		      '2': 'Online e Presencial',
		      '3': 'Somente Online'
		    })
		  }, 1000)
		})
		
		const {value: modalidade} = await Swal({
		  title: 'Escolha a Modalidade',
		  input: 'radio',
		  width: 700,
		  inputOptions: inputOptions,
		  inputValidator: (value) => {
		    return !value && 'Você precisa escolher alguma coisa!'
		  }
		})
		
		if (modalidade) {
		  window.location.href = '/dashboard/#/novo?modalidade=' + modalidade;
	  	}
	})()
}
doctRef.collection("leiloes").orderBy("update", "desc")
		            .onSnapshot(function(querySnapshot) {
		                $("#listleiloes").html("");
		                querySnapshot.forEach(function(doc) {
		                    postcont++;
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
							if(doc.data().modalidade == 1){
								var status = "Venda Direta";
							}else{
								if(doc.data().primeiroleilao == "" || doc.data().primeiroleilao == null){
		                            var status = "Somente Online";
			                    }else{
									var data = new Date(doc.data().primeiroleilao);
									var hoje = new Date();
									if(data.getTime() > hoje.getTime()){
										var status = "1º Leilão";
									}else{
										if(doc.data().segundoleilao == "" || doc.data().segundoleilao == null){
											var status = "Somente Online";
											if(doc.data().modalidade == 2){
												doctRef.collection("leiloes").doc(doc.id).update({
												    modalidade: "3"
												});
											}
										}else{
											var data2 = new Date(doc.data().segundoleilao);
											if(data2.getTime() > hoje.getTime()){
												var status = "2º Leilão";
											}else{
												var status = "Somente Online";
												if(doc.data().modalidade == 2){
													doctRef.collection("leiloes").doc(doc.id).update({
													    modalidade: "3"
													});
												}
											}
										}
									}
								}
							}
		                    $("#listleiloes").append("<tr><td>" + doc.data().titulo + "</td><th>" + status + "</th><td><div class='dropdown'><button class='btn btn-secondary dropdown-toggle' type='button' id='" + doc.id + "' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Menu</button><div class='dropdown-menu' aria-labelledby='" + doc.id + "'><a class='dropdown-item' href='/#/leilao?id=" + doc.id + "' target='_blank'>Visualizar</a><a class='dropdown-item' imgs='" + doc.data().imgs + "' id='" + doc.id + "' href='javascript:void(0)' onclick='excluir(this);'>Excluir</a></div></div></td></tr>");
		                    if(postcont == "1"){
		                        $("#notshow").hide();
		                    }
		                });
		                if(postcont == "0"){
		                    $("#notshow").show();
		                }else{
							$("#cont").text(" (" + postcont + ")");
		                    $("#show").show();
		                }
		                $( "#load" ).hide();
						});