import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { CallStep_3Page } from "../call-step-3/call-step-3";

@IonicPage()
@Component({
  selector: 'page-call-step-2',
  templateUrl: 'call-step-2.html',
})
export class CallStep_2Page {
 overlayHidden: boolean = true;
  listaContactos:any[]=[];
  phone:any="";
  agents:any="";
  avatar:string="https://i0.pngocean.com/files/906/222/368/computer-icons-user-profile-avatar-french-people.jpg";
  constructor(public navCtrl: NavController, private contacts:Contacts,  public navParams: NavParams, public alertCtrl: AlertController) {
	this.agents = navParams.get("agents");
    this.cargarListaContactos();
  }
  ionViewDidLoad(){
	this.goInformation();
  }
 getItems(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.listaContactos = this.listaContactos.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  cargarListaContactos(){
    this.contacts.find(["*"])
    .then(res => {
      console.log({funcion:'CargarListaContactos',res:res})
      let datosMostar:any[]=[];
      res.map((item) =>{
        if(item.displayName != null && item.photos != null && item.phoneNumbers != null){
          datosMostar.push({displayName:item.displayName,photos:[{value:this.avatar}],phoneNumbers:item.phoneNumbers})
        }        
      })
      console.log({funcion:'CargarListaContactos',datosMostar:datosMostar})
      this.listaContactos = datosMostar;
    },error => {
      console.log({error:error})
    })
  }
	goInformation(){
		const prompt = this.alertCtrl.create({
		  title: "Vincular Contacto",
		  message: "Selecciona el número telefonico del agente para proceder a realizar la llamada, o utiliza la herramienta lapiz para escribirlo",
		  buttons: [
			{
			  text: "Cerrar",
			  handler: data => {
				console.log("Cancel clicked");
			  }
			},
			{
			  text: "Vincular",
			  handler: data => {
				//this.cargar();
				console.log('vincular');
			  }
			}
		  ]
		});
		prompt.present();
	}	
	
	
	goToWriter() {
		const prompt = this.alertCtrl.create({
		  title: "Número telefonico",
		  message: "Escribe el número telefonico del agente",
		  inputs: [
			{
			  name: "numero",
			  placeholder: "922 655 123"
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
			  text: "Llamar",
			  handler: data => {
				this.phone = data.numero
				this.goToClick(this.phone);
			  }
			}
		  ]
		});
		prompt.present();
	}
	
	goToClick(item){
		console.log(item)
		console.log(this.agents)
		this.navCtrl.push(CallStep_3Page, {
			agents: this.agents,
			phone: item
		});
	}	
  public hideOverlay() {
    if (this.overlayHidden == true) {
      this.overlayHidden = false;
    } else {
      this.overlayHidden = true;
    }
  }
	
}
