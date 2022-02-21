import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Storage } from "@ionic/storage";
import { HistorialPage } from "../historial/historial";
import { TransaccionPage } from "../transaccion/transaccion";
import { ChartHistorialPage } from "../chart-historial/chart-historial";
import { PermisosPage } from "../permisos/permisos";
/**
 * Generated class for the HistorialModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-historial-modal",
  templateUrl: "historial-modal.html"
})
export class HistorialModalPage {
  data: any;
  roles: any;
  dataform: any;
  isenabled: boolean = true;
  response: any;
  observacionestwo: any;
  observacionesthree: any;
  private mantenimiento: any[] = [
    'Rompetrafico',
    'Mostrador',
    'Colgante Horario',
    'Pasavuelto',
    'Sticker largo',
    'Sticker POS',
    'Sticker Exije tu vaucher',
    'Banner',
    'Banner + Parante',
    'Credencial',
    'Panel de Metal',
    'Letrero Luminoso',
    'Rompetrafico Ornamental',
    'Juejo De Letras Block',
    'Otros'
  ];
  private instalacion: any[] = [
    'Rompetrafico',
    'Mostrador',
    'Colgante Horario',
    'Pasavuelto',
    'Sticker largo',
    'Sticker POS',
    'Sticker Exije tu vaucher',
    'Banner',
    'Banner + Parante',
    'Credencial',
    'Panel de Metal',
    'Letrero Luminoso',
    'Letrero Bastidor',
    'Rompetrafico Ornamental',
    'Juejo De Letras Block',
    'Otros'
  ]
  private letrero: any[] = [
    'Letrero Luminoso  1.00 x 1.00 UC',
    'Letrero luminoso 1.00 x 1.00 DC',
    'Letrero Luminoso 0.80 x 0.80 UC',
    'Letreto Luminoso 0.80 x 0.80 DC',
    'Letrero Luminoso 0.70 x 0.70 UC',
    'Letreto Luminoso 0.70 x 0.70 DC',
    'Letrero Luminoso 0.50 x 0.50 UC',
    'Letreto Luminoso 0.50 x 0.50 DC',
    'Letrero Luminoso 1.00 x 0.40 UC',
    'Letrero Luminoso 1.00 x 0.40 DC',
    'Letrero Led 1.00 x 0.40 UC',
    'Letrero Led 0.40 x 0.40 DC',
    'Llave Luminosa Acrilica'
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    private readonly storage: Storage,
    private alertCtrl: AlertController,
    public loadingController: LoadingController
  ) {
    this.data = navParams.get("data");
    this.observacionestwo = this.data.observacionestwo;
    this.observacionesthree = this.data.observacionesthree;
    console.log(this.data);

  }
  ionViewWillEnter() {
    this.storage.get("roles").then(val => {
      this.roles = val;
      console.log(this.roles);
    });

  }
  showMantenimiento(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione los productos que requieran mantenimiento");
    var array = [];
    for (var i = 0; i < this.mantenimiento.length; i++) {
      var igual = false;
      for (var j = 0; j < this.data.productMantenimiento.length && !igual; j++) {
        if (this.mantenimiento[i] == this.data.productMantenimiento[j])
          igual = true;
      }
      if (!igual) array.push(this.mantenimiento[i]);
    }
    for (var x = 0; x < this.data.productMantenimiento.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: this.data.productMantenimiento[x],
        value: this.data.productMantenimiento[x],
        checked: true
      });
    }
    for (var x = 0; x < array.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: array[x],
        value: array[x]
      });
    }
    alert.addButton("Cerrar");
    alert.addButton({
      text: "Modificar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.data.productMantenimiento = data;
        this.saveinforme(id, null);
      }
    });
    alert.present();
  }
  showInstalacion(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione los productos que requieran instalación");
    var array = [];
    for (var i = 0; i < this.instalacion.length; i++) {
      var igual = false;
      for (var j = 0; j < this.data.productInstalacion.length && !igual; j++) {
        if (this.instalacion[i] == this.data.productInstalacion[j])
          igual = true;
      }
      if (!igual) array.push(this.instalacion[i]);
    }
    for (var x = 0; x < this.data.productInstalacion.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: this.data.productInstalacion[x],
        value: this.data.productInstalacion[x],
        checked: true
      });
    }
    for (var x = 0; x < array.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: array[x],
        value: array[x]
      });
    }

    alert.addButton("Cerrar");
    alert.addButton({
      text: "Modificar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.data.productInstalacion = data;
        this.saveinforme(id, null);
      }
    });
    alert.present();
  }
  showProductRetiro(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione los productos a reubicar");
    var array = [];
    for (var i = 0; i < this.instalacion.length; i++) {
      var igual = false;
      for (var j = 0; j < this.data.productRetiro.length && !igual; j++) {
        if (this.instalacion[i] == this.data.productRetiro[j])
          igual = true;
      }
      if (!igual) array.push(this.instalacion[i]);
    }
    for (var x = 0; x < this.data.productRetiro.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: this.data.productRetiro[x],
        value: this.data.productRetiro[x],
        checked: true
      });
    }
    for (var x = 0; x < array.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: array[x],
        value: array[x]
      });
    }
    alert.addButton("Cerrar");
    alert.addButton({
      text: "Cambiar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.data.productRetiro = data;
        this.saveinforme(id, null);
      }
    });
    alert.present();
  }
  showRetiro(id) {
    let prompt = this.alertCtrl.create({
      title: "Que tipo de Retiro",
      inputs: [
        {
          type: "radio",
          label: "Retiro total",
          value: "Retiro total"
        },
        {
          type: "radio",
          label: "Reubicación",
          value: "Reubicación"
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
          text: "Cambiar",
          handler: data => {
            console.log("radio  data:", data);
            this.data.typeRetirement = data;
            this.saveinforme(id, null);
          }
        }
      ]
    });
    prompt.present();
  }
  Rechazar(id) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Rechazando Solicitud"
    });
    loading.present();
    this.api.get("rechazar/" + id).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            this.navCtrl.setRoot(HistorialPage);
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
  PreAprobar(id) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Pre-Aprobando Solicitud"
    });
    loading.present();
    this.api.get("preaprobar/" + id).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            this.navCtrl.setRoot(HistorialPage);
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
  Aprobar(id) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Aprobando Solicitud"
    });
    loading.present();
    this.api.get("aprobar/" + id).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            this.navCtrl.setRoot(HistorialPage);
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
  completar(id) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Completando Solicitud"
    });
    loading.present();
    this.api.get("completar/" + id).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            this.navCtrl.setRoot(HistorialPage);
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
  redireccionar(id) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Guardando Cambios.."
    });
    let body = {
      id: id,
      atm: 1
    };
    loading.present();
    this.api.put("alert/" + id, body).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            const alert = this.alertCtrl.create({
              subTitle:
                "La Solicitud fue redireccionada Exitosamente",
              buttons: ["Ok"]
            });
            alert.present();
            // this.navCtrl.push(HistorialPage);
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

  saveinforme(id, date) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Guardando Cambios.."
    });
    let body = {
      id: id,
      fechaentrega: date,
      productInstalacion: this.data.productInstalacion,
      productMantenimiento: this.data.productMantenimiento,
      typeRetirement: this.data.typeRetirement,
      productRetiro: this.data.productRetiro
    };
    loading.present();
    this.api.put("alert/" + id, body).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            // this.navCtrl.push(HistorialPage);
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
  saveobservacionestwo(id) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Guardando Información"
    });
    let body = {
      id: id,
      observacionestwo: this.observacionestwo
    };
    loading.present();
    this.api.put("alert/" + id, body).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
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
  saveobservacionesthree(id) {
    this.isenabled = false;
    let loading = this.loadingController.create({
      content: "Guardando Información"
    });
    let body = {
      id: id,
      observacionesthree: this.observacionesthree
    };
    loading.present();
    this.api.put("alert/" + id, body).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
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
  fechafinal(id) {
    const prompt = this.alertCtrl.create({
      title: "Fecha",
      message: "Seleccionar nueva fecha",
      inputs: [
        {
          type: "date",
          name: "fechaentrega",
          placeholder: ""
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
          text: "Guardar",
          handler: data => {
            console.log(data.fechaentrega);
            this.saveinforme(id, data.fechaentrega);

            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
  addLetreroInstalacion(id) {
    console.log('Entro a Letrero Instalacion')
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione el modelo de letrero luminoso");
    var array = [];
    for (var i = 0; i < this.letrero.length; i++) {
      var igual = false;
      for (var j = 0; j < this.data.productInstalacion.length && !igual; j++) {
        if (this.instalacion[i] == this.data.productInstalacion[j])
          igual = true;
      }
      if (!igual) array.push(this.letrero[i]);
    }
    for (var x = 0; x < this.data.productInstalacion.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: this.data.productInstalacion[x],
        value: this.data.productInstalacion[x],
        checked: true
      });
    }
    for (var x = 0; x < array.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: array[x],
        value: array[x]
      });
    }
    alert.addButton("Cerrar");
    alert.addButton({
      text: "Modificar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.data.productInstalacion = data;
        this.saveinforme(id, null);
      }
    });
    alert.present();
  }
  addLetreroMantto(id) {
    console.log('Entro a Letrero Instalacion')
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccione el modelo de letrero luminoso");
    var array = [];
    for (var i = 0; i < this.letrero.length; i++) {
      var igual = false;
      for (var j = 0; j < this.data.productMantenimiento.length && !igual; j++) {
        if (this.instalacion[i] == this.data.productMantenimiento[j])
          igual = true;
      }
      if (!igual) array.push(this.letrero[i]);
    }
    for (var x = 0; x < this.data.productMantenimiento.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: this.data.productMantenimiento[x],
        value: this.data.productMantenimiento[x],
        checked: true
      });
    }
    for (var x = 0; x < array.length; x++) {
      alert.addInput({
        type: "checkbox",
        label: array[x],
        value: array[x]
      });
    }
    alert.addButton("Cerrar");
    alert.addButton({
      text: "Modificar",
      handler: data => {
        console.log("Checkbox data:", data);
        this.data.productMantenimiento = data;
        this.saveinforme(id, null);
      }
    });
    alert.present();
  }
  goToTransaccion(params) {
    if (!params) params = {};
    this.navCtrl.push(TransaccionPage, {
      agents: params
    });
  }

  goToChatHistorial(params) {
    if (!params) params = {};
    this.navCtrl.push(ChartHistorialPage, {
      agents: params
    });
  }
  goToPermisos(params) {
    if (!params) params = {};
    this.navCtrl.push(PermisosPage, {
      agents: params
    });
  }
}
