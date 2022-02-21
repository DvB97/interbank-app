import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { finalize } from "rxjs/operators/finalize";
import { OneSignal } from "@ionic-native/onesignal";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  authType: string = "login";
  person = {
    dni:"",
    password:"",
    oneSignal:{}
  };
  loading;
  button = true;
  public status;
  public errorMessage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private readonly loadingCtrl: LoadingController,
    private readonly authProvider: AuthProvider,
    private readonly toastCtrl: ToastController,
    private oneSignal: OneSignal
  ) {}
  ionViewWillLoad() {
    this.oneSignal.getIds().then(data => {
      this.person.oneSignal = data
    })
  }
  goToLogin() {
    this.button = false;
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Logging in ..."
    });
    loading.present();
    this.authProvider
      .login(this.person)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        () => {},
        err => {
          console.log(err);
          this.button = true;
          this.handleError(err);
        }
      );
  }
  handleError(error: any) {
    let message: string;
    if (error.status && error.status === 401) {
      message = error.error;
    } else {
      message = "Complete todos los campos";
    }

    const toast = this.toastCtrl.create({
      message,
      duration: 5000,
      position: "bottom"
    });

    toast.present();
  }
}
