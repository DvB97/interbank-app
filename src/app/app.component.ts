import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, App, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { MapaPage } from "../pages/mapa/mapa";
import { ListReferralsPage } from "../pages/list-referrals/list-referrals";
import { PerfilPage } from "../pages/perfil/perfil";
import { CampoPage } from "../pages/campo/campo";
import { AjustesPage } from "../pages/ajustes/ajustes";
import { LoginPage } from "../pages/login/login";
import { AuthProvider } from "../providers/auth/auth";
import { OneSignal } from "@ionic-native/onesignal";
import { HistorialModalPushPage } from "../pages/historial-modal-push/historial-modal-push";
import { ChatPushPage } from "../pages/chat-push/chat-push";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string; component: any }>;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public app: App,
    authProvider: AuthProvider,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Inicio", component: HomePage },
      { title: "Mi Cartera", component: ListPage },
      { title: "Mapa", component: MapaPage },
      //{ title: "Referidos", component: ListReferralsPage },
    //  { title: "Prospección", component: CampoPage },
      { title: "Perfil", component: PerfilPage },
    //  { title: "Campañas", component: AnaliticaPage },
      { title: "Ajustes", component: AjustesPage }
    ];
    authProvider.authUser.subscribe(jwt => {
      if (jwt && jwt !== null) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    authProvider.checkLogin();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
      if (this.platform.is("cordova")) {
        this.oneSignal.startInit(
          "0d425a5c-6e20-4174-843f-58f610cb70a6",
          "755851049195"
        );
        this.oneSignal.inFocusDisplaying(
          this.oneSignal.OSInFocusDisplayOption.InAppAlert
        );
        this.oneSignal.handleNotificationReceived().subscribe(data => {
          console.log(JSON.stringify(data));
          // do something when notification is received
        });
        this.oneSignal.handleNotificationOpened().subscribe((data) => {
          // Abrio la aplicación por primera vez o tienes la pantalla abierta 
          // se muestra inFocusDisplay y luego este
          let dat = data;
          let seccion= dat.notification.payload.additionalData.seccion;
          let _id= dat.notification.payload.additionalData._id;
          switch (seccion){
            case "alerta":
              this.nav.push(HistorialModalPushPage,{_id: _id});
              break;
            case "chat":
              this.nav.push(ChatPushPage,{_id: _id});
              break;
            case "mapa":
              this.nav.push(MapaPage,{_id: _id});
              break;
          }
        });
        this.oneSignal.endInit();
      }
    });
    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
      if (activeView.name === "HomePage") {
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          const alert = this.alertCtrl.create({
            title: "Cerrar la App",
            message: "¿Estás seguro?",
            buttons: [
              {
                text: "Cancelar",
                role: "cancel",
                handler: () => {
                  this.nav.setRoot("HomePage");
                  console.log("** Saída do App Cancelada! **");
                }
              },
              {
                text: "Cerrar el App",
                handler: () => {
                  //this.logout();
                  this.platform.exitApp();
                }
              }
            ]
          });
          alert.present();
        }
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
