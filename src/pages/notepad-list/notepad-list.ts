import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { NotepadPage } from "../notepad/notepad";

import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the NotepadListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notepad-list",
  templateUrl: "notepad-list.html"
})
export class NotepadListPage {
  loading: any;
  barChart: any;
  list: any;
  store: any ='';
  agents: any  ='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    public loadingController: LoadingController
  ) {
    this.agents = navParams.get("agents");
    this.store = navParams.get("store");
    console.log(this.agents);
    console.log(this.store);
    this.cargar();
  }

  
  cargar() {
    
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.get("note?agents=" + this.agents+ "&store="+this.store).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.list = jwt;
          this.list = this.list.data.items;
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
        console.log("search canceled");
      }
    );
  }
  gotoNote(params) {
    this.navCtrl.push(NotepadPage, {
      data: params,
      id: params,
      edit: true
    });
  }
  gotoRemove(params) {
    console.log('Eliminando')
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.delete("note/" + params).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.cargar();
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
        console.log("search canceled");
      }
    );
  }
}
