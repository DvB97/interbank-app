import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, NavParams } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { HistorialModalPage } from "../historial-modal/historial-modal";
import { ChatPage } from "../chat/chat";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the HistorialSolicitudesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-historial-solicitudes',
  templateUrl: 'historial-solicitudes.html',
})
export class HistorialSolicitudesPage {
  overlayHidden: boolean = true;
  list: any;
  listDefault: any;
  users: any;
  tipo: any = "";
  sort: any = "ASC";
  datestart: any = "";
  cluster: any = "";
  agents: any;
  loading: any;
  pending: any = 0;
  successful: any = 0;
  notsuccessful: any = 0;
  roles: any = 0;
  limit: any = 50;
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private readonly storage: Storage,
    public api: ApiProvider,
    public navParams: NavParams,
    public loadingController: LoadingController
    ) {
    this.agents = navParams.get("agents");
    console.log(this.agents)
    this.cargar();
  }
  ionViewWillLoad() {
    this.cargar();
  }
  cargar() {
    console.log(this.agents)
    this.loading = true;
    const toast = this.toastCtrl.create({
      message: 'Actualizando...',
      duration: 5000,
      position: "bottom"
    });
    toast.present();
    this.api.get("alert-agents/" + this.agents).subscribe(
      jwt => {
        if (jwt) {
          this.list = jwt;
          this.listDefault = this.list.data.items;
          this.list = this.list.data.items;
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log("search canceled");
      }
    );
  }

  detalle(data) {
    this.navCtrl.push(HistorialModalPage, {
      data: data,
      nivel: 1
    });
  }

  goToChat(item) {
    this.navCtrl.push(ChatPage, {
      item: item
    });
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.limit += 50;
      this.cargar();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
