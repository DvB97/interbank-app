import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { DetalleCheckPage } from "../detalle-check/detalle-check";
import { DetallePage } from "../detalle/detalle";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
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
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    public loadingController: LoadingController
  ) { }
  ionViewWillLoad() {
    this.cargar();
  }
  cargar() {
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.get("agents?name=" + this.name + "&cluster=" + this.cluster + "&datestart=" + this.datestart + "&vegetativo=" + this.vegetativo).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.list = jwt;
          this.pending = this.list.data.pending;
          this.successful = this.list.data.successful;
          this.notsuccessful = this.list.data.notsuccessful;
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
  goToDetalle(params) {
    this.navCtrl.push(DetalleCheckPage, {
      data: params
    });
  }
  public hideOverlay() {
    if (this.overlayHidden == true) {
      this.overlayHidden = false;
    } else {
      this.overlayHidden = true;
    }
  }

  filterCluster() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar Cluster");
    alert.addInput({
      type: "radio",
      label: "BASICO 1",
      value: "BASICO 1",
      checked: true
    });
    alert.addInput({
      type: "radio",
      label: "BASICO 2",
      value: "BASICO 2"
    });
    alert.addInput({
      type: "radio",
      label: "BASICO 3",
      value: "BASICO 3"
    });
    alert.addInput({
      type: "radio",
      label: "ASPIRANTE",
      value: "ASPIRANTE"
    });
    alert.addInput({
      type: "radio",
      label: "PRINCIPIANTE",
      value: "PRINCIPIANTE"
    });
    alert.addInput({
      type: "radio",
      label: "INTERMEDIO",
      value: "INTERMEDIO"
    });
    alert.addInput({
      type: "radio",
      label: "AVANZADO",
      value: "AVANZADO"
    });
    alert.addInput({
      type: "radio",
      label: "SUPER AGENTE",
      value: "SUPER AGENTE"
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
        this.vegetativo = ""
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
      message: "Ingrese el nombre del agente que quieras encontrar",
      inputs: [
        {
          name: "nombre",
          placeholder: "Bodega Zheng"
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
            this.vegetativo = ""

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
          placeholder: "Ultima visita",
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
            this.vegetativo = ""
            this.datestart = data.fecha
            this.cargar();
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
  filterVegatativo() {
    this.cluster = ""
    this.datestart = ""
    this.name = ""
    this.vegetativo = 1
    this.cargar();
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