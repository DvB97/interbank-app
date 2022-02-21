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
 * Generated class for the ListReferralsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-referrals',
  templateUrl: 'list-referrals.html',
})
export class ListReferralsPage {
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
    this.api.get("referrals?name=" + this.name + "&type=" + this.cluster + "&datestart=" + this.datestart ).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.dat = jwt;
          console.log(this.dat)
          this.list = this.dat.data.items;
          this.listDefault = this.dat.data.items;
          this.pending = this.dat.data.pending;
          this.notsuccessful = this.dat.data.notsuccessful;
          this.successful = this.dat.data.successful;
          console.log(this.pending)
          console.log(this.notsuccessful)
          console.log(this.successful)
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
     console.log(this.list)
    let pilot = this.list.filter(function (pilot) {
      return pilot.visit_status === status;
    });
    console.log(pilot)
    this.list = pilot;
  }
  filterCluster() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar Cluster");
    alert.addInput({
      type: "radio",
      label: "Pendiente",
      value: null,
      checked: true
    });
    alert.addInput({
      type: "radio",
      label: "Aplica",
      value: '1',
    });
    alert.addInput({
      type: "radio",
      label: "No Aplica",
      value: '2',
    });
    alert.addInput({
      type: "radio",
      label: "En Curso",
      value: '3',
    });
    alert.addButton({
      text: "Cerrar",
      handler: data => {
        console.log("Checkbox data:", data);
        // this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.addButton({
      text: "Buscar",
      handler: data => {
        this.cluster = data
        this.datestart = ""
        this.name = ""
        this.cargar();
        // this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.present();
  }
  filterWrite() {
    const prompt = this.alertCtrl.create({
      title: "Busqueda",
      message: "Ingrese el nombre del referido que quieras encontrar",
      inputs: [
        {
          name: "nombre",
          placeholder: "Supermercado Mundo Markert"
        }
      ],
      buttons: [
        {
          text: "Cerrar",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Filtrar",
          handler: data => {
            console.log(data.nombre)
            this.datestart = ""
            this.cluster = ""
            this.name = data.nombre
            this.cargar();
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
  filterDate() {
    const prompt = this.alertCtrl.create({
      title: "Busqueda",
      message: "Seleccione la fecha de visita.",
      inputs: [
        {
          name: "fecha",
          placeholder: "Fecha de Visita",
          type: "date"
        }
      ],
      buttons: [
        {
          text: "Cerrar",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Filtrar",
          handler: data => {
            this.cluster = ""
            this.name = ""
            this.datestart = data.fecha
            this.cargar();
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
}
