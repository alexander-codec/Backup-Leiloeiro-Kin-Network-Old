<template>
	<section id="content" class="section-padding">
		<div class="container">
		<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-8 col-lg-9">
		<h2 class="contact-title">
		Minha localização atual
		</h2>
		
		<div id="conatiner-map"></div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
		<h2 class="contact-title">
		Entrar em contato
		</h2>
		<div class="information">
		<div class="contact-datails">
		<div class="icon">
		<i class="fas fa-map-marked-alt icon-radius"></i>
		</div>
		<div class="info">
		<h3>Endereço</h3>
		<span class="detail">Rua, Av. Gov. Walter Jobim, 560 - Patronato, Santa Maria - RS, 97020-080</span>
		</div>
		</div>
		<div class="contact-datails">
		<div class="icon">
		<i class="far fa-paper-plane icon-radius"></i>
		</div>
		<div class="info">
		<h3>Tem alguma pergunta?</h3>
		<span class="detail">clovisleiloeiro@gmail.com</span>
		</div>
		</div>
		<div class="contact-datails">
		<div class="icon">
		<i class="fas fa-phone icon-radius"></i>
		</div>
		<div class="info">
		<h3>Ligue para nós e contrate-nos</h3>
		<span class="detail">Escritório Principal: (55) 3223-8071</span>
		</div>
		</div>
		<div class="contact-datails">
		<div class="icon">
		<i class="fas fa-mobile-alt icon-radius"></i>
		</div>
		<div class="info">
		<h3>Telefone</h3>
		<span class="detail">(55) 996031521</span>
		</div>
		</div>
		</div>
		</div>
		</div>
		</div>
	</section>
</template>

<script>
export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "/actions/contato.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
	
	const map = document.createElement("script");
    map.setAttribute(
      "src",
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGgbXKFQuW0UMejsJy8avydDmeoiFb3us&callback=initMap"
    );
    map.async = true;
    document.head.appendChild(map);
  }
};
</script>
