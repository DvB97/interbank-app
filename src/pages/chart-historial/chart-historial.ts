import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Chart } from "chart.js";

import { AlertController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
/**
 * Generated class for the ChartHistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart-historial',
  templateUrl: 'chart-historial.html',
})
export class ChartHistorialPage {

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
      .get("alertchart?agents=" + this.agents + "&limit=" + this.limit)
      .subscribe(
        jwt => {
          loading.dismiss();
          if (jwt) {
            this.list = jwt;
            this.list = this.list.data.products;
            let mes = [];
            let trx = [];
            for (const prop in this.list) {
              mes.push(prop);
              trx.push(this.list[prop]);  
            }
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
      type: "bar",
      data: {
        labels: this.meses.reverse(),
        datasets: [
          {
            label: "Solicitudes",
            data: this.valores.reverse(),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
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
                display: true //this will remove only the label
              }
            }
          ]
        }
      }
    });
  }
}
