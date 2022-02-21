import { Component, NgZone } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { ApiProvider } from "../../providers/api/api";
import { DetalleCheckPage } from "../detalle-check/detalle-check";
import { DetallePage } from "../detalle/detalle";
/**
 * Generated class for the StepmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@Component({
  selector: "page-stepmap",
  templateUrl: "stepmap.html"
})
export class StepmapPage {
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
  markers: any;
  geoLat: any;
  geoLong: any;
  body: any;
  markersM: any;
  mueble: any;
  agencia: any;
  constructor(
    public zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    public api: ApiProvider
  ) {
    this.markers = [];
    this.markersM = [];
  }

  ionViewDidLoad() {
    this.getPosition();
  }
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
        console.log(error);
      });
  }

  loadMap(position: Geoposition) {
    console.log("Entro a loadMap");
    this.geoLat = position.coords.latitude;
    this.geoLong = position.coords.longitude;
    let mapEle: HTMLElement = document.getElementById("map");
    let myLatLng = { lat: this.geoLat, lng: this.geoLong };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18
    });
    google.maps.event.addListenerOnce(this.map, "idle", () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: "Ubicación Actual!"
      });
      mapEle.classList.add("show-map");
    });
    this.Realizar();
  }
  addMarker(options) {
    var contentString = '<p style="font-size:3.5vw;">' + options.name + "</p>";
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    // if (options.agencia == "Agente") {
    var image ="http://api.artsignsoluciones.com/uploads/map/interbankagente.png";
    //   } else {
    //var image = "http://api.artsignsoluciones.com/uploads/map/global.png";
    //}
    var myLatlng = new google.maps.LatLng(options.geoLat, options.geoLong);
    let marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      title: options.name,
      icon: image
    });
    let that = options;
    /* marker.addListener('click', function() {
      //infowindow.open(this.map, marker);
      this.mapclick();
    });*/
    google.maps.event.addListener(marker, "click", () => {
      this.alertMap(options);
    });
  }
  Realizar() {
    console.log("Entro a realizar");
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.body = {
      geoLat: this.geoLat,
      geoLong: this.geoLong
    };
    this.api.post("mapakm", this.body).then(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.markersM = jwt;
          this.markersM = this.markersM.response;
          console.log(this.markersM);
          this.markersM.forEach(marker => {
            this.addMarker(marker);
          });
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
  mapclick() {
    console.log("Entro vale deja");
  }
  public waze(geoLat, geoLong) {
    window.open("https://www.waze.com/ul?ll=" + geoLat + "%2C" + geoLong + "&navigate=yes&zoom=15", '_system', 'location=yes');
    console.log(geoLat)
    console.log(geoLong)
  }
  
  alertMap(info) {
    const prompt = this.alertCtrl.create({
      title: "Identificador del Agente o ATM",
      message: "Este identificandor corresponde a " + info.name,
      buttons: [
        {
          text: "Localizar",
          handler: data => {
            this.waze(this.geoLat, this.geoLong);
          }
        },
        {
          text: "No",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Si",
          handler: data => {
            this.navCtrl.push(DetallePage, {
              data: info,
              geoLat: this.geoLat,
              geoLong: this.geoLong
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
