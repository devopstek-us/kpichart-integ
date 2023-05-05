import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
import { DataService } from '../services/data.service';
HC_customEvents(Highcharts);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts

  public tChartData: any;
  public tKeyItems: any[] = [];
  public tKeyValues: any;
  public series: any[] = []
  optFromInput: any
  colors = Highcharts.getOptions().colors;
  chartOptions: Highcharts.Options

  constructor(private dataService: DataService) {
    this.dataService.getAfterParsedDataSubject().subscribe((chartData) => {

      const oneKeys = Object.keys(chartData)
      const cData = chartData[oneKeys[0]];
      this.tChartData = Object.keys(cData)
      this.tKeyItems = Object.keys(chartData[oneKeys[0]])
      this.tKeyValues = Object.values(this.tChartData)
      for (let i = 0; i < this.tKeyValues.length; i++) {
        const name = this.tKeyItems[i];
        const item = cData[name];
        this.series.push([
          name,
          item.values.reduce((a, b) => a + b, 0) / item.values.length
        ]);
      }

      this.chartOptions = {
        chart: {
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
              enabled: false
            },

            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          name: 'List of Objects',
          data: this.series
        }]
      }; this.optFromInput = this.chartOptions
    })
  }




  //optFromInput: Highcharts.Options = this.chartOptions //JSON.parse(this.optFromInputString);
  updateFromInput: boolean = false;

  // Demonstrate chart instance
  logChartInstance(chart: Highcharts.Chart) {
    console.log('Chart instance: ', chart);
  }

  updateInputChart() {
    this.optFromInput = this.chartOptions //JSON.parse(this.optFromInputString);
  }
}
