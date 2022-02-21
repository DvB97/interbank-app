import { Component, NgZone } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Platform
} from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { ApiProvider } from "../../providers/api/api";
import { TransaccionPage } from "../transaccion/transaccion";
import { ComisionesPage } from "../comisiones/comisiones";
import { NotepadPage } from "../notepad/notepad";
import { NotepadListPage } from "../notepad-list/notepad-list";
import { VisitPage } from "../visit/visit";
import { ListPage } from "../list/list";
import { PermisosPage } from "../permisos/permisos";
import { Diagnostic } from "@ionic-native/diagnostic";

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "page-detalle",
  templateUrl: "detalle.html"
})
export class DetallePage {
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
  marker: any;
  geoLat: any;
  geoLong: any;
  markersM: any;
  data: any;
  body: any;
  status: any;
  constructor(
    public zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    private diagnostic: Diagnostic,
    public platform: Platform
  ) {
    this.data = navParams.get("data");
  }
  ionViewDidEnter() {
    this.getPosition();
    console.log('Esta en GeoPosicion')
  }
  getPosition(): any {
    this.diagnostic.isLocationEnabled().then((isEnabled) => {
      console.log(isEnabled);
        if (!isEnabled && this.platform.is('cordova')) { // Habilitar para Movil
      //if (!isEnabled) { // Habilitar para Escritorio
        const alert = this.alertCtrl.create({
          message: "El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo, cerrar la app y volver a ingresar la visita",
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
            this.loadMap(response);
          })
          .catch(error => {
            const alert = this.alertCtrl.create({
              subTitle: 'El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo, cerrar la app y volver a ingresar la visita',
              buttons: ["Ok"]
            });
            alert.present();
          });
      }
    })
  }

  loadMap(position: Geoposition) {
    this.geoLat = position.coords.latitude;
    this.geoLong = position.coords.longitude;
    console.log(this.geoLat)
    console.log(this.geoLong)
  }
  goToPermisos(params) {
    if (!params) params = {};
    this.navCtrl.push(PermisosPage, {
      agents: params
    });
  }
  goToTransaccion(params) {
    if (!params) params = {};
    this.navCtrl.push(TransaccionPage, {
      agents: params
    });
  }
  goToComisones(params) {
    if (!params) params = {};
    this.navCtrl.push(ComisionesPage, {
      agents: params
    });
  }
  gotoNotepad(params) {
    if (!params) params = {};
    this.navCtrl.push(NotepadPage, {
      agents: params,
      type: 3
    });
  }
  gotoNotepadList(params) {
    if (!params) params = {};
    this.navCtrl.push(NotepadListPage, {
      agents: params
    });
  }
  gotoVisit(params) {
    if (!params) params = {};
    this.navCtrl.push(VisitPage, {
      agents: params
    });
  }

  gotoList() {
    console.log('Entro')
    const prompt = this.alertCtrl.create({
      title: "Estado de Visita.",
      buttons: [
        {
          text: "No Exitosa",
          handler: data => {
            this.status = 2;
            this.Realizar();
          }
        },
        {
          text: "Exitosa",
          handler: data => {
            this.status = 1;
            this.Realizar();
          }
        }
      ]
    });
    prompt.present();
  }

  Realizar() {
    console.log("Entro a realizar");
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.body = {
      geoLat: this.geoLat,
      geoLong: this.geoLong,
      agents_id: this.data.agents,
      status: this.status
    };
    this.api.post("visit", this.body).then(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.data = jwt;
          this.data = this.data.response;
          const alert = this.alertCtrl.create({
            title: "Guardado",
            buttons: ["Mi Cartera"]
          });
          alert.present();
          this.navCtrl.setRoot(ListPage);
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
}
