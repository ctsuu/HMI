window.onload = init;

function init(){
    const map = new ol.Map({
               
        view: new ol.View({
          center: ol.proj.fromLonLat([-114.02959719, 51.04147]),
          zoom: 16,
          maxZoom: 20,
          minZoom: 10,
          rotation: 0.0
          
        }),
        
        target: 'js-map'
    });

    
    

    // Basemap Layer
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: "OSMStandard"
    })


    const stamenWatercolor = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
            attributions:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        }),
        visible: false,
        title: "StamenWatercolor"
    }) 

    const stamenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
            attributions:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        }),
        visible: false,
        title: 'StamenTerrain'
    })

    const transportDark = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=04f12d36f8254d00a25e612512bcf739',
        }),
        visible: false,
        title: 'TransportDark'
    })

    const transportBright = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=04f12d36f8254d00a25e612512bcf739',
        }),
        visible: false,
        title: 'TransportBright'
    })

    const openCycleMap = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=04f12d36f8254d00a25e612512bcf739',
        }),
        visible: true,
        title: 'OpenCycleMap'
    })

    //Layer group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            openStreetMapStandard, stamenWatercolor, stamenTerrain, transportDark, transportBright, openCycleMap
        ]
    })

    map.addLayer(baseLayerGroup);
    //map.addLayer(openStreetMapStandard);

    //Layer Switcher Logic for Radio Buttons
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for (let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
                console.log('baseLayerTitle:' + baseLayerTitle, 'baseLayerElementValue: '+ baseLayerElementValue)
            })
        })
    }
    
    const CityGeoJSON = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './yyc.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title: 'CityGeoJSON'
    })

    map.addLayer(CityGeoJSON)

    // Vector Feature Popup Logic

    const overlayContainerElement = document.querySelector('.overlay-container');
    const overlayLayer = new ol.Overlay({
        element: overlayContainerElement
    })

    map.addOverlay(overlayLayer);
    const overlayFeatureName = document.getElementById('feature-name');
    const overlayFeatureAdditionInfo = document.getElementById('feature-additional-info');

    map.on('click', function(e){
        overlayLayer.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
            let clickedCoordinate = e.coordinate;
            let clickedFeatureName = feature.get('city');
            let clickedFeatureAdditionalInfo = feature.get('additionalinfo');
            overlayLayer.setPosition(clickedCoordinate);
            overlayFeatureName.innerHTML = clickedFeatureName;
            //overlayFeatureAdditionInfo.innerHTML = clickedFeatureAdditionalInfo;
            console.log(clickedFeatureName);
        })
    })
        
}