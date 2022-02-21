import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { DetallePage } from "../detalle/detalle";
import { StepmapPage } from "../stepmap/stepmap";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
/**
 * Generated class for the SearchAgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-search-agent",
  templateUrl: "search-agent.html"
})
export class SearchAgentPage {
  classIcon: any;
  public loading: boolean;
  public buttonText: string;
  overlayHidden: boolean = true;
  mueble: any;
  geoLat: any;
  geoLong: any;
  codeBar: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    public api: ApiProvider,
    public loadingController: LoadingController,
    private _barcodeScanner: BarcodeScanner
  ) { }
  
  ionViewDidLoad() {
    this.buttonText = "Scan";
    this.loading = false;
    this.classIcon = "fa fa-qrcode";
    this.getPosition();
  }
  searchMapa() {
    console.log("Entro");
    this.navCtrl.push(StepmapPage);
  }
  
  loadMap(position: Geoposition) {
    console.log("Entro a loadMap");
    this.geoLat = position.coords.latitude;
    this.geoLong = position.coords.longitude;
    console.log(this.geoLat)
    console.log(this.geoLong)
  }
  getPosition(): any {
    this.geolocation
      .getCurrentPosition()
      .then(response => {
        this.loadMap(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  scanQR() {
    this.buttonText = "Cargando..";
    this.loading = true;
    this.classIcon = "fas fa-spinner fa-spin";
    this._barcodeScanner.scan().then(
      barcodeData => {
        if (barcodeData.cancelled) {
          console.log("Usuario cancelo scaneo.");
          this.buttonText = "Scan";
          this.loading = false;
          return false;
        }
        this.codeBar = barcodeData.text;
        console.log("Scaneo Exitoso.!");
        console.log(barcodeData.text);
        this.RealizarQR( this.codeBar );
      },
      err => {
        this.buttonText = "Scan";
        this.loading = false;
        this.classIcon = "fa fa-qrcode";
        console.log(err);
      }
    );
  }
  RealizarQR(code) {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api
      .get(
        "mapqr?codigo=" +
        code +
        "&geoLat=" +
        this.geoLat +
        "&geoLong=" +
        this.geoLong +
        "&visit=1"
      )
      .subscribe(
        jwt => {
          loading.dismiss();
          if (jwt) {
            this.mueble = jwt;
            if (this.mueble.status == false) {
              let alert = this.alertCtrl.create({
                subTitle: this.mueble.msg,
                buttons: ["Verificar"]
              });
              alert.present();
            } else {
              this.mueble = this.mueble.data;
              let alert = this.alertCtrl.create({
                title: "Confirmación de Identificador",
                message:
                  "<p> El Identificador seleccionado corresponde al </p>" +
                  "<p>" +
                  this.mueble.name +
                  "</p>" +
                  "<p> Identificador: " +
                  this.mueble.agents +
                  "</p>" +
                  "<p> Tipo: " +
                  this.mueble.type +
                  "</p>" +
                  "<ul>" +
                  "<li>" +
                  this.mueble.district +
                  "</li>" +
                  "<li>" +
                  this.mueble.province +
                  "</li>" +
                  "<li>" +
                  this.mueble.department +
                  "</li>" +
                  "</ul>",
                buttons: [
                  {
                    text: "No",
                    role: "cancel",
                    handler: () => {
                      this.buttonText = "Scan";
                      this.loading = false;
                      this.classIcon = "fa fa-qrcode";
                    }
                  },
                  {
                    text: "Si",
                    handler: () => {
                      this.navCtrl.push(DetallePage, {
                        data: this.mueble
                      });
                    }
                  }
                ]
              });
              alert.present();
            }
          } else {
            console.log("Error de Conexion");
            this.buttonText = "Scan";
            this.loading = false;
            this.classIcon = "fa fa-qrcode";
          }
        },
        err => {
          loading.dismiss();
          this.buttonText = "Scan";
          this.loading = false;
          this.classIcon = "fa fa-qrcode";
        }
      );
  }
  searchMueble() {
    const prompt = this.alertCtrl.create({
      title: "Identificador del Agente ",
      message:
        "Escribe el Identificador del Agente  Ejemplo:  6249",
      inputs: [
        {
          name: "code",
          placeholder: "I0001132"
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
          text: "Buscar",
          handler: data => {
            console.log(data.tipo);
            console.log(data.code);
            this.RealizarWrite(data.code);
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
  RealizarWrite(code) {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api
      .get(
        "mapwrite?codigo=" +
        code +
        "&geoLat=" +
        this.geoLat +
        "&geoLong=" +
        this.geoLong +
        "&visit=1"
      )
      .subscribe(
        jwt => {
          loading.dismiss();
          if (jwt) {
            this.mueble = jwt;
            if (this.mueble.status == false) {
              let alert = this.alertCtrl.create({
                subTitle: this.mueble.msg,
                buttons: ["Verificar"]
              });
              alert.present();
            } else {
              this.mueble = this.mueble.data;
              let alert = this.alertCtrl.create({
                title: "Confirmación de Identificador",
                message:
                  "<p> El Identificador seleccionado corresponde al </p>" +
                  "<p>" +
                  this.mueble.name +
                  "</p>" +
                  "<p> Identificador: " +
                  this.mueble.agents +
                  "</p>" +
                  "<p> Tipo: " +
                  this.mueble.type +
                  "</p>" +
                  "<ul>" +
                  "<li>" +
                  this.mueble.district +
                  "</li>" +
                  "<li>" +
                  this.mueble.province +
                  "</li>" +
                  "<li>" +
                  this.mueble.department +
                  "</li>" +
                  "</ul>",
                buttons: [
                  {
                    text: "No",
                    role: "cancel",
                    handler: () => {
                      this.buttonText = "Scan";
                      this.loading = false;
                      this.classIcon = "fa fa-qrcode";
                    }
                  },
                  {
                    text: "Si",
                    handler: () => {
                      this.navCtrl.push(DetallePage, {
                        data: this.mueble
                      });
                    }
                  }
                ]
              });
              alert.present();
            }
          } else {
            console.log("Error de Conexion");
            this.buttonText = "Scan";
            this.loading = false;
            this.classIcon = "fa fa-qrcode";
          }
        },
        err => {
          loading.dismiss();
          this.buttonText = "Scan";
          this.loading = false;
          this.classIcon = "fa fa-qrcode";
        }
      );
  }

  searchName() {
    const prompt = this.alertCtrl.create({
      title: "Identificador del Agente ",
      message: "Escribe el Nombre del Agente  Ejemplo:  Bodega Don Rafa",
      inputs: [
        {
          name: "code",
          placeholder: "Don Rafa"
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
          text: "Buscar",
          handler: data => {
            console.log(data.tipo);
            console.log(data.code);
            this.RealizarName(data.code);
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
  RealizarName(code) {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api
      .get(
        "mapname?codigo=" +
        code +
        "&geoLat=" +
        this.geoLat +
        "&geoLong=" +
        this.geoLong +
        "&visit=1"
      )
      .subscribe(
        jwt => {
          loading.dismiss();
          if (jwt) {
            this.mueble = jwt;
            if (this.mueble.status == false) {
              let alert = this.alertCtrl.create({
                subTitle: this.mueble.msg,
                buttons: ["Verificar"]
              });
              alert.present();
              /*  } else if (this.mueble.distance == null) {
                  let alert = this.alertCtrl.create({
                    subTitle: "Fuera de rango, debes aproximarte al agente",
                    buttons: ["Ok"]
                  });
                  alert.present();*/
            } else {
              this.mueble = this.mueble.data;
              let alert = this.alertCtrl.create({
                title: "Confirmación de Identificador",
                message:
                  "<p> El Identificador seleccionado corresponde al </p>" +
                  "<p>" +
                  this.mueble.name +
                  "</p>" +
                  "<p> Identificador: " +
                  this.mueble.agents +
                  "</p>" +
                  "<p> Tipo: " +
                  this.mueble.type +
                  "</p>" +
                  "<ul>" +
                  "<li>" +
                  this.mueble.district +
                  "</li>" +
                  "<li>" +
                  this.mueble.province +
                  "</li>" +
                  "<li>" +
                  this.mueble.department +
                  "</li>" +
                  "</ul>",
                buttons: [
                  {
                    text: "No",
                    role: "cancel",
                    handler: () => {
                      this.loading = false;
                      this.classIcon = "fa fa-qrcode";
                    }
                  },
                  {
                    text: "Si",
                    handler: () => {
                      this.navCtrl.push(DetallePage, {
                        data: this.mueble
                      });
                    }
                  }
                ]
              });
              alert.present();
            }
          } else {
            console.log("Error de Conexion");
          }
        },
        err => {
          loading.dismiss();
          console.log(err);
        }
      );
  }
  public hideOverlay() {
    if (this.overlayHidden == true) {
      this.overlayHidden = false;
    } else {
      this.overlayHidden = true;
    }
  }
}
