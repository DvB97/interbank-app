import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, ToastController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { HistorialModalPage } from "../historial-modal/historial-modal";
import { ChatPage } from "../chat/chat";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-historial",
  templateUrl: "historial.html"
})
export class HistorialPage {
  overlayHidden: boolean = true;
  list: any;
  listDefault: any;
  users: any;
  name: any;
  tipo: any = "";
  sort: any = "ASC";
  datestart: any = "";
  cluster: any = "";
  loading: any;
  pending: any = 0;
  successful: any = 0;
  notsuccessful: any = 0;
  roles: any = 0;
  limit: any = 50;
  idagente: any = "";
  vegetativo:any="";
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private readonly storage: Storage,
    public api: ApiProvider,
    public loadingController: LoadingController,
    public navParams: NavParams
  ) { 
  }
  ionViewWillEnter() {
    this.storage.get("roles").then(val => {
      this.roles = val;
      console.log(this.roles)
    });

    this.cargar();
  }
  cargar() {
    this.loading = true;
    const toast = this.toastCtrl.create({
      message: 'Actualizando...',
      duration: 5000,
      position: "bottom"
    });
    toast.present();
    this.api.get("alert?tipo=" + this.tipo + "&datestart=" + this.datestart + "&idagente=" + this.idagente + "&vegetativo=" + this.vegetativo + "&name=" + this.name + "&users=" + this.users +  "&limit=" + this.limit).subscribe(
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
  public hideOverlay() {
    if (this.overlayHidden == true) {
      this.overlayHidden = false;
    } else {
      this.overlayHidden = true;
    }
  }

  filterCluster() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar Estado");
    alert.addInput({
      type: "radio",
      label: "Aprobado",
      value: "1"
    });
    alert.addInput({
      type: "radio",
      label: "Completado",
      value: "2"
    });
    alert.addInput({
      type: "radio",
      label: "Rechazado",
      value: "3"
    });
    alert.addInput({
      type: "radio",
      label: "En Curso",
      value: "4"
    });
    alert.addInput({
      type: "radio",
      label: "Pendiente",
      value: "5",
      checked: true
    });
    alert.addInput({
      type: "radio",
      label: "En curso vencidas",
      value: "6"
    });
    alert.addInput({
      type: "radio",
      label: "Pre Aprobado",
      value: "7"
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
        console.log("Checkbox data:", data);
        this.users = ""
        this.tipo = ""
        this.datestart = ""
        this.tipo = data;
        this.name=""
        this.cargar();
        // this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.present();
  }
  filterDate() {
    const prompt = this.alertCtrl.create({
      title: "Búsqueda",
      message: "Seleccione la fecha de Solicitud.",
      inputs: [
        {
          name: "fecha",
          placeholder: "Fecha de Solicitud",
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
            this.users = ""
            this.tipo = ""
            this.datestart = ""
            this.name=""
            this.datestart = data.fecha
            this.cargar();
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }

  filterEjecutive() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Seleccionar Ejecutivo");

    alert.addInput({
      type: "radio",
      label: "Alfredo Morales Chiabra",
      value: "5"
    });
    alert.addInput({
      type: "radio",
      label: "Ana Lucia Huaco Carnero",
      value: "14"
    });

    alert.addInput({
      type: "radio",
      label: "Araceli Padilla Llerena",
      value: "18"
    });

    alert.addInput({
      type: "radio",
      label: "Bruno  Apolaya Csirke ",
      value: "3",
      checked: true
    });

    alert.addInput({
      type: "radio",
      label: "Claudia Tarazona Martinez",
      value: "19"
    });

    alert.addInput({
      type: "radio",
      label: "David Gamarra Salas",
      value: "15"
    });

    alert.addInput({
      type: "radio",
      label: "Franco Fernandez Gutierrez",
      value: "8"
    });

    alert.addInput({
      type: "radio",
      label: "Guido Abraham Sotomayor Valderrama",
      value: "6"
    });
    alert.addInput({
      type: "radio",
      label: "Jackeline Solis Chavez",
      value: "4"
    });

    alert.addInput({
      type: "radio",
      label: "John David Pickman Medina",
      value: "16"
    });

    alert.addInput({
      type: "radio",
      label: "Jose Carlos Velasquez Peralta",
      value: "20"
    });
    alert.addInput({
      type: "radio",
      label: "Jose Manuel Romero Estrada",
      value: "7"
    });

    alert.addInput({
      type: "radio",
      label: "Juan Carlos Portocarrero Hurtado",
      value: "17"
    });

    alert.addInput({
      type: "radio",
      label: "Leonardo Navarrete Rossi",
      value: "13"
    });

    alert.addInput({
      type: "radio",
      label: "Lizandro Alvarez Guarniz",
      value: "12"
    });

    alert.addInput({
      type: "radio",
      label: "Martin Huamani Cabana",
      value: "10"
    });
    alert.addInput({
      type: "radio",
      label: "Ronald Cardenas Chiock",
      value: "9"
    });
    alert.addInput({
      type: "radio",
      label: "Nelida Shirley  Espinoza Diaz",
      value: "11"
    });

    alert.addInput({
      type: "radio",
      label: "Teofilo Lorenzo Vargas Valera",
      value: "21"
    });

    alert.addInput({
      type: "radio",
      label: "Leonardo Duarez",
      value: "30"
    });
    alert.addInput({
      type: "radio",
      label: "Gino Tori",
      value: "23"
    });
    alert.addInput({
      type: "radio",
      label: "Enrique Castillo",
      value: "2"
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
        console.log("Checkbox data:", data);
        this.users = ""
        this.tipo = ""
        this.datestart = ""
        this.name=""
        this.users = data;
        this.cargar();
        // this.testCheckboxOpen = false;
        //this.testCheckboxResult = data;
      }
    });
    alert.present();
  }
  filterId() {
    const prompt = this.alertCtrl.create({
      title: "Busqueda",
      message: "Ingrese el Identificador ( ID ) del agente",
      inputs: [
        {
          name: "nombre",
          placeholder: "3376"
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
            this.users = ""
            this.tipo = ""
            this.datestart = ""
            this.name=""
            this.name = ""
            this.idagente = data.nombre
            this.cargar();
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
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
            this.users = ""
            this.tipo = ""
            this.datestart = ""
            this.name=""
            this.name = data.nombre
            this.cargar();
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }
  filterVegatativo() {
    this.users = ""
    this.tipo = ""
    this.datestart = ""
    this.name=""
    this.vegetativo = 1
    this.cargar();
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
