import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoadingController, AlertController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the AnaliticaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-analitica",
  templateUrl: "analitica.html"
})
export class AnaliticaPage {
  public doughnutChartLabels: string[] = [
    "Finalizadas",
    "Pendientes",
    "Incidentes"
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = "doughnut";
  public backgroundColor = ["red", "green", "blue"];
  overlayHidden: boolean = true;
  list: any;
  listDefault: any;
  name: any = "";
  sort: any = "ASC";
  datestart: any = "";
  cluster: any = "";
  loading: any;
  pending: any = 0;
  successful: any = 0;
  notsuccessful: any = 0;
  vegetativo: any = "";
  items = [];
  itemsuma: any = 0;
  status: any = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    public loadingController: LoadingController
  ) {}

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  ionViewWillLoad() {
    this.cargar();
  }
  goToDetalle() {
    const prompt = this.alertCtrl.create({
      title: "Realizar Visita",
      buttons: [
        {
          text: "SI",
          handler: data => {
            this.status = 2;
          }
        },
        {
          text: "NO",
          handler: data => {
            this.status = 1;
          }
        }
      ]
    });
    prompt.present();
  }
  cargar() {
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.get("referidos").subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.list = jwt;
          this.listDefault = this.list.data.items;
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
