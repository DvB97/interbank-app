import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Storage } from "@ionic/storage";
import { HistorialPage } from "../historial/historial";
import { TransaccionPage } from "../transaccion/transaccion";
import { ChartHistorialPage } from "../chart-historial/chart-historial";
import { PermisosPage } from "../permisos/permisos";

/**
 * Generated class for the PermisosModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permisos-modal',
  templateUrl: 'permisos-modal.html',
})
export class PermisosModalPage {
  data: any;
  roles: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get("data");
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermisosModalPage');
  }

}
