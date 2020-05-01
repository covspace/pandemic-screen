<!DOCTYPE html>
<html>
  <head>
    <title>covspace</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
	<script src="/js/jquery-3.5.0.min.js"></script>
  <script src="/js/numeral.min.js"></script>
  <script type='text/javascript' src='config.js'></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  </head>
  <body id="map-container">
    <div id="map"></div>
	<div id="hidden" style="display:none"></div>
	<script type="text/javascript">
	var map;
  var dataState = {
    'selectedDataEntity': 'total_cases',
    'selectedDataSource': 'cssedb'
  };
  var dataEntityTmp = {
    'dataMax': 0,
    'dataMin': 0,
  };
  var infoBoxLeft = {};
  var infoBoxRight = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 47.7, lng: 11.8}
});

  // info windows
  map.data.addListener('click', handleClickFeature);

  // layer selection
	$('#hidden').load('/generate_layer_selection.php', function(){
    var centerControl = document.getElementById('layer_selector_box');

  	centerControl.index = 1;
  	map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControl);

    // register event handler
    $('#layer_selector_box div[class="layer_selector_item"]').click(handleLayerSelectionChange);
    $('#layer_selector_box #layer_selector_datasource').change(handleDataSourceSelectionChange);

    // bring layer and DS switcher up to speed
    $('.layer_selector_item[id="select-'+dataState['selectedDataEntity']+'"]').addClass('active');
    $('#layer_selector_datasource').val(dataState['selectedDataSource']);
  });

  // update map layer
  updateMapLayer();
}

// update from data
function updateMapLayer()
{
  // remove features and close infoWindow
  map.data.forEach(function(feature) {
    map.data.remove(feature);
  });
  /*infoWindows.forEach(function(i){
    i.close();
  });*/

  $.ajax({'url': '/get_geojson.php?dataSource='+dataState['selectedDataSource']+'&dataEntity='+dataState['selectedDataEntity']}).done(function(data){
    map.data.addGeoJson(data.data);

    var allNumbers = [];
    for(var i = 0; i < data.data.features.length; i++)
    {
      x = data.data.features[i].properties[dataState['selectedDataEntity']];
      allNumbers.push(x);
    }

    dataEntityTmp = {
      'dataMax': Math.max(...allNumbers),
      'dataMin': Math.min(...allNumbers),
    }
    console.log(allNumbers);

    map.data.setStyle(styleFeature);
  });

}

function handleClickFeature(e) {
  console.log('clicked '+e.feature.o);
  /* deprecated info box
  var markerObj = new google.maps.MVCObject();
  markerObj.setValues({position: e.latLng});
  var infoWindow = new google.maps.InfoWindow();
  infoWindow.open(map, markerObj);
  infoWindows.push(infoWindow); infoWindow.setContent(d); */

  $.ajax({url: '/generate_infobox_left.php', data: {countryId: e.feature.getProperty('countryId'), dataSource: e.feature.getProperty('dataSource')}}).done(function(d){
    infoBoxLeft = document.createElement('div');
    infoBoxLeft.id = 'infobox_left_container';
    $(infoBoxLeft).append(d);
    console.log(infoBoxLeft);

    map.controls[google.maps.ControlPosition.LEFT_CENTER].clear();

    infoBoxLeft.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(infoBoxLeft);

    $(infoBoxLeft).find('#infobox_left_close').click(function(){
      map.controls[google.maps.ControlPosition.LEFT_CENTER].clear();
    });

    // make ints pretty
    $(infoBoxLeft).find('span.db_data[data-type="int"]').each(function(){
      n = numeral($(this).text());
      if(n.value() > 1000)
      {
        $(this).text(n.format('0.0 a'));
      }
    });
  });
}

function handleLayerSelectionChange(e)
{
  if(dataState['selectedDataEntity'] != $(this).attr('data-value'))
  {
    dataState['selectedDataEntity'] = $(this).attr('data-value');
    $(this).parent().find('div').removeClass('active');
    $(this).addClass('active');

    // TODO: check if datasource has this entity

    updateMapLayer();
  }
}

function handleDataSourceSelectionChange(e)
{
  console.log(e);
  if(dataState['selectedDataSource'] != $(this).find(":selected").val())
  {
    dataState['selectedDataSource'] = $(this).find(":selected").val();
    $(this).parent().find('div').removeClass('active');
    $(this).addClass('active');

    // TODO: check if datasource has this entity

    updateMapLayer();
  }
}

function styleFeature(feature) {
  return ({
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: (feature.getProperty(dataState['selectedDataEntity']))/dataEntityTmp.dataMax*50+10,
        fillColor: '#f00',
        fillOpacity: 0.35,
        strokeWeight: 0
      }
    });

      }

      function interpolateHsl(lowHsl, highHsl, fraction) {
        var color = [];
        for (var i = 0; i < 3; i++) {
          // Calculate color based on the fraction.
          color[i] = (highHsl[i] - lowHsl[i]) * fraction + lowHsl[i];
        }

        return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
      }
$(document).ready(function(){
  $('#maps').attr('src', 'https://maps.googleapis.com/maps/api/js?key='+GoogleAPIKey+'&callback=initMap');
});
</script>

    <script id="maps" async defer></script>
  </body>
</html>
