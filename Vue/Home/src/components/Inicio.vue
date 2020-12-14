<template>
	<div class="main-container section-padding">
	<div class="row row-section" style="margin-right: auto;margin-left: auto;">
	<div class="col-lg-3 col-md-12 col-xs-12 page-sidebar">
	<aside>
	
	<div class="widget categories">
	<h4 class="widget-title">Categorias</h4>
	<ul class="categories-list">
	    <li><a href="/#/categoria?id=1">Automóveis</a></li>
	    <li><a href="/#/categoria?id=2">Caminhões</a></li>
	    <li><a href="/#/categoria?id=3">Motos</a></li>
	    <li><a href="/#/categoria?id=4">Ônibus</a></li>
	    <li><a href="/#/categoria?id=5">Computadores</a></li>
	    <li><a href="/#/categoria?id=6">Smartphones</a></li>
	    <li><a href="/#/categoria?id=7">Terrenos</a></li>
	    <li><a href="/#/categoria?id=8">Apartamentos</a></li>
	    <li><a href="/#/categoria?id=9">Casas</a></li>
	    <li><a href="/#/categoria?id=10">Edificios</a></li>
	    <li><a href="/#/categoria?id=11">Agricolas</a></li>
	    <li><a href="/#/categoria?id=12">Ferramentas</a></li>
	    <li><a href="/#/categoria?id=13">Outros</a></li>
	</ul>
	</div>    
	 
	<div class="widget categories">
	<h4 class="widget-title">Modalidades</h4>
	<ul class="categories-list">
	    <li><a href="/#/modalidade?id=1">Venda Direta</a></li>
	    <li><a href="/#/modalidade?id=2">Venda Online e Presencial</a></li>
	    <li><a href="/#/modalidade?id=3">Somente Online</a></li>
	</ul>
	</div>   
	
	</aside>
	</div>
	<div class="col-lg-9 col-md-12 col-xs-12 page-content">
	
	<div class="product-filter ocultar-mob">
	<div class="short-name">
	<span id="inicio-head">Carregando todos os ultimos leilões atualizados</span>
	</div>
	<ul class="nav nav-tabs">
	<li class="nav-item">
	<a class="nav-link active" data-toggle="tab" href="#grid-view"><i class="fas fa-th"></i></a>
	</li>
	<li class="nav-item">
	<a class="nav-link" data-toggle="tab" href="#list-view"><i class="fas fa-th-list"></i></a>
	</li>
	</ul>
	</div>
	
	
	<div class="adds-wrapper">
	<div class="tab-content">
	<div id="grid-view" class="tab-pane fade active show">
	<div class="row" id="listleiloesgrid">
		<div class="loader"></div>
	</div>
	</div>
	
	<div id="list-view" class="tab-pane fade">
	<div class="row"  id="listleiloeslist">
		<div class="loader"></div>
	</div>
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
      "/actions/inicio.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
