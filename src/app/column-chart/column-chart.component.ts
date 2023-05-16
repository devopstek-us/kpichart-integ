import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent {

  @Input() public chartData: any;  
  optFromInput: any
  colors = Highcharts.getOptions().colors;
  chartOptions:Highcharts.Options | undefined

  public async ngOnInit() {
  this.chartOptions = {
        chart: {
            type: 'column'
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: true
        },
        title: {
          text: this.chartData.title.text,
          align: 'center'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: this.chartData.xAxis.categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: this.chartData.series
};

    this.optFromInput = this.chartOptions
}


Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts


//optFromInput: Highcharts.Options = this.chartOptions //JSON.parse(this.optFromInputString);
updateFromInput: boolean = false;

// Demonstrate chart instance
logChartInstance(chart: Highcharts.Chart) {
  //console.log('Chart instance: ', chart);
}

updateInputChart() {
  this.optFromInput = this.chartOptions //JSON.parse(this.optFromInputString);
}

}