window.onload = init;

function init(){
    const map = new ol.Map({
               
        view: new ol.View({
          center: ol.proj.fromLonLat([-114.02959719, 51.04147]),
          zoom: 14,
          maxZoom: 20,
          minZoom: 10,
          rotation: 0.1
          
        }),
        layers:[
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'js-map'
      });

    map.on('click', function(e){
        console.log(e.coordinate);
    })

    // Basemap Layer
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: "OSMStandard"
    })


    const openStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: "https://a.tile.openstreetmap.fr/hot/${z}${x}${y}.png"
        }),
        visible: true,
        title: "OSMHumanitarian"
    }) 

    const stamenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: "http://tile.stamen.com/terrain/{z}{x}{y}.jpg",
            attributions:'Map tiles by <a href="http://stamen.com"> Stamen Design</a>'
        }),
        visible: false,
        title: 'StamenTerrain'
    })

    //Layer group
    const baseLayerGroup = new ol.layer.baseLayerGroup({
        layers: [
            openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain
        ]
    })

    map.addLayer(baseLayerGroup);
    //map.addLayer(openStreetMapStandard);

}
