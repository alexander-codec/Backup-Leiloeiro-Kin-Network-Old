<template>
	<div class="main-container section-padding">
	<div class="row row-section" style="margin-right: auto;margin-left: auto;">
		<div class="col-lg-12 col-md-12 col-xs-12 page-content">
		<div class="product-filter">
		<div class="short-name">
		<span id="showcont">Carregando...</span>
		</div>
		</div>
		<div class="adds-wrapper">
		<div class="tab-content">
		<div id="grid-view" class="tab-pane fade active show">
		<div class="row" id="listleiloes">
			<div class="loader"></div>
		</div>
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
      "/actions/modalidade.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
