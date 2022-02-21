// Librerias Angular / Ionic
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { Diagnostic } from '@ionic-native/diagnostic';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { MyApp } from "./app.component";
// Paginas
import { HomePage } from "../pages/home/home";
import { CampoPage } from "../pages/campo/campo";
import { AjustesPage } from "../pages/ajustes/ajustes";
import { ListPage } from "../pages/list/list";
import { AdministradorPage } from "../pages/administrador/administrador";
import { TransaccionPage } from "../pages/transaccion/transaccion";
import { MapaPage } from "../pages/mapa/mapa";
import { AnaliticaPage } from "../pages/analitica/analitica";
import { PerfilPage } from "../pages/perfil/perfil";
import { DetallePage } from "../pages/detalle/detalle";
import { ComisionesPage } from "../pages/comisiones/comisiones";
import { NotepadPage } from "../pages/notepad/notepad";
import { NotepadListPage } from "../pages/notepad-list/notepad-list";
import { VisitPage } from "../pages/visit/visit";
import { DetalleCheckPage } from "../pages/detalle-check/detalle-check";
import { Step1Page } from "../pages/step1/step1";
import { Step2Page } from "../pages/step2/step2";
import { Step3Page } from "../pages/step3/step3";
import { Step4Page } from "../pages/step4/step4";
import { SearchAgentPage } from "../pages/search-agent/search-agent";
import { StepmapPage } from "../pages/stepmap/stepmap";
import { HistorialPage } from "../pages/historial/historial";
import { HistorialModalPage } from "../pages/historial-modal/historial-modal";
import { HistorialModalPushPage } from "../pages/historial-modal-push/historial-modal-push";
import { LoginPage } from "../pages/login/login";
import { CreateAgentPage } from "../pages/create-agent/create-agent";
import { StepmapAlertPage } from "../pages/stepmap-alert/stepmap-alert";
import { ChatPage } from "../pages/chat/chat";
import { ChatPushPage } from "../pages/chat-push/chat-push";
import { DetailReferralsPage } from "../pages/detail-referrals/detail-referrals";
import { ListReferralsPage } from "../pages/list-referrals/list-referrals";
import { ReferralsSavemapPage } from "../pages/referrals-savemap/referrals-savemap";
import { SuperejecutivePage } from "../pages/superejecutive/superejecutive";
import { SuperejecutiveSearchPage } from "../pages/superejecutive-search/superejecutive-search";
import { SuperejecutiveMapPage } from "../pages/superejecutive-map/superejecutive-map";
import { HistorialSolicitudesPage } from "../pages/historial-solicitudes/historial-solicitudes";
import { SupportPage } from "../pages/support/support";
import { ChartHistorialPage } from "../pages/chart-historial/chart-historial";
import { PermisosPage } from "../pages/permisos/permisos";
import { PermisosModalPage } from "../pages/permisos-modal/permisos-modal";
import { HistorialPermisosPage } from "../pages/historial-permisos/historial-permisos";
//360 Call COVID-19 
import { CallStep_1Page } from "../pages/call-step-1/call-step-1";
import { CallStep_2Page } from "../pages/call-step-2/call-step-2";
import { CallStep_3Page } from "../pages/call-step-3/call-step-3";

// Librerias Externas
import { ChartsModule } from "ng2-charts";
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { OneSignal } from '@ionic-native/onesignal';
// Proveedores
import { AuthProvider } from "../providers/auth/auth";
import { ApiProvider } from "../providers/api/api";
import { UrlProvider } from "../providers/url/url";
import { InterceptorProvider } from "../providers/interceptor";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { Contacts } from '@ionic-native/contacts';
import { FormatPipe } from '../pipes/format/format';
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get("jwt_token");
    }
  };
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AdministradorPage,
    TransaccionPage,
    MapaPage,
    CampoPage,
    ComisionesPage,
    AjustesPage,
    AnaliticaPage,
    PerfilPage,
    DetallePage,
    Step1Page,
    Step2Page,
    Step3Page,
    Step4Page,
    SearchAgentPage,
    NotepadPage,
    VisitPage,
    DetalleCheckPage,
    NotepadListPage,
    StepmapPage,
    HistorialPage,
    HistorialModalPage,
    LoginPage,
    CreateAgentPage,
    StepmapAlertPage,
    ChatPage,
    DetailReferralsPage,
    ListReferralsPage,
    SuperejecutivePage,
    SuperejecutiveSearchPage,
    SuperejecutiveMapPage,
    HistorialModalPushPage,
    ChatPushPage,
    SupportPage,
    HistorialSolicitudesPage,
    ChartHistorialPage,
    PermisosPage,
    PermisosModalPage,
    HistorialPermisosPage,
    ReferralsSavemapPage,
	CallStep_1Page, //COVID-19
	CallStep_2Page, //COVID-19
	CallStep_3Page, //COVID-19
    FormatPipe // Pipes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    HttpClientModule,
    IonicImageViewerModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ComisionesPage,
    AdministradorPage,
    TransaccionPage,
    MapaPage,
    AnaliticaPage,
    CampoPage,
    AjustesPage,
    PerfilPage,
    DetallePage,
    Step1Page,
    Step2Page,
    Step3Page,
    Step4Page,
    SearchAgentPage,
    NotepadPage,
    VisitPage,
    DetalleCheckPage,
    NotepadListPage,
    StepmapPage,
    HistorialPage,
    HistorialModalPage,
    LoginPage,
    CreateAgentPage,
    StepmapAlertPage,
    ChatPage,
    DetailReferralsPage,
    ListReferralsPage,
    SuperejecutivePage,
    SuperejecutiveSearchPage,
    SuperejecutiveMapPage,
    HistorialModalPushPage,
    ChatPushPage,
    SupportPage,
    HistorialSolicitudesPage,
    ChartHistorialPage,
    PermisosPage,
    PermisosModalPage,
    HistorialPermisosPage,
    ReferralsSavemapPage,
	CallStep_1Page, //COVID-19
	CallStep_2Page, //COVID-19
	CallStep_3Page //COVID-19
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    },
    AuthProvider,
    Geolocation,
    File,
    FileTransfer,
    FileTransferObject,
    Camera,
    BarcodeScanner,
    ApiProvider,
    UrlProvider,
    Diagnostic,
    OneSignal,
	Contacts
  ]
})
export class AppModule {}
