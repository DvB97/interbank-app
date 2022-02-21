import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
/**
 * Generated class for the NotepadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notepad",
  templateUrl: "notepad.html"
})
export class NotepadPage {
  loading: any;
  barChart: any;
  agents: any;
  store: any;
  edit: boolean = false;
  list: any;
  body: any;
  text: any;
  textViejo: any;
  data: any;
  id: any;
  textOrginal:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    public loadingController: LoadingController
  ) {
    this.agents = navParams.get("agents");
    this.store = navParams.get("store");
    this.edit = navParams.get("edit");
    this.id = navParams.get("id");
    this.cargar();
    console.log('agente: ' + this.agents);
    console.log('store: ' + this.store);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotepadPage");
  }
  ionViewWillUnload() {
    if (!this.edit) {
      this.Realizar();
    }else{
      console.log('Textooriginal')
      if(this.textOrginal!=this.text){
        this.Update();
      }
    }
  }
  cargar() {
    if (this.edit == true) {
      this.Get();
    }
  }
  Realizar() {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.body = {
      agents_id: this.agents,
      store_id: this.store,
      text: this.text
    };
    this.api.post("note", this.body).then(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.data = jwt;
          this.data = this.data.response;
          const alert = this.alertCtrl.create({
            title: "Guardado"
          });
          alert.present();
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
  Update() {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.body = {
      text: this.text
    };
    this.api.put("note/"+this.agents, this.body).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.data = jwt;
          this.data = this.data.response;
          const alert = this.alertCtrl.create({
            title: "Guardado"
          });
          alert.present();
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
  Get() {
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.get("note/" + this.id).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.data = jwt;
          this.agents = this.data.data.id;
          this.text = this.data.data.text;
          this.textOrginal = this.data.data.text;
          this.edit = true;
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
}
