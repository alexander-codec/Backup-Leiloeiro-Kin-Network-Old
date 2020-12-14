<template>
	<div class="container-fluid">
		<div class="row">
	        <main role="main" class="col-md-12 ml-sm-auto px-4">
				<div id="load" class="loader"></div>
	            <div id="notpermission" class="row" style="display:none;"><div id="apper_show_not_doc" class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"><h1 class="display-4">Não está disponivel ainda!</h1><p class="lead">Tenha paciência, talvez em um futuro proximo você poderá usar.</p></div></div>
				<div id="notshow" class="row" style="display:none;"><div id="apper_show_not_doc" class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"><h1 class="display-4">Você não escolheu uma modalidade!</h1><p class="lead">Escolha uma modalidade para criar um novo leilão.</p></div></div>
				<div id="show" class="row" style="display:none;">
	                <div class="container">
				      <div class="py-5 text-center">
				        <img class="d-block mx-auto" src="/assets/kin-network.png" width="180" height="180">
				        <h2>Adicionar um Novo Leilão</h2>
					</div>
				
				      <div class="row">
				        
						  <div class="col-md-12 order-md-1">
				          <div class="needs-validation">
				            <div class="mb-3">
				                <label>Titulo do Leilão</label>
				                <input type="text" class="form-control" id="titulo" autofocus>
							</div>
				
				            <div class="mb-3">
				              <label>Breve Descricão</label>
				              <textarea class="form-control" id="breve" rows="3"></textarea>
				            </div>
				
				            <div class="mb-3">
				              <label for="address">Endereço</label>
				              <input type="text" class="form-control" id="local">
				            </div>
				
				            <div class="mb-3 mod2">
				              <label for="address2">Primeiro Leilão</label>
				              <div class="input-group date" id="datetimepicker1">
				              	<input type="text" class="form-control" id="primeiradata"/><span class="input-group-addon"><span class="glyphicon-calendar glyphicon"></span></span>
				              </div>
				            </div>
							
							<div class="mb-3 mod2">
					              <label for="address2">Segundo Leilão<span class="text-muted"> (Opcional)</span></label>
					              <div class="input-group date" id="datetimepicker2">
				                  	<input type="text" class="form-control" id="segundadata"/><span class="input-group-addon"><span class="glyphicon-calendar glyphicon"></span></span>
				                  </div>
							</div>
				
				            <div class="row">
				              <div class="col-md-5 mb-3">
				                <label>Estado</label>
				                <select class="form-control" id="estados">
				                	<option value=""></option>
								</select>
				              </div>
				              <div class="col-md-4 mb-3">
				                <label>Cidade</label>
				                <select class="form-control" id="cidades">
								</select>
				              </div>
				              <div class="col-md-3 mb-3">
				                <label for="zip">Valor</label>
								<div class="input-group mb-2">
							        <div class="input-group-prepend">
							          <div class="input-group-text">R$</div>
							        </div>
							        <input type="text" class="form-control" id="valor" data-mask="#.##0,00" data-mask-reverse="true">
								</div>
				              </div>
				            </div>
				            <div class="mb-3">
								<label>Escolha a Categoria</label>
				              	<select class="form-control" id="categoria">
				                                    <option value="1">Automóveis</option>
				                                    <option value="2">Caminhões</option>
				                                    <option value="3">Motos</option>
				                                    <option value="4">Ônibus</option>
				                                    <option value="5">Computadores</option>
				                                    <option value="6">Smartphones</option>
				                                    <option value="7">Terrenos</option>
				                                    <option value="8">Apartamentos</option>
				                                    <option value="9">Casas</option>
				                                    <option value="10">Edificios</option>
				                                    <option value="11">Agricolas</option>
				                                    <option value="12">Ferramentas</option>
				                                    <option value="13">Outros</option>
				                 </select>
				            </div>
				            <hr class="mb-4">
							<div>
				            	<textarea id="editor" placeholder="Digite seu Edital"></textarea>
				            </div>
				            <hr class="space">
							<div class="card" data-controller="multi-file-input">
							  <div>
							    <form method="post" enctype="multipart/form-data">
							      <label for="filesToUpload" class="btn btn-primary mb-0" style="width: 100%;background-color: #39D2B4;border-color: #39D2B4;">
							        <span id="numfiles">Escolha as imagens do leilão</span>
							        <input id="filesToUpload" type="file" accept="image/*" multiple="" class="form-control" onchange="getfilename();"/>
							      </label>
							    </form>
							  </div>
							  <ul id="fileList" class="list-group list-group-flush">
							      
							  </ul>
							</div>
							<hr class="space">
				            <button class="btn btn-primary btn-lg btn-block status" id="addmodalidade1" style="display:none;">Adicionar Leilão</button>
							<button class="btn btn-primary btn-lg btn-block status" id="addmodalidade2" style="display:none;">Adicionar Leilão</button>
							<button class="btn btn-primary btn-lg btn-block status" id="addmodalidade3" style="display:none;">Adicionar Leilão</button>
				          </div>
				        </div>
						</div>
					  <canvas id="canvas" width="400" height="400" style="display:none;"></canvas>
					  <div id="img"></div>
				
				      <footer class="my-5 pt-5 text-muted text-center text-small">
				        <p class="mb-1" id="cop"></p>
				        <ul class="list-inline">
				          <li class="list-inline-item"><a href="javascript:void(0)">Privacidade</a></li>
				          <li class="list-inline-item"><a href="javascript:void(0)">Termos</a></li>
				          <li class="list-inline-item"><a href="javascript:void(0)">Suporte</a></li>
				        </ul>
				      </footer>
					  </div>
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
      "/dashboard/actions/novo.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
