import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() public chartData: any;  
  optFromInput: any
  colors = Highcharts.getOptions().colors;
  public chartOptions:Highcharts.Options | undefined

  constructor() {
  }

  public async ngOnInit() {

      this.chartOptions = {
    chart: {
        type: 'line'
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: true,
        symbolWidth: 40
    },

    title: {
        text: this.chartData.title.text,
        align: 'center'
    },

    subtitle: {
        text: '',
        align: 'left'
    },

    yAxis: {
        title: {
            text: ''
        },
    },

    xAxis: {
        title: {
            text: ''
        },
        categories: this.chartData.xAxis.categories
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

    series: this.chartData.series,

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
                    categories: this.chartData.xAxis.categories,
                },
                yAxis: {
                    visible: false
                }
            }
        }]
    }
};
        console.log('this.chartOptions', this.chartOptions);
      this.optFromInput = this.chartOptions
    
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