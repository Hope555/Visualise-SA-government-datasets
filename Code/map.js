var index = -2;
var z = 0;
colorList = new Array("red", "skyblue", "yellow", "green", "blue", "purple", "gray", "lightgreen", "darkorange", "deeppink");
maxColor = 10;
use = new Array([maxColor]);
for (var i = 0; i< maxColor; i++) {
	use[i] = "null";
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 5.1,
        center: { lat: -31.5, lng: 135 }
    });
    //document.getElementById('info-box').innerHTML = null;
}

function to_map_api(name) {
 
    if (name.includes(".geojson")) {

        map_buffer[name] = readFile(name);
        legend_buffer[name] = colorList[index];
    } else if (name.includes(".kml")) {
        map_buffer[name] = readkml(name);
        legend_buffer[name] = colorList[index];
    }
}

function addRow(property, value){
	var table = document.getElementById("infoTable");
	var row = table.insertRow();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = property;
	cell2.innerHTML = value;
	cell1.style.border = '1px solid black';
	cell2.style.border = '1px solid black';
}
	
function initTable() {
	var table = document.getElementById("infoTable");
	while (table.rows.length > 1) {
		table.deleteRow(1);
	}
}

//Read geojson file
//Analyse properties in geojson file
function readProperty(even, name) {
	initTable();
	meta = "<a href='"+local_file[name.substring(0, name.indexOf(".geojson"))].meta+"' target='_blank'>"+"metadata"+"</a>"
	addRow("Property", "Value")
	addRow("Filename", name)
	addRow("Metadata", meta)
	even.feature.forEachProperty(function(value,property) {
		//If there is a website, convert it to a link
		if (value.length > 4 && value.substr(0, 4) == "http") {
			value = "<a href='"+value+"' target='_blank'>"+"More information"+"</a>" + '<br />'
		}
		addRow(property, value)
	});
}

//Customize point 
function customizePoint(color) {
	return {
		path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
		fillColor: colorList[color],
		fillOpacity: 1,
		strokeColor: '#000',
		strokeWeight: 2,
		scale: 1
	};
}

function alterUse(name) {
	var a = -1;
	for (var i = 0; i < maxColor; i++) {
		if (use[i] == "null") {
			use[i] = name;
			a = i;
			break;
		}
	}
	return a;
}

function reverseUse(name) {

	for (var i = 0; i < maxColor; i++) {
		if (use[i] == name) {
			use[i] = "null";
			break;
		}
	}
	index = -2;
}

function findUse(name) {
	var a = -1;
	for (var i = 0; i < maxColor; i++) {
		if (use[i] == name) {
			a = i;
			break;
		}
	}
	return a;
}

function readFile(name) {
    index = alterUse(name);
	if (index == -1) {
		alert("Too many datasets selected, please reset the map or deselect some datasets.");
	}
	else {
		var layer = new google.maps.Data({ map: map });
		layer.loadGeoJson(local_file[name.substring(0, name.indexOf(".geojson"))].json);
		layer.setStyle({
			icon: customizePoint(index),
			strokeWeight: 1,
			strokeColor: colorList[index],
			fillColor: colorList[index],
			zIndex: z,
		});
		z++;
		layer.addListener('mouseover', function (event) {
			readProperty(event, name);
		});
		return layer;
	}
}

//Read kml file
function readkml(name) {
    index = alterUse(name);
    if (index == -1) {
        alert("Too many datasets selected, please reset the map or deselect some datasets.");
    } else {

        var src = local_file[name.substring(0, name.indexOf(".kml"))].kml;
        var kmlLayer = new google.maps.KmlLayer(src, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map,
        });
        
		kmlLayer.addListener('click', function (event) {
			initTable();
			var content = event.latLng;
			meta = "<a href='"+local_file[name.substring(0, name.indexOf(".kml"))].meta+"' target='_blank'>"+"metadata"+"</a>"
			addRow("Property", "Value")
			addRow("Filename", name)
			addRow("Metadata", meta)
			addRow("Coordinates", content)
			//readProperty(event, name);
			//var content = event.latLng;
            //document.getElementById('info-box').innerHTML = content;
        });
        return kmlLayer;
    }
}

//Reset map
function reset() {
    initMap();
}