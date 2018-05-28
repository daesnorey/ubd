import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  private date = new Date();
  private chart: Chart;
  private chart_colors = ['#2e86c1', '#DAF7A6', '#FFC300', '#FF5733', '#C70039', '#a04000',
                          '#117a65', '#ecf0f1', '#2e86c1', '#DAF7A6', '#FFC300', '#FF5733',
                          '#dc7633', '#873600', '#9c640c', '#af601a', '#a04000', '#117a65',
                          '#78281f', '#dc7633', '#873600', '#9c640c', '#af601a', '#a04000',
                          '#17202a', '#78281f', '#dc7633', '#873600', '#9c640c', '#af601a'];
  private data_sets: any[];

  constructor() { }

  ngOnInit() {
    const config: any = {
      type: 'line',
      data: {
        labels: [['May', '2017'], 'June', 'July', 'August', 'September', 'October', 'November', 'December',
                 ['January', '2017'], 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Año anterior',
          backgroundColor: 'red',
          borderColor: 'red',
          data: [10, 30, 50, 20, 25, 44, 10, 10, 30, 50, 20, 25, 44],
          fill: false,
        }, {
          label: '2018',
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: [100, 33, 22, 19, 11, 49, 30, 40, 33, 22, 19, 11, 49],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Min and Max Settings'
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 10,
              max: 50
            }
          }]
        }
      }
    };
    setTimeout(() => {
      this.chart = new Chart('canvas', config);
    }, 1000);
  }

}
