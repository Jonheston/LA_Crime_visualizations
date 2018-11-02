var map = L.map('map').setView([34.15, -118.2], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'OSM'})
.addTo(map);

function getColor(d) {
	return d > 200  ? '#760000':
		   d > 100  ? '#d80000':
		   d > 50  ? '#ff1414'   : 
		   d > 30   ? '#ff6262' :
		   d > 10   ? '#ffb1b1' :
		   d > 5   ? '#ffc4c4' :
		   d > -5   ? '#f5f5f5' :
		   d > -10   ? '#b2ffb2' :
		   d > -30   ? '#009f00' :
		   d > -50   ? '#003d00' :
					  'gray';
}

	function style(feature) {
	    return {
			fillColor: getColor(feature.properties.rate_change),
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
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
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
    this._div.innerHTML = '<h4>Yearly Change (per 100k)</h4>' +  (props ?
		'<b>' + props.name + '</b><br /><b> Slope of Regression: </b>' + Math.round(props.rate_change) +
		'<br /><b>Violent crimes rates</b>'
		+ '<br /> <b>2010: </b>' + Math.round(props.crime_rate_2010)
		+ '<br /> <b>2011: </b>' + Math.round(props.crime_rate_2011)
		+ '<br /> <b>2012: </b>' + Math.round(props.crime_rate_2012)
		+ '<br /> <b>2013: </b>' + Math.round(props.crime_rate_2013)
		+ '<br /> <b>2014: </b>' + Math.round(props.crime_rate_2014)
		+ '<br /> <b>2015: </b>' + Math.round(props.crime_rate_2015)
		+ '<br /> <b>2016: </b>' + Math.round(props.crime_rate_2016)
		+ '<br /> <b>2017: </b>' + Math.round(props.crime_rate_2016)


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
			click: zoomToFeature
		});
  }
var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [-50, -30, -10, -5, 5,10,30,50,100,200],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};
	legend.addTo(map);
