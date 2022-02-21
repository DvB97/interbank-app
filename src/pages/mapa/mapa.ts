import { Component, NgZone } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Platform
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { Diagnostic } from "@ionic-native/diagnostic";
declare var google;
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-mapa",
  templateUrl: "mapa.html"
})
export class MapaPage {
  overlayHidden: boolean = true;
  routerTrue: boolean = false;
  autocomplete: any;
  address: any;
  myInput: any;
  map: any;
  mapa: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  autocompleteItems: any;
  geocoder: any;
  loading: any;
  geoLat: any;
  geoLong: any;
  geoLatDestine: any;
  geoLongDestine: any;
  body: any;
  type: any;
  distance: any = 1;
  markers: any = [];
  markersM: any;
  markerPrincipal: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  travelMode: any = "DRIVING";

  constructor(
    public zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    public platform: Platform
  ) {
    this.mapa = navParams.get("mapa");
    this.geocoder = new google.maps.Geocoder();
    let elem = document.createElement("div");
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ""
    };
    this.autocompleteItems = [];
    /** Trackeo */
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();

    this.waypoints = [
      {
        location: { lat: -12.0895492, lng: -77.0248079 },
        stopover: true
      }
    ];
  }

  Buscomapa(info) {
    console.log("Busco Mapa");
    let mapEle: HTMLElement = document.getElementById("map");
    let mapadetail = info;
    let myLatLng = { lat: mapadetail.latitude, lng: mapadetail.longitude };
    let zoom = 16;
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: zoom
    });
    this.geoLat = mapadetail.latitude;
    this.geoLong = mapadetail.longitude;
    this.Realizar(this.geoLat, this.geoLong);
  }
  ionViewDidLoad() {
    this.getPosition();
  }
  /*getPosition(): any {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.diagnostic.isLocationEnabled().then((isEnabled) => {
      // if (!isEnabled && this.platform.is('cordova')) {
      if (!isEnabled) {
         loading.dismiss();
        const alert = this.alertCtrl.create({
          message: "El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo",
          buttons: [
            {
              text: "Configuración",
              handler: () => {
                this.diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        alert.present();
      }
      else {
        this.geolocation
          .getCurrentPosition()
          .then(response => {
              loading.dismiss();
            this.loadMap(response);
          })
          .catch(error => {
            const alert = this.alertCtrl.create({
              subTitle: 'El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo',
              buttons: ["Ok"]
            });
            alert.present();
          });
      }
    })
  }*/
  getPosition(): any {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.geolocation
      .getCurrentPosition()
      .then(response => {
        loading.dismiss();
        this.loadMap(response);
      })
      .catch(error => {
        const alert = this.alertCtrl.create({
          subTitle: 'El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo',
          buttons: ["Ok"]
        });
        alert.present();
      })
  }
  watchPosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
      this.geoLat = data.coords.latitude;
      this.geoLong = data.coords.longitude;
      let myLatLng = { lat: data.coords.latitude, lng: data.coords.longitude };
      this.markerPrincipal.setPosition(myLatLng);
    });
  }
  loadMap(position: Geoposition) {
    this.geoLat = position.coords.latitude;
    this.geoLong = position.coords.longitude;
    let mapEle: HTMLElement = document.getElementById("map");
    let panelEle: HTMLElement = document.getElementById("panel");
    let myLatLng = { lat: this.geoLat, lng: this.geoLong };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      }
    });
    /*  let trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap( this.map);*/
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);

    google.maps.event.addListenerOnce(this.map, "idle", () => {
      this.markerPrincipal = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        icon: "https://agente.artsignsoluciones.com/uploads/map/bluecircle.png"
      });
      mapEle.classList.add("show-map");
    });

    google.maps.event.addListener(this.map, "dragend", () => {
      console.log('Entro a dragend')
      this.Realizar(
        this.map
          .getBounds()
          .getNorthEast()
          .lat(),
        this.map
          .getBounds()
          .getNorthEast()
          .lng()
      );

      this.Realizar(
        this.map
          .getBounds()
          .getSouthWest()
          .lat(),
        this.map
          .getBounds()
          .getSouthWest()
          .lng()
      );
    });

    if (this.mapa) {
      this.Buscomapa(this.mapa);
    }
    let timeOutHandler = setTimeout(() => {
      this.Realizar(this.geoLat, this.geoLong);
    }, 8000);
    this.watchPosition();
  }
  addMarker(options) {
    var myLatlng = new google.maps.LatLng(options.geoLat, options.geoLong);
    var contentString =
      '<p style="font-size:14px;">' +
      options.name +
      "</p>" +
      '<button icon ion-button color="primary" class="boton centrar" id="myid" style="height: 20px; background-color: #009b3a; font-size:10px;">Crear Ruta</button>';
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    google.maps.event.addListenerOnce(infowindow, "domready", () => {
      document.getElementById("myid").addEventListener("click", () => {
        this.waze(options.geoLat, options.geoLong);
      });
    });
    if (options.atm) {
      var image = "https://agente.artsignsoluciones.com/uploads/map/global.png";
    } else {
      var image =
        "https://agente.artsignsoluciones.com/uploads/map/interbankagente.png";
    }
    let marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      title: options.name,
      icon: image
    });
    marker.addListener("click", function () {
      infowindow.open(this.map, marker);
    });
    this.markers.push(marker);
  }
  Realizar(geoLat, geoLong) {
    this.body = {
      geoLat: geoLat,
      geoLong: geoLong,
      type: this.type,
      distance: this.distance
    };
    this.api.post("mapageneral", this.body).then(
      jwt => {
        console.log("Cargando Markers");
        if (jwt) {
          this.markersM = jwt;
          this.markersM = this.markersM.response;
          this.markersM.forEach(marker => {
            this.addMarker(marker);
          });
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log("Error al cargar Markers");
      }
    );
  }
  // Aqui
  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input, 
        componentRestrictions: {country: 'pe'}
      },
      (predictions, status) => {
        this.autocompleteItems = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach(prediction => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
      }
    );
  }

  selectSearchResult(item) {
    console.log("Entro aqui para buscar");
    this.clearMarkers();
    this.autocompleteItems = [];
    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status === "OK" && results[0]) {
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
        this.geoLat = results[0].geometry.location.lat();
        this.geoLong = results[0].geometry.location.lng();
        this.Realizar(this.geoLat, this.geoLong);
      }
    });
  }
  public waze(geoLat, geoLong) {
    window.open("https://www.waze.com/ul?ll=" + geoLat + "%2C" + geoLong + "&navigate=yes&zoom=15", '_system', 'location=yes');
    console.log(geoLat)
    console.log(geoLong)
  }
  public clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i]);
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  public hideOverlay() {
    if (this.overlayHidden == true) {
      this.overlayHidden = false;
    } else {
      this.overlayHidden = true;
    }
  }
  filterType() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar Tipo");
    alert.addInput({
      type: "radio",
      label: "Agentes",
      value: "Agentes",
      checked: true
    });
    alert.addInput({
      type: "radio",
      label: "ATM",
      value: "ATM"
    });

    alert.addButton({
      text: "Cerrar",
      handler: data => {
        console.log("Checkbox data:", data);
        // this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.addButton({
      text: "Mostrar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.clearMarkers();
        this.type = data;
        this.Realizar(this.geoLat, this.geoLong);
        // this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.present();
  }
  filterCartera() {
    this.type = 1; //Mi Cartera
    this.clearMarkers();
    this.Realizar(this.geoLat, this.geoLong);
  }
  filterToo() {
    this.type = ""; // Todos
    this.clearMarkers();
    this.Realizar(this.geoLat, this.geoLong);
  }
}
