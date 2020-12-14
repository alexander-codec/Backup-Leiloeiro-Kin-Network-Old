<template>
	<div class="main-container section-padding">
		<div class="container">
			<div class="loader"></div>
			<div class="product-info row" style="display:none;">
			    
			<div class="col-lg-7 col-md-12 col-xs-12">
			<div class="details-box ads-details-wrapper">
				<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
				  <div class="carousel-inner" id="imglist">
					  
				  </div>
				  <a class="carousel-control-prev" id="imgprev" href="#carouselExampleControls" role="button" data-slide="prev">
				    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
				    <span class="sr-only">Previous</span>
				  </a>
				  <a class="carousel-control-next" id="imgnext" href="#carouselExampleControls" role="button" data-slide="next">
				    <span class="carousel-control-next-icon" aria-hidden="true"></span>
				    <span class="sr-only">Next</span>
				  </a>
				</div>
			</div>
			</div>
			    
			
			<div class="col-lg-5 col-md-12 col-xs-12">
			<div class="details-box">
				<div class="ads-details-info">
					<h2 id="titulo"></h2>
					<p class="mb-2" id="postbreve"></p>
				</div>
				<ul class="advertisement mb-4">
					<li>
						<p id="postlocal"></p>
					</li>
				</ul>
				<div class="ads-btn mb-4">
					<a href="mailto:clovisleiloeiro@gmail.com" class="btn btn-common btn-reply buttons"><i class="fas fa-envelope-open"></i> Enviar um Email</a>
					<hs id="btn-modalidade"></div>
				</div>
			</div>
			</div>
			</div>
			
			<div class="description-info" style="display:none;">
			<div class="row">
			<div class="col-lg-8 col-md-6 col-xs-12">
			<div class="description">
			<p id="descricao"></p>
			</div>
			</div>
			<div class="col-lg-4 col-md-6 col-xs-12">
			<div class="short-info">
			<h4>Links Uteis</h4>
			<ul>
			<li id="pluscat"></li>
			<li><a onclick="window.print();"><i class="fas fa-print"></i> Imprimir está Pagina</a></li>
			<li id="pluscity"></li>
			</ul>
			</div>
			</div>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "/actions/leilao.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
