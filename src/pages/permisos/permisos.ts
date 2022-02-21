import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { PermisosModalPage } from "../permisos-modal/permisos-modal";
/**
 * Generated class for the TransaccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permisos',
  templateUrl: 'permisos.html',
})
export class PermisosPage {
  loading: any;
  barChart: any;
  agents: any;
  list: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    public loadingController: LoadingController) {
    this.agents = navParams.get("agents");
    console.log(this.agents);
    this.cargar();
  }

  ionViewWillLoad() {
    this.cargar();
  }
  cargar() {
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api
      .getMaikol("api/public/listado-data/" + this.agents)
      .subscribe(
        jwt => {
          loading.dismiss();
          if (jwt) {
            this.list = jwt;
            console.log('Cargando Información')
            console.log(jwt)
            console.log(this.list)
            console.log(this.list.items)
            this.list = this.list.items;
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
  detalle(data) {
    console.log(data)
    console.log('jhey')
    this.navCtrl.push(PermisosModalPage, {
      data: data,
      nivel: 1
    });
  }
}
