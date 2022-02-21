import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UrlProvider } from "../../providers/url/url";
import { AlertController, Alert } from "ionic-angular";
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(
    public http: HttpClient,
    public url: UrlProvider,
    private alertCtrl: AlertController
  ) {}
  getAll(endpoint: string, parametros?: any, reqOpts?: any) {
    /* let params2 = new HttpParams();
    params2 = params.append('param-1', 'value-1');
    params2 = params.append('param-2', 'value-2');*/
    const  params = new  HttpParams().set('_page', "1").set('_limit', "1");
    return this.http.get(this.url.myGlobalVar + "/" + endpoint, {
      params
    });
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(
      this.url.myGlobalVar + "/" + endpoint,
      this.httpOptions
    );
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.url.myGlobalVar + endpoint, body, this.httpOptions)
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  post2(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(
      this.url.myGlobalVar + "/" + endpoint,
      JSON.stringify(body),
      this.httpOptions
    );
  }
  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(
      this.url.myGlobalVar + "/" + endpoint,
      body,
      this.httpOptions
    );
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(
      this.url.myGlobalVar + "/" + endpoint,
      this.httpOptions
    );
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(
      this.url.myGlobalVar + "/" + endpoint,
      body,
      this.httpOptions
    );
  }

  getMaikol(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(
     "https://www.intranet-gruponalvarte.com/" + endpoint,
      this.httpOptions
    );
  }
  public handleError(error: Response | any) {
    let errMsg: string = "";
    let alertTitle: string;
    for (let feild in error) {
      let errFeild = error[feild];
      errMsg += `<p> ${errFeild} </p>`;
    }

    const alert = this.alertCtrl.create({
      title: "Invalido",
      subTitle: errMsg,
      buttons: ["Ok"]
    });
    alert.present();
  }
}
