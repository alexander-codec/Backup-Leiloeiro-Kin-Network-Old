$("#paghome").removeClass("active");$("#pagagenda").removeClass("active");$("#paglances").removeClass("active");$("#pagmodalidade").removeClass("active");$("#pagcategoria").removeClass("active");$("#pagcontato").addClass("active");
function initMap() {
  // The location of Uluru
  var uluru = {lat: -29.7006793, lng: -53.8334414};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('conatiner-map'), {zoom: 17, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}