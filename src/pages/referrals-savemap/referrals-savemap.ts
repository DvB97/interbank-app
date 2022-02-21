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
import { ListReferralsPage } from "../list-referrals/list-referrals";
import { DetailReferralsPage } from "../detail-referrals/detail-referrals";
declare var google;
/**
 * Generated class for the ReferralsSavemapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-referrals-savemap",
  templateUrl: "referrals-savemap.html"
})
export class ReferralsSavemapPage {
  codeBar: any;
  overlayHidden: boolean = true;
  routerTrue: boolean = false;
  autocomplete: any;
  address: any;
  myInput: any;
  map: any;
  data: any;
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
  markerPrincipal: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  travelMode: any = "DRIVING";
  mueble: any;

  markers: any = [];
  markersM: any;
  markersA: any;
  markersMASS: any;
  markersStore: any;
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
    this.data = navParams.get("data");
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

    console.log(this.data);
    console.log(this.mapa);
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
  }

  ionViewWillEnter() {
    const alert = this.alertCtrl.create({
      subTitle:
        "Presiona el marcardor rojo y arrastralo hasta la ubicación exacta del agente",
      buttons: ["Entendido"]
    });
    alert.present();
    if (this.platform.is("cordova")) {
      this.getPositionM();
      console.log("Es Movil");
    } else {
      this.getPositionD();
      console.log("Es Escritorio");
    }
  }
  getPositionM(): any {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.diagnostic.isLocationEnabled().then(isEnabled => {
      if (!isEnabled) {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          message:
            "El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo",
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
      } else {
        this.geolocation
          .getCurrentPosition()
          .then(response => {
            loading.dismiss();
            this.loadMap(response);
          })
          .catch(error => {
            const alert = this.alertCtrl.create({
              subTitle:
                "El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo",
              buttons: ["Ok"]
            });
            alert.present();
          });
      }
    });
  }
  getPositionD(): any {
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
          subTitle:
            "El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo",
          buttons: ["Ok"]
        });
        alert.present();
      });
  }
  loadMap(position: Geoposition) {
    this.geoLat = position.coords.latitude;
    this.geoLong = position.coords.longitude;
    let mapEle: HTMLElement = document.getElementById("map");
    let panelEle: HTMLElement = document.getElementById("panel");
    console.log(this.data)
    if(this.data.geoLat){
      var myLatLng = new google.maps.LatLng(this.data.geoLat, this.data.geoLong);
    }else{
      var myLatLng = new google.maps.LatLng(this.geoLat, this.geoLong);
    }
    console.log(myLatLng);
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 14,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      }
    });
    if (!this.data.saveposition) {
      var cityCircle = new google.maps.Circle({
        strokeColor: "#8e8e8e",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#8e8e8e",
        fillOpacity: 0.35,
        map: this.map,
        center: myLatLng,
        radius: 200
      });
    }
    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, "idle", () => {
      this.markerPrincipal = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });
      mapEle.classList.add("show-map");
    });
    if (!this.data.saveposition) {
      google.maps.event.addListener(this.map, "center_changed", () => {
        this.markerPrincipal.setPosition(this.map.getCenter());
      });
    }
    if (this.mapa) {
      this.Buscomapa(this.mapa);
    }
    this.mapadecalor();
  }
  // Aqui
  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
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
      }
    });
  }
  mapadecalor(){
    this.body = {
      geoLat: this.data.geoLat,
      geoLong: this.data.geoLong,
      date: 8,
    };
    this.api.post("mapatransacciones", this.body).then(
      jwt => {
        console.log("Cargando Markers");
        if (jwt) {
          this.markers = jwt;
          this.markersA = this.markers.atm;
          this.markersM = this.markers.agents;
          this.markersM.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/interbankagente.png');
          });
          this.markersA.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/global.png');
          });
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log("Error al cargar Markers");
      }
    );
    this.api.post("storemapa", this.body).then(
      jwt => {
        console.log("Cargando Markers");
        if (jwt) {
          this.markers = jwt;
          this.markersMASS = this.markers.mass;
          this.markersStore = this.markers.store;
          this.markersMASS.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/mass.png');
          });
          this.markersStore.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/store.png');
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
  addMarker(options, icon) {
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
       console.log('Vibra')
      });
    });
    if(icon){
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        title: options.name,
        icon: icon
      });
    }else{
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        title: options.name
      });
    }
    marker.addListener("click", function () {
      infowindow.open(this.map, marker);
    });
  }
  public clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i]);
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  InstalarQR() {
    this.data.step = 4;
    this.data.saveposition = 1;
    this.data.geoLat = this.markerPrincipal.getPosition().lat();
    this.data.geoLong = this.markerPrincipal.getPosition().lng();
    let data = {
      saveposition: 1,
      geoLat: this.markerPrincipal.getPosition().lat(),
      geoLong: this.markerPrincipal.getPosition().lng(),
      step:this.data.step
    };
    this.api.put("referrals/" + this.data.id, data).subscribe(
      jwt => {
        if (jwt) {
          const alert = this.alertCtrl.create({
            subTitle: "Posición guardada",
            buttons: ["Ok"]
          });
          alert.present();
          this.navCtrl.push(DetailReferralsPage, {
            data: this.data
          });
        } else {
          const alert = this.alertCtrl.create({
            subTitle: "Error al Guardar vuelve a intentarlo.",
            buttons: ["Volver a intentar."]
          });
          alert.present();
        }
      },
      err => {
        const alert = this.alertCtrl.create({
          subTitle: "Error al Guardar vuelve a intentarlo.",
          buttons: ["Volver a intentar."]
        });
        alert.present();
      }
    );
  }
}
