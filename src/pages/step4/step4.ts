import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";

/**
 * Generated class for the Step4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-step4",
  templateUrl: "step4.html"
})
export class Step4Page {
  tipo: any;
  agente: any;
  agencia: any;
  person: any;
  hora: any;
  fecha: any;
  fechafinal: any;
  productos: any;
  geoLat: any;
  geoLong: any;
  id_user: any;
  image: any;
  resumen: any;
  observaciones: any;
  pintura: any;
  publicidadexterna: any;
  operativo: any;
  isenabled: boolean = true;
  response: any;
  iduser: any;
  productInstalacion: any;
  productMantenimiento: any;
  productRetiro: any;
  typeRetirement: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingController: LoadingController,
    private readonly storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.productInstalacion = navParams.get("productInstalacion");
    this.productMantenimiento = navParams.get("productMantenimiento");
    this.productRetiro = navParams.get("productRetiro");
    this.typeRetirement = navParams.get("typeRetirement");
    this.agente = navParams.get("agente");
    this.agencia = navParams.get("agencia");
    this.fecha = new Date();
    this.observaciones = navParams.get("observaciones");
    this.tipo = navParams.get("tipo");
    this.geoLat = navParams.get("geoLat");
    this.geoLong = navParams.get("geoLong");
    this.image = navParams.get("image");
    this.storage.get("id").then(val => {
      this.iduser = val;
    });
  }

  ionViewDidLoad() {
    console.log(this.agente);
    console.log(this.agencia);
    console.log(this.fecha);
    console.log(this.observaciones);
    console.log(this.tipo);
    console.log(this.geoLat);
    console.log(this.geoLong);
    console.log(this.image);
    console.log(this.productInstalacion);
    console.log(this.productMantenimiento);
    console.log(this.productRetiro);
    console.log(this.typeRetirement);
  }
  Finalizado() {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Guardando Solicitud..."
    });
    loading.present();
    this.person = {
      type: this.tipo,
      agents_id: this.agente,
      agencia: this.agencia,
      productInstalacion: this.productInstalacion,
      productMantenimiento: this.productMantenimiento,
      productRetiro: this.productRetiro,
      typeRetirement: this.typeRetirement,
      fecha: this.fecha,
      fechafinal: this.fecha,
      geoLat: this.geoLat,
      geoLong: this.geoLong,
      observaciones: this.observaciones,
      state: 0,
      images: this.image
    };
    this.api.post("alert", this.person).then(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            const alert = this.alertCtrl.create({
              title: "Solicitud Creada",
              subTitle: "Verifica el historial para saber su estado.",
              buttons: ["Ok"]
            });
            alert.present();
            this.navCtrl.setRoot(HomePage);
          }
        } else {
          this.isenabled = true;
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
}
