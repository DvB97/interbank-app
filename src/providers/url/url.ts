import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UrlProvider {
  public myGlobalVar: string;
  constructor(public http: HttpClient) {
   this.myGlobalVar="https://agente.artsignsoluciones.com/" 
    //this.myGlobalVar="http://localhost/interbank-api/"
  }

}
