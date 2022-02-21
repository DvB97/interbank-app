import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotepadListPage } from "../notepad-list/notepad-list";
import { NotepadPage } from "../notepad/notepad";
import { PermisosPage } from "../permisos/permisos";
import { HistorialPage } from "../historial/historial";
/**
 * Generated class for the DetalleCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-check',
  templateUrl: 'detalle-check.html',
})
export class DetalleCheckPage {
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get("data");
  }

  ionViewDidLoad() {
    console.log(this.data)
    console.log('ionViewDidLoad DetalleCheckPage');
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
  
  goToPermisos(params) {
    if (!params) params = {};
    this.navCtrl.push(PermisosPage, {
      agents: params
    });
  }

  goToSolicitudes(params) {
    if (!params) params = {};
    this.navCtrl.push(HistorialPage, {
      agents: params
    });
  }
}
