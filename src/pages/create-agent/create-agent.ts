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
import { CampoPage } from "../campo/campo";
import { ReferralsSavemapPage } from "../referrals-savemap/referrals-savemap";
/**
 * Generated class for the CreateAgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
declare var google;
@IonicPage()
@Component({
  selector: "page-create-agent",
  templateUrl: "create-agent.html"
})
export class CreateAgentPage {
  data:  any = {
    id:'',
    name:'',
    direction:'',
    district:'',
    province:'',
    departament:'',
    ruc:'',
    phone:'',
    contact:'',
    correo:'',
    type_comprobante:'',
    reference:'',
    observaciones:'',
    canal:'',
    question_status:'',
    visit_status:'',
    status:'',
    saveposition:'',
    step:'',
    isprospeccion: 1
  };
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
  dat: any;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public api: ApiProvider, public zone: NgZone
  ) {}
  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailReferralsPage");
  }

  
  saveData() {
    this.data.visit_status=1;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api.post("referralssave/", this.data).then(
      jwt => {
        loading.dismiss();
        if (jwt) {
          this.dat = jwt
          const alert = this.alertCtrl.create({
            title: 'Prospección Creada'
          });
          alert.present();
          this.nivel =1;
          this.data.id = this.dat.response
          console.log(this.dat)
          console.log(this.data.id)
        } else {
          console.log("Error de Conexion");
        }
      },
      err => {
        loading.dismiss();
      }
    );
  }
  question(item, value, questionR) {
    var myArray = { question_id: item, response: value, question: questionR, referentials_id: this.data.id };
    this.preguntasarray[item] = myArray;
    if (item == 11) {
      this.data.step = 3;
      this.savequestion();
      this.statusquestion(3);
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
}
