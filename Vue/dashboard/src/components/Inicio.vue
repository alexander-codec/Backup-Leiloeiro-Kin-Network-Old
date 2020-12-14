<template>
	<div class="container-fluid">
		<div class="row">
			<div id="notpermission" style="display:none;" class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
		      <div class="col-md-5 p-lg-5 mx-auto" style="margin-bottom: 13rem!important;margin-top: 13rem!important;">
		        <h1 class="display-4 font-weight-normal">Está Indisponivel</h1>
		        <p class="lead font-weight-normal">Estamos desenvolvendo e trabalhando em melhorias nesse recurso, Tenha paciência, em um futuro proximo você poderá usar essa função.</p>
		        <a class="btn btn-outline-secondary" href="javascript:void(0)">Coming soon</a>
		      </div>
		      <div class="product-device box-shadow d-none d-md-block"></div>
		      <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
		  	</div>
	        <main role="main" class="col-md-12 ml-sm-auto px-4">
				<div id="load" class="loader"></div>
				<div id="notshow" class="row" style="display:none;"><div id="apper_show_not_doc" class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"><h1 class="display-4">Você ainda não adicionou nada!</h1><p class="lead">Adicione e venda de tudo, de carros usados a telefones celulares e computadores, ou propriedades e muito mais.</p></div></div>
				<div id="show" class="row" style="display:none;">
	                
	            </div>
	        </main>
	      </div>
	</div>
</template>

<script>
export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "/dashboard/actions/inicio.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
