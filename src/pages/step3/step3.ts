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
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { ApiProvider } from "../../providers/api/api";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Step4Page } from '../step4/step4';
/**
 * Generated class for the Step3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-step3",
  templateUrl: "step3.html"
})
export class Step3Page {
  public scannedText: string;
  public buttonText: string;
  classIcon: any;
  public loading: boolean;
  grid: any[];
  public srcImage: boolean;
  OCRAD: any;
  msg: any;
  agencia: any;
  tipo: any;
  agente: any;
  fecha: any;
  geoLat: any;
  geoLong: any;
  observaciones: any;
  productInstalacion: any;
  productMantenimiento: any;
  productRetiro: any;
  typeRetirement: any;
  imageURI: any;
  imageFileName: any;
  private field: Array<any> = [];
  private imagenes: Array<any> = [];
  constructor(
    public actionSheetCtrl: ActionSheetController,
    private Camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    private transfer: FileTransfer
  ) {
    this.agencia = navParams.get("agencia");
    this.agente = navParams.get("agente");
    this.geoLat = navParams.get("geoLat");
    this.geoLong = navParams.get("geoLong");
    this.observaciones = navParams.get("observaciones");
    this.productInstalacion = navParams.get("productInstalacion");
    this.productMantenimiento = navParams.get("productMantenimiento");
    this.productRetiro = navParams.get("productRetiro");
    this.typeRetirement = navParams.get("typeRetirement");
    this.fecha = navParams.get("fecha");
  }

 
  ionViewDidLoad() {
    console.log(this.agente);
    console.log(this.fecha);
    console.log(this.observaciones);
    console.log(this.agencia);
    console.log(this.geoLat);
    console.log(this.geoLong);
    console.log(this.productInstalacion);
    console.log(this.productMantenimiento);
    this.buttonText = "Scan";
    this.srcImage = false;
    this.loading = false;
    this.classIcon = "fa fa-camera";
  }

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
        let errores = JSON.parse(err.body);
        const toast = this.toastCtrl.create({
          message: err.body,
          duration: 8000
        });
        toast.present();
        console.log(err);
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
          this.addFieldValue(info)
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
  gotoStepto4(params) {
    this.navCtrl.push(Step4Page, {
      fecha: this.fecha,
      agencia: this.agencia,
      agente: this.agente,
      geoLong: this.geoLong,
      geoLat: this.geoLat,
      tipo: "Observaciones",
      observaciones: this.observaciones,
      productInstalacion:this.productInstalacion,
      productMantenimiento:this.productMantenimiento,
      productRetiro: this.productRetiro,
      typeRetirement: this.typeRetirement,
      image: this.imagenes,
    });
  }
}
