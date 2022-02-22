require([
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/views/MapView",
      "dojo/domReady!"
    ], function(Map, FeatureLayer, MapView) {

    var map = new Map({
        basemap: "gray"
    });
    
    
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center:[-91.1, 38.6],
        zoom: 9
    });

    var template = { // autocasts as new PopupTemplate()
        title: "Neighborhood: {NHD_NAME}",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "NHD_NUM ",
                label: "Neighborhood Number: ",
                visible: true
            }]
         }]
    };

    var symbol = {
        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
        url: "https://cdn.iconscout.com/icon/premium/png-256-thumb/hockey-240-984443.png",
        width: "64px",
        height: "64px"
    };
    
    var renderer = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: symbol
    };
  
    var featureLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0",
        outFields: ["*"],
        popupTemplate: template,
        renderer:renderer
    });
  
    map.add(featureLayer);

    featureLayer.renderer = {
        type: "simple",  // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "red",
            outline: {  // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
            }
        }
    };
});
