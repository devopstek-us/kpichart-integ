import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_customEvents from 'highcharts-custom-events';
import { DataService } from '../services/data.service';
HC_customEvents(Highcharts);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
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

      console.log('ngOnChanges', chartData)
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
          type: 'spline',
          data: item.values,
          color: this.colors[i],
        });
        this.cat = item.heading;
      }

      console.log('this.cat', this.cat);

      console.log('this.tChartData', this.tChartData );
      console.log('this.tKeyItems', this.tKeyItems );
      console.log('this.tKeyValues', this.tKeyValues );
      console.log('this.series', this.series );

      this.chartOptions = {
    chart: {
        type: 'spline'
    },

    legend: {
        symbolWidth: 40
    },

    title: {
        text: '',
        align: 'left'
    },

    subtitle: {
        text: '',
        align: 'left'
    },

    yAxis: {
        title: {
            text: 'Percentage usage'
        },
        accessibility: {
            description: 'Percentage usage'
        }
    },

    xAxis: {
        title: {
            text: ''
        },
        accessibility: {
            description: 'Time from December 2010 to September 2019'
        },
        categories: this.cat
    },

    tooltip: {
        valueSuffix: '%',
        stickOnContact: true
    },

    plotOptions: {
        series: {
            point: {
            },
            cursor: 'pointer',
            lineWidth: 2
        }
    },

    series: this.series,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 550
            },
            chartOptions: {
                chart: {
                    spacingLeft: 3,
                    spacingRight: 3
                },
                legend: {
                    itemWidth: 150
                },
                xAxis: {
                    categories: this.cat,
                },
                yAxis: {
                    visible: false
                }
            }
        }]
    }
};

      this.optFromInput = this.chartOptions
    })
  }


  Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts

  
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
