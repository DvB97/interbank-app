import { Component, NgZone } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { ApiProvider } from "../../providers/api/api";
import { TransaccionPage } from "../transaccion/transaccion";
import { ComisionesPage } from "../comisiones/comisiones";
import { NotepadPage } from "../notepad/notepad";
import { NotepadListPage } from "../notepad-list/notepad-list";
import { VisitPage } from "../visit/visit";
import { ListPage } from "../list/list";
import { Step2Page } from "../step2/step2";
/**
 * Generated class for the SuperejecutivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-superejecutive',
  templateUrl: 'superejecutive.html',
})
export class SuperejecutivePage {
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
    public api: ApiProvider
  ) {
    this.data = navParams.get("data");
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
    this.geoLat = position.coords.latitude;
    this.geoLong = position.coords.longitude;
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

  gotoAlert(){
    this.navCtrl.push(Step2Page, {
      agente: this.data.id,
      geoLat: this.geoLat,
      geoLong: this.geoLong
    });
  }

}
