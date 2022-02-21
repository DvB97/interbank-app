import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Storage } from "@ionic/storage";
import { Events, Content } from "ionic-angular";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-chat",
  templateUrl: "chat.html"
})
export class ChatPage {
  id_user: any;
  isenabled: boolean = true;
  data: any;
  iduser: any;
  response: any;
  info: any;
  item: any;
  message: any;
  receptor: any = "Usuario";
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingController: LoadingController,
    private events: Events,
    private readonly storage: Storage
  ) {
    this.item = navParams.get("item");
    console.log(this.item);
    this.storage.get("id").then(val => {
      this.iduser = val;
      console.log(this.iduser)
      this.chat();
    });
  }
  chat() {
    this.receptor = this.item.users.name ;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    // loading.present();
    this.api.get("chat/" + this.item.id).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.info = jwt;
          this.info = this.info.data;
          console.log(this.info);
          this.scrollToBottom();
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        // loading.dismiss();
      }
    );
  }
  send() {
    this.isenabled = false;
    this.data = {
      message: this.message,
      alert_id: this.item.id
    };
    this.api.post("chat", this.data).then(
      jwt => {
        if (jwt) {
          this.response = jwt;
          if (this.response.status) {
            this.isenabled = true;
            this.chat();
            this.message = "";
          }
        } else {
          this.isenabled = true;
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log("Mensaje no enviado");
      }
    );
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.chat();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
