import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  LoadingController,
  AlertController,
  Platform,
  ToastController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { CallStep_1Page } from "../call-step-1/call-step-1";
import { ListPage } from "../list/list";
import * as moment from 'moment';
/**
 * Generated class for the CallStep_3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-step-3',
  templateUrl: 'call-step-3.html',
})
export class CallStep_3Page {
  public scannedText: string;
  public buttonText: string;
  public phone:any="";
  public agents:any="";
  public data:any=null;
  public info:any=null;
  public datestart:any="";
  public dateend:any="";
  public body:any="";
  classIcon: any;
  qty: any = 0;
  public loading: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public api: ApiProvider, 
    private alertCtrl: AlertController,
    public loadingController: LoadingController) {
		this.agents = navParams.get("agents");
		this.phone = navParams.get("phone");
		this.datestart = moment().format('MMMM Do YYYY, h:mm:ss a');
		this.data = navParams.get("data");
  }
 
 
 
  ionViewDidLoad() {
    this.buttonText = "Llamar";
    this.loading = false;
    this.classIcon = "fa fa-phone";
	
	console.log('Antes '+ this.data);
	if(this.data!=null){
		console.log('No es null '+ this.data);
		this.agents = this.data.agents;
		this.qty = 1;
		this.buttonText = "Colgar";
	}
		
  }
  colgar(){
	 if(this.qty==0){
		this.CallInitial();
		window.open('tel:'+this.phone, '_blank');
		this.buttonText = "Colgar";
	 }
	if(this.qty==1){
		this.dateend = moment().format('MMMM Do YYYY, h:mm:ss a');
		const prompt = this.alertCtrl.create({
		  title: "Estado de Llamada.",
		  buttons: [
			{
			  text: "No Exitosa",
			  handler: data => {
				this.CallEnd(0);
			  }
			},
			{
			  text: "Exitosa",
			  handler: data => {
				this.CallEnd(1);
			  }
			}
		  ]
		});
		prompt.present();
	 }
	 this.qty=1;
  }
  CallInitial() {
    console.log("Entro a Call Inicial");
    this.body = {
      agents: this.agents,
      phone: this.phone,
      datestart: this.datestart,
      status: 1
    };
    this.api.post("call-app", this.body).then(
      jwt => {
        if (jwt) {
          this.info = jwt;
          this.info = this.info.response;
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log('Error conexión');
      }
    );
  }
  CallEnd(numbe) {
	console.log("Entro a realizar");
    this.body = {
      agents: this.agents,
      dateend: this.dateend,
      status: 0,
      visit: numbe,
    };
    this.api.post("call-app", this.body).then(
      jwt => {
        if (jwt) {
          this.info = jwt;
          this.info = this.info.response;
          	const alert = this.alertCtrl.create({
			title: "Guardado, Gracias!",
			buttons: ["Llamada 360"]
			});
		  alert.present();
		this.navCtrl.setRoot(CallStep_1Page);
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log('Error conexión');
      }
    );
  }
}
