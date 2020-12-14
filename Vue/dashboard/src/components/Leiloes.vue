<template>
	<div class="container-fluid">
		<div class="row">
	        <main role="main" class="col-md-12 ml-sm-auto px-4">
				<div id="load" class="loader"></div>
	            <div id="notshow" class="row" style="display:none;"><div id="apper_show_not_doc" class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"><h1 class="display-4">Você ainda não adicionou nada!</h1><p class="lead">Adicione e venda de tudo, de carros usados a telefones celulares e computadores, ou propriedades e muito mais.</p></div></div>
				<div id="show" class="row" style="display:none;">
	                <table class="table">
	                  <thead>
						  <tr>
	                      <th scope="col">Titulo <xx id="cont"><xx></th>
	                      <th scope="col">Cidade</th>
						  <th scope="col">Status</th>
	                      <th scope="col">Atualização</th>
	                      <th scope="col">Ações</th>
	                    </tr>
	                  </thead>
	                  <tbody id="listleiloes">
	                  </tbody>
				  </table>
	            </div>
	        </main>
	      </div>
		  <a onclick="create();" class="sf-back-to-top"><i class="fas fa-plus"></i></a>
	  </div>
</template>

<script>
export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "/dashboard/actions/leiloes.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
