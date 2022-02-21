import { AlertController, ToastController } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthProvider } from "./auth/auth";
@Injectable()
export class InterceptorProvider implements HttpInterceptor {
    constructor(
        private storage: Storage,
        private alertCtrl: AlertController,
        private readonly toastCtrl: ToastController,
        public authProvider: AuthProvider
    ) { }

    // Intercepts all HTTP requests!
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let promise = this.storage.get('token');
        return Observable.fromPromise(promise)
            .mergeMap(token => {
                let clonedReq = this.addToken(request, token);
                return next.handle(clonedReq).pipe(
                    catchError(error => {
                        let message: string;
                        console.log(error.error.code)
                        if (error.error.status && error.error.status === false) {
                            message = error.error;
                        }
                        else {
                            message = 'Error de Conexión Vuelve a Intentarlo.';
                        }
                        const toast = this.toastCtrl.create({
                            message,
                            duration: 5000,
                            position: "bottom"
                        });
                        if (error.error.code && error.error.code == '50008') {
                            const prompt = this.alertCtrl.create({
                                message: "Su sesión ha caducado, vuelva a iniciar sesión de nuevo.",
                                buttons: [
                                    {
                                        text: "Ok",
                                        handler: data => {
                                            this.authProvider.logout();
                                            this.storage.remove("jwt_token");
                                        }
                                    },
                                ]
                            });
                            prompt.present();
                        }
                        toast.present();
                        // Pass the error to the caller of the function
                        return _throw(error);
                    })
                );
            });
    }

    // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `${token}`
                }
            });
            return clone;
        }
        return request;
    }
}