import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
import { DataService } from '../services/data.service';
HC_customEvents(Highcharts);

@Component({
  selector: 'app-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.css']
})
export class HistogramChartComponent {
  public tChartData: any;
  public tKeyItems: any[] = [];
  public tKeyValues: any;
  public series: any[] = []
  public cat: any[] = [];
  optFromInput: any
  colors = Highcharts.getOptions().colors;
  chartOptions:Highcharts.Options

  constructor(private dataService: DataService) {
    this.dataService.getAfterParsedDataSubject().subscribe((chartData) => {
      const oneKeys = Object.keys(chartData)
      const cData = chartData[oneKeys[0]];
      this.tChartData = Object.keys(cData)
      this.tKeyItems = Object.keys(chartData[oneKeys[0]])
      this.tKeyValues = Object.values(this.tChartData)
      for(let i=0; i < this.tKeyValues.length; i++) {
        const name = this.tKeyItems[i];
        const item = cData[name];
        this.series.push({
          name: name,
          type: 'bar',
          data: item.values,
        });
        this.cat = item.heading;
      }

      
      this.chartOptions = {
         chart: {
            type: 'bar'
        },
        title: {
            text: '',
            align: 'left'
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: this.cat,
            title: {
                text: null
            },
            gridLineWidth: 1,
            lineWidth: 0
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            gridLineWidth: 0
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },

    series: this.series,

    
};

      this.optFromInput = this.chartOptions
    })
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
