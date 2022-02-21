import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { CreateAgentPage } from "../create-agent/create-agent";
import { DetailReferralsPage } from "../detail-referrals/detail-referrals";
/**
 * Generated class for the CampoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-campo",
  templateUrl: "campo.html"
})

export class CampoPage {
  overlayHidden: boolean = true;
  showAgente: boolean = true;
  dat: any;
  list: any;
  listDefault: any;
  name: any = "";
  sort: any = "ASC";
  datestart: any = "";
  cluster: any = "";
  loading: any;
  total: any = 0;
  pending: any = 0;
  notsuccessful: any = 0;
  successful: any = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillLoad() {
    this.cargar();
  }
  goToCreate() {
    this.navCtrl.push(CreateAgentPage);
  }
  goToDetalle(params) {
    this.navCtrl.push(DetailReferralsPage, {
      data: params
    });
  }

  cargar() {
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.get("referrals?isprospeccion=1").subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.dat = jwt;
          console.log(this.dat)
          this.list = this.dat.data.items;
          this.pending = this.dat.data.pending;
          this.notsuccessful = this.dat.data.notsuccessful;
          this.successful = this.dat.data.successful;
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
  filterStatus(status) {
    console.log(status)
    this.list = this.listDefault;
    let pilot = this.list.filter(function (pilot) {
      return pilot.visit_status === status;
    });
    this.list = pilot;
  }
}
