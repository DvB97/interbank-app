import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Chart } from "chart.js";

import { AlertController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
/**
 * Generated class for the TransaccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-transaccion",
  templateUrl: "transaccion.html"
})
export class TransaccionPage {
  @ViewChild("barCanvas") barCanvas;
  loading: any;
  barChart: any;
  agents: any;
  list: any;
  calendar: any[] = [
    {
      value: 1,
      label: "Ultimo Mes"
    },
    {
      value: 3,
      label: "Ultimos 3 Meses"
    },
    {
      value: 6,
      label: "Ultimo 6 Meses"
    },
    {
      value: 12,
      label: "Ultimo Año"
    },
    {
      value: 24,
      label: "Hace 2 Años"
    }
  ];
  limit: any = 3;
  meses: any[];
  valores: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public api: ApiProvider,
    public loadingController: LoadingController
  ) {
    this.agents = navParams.get("agents");
    console.log(this.agents);
    this.cargar();
  }
  ionViewWillLoad() {
    this.cargar();
  }
  cargar() {
    this.loading = true;
    let loading = this.loadingController.create({
      content: "Cargando..."
    });
    loading.present();
    this.api
      .get("transactions?agents=" + this.agents + "&limit=" + this.limit)
      .subscribe(
        jwt => {
          loading.dismiss();
          if (jwt) {
            this.list = jwt;
            this.list = this.list.data.items;
            let mes = [];
            let trx = [];
            this.list.forEach(function(officer) {
              mes.push(officer.date);
            });
            this.list.forEach(function(officer) {
              trx.push(officer.trx);
            });
            this.meses = mes;
            this.valores = trx;
            this.barChat();
          } else {
            console.log("Error de Conexion");
          }
        },
        err => {
          loading.dismiss();
          console.log("search canceled");
        }
      );
  }
  public barChat() {
    console.log(this.valores);
    console.log(this.meses);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.meses.reverse(),
        datasets: [
          {
            label: "Transacciones",
            data: this.valores.reverse(),
            backgroundColor: ["#2EAA61"],
            borderColor: ["#2d774b"],
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                display: false //this will remove only the label
              }
            }
          ]
        }
      }
    });
  }
}
