import { Component, NgZone } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { ApiProvider } from "../../providers/api/api";
import { SuperejecutivePage } from "../superejecutive/superejecutive";

/**
 * Generated class for the SuperejecutiveMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-superejecutive-map',
  templateUrl: 'superejecutive-map.html',
})
export class SuperejecutiveMapPage {
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
    this.geolocation
      .getCurrentPosition()
      .then(response => {
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
    var image =
      "http://api.artsignsoluciones.com/uploads/map/interbankagente.png";
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
      this.RealizarWrite(options);
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
  RealizarWrite(code) {
    let agents = code.agents
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api
      .get(
        "mapwrite?codigo=" +
        agents +
        "&geoLat=" +
        this.geoLat +
        "&geoLong=" +
        this.geoLong
      )
      .subscribe(
        jwt => {
          loading.dismiss();
          if (jwt) {
            this.mueble = jwt;
            if (this.mueble.status == false) {
              let alert = this.alertCtrl.create({
                subTitle:
                  "Este identificador no se encuentra registrado, verifique y vuelva a escribirlo.",
                buttons: ["Verificar"]
              });
              alert.present();
              /* } else if (this.mueble.distance == null) {
                 let alert = this.alertCtrl.create({
                   subTitle: "Fuera de rango, debes aproximarte al agente",
                   buttons: ["Ok"]
                 });
                 alert.present();*/
            } else {
              this.mueble = this.mueble.data;
              let alert = this.alertCtrl.create({
                title: "Confirmación de Identificador",
                message:
                  "<p> El Identificador seleccionado corresponde al </p>" +
                  "<p>" +
                  this.mueble.name +
                  "</p>" +
                  "<p> Identificador: " +
                  this.mueble.agents +
                  "</p>" +
                  "<p> Tipo: " +
                  this.mueble.type +
                  "</p>" +
                  "<ul>" +
                  "<li>" +
                  this.mueble.district +
                  "</li>" +
                  "<li>" +
                  this.mueble.province +
                  "</li>" +
                  "<li>" +
                  this.mueble.department +
                  "</li>" +
                  "</ul>",
                buttons: [
                  {
                    text: "Localizar",
                    handler: data => {
                      this.waze(this.mueble.geoLat, this.mueble.geoLong);
                    }
                  },
                  {
                    text: "No",
                    role: "cancel",
                    handler: () => {
                      this.loading = false;
                    }
                  },
                  {
                    text: "Si",
                    handler: () => {
                      this.navCtrl.push(SuperejecutivePage, {
                        data: this.mueble
                      });
                    }
                  }
                ]
              });
              alert.present();
            }
          } else {
            console.log("Error de Conexion");
          }
        },
        err => {
          loading.dismiss();
        }
      );
  }
  public waze(geoLat, geoLong) {
    window.open("https://www.waze.com/ul?ll=" + geoLat + "%2C" + geoLong + "&navigate=yes&zoom=15", '_system', 'location=yes');
    console.log(geoLat)
    console.log(geoLong)
  }
}
