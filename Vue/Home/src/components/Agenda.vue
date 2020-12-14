<template>
	<section class="section-padding" style="padding: 30px 0;padding-bottom: 100px;">
		<div class="container">
			<div class="loader"></div>
			<div id="primeiroleilao"></div>
			<div id="segundoleilao"></div>
		</div>
	</section>
</template>

<script>
export default {
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "/actions/agenda.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
};
</script>
