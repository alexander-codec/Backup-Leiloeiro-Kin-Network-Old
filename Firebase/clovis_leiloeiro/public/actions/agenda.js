$("#paghome").removeClass("active");$("#pagagenda").addClass("active");$("#paglances").removeClass("active");$("#pagmodalidade").removeClass("active");$("#pagcategoria").removeClass("active");$("#pagcontato").removeClass("active");
$(window).scrollTop(0);
doctRef.get().then(function(doct) {
	if (doct.exists) {
		var primeirocont = 0;
		var segundocont = 0;
		var hoje = new Date();
	    var primeiradata = hoje.getTime();
		
		var amanha = new Date();
		amanha.setDate(hoje.getDate()+3);
	    var segundadata =  amanha.getTime();
		console.log(primeiradata);
		
        doctRef.collection("leiloes").where("modalidade", "==", "2").orderBy("primeiroleilao").startAt(primeiradata).endAt(segundadata)
		.onSnapshot(function(querySnapshot) {
        	$("#primeiroleilao").html("<div class='product-filter ocultar-mob'><div class='short-name'><span>1º Leilões agendados entre (" + hoje.getDate() + " e " + amanha.getDate() + ")</span></div></div>");
            querySnapshot.forEach(function(doc) {
				primeirocont++;
	            var data = new Date(doc.data().primeiroleilao);
				var monthNames = [
				  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
				];
				var daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
				var mes = data.getMonth();
	            var dia  = data.getDate();
				var hora  = data.getHours();
				var minuto = data.getMinutes();
	            if (dia < 10) {
	                dia  = "0" + dia;
	            }
				if (hora < 10) {
	                hora  = "0" + hora;
	            }
				if (minuto < 10) {
	                minuto  = "0" + minuto;
	            }
				$("#primeiroleilao").append("<div class='row row-striped' style='margin-bottom: 10px;'><div class='col-2 text-right'><h1 class='display-4'><span class='badge badge-secondary'>" + dia + "</span></h1><h2>" + monthNames[mes] + "</h2></div><div class='col-10'><a href='/#/leilao?id=" + doc.id + "'><h3 class='text-uppercase'><strong style='color: #333;'>" + doc.data().titulo + "</strong></h3></a><ul class='list-inline'><li class='list-inline-item'><i class='far fa-calendar'></i> " + daysOfWeek[data.getDay()] + "</li><li class='list-inline-item'><i class='far fa-clock'></i> " + hora + ":" + minuto + "</li><li class='list-inline-item'><i class='fas fa-location-arrow'></i> " + doc.data().local + "</li></ul></div></div>");
			});
			if(primeirocont == "0"){
				$("#primeiroleilao").html("<div class='product-filter ocultar-mob'><div class='short-name'><span>No momento nenhum 1º leilão</span></div></div><div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Nenhum 1º Leilão Encontrado...</h3></div></div></div>");
			}
        });
		//inicio dos 2 leiloes
		doctRef.collection("leiloes").where("modalidade", "==", "2").orderBy("segundoleilao").startAt(primeiradata).endAt(segundadata)
		.onSnapshot(function(querySnapshot) {
			$("#segundoleilao").html("<div class='product-filter ocultar-mob'><div class='short-name'><span>2º Leilões agendados entre (" + hoje.getDate() + " e " + amanha.getDate() + ")</span></div></div>");
			querySnapshot.forEach(function(doc) {
				segundocont++;
	            var data = new Date(doc.data().segundoleilao);
				var monthNames = [
				  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
				];
				var daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
				var mes = data.getMonth();
	            var dia  = data.getDate();
				var hora  = data.getHours();
				var minuto = data.getMinutes();
	            if (dia < 10) {
	                dia  = "0" + dia;
	            }
				if (hora < 10) {
	                hora  = "0" + hora;
	            }
				if (minuto < 10) {
	                minuto  = "0" + minuto;
	            }
				$("#segundoleilao").append("<div class='row row-striped' style='margin-bottom: 10px;'><div class='col-2 text-right'><h1 class='display-4'><span class='badge badge-secondary'>" + dia + "</span></h1><h2>" + monthNames[mes] + "</h2></div><div class='col-10'><a href='/#/leilao?id=" + doc.id + "'><h3 class='text-uppercase'><strong style='color: #333;'>" + doc.data().titulo + "</strong></h3></a><ul class='list-inline'><li class='list-inline-item'><i class='far fa-calendar'></i> " + daysOfWeek[data.getDay()] + "</li><li class='list-inline-item'><i class='far fa-clock'></i> " + hora + ":" + minuto + "</li><li class='list-inline-item'><i class='fas fa-location-arrow'></i> " + doc.data().local + "</li></ul></div></div>");
			});
			if(segundocont == "0"){
				$("#segundoleilao").html("<div class='product-filter ocultar-mob'><div class='short-name'><span>No momento nenhum 2º leilão</span></div></div><div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Nenhum 2º Leilão Encontrado...</h3></div></div></div>");
			}
			$(".loader").hide();
		});
    }else{
		window.location.href = "https://kin.network/";
    }
}).catch(function(error) {
    $(".main-container").html("<div class='row'><div class='col-md-12'><div class='error-content'><div class='error-message'><h2>404</h2><h3><span>Ooooops!</span> Ocorreu um Erro ao Buscar...</h3></div></div></div></div>");
	console.log("Error ao buscar leiloeiro:", error);
});