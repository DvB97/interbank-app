import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
/**
/**
 * Generated class for the ComisionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-comisiones",
  templateUrl: "comisiones.html"
})
export class ComisionesPage {
  loading: any;
  barChart: any;
  agents: any;
  list: any;
  calendar: any[] = [
    {
      value: 1,
      label: "Ultimo Mes"
    },
    {
      value: 3,
      label: "Ultimos 3 Meses"
    },
    {
      value: 6,
      label: "Ultimo 6 Meses"
    },
    {
      value: 12,
      label: "Ultimo Año"
    },
    {
      value: 24,
      label: "Hace 2 Años"
    }
  ];
  limit: any = 3;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    public loadingController: LoadingController
  ) {
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
    this.api.get("commissions?agents=" + this.agents + "&limit="+this.limit).subscribe(
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
}
