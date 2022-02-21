import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { CallStep_2Page } from "../call-step-2/call-step-2";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-call-step-1',
  templateUrl: 'call-step-1.html',
})
export class CallStep_1Page {

  overlayHidden: boolean = true;
  list: any;
  questiontwo: boolean = false;
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
  ionViewDidLoad(){
	this.goInformation();
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
          this.questiontwo = this.list.data.questiontwo;
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
  
  public hideOverlay() {
    if (this.overlayHidden == true) {
      this.overlayHidden = false;
    } else {
      this.overlayHidden = true;
    }
  }
  goToDetalle(item) {
	  console.log(item)
    this.navCtrl.push(CallStep_2Page, {
		agents: item.agents,
	});
  }
	goInformation(){
		const prompt = this.alertCtrl.create({
		  title: "Llamada 360",
		  message: "Bienvenido al sistema 360, debes iniciar sesión en la web 360 y seleccionar el agente que deseas llamar para sincronizar con el sitio movil",
		  buttons: [
			{
			  text: "Cerrar",
			  handler: data => {
				console.log("Cancel clicked");
			  }
			},
			{
			  text: "Entendido",
			  handler: data => {
				//this.cargar();
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
  filterStatus(status) {
    console.log(status)
    this.list = this.listDefault;
    let pilot = this.list.filter(function (pilot) {
      return pilot.visit_status === status;
    });
    this.list = pilot;
  }
}
