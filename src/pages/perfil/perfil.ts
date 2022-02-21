import { Component } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
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
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { ApiProvider } from "../../providers/api/api";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Storage } from "@ionic/storage";
import { AuthProvider } from "../../providers/auth/auth";
import { UrlProvider } from "../../providers/url/url";
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-perfil",
  templateUrl: "perfil.html"
})
export class PerfilPage {
  name: any;
  dni: any;
  birthday: any;
  phone: any;
  register: any;
  response: any;
  public srcImage: boolean;
  imageURI: any;
  avatar: any= 'assets/imgs/perfil.jpg';
  imageFileName: any;
  private field: Array<any> = [];
  private imagenes: Array<any> = [];
  constructor(
    public authProvider: AuthProvider,
    public jwtHelper: JwtHelperService,
    private readonly storage: Storage,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    private Camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private transfer: FileTransfer
  ) {}

  
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Abrir Libreria",
          handler: () => {
            this.getImage(0); // 0 == Library
          }
        },
        {
          text: "Camara",
          handler: () => {
            this.getImage(1); // 1 == Camera
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }


  getImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.Camera.DestinationType.FILE_URI,
      sourceType
    };

    this.Camera.getPicture(options).then(
      imageData => {
        this.imageURI = imageData;
        this.uploadFile()
      },
      err => {
        let alert = this.alertCtrl.create({
          message: err,
          buttons: ["Ok"]
        });
        alert.present();
        console.log(err);
      }
    );
  }
  uploadFile() {
    let loader = this.loadingController.create({
      content: "Cargando..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'file.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    fileTransfer
      .upload(this.imageURI, "https://agente.artsignsoluciones.com/multimedia",options)
      .then(
        data => {
         // let info = data
          let info = JSON.parse(data.response);
          this.avatar = info.img
          let body = {
            avatar: this.avatar
          };
          this.api.post("avatarUpdate", body).then(
            jwt => {
              if (jwt) {
                this.response = jwt;
                if (this.response) {
                  console.log(this.response)
                  loader.dismiss();
                  this.storage.set("avatar", this.avatar);
                }
              } else {
                console.log("Error de Conexion");
              }
            },
            err => {
              loader.dismiss();
            }
          );
          loader.dismiss();
          console.log("Imagen success");
        },
        err => {
          loader.dismiss();
          let errores = JSON.parse(err.body);
          const toast = this.toastCtrl.create({
            message: err.body,
            duration: 8000
          });
          toast.present();
          console.log("Imagen Failed");
          console.log(err.body);
          console.log(errores);
        }
      );
  }
  addFieldValue(data) {
    this.imagenes.push(data);
    this.srcImage = true;
    console.log(this.imagenes)
  }
  deleteFieldValue(index) {
    this.imagenes.splice(index, 1);
  }
  restart() {
    this.srcImage = false;
    this.presentActionSheet();
  }
  analyze() {
    console.log("Cam reader");
  }
  ionViewWillEnter() {
    this.storage.get("phone").then(val => {
      this.phone = val;
      console.log(this.phone)
    });
    this.storage.get("dni").then(val => {
      this.dni = val;
    });
    this.storage.get("birthday").then(val => {
      this.birthday = val;
      console.log(this.birthday)
    });
    this.storage.get("name").then(val => {
      this.name = val;
    });
    this.storage.get("register").then(val => {
      this.register = val;
    });
    this.storage.get("avatar").then(val => {
      this.avatar = val;
       console.log(this.avatar)
    });
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: "Cambio de Contraseña",
      subTitle: "Establecer una nueva contraseña",
      inputs: [
        {
          name: "password",
          placeholder: "Contraseña"
        }
      ],
      buttons: [
        {
          text: "Mas tarde.",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Cambiar",
          handler: data => {
            let loading = this.loadingController.create({
              content: "Realizando Cambios..."
            });
            loading.present();
            this.api.post("password", data).then(
              jwt => {
                loading.dismiss();
                if (jwt) {
                  this.response = jwt;
                  if (this.response) {
                    let alert = this.alertCtrl.create({
                      title: "Cambio Realizado, Vuelve a Ingresar",
                      buttons: ["Ok"]
                    });
                    alert.present();
                    this.authProvider.logout();
                  }
                } else {
                  console.log("Error de Conexion");
                }
              },
              err => {
                loading.dismiss();
              }
            );
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }
  presentPhone() {
    let alert = this.alertCtrl.create({
      title: "Afiliar Numero",
      subTitle: "Nuevo numero",
      inputs: [
        {
          name: "phone",
          placeholder: "Telefono"
        }
      ],
      buttons: [
        {
          text: "Mas tarde.",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Cambiar",
          handler: data => {
            let loading = this.loadingController.create({
              content: "Realizando Cambios..."
            });
            loading.present();
            this.api.post("phonechange", data).then(
              jwt => {
                loading.dismiss();
                if (jwt) {
                  this.response = jwt;
                  if (this.response) {
                    let alert = this.alertCtrl.create({
                      message: "Vuelve a ingresar al sistema para visualizar el cambio.",
                      buttons: ["Ok"]
                    });
                    alert.present();
                  }
                } else {
                  console.log("Error de Conexion");
                }
              },
              err => {
                loading.dismiss();
              }
            );
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }
  logout() {
    if (window.confirm("Seguro deseas salir del sistema?")) {
      this.authProvider.logout();
      //this.storage.remove("jwt_token");
    }
  }
}
