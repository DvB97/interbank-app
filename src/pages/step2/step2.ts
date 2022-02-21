import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { Step3Page } from "../step3/step3";
/**
 * Generated class for the Step2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-step2",
  templateUrl: "step2.html"
})
export class Step2Page {
  agente: any;
  agencia: any;
  iduser: any;
  geoLat: any;
  geoLong: any;
  observaciones: any;
  estado: any;
  fecha: any;
  tipo: any;
  testCheckboxOpen: any;
  productMantenimiento: any;
  productInstalacion: any;
  productRetiro: any;
  typeRetirement: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.agencia = navParams.get("agencia");
    this.agente = navParams.get("agente");
    this.geoLat = navParams.get("geoLat");
    this.geoLong = navParams.get("geoLong");
  }

  ionViewDidLoad() {
    console.log(this.agente);
    console.log(this.geoLat);
    console.log(this.geoLong);
    console.log(this.fecha);
    console.log(this.agencia);
  }
  showRetiro() {
    let prompt = this.alertCtrl.create({
      title: "Que tipo de Retiro",
      inputs: [
        {
          type: "radio",
          label: "RETIRO TOTAL",
          value: "RETIRO TOTAL"
        },
        {
          type: "radio",
          label: "REUBICACIÓN",
          value: "REUBICACION"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: "Agregar",
          handler: data => {
            console.log("radio  data:", data);
            this.typeRetirement = data;
          }
        }
      ]
    });
    prompt.present();
  }
  showMantenimiento() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione los productos que requieran mantenimiento");
    alert.addInput({
      type: "checkbox",
      label: "Rompetrafico",
      value: "Rompetrafico"
    });
    alert.addInput({
      type: "checkbox",
      label: "Mostrador",
      value: "Mostrador"
    });
    alert.addInput({
      type: "checkbox",
      label: "Colgante Horario",
      value: "Colgante Horario"
    });
    alert.addInput({
      type: "checkbox",
      label: "Pasavuelto",
      value: "Pasavuelto"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker largo",
      value: "Sticker largo"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker POS",
      value: "Sticker POS"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker Exije tu vaucher",
      value: "Sticker Exije tu vaucher"
    });
    alert.addInput({
      type: "checkbox",
      label: "Banner",
      value: "Banner"
    });
    alert.addInput({
      type: "checkbox",
      label: "Banner + Parante",
      value: "Banner + Parante"
    });
    alert.addInput({
      type: "checkbox",
      label: "Credencial",
      value: "Credencial"
    });
    alert.addInput({
      type: "checkbox",
      label: "Panel de Metal",
      value: "Panel de Metal"
    });
    alert.addInput({
      type: "checkbox",
      label: "Credencial",
      value: "Credencial"
    });
    alert.addInput({
      type: "checkbox",
      label: "Panel de Metal",
      value: "Panel de Metal"
    });
    alert.addInput({
      type: "checkbox",
      label: "Letrero Luminoso",
      value: "Letrero Luminoso"
    });
    alert.addInput({
      type: "checkbox",
      label: "Rompetrafico Ornamental",
      value: "Rompetrafico Ornamental"
    });
    alert.addInput({
      type: "checkbox",
      label: "Juejo De Letras Block",
      value: "Juejo De Letras Block"
    });
    alert.addInput({
      type: "checkbox",
      label: "Otros",
      value: "Otros"
    });
    alert.addButton("Cerrar");
    alert.addButton({
      text: "Agregar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.testCheckboxOpen = false;
        this.productMantenimiento = data;
      }
    });
    alert.present();
  }

  showInstalacion() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione los productos que requieran instalación");
    alert.addInput({
      type: "checkbox",
      label: "Rompetrafico",
      value: "Rompetrafico"
    });
    alert.addInput({
      type: "checkbox",
      label: "Mostrador",
      value: "Mostrador"
    });
    alert.addInput({
      type: "checkbox",
      label: "Colgante Horario",
      value: "Colgante Horario"
    });
    alert.addInput({
      type: "checkbox",
      label: "Pasavuelto",
      value: "Pasavuelto"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker largo",
      value: "Sticker largo"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker POS",
      value: "Sticker POS"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker Exije tu vaucher",
      value: "Sticker Exije tu vaucher"
    });
    alert.addInput({
      type: "checkbox",
      label: "Banner",
      value: "Banner"
    });
    alert.addInput({
      type: "checkbox",
      label: "Banner + Parante",
      value: "Banner + Parante"
    });
    alert.addInput({
      type: "checkbox",
      label: "Credencial",
      value: "Credencial"
    });
    alert.addInput({
      type: "checkbox",
      label: "Panel de Metal",
      value: "Panel de Metal"
    });
    alert.addInput({
      type: "checkbox",
      label: "Credencial",
      value: "Credencial"
    });
    alert.addInput({
      type: "checkbox",
      label: "Panel de Metal",
      value: "Panel de Metal"
    });
    alert.addInput({
      type: "checkbox",
      label: "Letrero Luminoso",
      value: "Letrero Luminoso"
    });
    alert.addInput({
      type: "checkbox",
      label: "Letrero Bastidor",
      value: "Letrero Bastidor"
    });
    alert.addInput({
      type: "checkbox",
      label: "Rompetrafico Ornamental",
      value: "Rompetrafico Ornamental"
    });
    alert.addInput({
      type: "checkbox",
      label: "Juejo De Letras Block",
      value: "Juejo De Letras Block"
    });
    alert.addInput({
      type: "checkbox",
      label: "Otros",
      value: "Otros"
    });
    alert.addButton("Cerrar");
    alert.addButton({
      text: "Agregar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.testCheckboxOpen = false;
        this.productInstalacion = data;
      }
    });
    alert.present();
  }
  showProductRetiro(){
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione los productos a reubicar");
    alert.addInput({
      type: "checkbox",
      label: "Rompetrafico",
      value: "Rompetrafico"
    });
    alert.addInput({
      type: "checkbox",
      label: "Mostrador",
      value: "Mostrador"
    });
    alert.addInput({
      type: "checkbox",
      label: "Colgante Horario",
      value: "Colgante Horario"
    });
    alert.addInput({
      type: "checkbox",
      label: "Pasavuelto",
      value: "Pasavuelto"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker largo",
      value: "Sticker largo"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker POS",
      value: "Sticker POS"
    });
    alert.addInput({
      type: "checkbox",
      label: "Sticker Exije tu vaucher",
      value: "Sticker Exije tu vaucher"
    });
    alert.addInput({
      type: "checkbox",
      label: "Banner",
      value: "Banner"
    });
    alert.addInput({
      type: "checkbox",
      label: "Banner + Parante",
      value: "Banner + Parante"
    });
    alert.addInput({
      type: "checkbox",
      label: "Credencial",
      value: "Credencial"
    });
    alert.addInput({
      type: "checkbox",
      label: "Panel de Metal",
      value: "Panel de Metal"
    });
    alert.addInput({
      type: "checkbox",
      label: "Credencial",
      value: "Credencial"
    });
    alert.addInput({
      type: "checkbox",
      label: "Panel de Metal",
      value: "Panel de Metal"
    });
    alert.addInput({
      type: "checkbox",
      label: "Letrero Luminoso",
      value: "Letrero Luminoso"
    });
    alert.addInput({
      type: "checkbox",
      label: "Letrero Bastidor",
      value: "Letrero Bastidor"
    });
    alert.addInput({
      type: "checkbox",
      label: "Rompetrafico Ornamental",
      value: "Rompetrafico Ornamental"
    });
    alert.addInput({
      type: "checkbox",
      label: "Juejo De Letras Block",
      value: "Juejo De Letras Block"
    });
    alert.addInput({
      type: "checkbox",
      label: "Otros",
      value: "Otros"
    });
    alert.addButton("Cerrar");
    alert.addButton({
      text: "Agregar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.testCheckboxOpen = false;
        this.productRetiro = data;
      }
    });
    alert.present();
  }
  gotoStepto3(params) {
    this.navCtrl.push(Step3Page, {
      fecha: this.fecha,
      agencia: this.agencia,
      geoLong: this.geoLong,
      geoLat: this.geoLat,
      agente: this.agente,
      productInstalacion: this.productInstalacion,
      productMantenimiento: this.productMantenimiento,
      productRetiro: this.productRetiro,
      typeRetirement: this.typeRetirement,
      tipo: "Observaciones",
      observaciones: this.observaciones
    });
  }
}
