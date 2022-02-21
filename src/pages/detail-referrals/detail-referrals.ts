import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Platform,
  ToastController,
  ActionSheetController
} from "ionic-angular";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ApiProvider } from "../../providers/api/api";
import { ListReferralsPage } from "../list-referrals/list-referrals";
import { ReferralsSavemapPage } from "../referrals-savemap/referrals-savemap";
import { CampoPage } from "../campo/campo";
/**
 * Generated class for the DetailReferralsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: "page-detail-referrals",
  templateUrl: "detail-referrals.html"
})
export class DetailReferralsPage {
   public scannedText: string;
  public buttonText: string;
  classIcon: any;
  public loading: boolean;
  grid: any[];
  data: any;
  body: any;
  status: any;
  map: any;
  zoom: any;
  geoLat: any = '-11.886159';
  geoLong: any = '-77.0352247';
  myLatLng: any;
  nivel: any = 0;
  preguntas: any = 1;
  preguntasaplicado: any = 1;
  sugerencia: boolean = false;
  sugerenciatext: any;
  point: any = 0;
  cuestionario: any;
  preguntasarray: any = [];
  public srcImage: boolean;
  imageURI: any;
  imageFileName: any;
  private field: Array<any> = [];
  private imagenes: Array<any> = [];
  response: any;
  markers: any = [];
  markersM: any;
  markersA: any;
  markersMASS: any;
  markersStore: any;
  message: "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private Camera: Camera,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public api: ApiProvider, public zone: NgZone) {
      this.data = navParams.get("data");
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailReferralsPage");
    this.loadMap()
    if(this.data.step==3){
      console.log('va a mapa')
      this.navCtrl.setRoot(ReferralsSavemapPage, {
        data: this.data
      });
    }
    this.buttonText = "Scan";
    this.srcImage = false;
  }
  loadMap() {
    console.log('Entro a mapa')
    let mapEle: HTMLElement = document.getElementById("map");
    var myLatlng = new google.maps.LatLng(this.data.geoLat, this.data.geoLong);
    this.map = new google.maps.Map(mapEle, {
      center: myLatlng,
      zoom: 16,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      }
    });
    if (!this.data.saveposition) {
      this.addCircle(this.data);
    } else {
      this.addMarker(this.data,null);
    }
    this.mapadecalor()
  }
  mapadecalor(){
    this.body = {
      geoLat: this.data.geoLat,
      geoLong: this.data.geoLong,
      date: 8,
    };
    this.api.post("mapatransacciones", this.body).then(
      jwt => {
        console.log("Cargando Markers");
        if (jwt) {
          this.markers = jwt;
          this.markersA = this.markers.atm;
          this.markersM = this.markers.agents;
          this.markersM.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/interbankagente.png');
          });
          this.markersA.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/global.png');
          });
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log("Error al cargar Markers");
      }
    );
    this.api.post("storemapa", this.body).then(
      jwt => {
        console.log("Cargando Markers");
        if (jwt) {
          this.markers = jwt;
          this.markersMASS = this.markers.mass;
          this.markersStore = this.markers.store;
          this.markersMASS.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/mass.png');
          });
          this.markersStore.forEach(marker => {
            this.addMarker(marker,'https://agente.artsignsoluciones.com/uploads/map/store.png');
          });
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log("Error al cargar Markers");
      }
    );
  }
  addCircle(options) {
    var myLatlng = new google.maps.LatLng(options.geoLat, options.geoLong);
    var cityCircle = new google.maps.Circle({
      strokeColor: '#8e8e8e',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#8e8e8e',
      fillOpacity: 0.35,
      map: this.map,
      center: myLatlng,
      radius: 200
    });
  }
  addMarker(options, icon) {
    var myLatlng = new google.maps.LatLng(options.geoLat, options.geoLong);
    var contentString =
      '<p style="font-size:14px;">' +
      options.name +
      "</p>" +
      '<button icon ion-button color="primary" class="boton centrar" id="myid" style="height: 20px; background-color: #009b3a; font-size:10px;">Crear Ruta</button>';
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    google.maps.event.addListenerOnce(infowindow, "domready", () => {
      document.getElementById("myid").addEventListener("click", () => {
        this.waze(options.geoLat, options.geoLong);
      });
    });
    if(icon){
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        title: options.name,
        icon: icon
      });
    }else{
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        title: options.name
      });
    }
    marker.addListener("click", function () {
      infowindow.open(this.map, marker);
    });
  }
  public waze(geoLat, geoLong) {
    window.open("https://www.waze.com/ul?ll=" + geoLat + "%2C" + geoLong + "&navigate=yes&zoom=15", '_system', 'location=yes');
  }

  agendar() {
    const alert = this.alertCtrl.create({
      title: 'Referido confirmado!',
      subTitle: 'Recuerda visitar el referido para confirmar datos y ubicación',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agendar',
          role: 'cancel',
          handler: () => {
            var call = "tel:" + this.data.phone;
            document.location.href = call;
          }
        }]
    });
    alert.present();
  }

  Realizar(status) {
    console.log("Entro a realizar");
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    if(status == 1){
      this.data.step = 7;
    }
    if(status == 2){
      this.data.step = 7;
    }
    if(status == 3){
      this.body = {
        id: this.data.id,
        visit_status: status,
        step: 2
      };
    }else{
      this.body = {
        id: this.data.id,
        visit_status: status,
        status: 1,
        step: this.data.step
      };
    }
    this.api.put("referrals/" + this.data.id, this.body).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          if (status == 3) {
            this.agendar()
          }
          if (this.data.isprospeccion == 1) {
              this.navCtrl.setRoot(CampoPage);
          }else{
             this.navCtrl.setRoot(ListReferralsPage);
          }
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
  saveData() {
    this.data.step = 6;
    this.data.question_status =3; // Ya actualizo datos 
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.put("referrals/" + this.data.id, this.data).subscribe(
      jwt => {
        loading.dismiss();
        if (jwt) {
          const alert = this.alertCtrl.create({
            title: 'Información actualizada',
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
  saveImg() {
    this.data.step = 5;
    this.data.imagenes = this.imagenes;
    this.api.put("referrals/" + this.data.id, this.data).subscribe(
      jwt => {
        if (jwt) {
          console.log('Guardado imagenes')
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  statusquestion(status) {
    this.body = {
      id: this.data.id,
      question_status: status,
      step: this.data.step
    };
    this.api.put("referrals/" + this.data.id, this.body).subscribe(
      jwt => {
        if (jwt) {
          if (status == 2) {
            this.api.get("referrals/" + this.data.id).subscribe(
              jwt => {
                if (jwt) {
                  this.response = jwt;
                  this.data = this.response.data
                } else {
                  console.log("Error de Conexion");
                }
              },
              err => {
                console.log(err)
              }
            );
          }
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log(err)
      }
    );
  }
  savequestion() {
    this.api.post("question", this.preguntasarray).then(
      jwt => {
        if (jwt) {
          console.log(jwt)
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        console.log(err)
      }
    );
  }
  question(item, value, questionR) {
    var myArray = { question_id: item, response: value, question: questionR, referentials_id: this.data.id };
    this.preguntasarray[item] = myArray;
    if (item == 4) {
      this.savequestion();
      this.statusquestion(1);
    }
    if (item == 11) {
      this.data.step = 3;
      this.savequestion();
      this.statusquestion(2);
      const alert = this.alertCtrl.create({
        title: 'Completar información!',
        message:
          "<p> Gracias por responder las preguntas de " + this.data.name + "  sin embargo aun falta actualizar más información, contamos con tu apoyo</p>" +
          "<ul>" +
          "<li> Guardar Ubicación en el mapa</li>" +
          "<li> Tomar Fotografia del comercio</li>" +
          "<li> Actualizar Información</li>" +
          "</ul>",
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
      this.data.question_status = 2;
      this.navCtrl.setRoot(ReferralsSavemapPage, {
        data: this.data

      });
    }
  }
  /** Camera */
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
        console.log(errores);
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
      .upload(this.imageURI, "https://agente.artsignsoluciones.com/multimedia", options)
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
}
