var map = L.map('map').setView([34.15, -118.2], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'OSM'})
.addTo(map);

function getColor(d) {
        return d > 2000  ? '#760000':
               d > 1000  ? '#d80000':
			   d > 500  ? '#ff1414'   : 
		       d > 300   ? '#ff6262' :
			   d > 100   ? '#ffb1b1' :
               d > 50   ? '#ffc4c4' :
               d > 0   ? '#ffebeb' :
	                      'gray';
}

	function style(feature) {
	    return {
			fillColor: getColor(feature.properties.crime_rate_2017),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	L.geoJson(zipcodes, {style: style}).addTo(map);
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}  
function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

//Bens added function
function openWeaponsChart(zipcode){
	console.log(zipcode)
	window.open(`${zipcode}`, '_blank')
	//find zipcode with feature.properties.name
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
		mouseout: resetHighlight,
		//I changed this part to open a new tab with the chart in it
        click: zoomToFeature
    });
}

geojson = L.geoJson(zipcodes, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Crime Rate by Zipcode</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + Math.round(props.crime_rate_2017) + ' violent crimes per 100k'
        : 'Hover over area');
};
function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.2
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
  }
function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}
info.addTo(map);

function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			//changed it here too
			click:zoomToFeature
		});
  }
var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 50, 100, 300, 500, 1000, 2000],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(grades[i]+1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

  legend.addTo(map);
var legend = L.control({position: 'bottomright'});


legend.addTo(map);