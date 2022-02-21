import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { HomePage } from "../home/home";
import { SupportPage } from "../support/support";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { Diagnostic } from "@ionic-native/diagnostic";
/**
 * Generated class for the AjustesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-ajustes",
  templateUrl: "ajustes.html"
})
export class AjustesPage {
  geocoder: any;
  loading: any;
  geoLat: any;
  geoLong: any;
  hours: any;
  minutes: any;
  seconds: any;
  dn: any;
  gps: any  = "OFF";
  cameraAvailable = "OFF";
  cameraAuthorized: any = "OFF";
  locationEnabled: any = "OFF";
  locationAuthorized: any = "OFF";
  deviceRoot: any = "OFF";
  notificationsOn: any = "OFF";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    public api: ApiProvider,
    private alertCtrl: AlertController,
    private diagnostic: Diagnostic
  ) {}

  ionViewDidLoad() {
    var Digital = new Date();
    this.hours = Digital.getHours();
    this.minutes = Digital.getMinutes();
    this.seconds = Digital.getSeconds();
    this.getPosition();
    this.getData();
    console.log("ionViewDidLoad AjustesPage");
  }

  gotoList(params) {
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
  gotoSupport(params) {
    if (!params) params = {};
    this.navCtrl.push(SupportPage);
  }
  getPosition(): any {
    this.geolocation
      .getCurrentPosition()
      .then(response => {
        this.gps = "On";
        this.loadMap(response);
      })
      .catch(error => {
        this.gps = "Off";
        console.log(error);
      });
  }
  loadMap(position: Geoposition) {
    this.geoLat = position.coords.latitude;
    this.geoLong = position.coords.longitude;
  }
  getData() {
    this.diagnostic
      .isCameraAvailable()
      .then(response => {
        this.cameraAvailable = "On";
      })
      .catch(error => {
        this.cameraAvailable = "Off";
      });
    this.diagnostic
      .isCameraAuthorized()
      .then(response => {
        this.cameraAuthorized = "On";
      })
      .catch(error => {
        this.cameraAuthorized = "Off";
      });
    this.diagnostic
      .isLocationEnabled()
      .then(response => {
        this.locationEnabled = "On";
      })
      .catch(error => {
        this.locationEnabled = "Off";
      });
    this.diagnostic
      .isLocationAuthorized()
      .then(response => {
        this.locationAuthorized = "On";
      })
      .catch(error => {
        this.locationAuthorized = "Off";
      });
    this.diagnostic
      .isDeviceRooted()
      .then(response => {
        this.deviceRoot = "On";
      })
      .catch(error => {
        this.deviceRoot = "Off";
      });
    this.diagnostic
      .isRegisteredForRemoteNotifications()
      .then(response => {
        this.notificationsOn = "On";
      })
      .catch(error => {
        this.notificationsOn = "Off";
      });
  }
}
