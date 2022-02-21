import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController,
  Platform
} from "ionic-angular";
import { SearchAgentPage } from "../search-agent/search-agent";
import { Step1Page } from "../step1/step1";
import { HistorialPage } from "../historial/historial";
import { SuperejecutiveSearchPage } from "../superejecutive-search/superejecutive-search";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthProvider } from "../../providers/auth/auth";
import { UrlProvider } from "../../providers/url/url";
import { ApiProvider } from "../../providers/api/api";
import { Storage } from "@ionic/storage";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";

import { CallStep_1Page } from "../call-step-1/call-step-1";
import { CallStep_3Page } from "../call-step-3/call-step-3";

declare var google;
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  loading: any;
  id: any;
  dni: any;
  name: any;
  avatar: any;
  roles: any;
  role: number;
  decode: string;
  cargo: string;
  response: any;
  paso: boolean = false;
  change: boolean = false;
  list: any;
  pending: any;
  birthday: any;
  successful: any;
  successfultwo: any;
  pendingtwo: any;
  successfulEncuesta: any;
  pendingEncuesta: any;
  logs: any;
  total: number = 0;
  callProcess: any = "";
  callStatus: any = "";
  constructor(
    public navCtrl: NavController,
    public url: UrlProvider,
    public authProvider: AuthProvider,
    public api: ApiProvider,
    public jwtHelper: JwtHelperService,
    private readonly storage: Storage,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    public platform: Platform
  ) {
    this.comprobar();
	
  }
  comprobar() {
    this.authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        let data = jwt;
        data = JSON.parse(data);
        const decoded = this.jwtHelper.decodeToken(jwt);
        this.decode = decoded;
        this.id = decoded.iduser;
        this.roles = decoded.roles;
        this.name = decoded.name;
        this.dni = decoded.dni;
        this.birthday = decoded.dnbirthdayi;
        this.avatar = decoded.avatar;
        this.storage.set("id", decoded.iduser);
        this.storage.set("dni", decoded.dni);
        this.storage.set("register", decoded.register);
        this.storage.set("name", decoded.name);
        this.storage.set("phone", decoded.phone);
        this.storage.set("birthday", decoded.birthday);
        this.storage.set("roles", decoded.roles);
        this.storage.set("avatar", decoded.avatar);
        this.storage.set("token", data.token);
        console.log(this.birthday);
        console.log(this.avatar);
        this.cargar();
      } 
    },
      err => {
        console.log('Error en Authentificar Auth')
        this.authProvider.logout();
        this.storage.remove("jwt_token");
      });
  }
  getPosition(): any {
    this.diagnostic.isLocationEnabled().then((isEnabled) => {
      console.log(isEnabled);
      //  if (!isEnabled && this.platform.is('cordova')) {
      if (!isEnabled) {
        const alert = this.alertCtrl.create({
          message: "El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo",
          buttons: [
            {
              text: "Configuración",
              handler: () => {
                this.diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        alert.present();
      } else {
        this.geolocation
          .getCurrentPosition()
          .then(response => {
            this.loadMap(response);
          })
          .catch(error => {
            const alert = this.alertCtrl.create({
              subTitle: 'El GPS parece estar deshabilitado, Debe ir al panel de configuración para habilitarlo',
              buttons: ["Ok"]
            });
            alert.present();
          });
      }
    })
  }
  loadMap(position: Geoposition) {
    let data = {
      geoLat: position.coords.latitude,
      geoLong: position.coords.longitude
    };
    this.api.post("geosave", data).then(
      jwt => {
        if (jwt) {
          this.response = jwt;
          console.log('Posicion Guardada')
        } else {
          console.log("Error en Guardar");
        }
      },
      err => {
        console.log("Error de Conexion");
      }
    );
  }
  cargar() {
    /* this.storage.get("jwt_token").then(val => {
       this.decode = val;
       this.id = val.iduser;
       this.roles = val.roles;
       this.name = val.name;
       this.dni = val.dni;
     });
     this.storage.get("avatar").then(val => {
       this.avatar = val;
     });*/
    this.checkBar();
    this.checkCall();
    this.getPosition();
  }
  checkBar() {
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.get("agentstotal").subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.list = jwt;
          this.pending = this.list.data.pending;
          this.successful = this.list.data.successful;
		  this.pendingtwo = this.list.data.pendingtwo;
          this.successfultwo = this.list.data.successfultwo;
          this.pendingEncuesta = this.list.data.pendingEncuesta;
          this.successfulEncuesta = this.list.data.successfulEncuesta;
          this.total = ( this.list.data.successful * 100) / this.list.data.pending;
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
  
  
  checkCall() {
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.get("call-app").subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
			console.log(jwt)
			this.callProcess = jwt;
			this.callStatus = this.callProcess.response;
			this.callProcess = this.callProcess.data;
			console.log('Status' + this.callStatus);
			console.log('Info' + this.callProcess);
			
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
  goToCall(params) {
    if (!params) params = {};
	console.log(this.callStatus);
	console.log(this.callProcess);
	if(this.callStatus==true){
		this.navCtrl.push(CallStep_3Page, {
			data: this.callProcess
		});
	}else{
		this.navCtrl.push(CallStep_1Page);
	}
  }
  goToSearchEjecutivo(params) {
    if (!params) params = {};
    this.navCtrl.push(SuperejecutiveSearchPage);
  }
  goToList(params) {
    if (!params) params = {};
    this.navCtrl.push(SearchAgentPage);
  }
  goHistorial(params) {
    if (!params) params = {};
    this.navCtrl.push(HistorialPage);
  }
  stepTop(params) {
    if (!params) params = {};
    this.navCtrl.push(Step1Page);
  }
}
