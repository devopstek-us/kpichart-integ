import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
import SunsetTheme from 'highcharts/themes/sunset.js';

// The modules will work for all charts.
ExportingModule(Highcharts);
SunsetTheme(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'tomato'
    }
  },
  legend: {
    enabled: true
  }
});
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private myInputVariable: ElementRef,
  ) {

  }  
  title = 'kpicharts';
  @ViewChild('myInput')
  Highcharts: typeof Highcharts = Highcharts;

  canGenerate: boolean = false
  isGenerate: boolean = false

  reset() {
    this.myInputVariable.nativeElement.value = "";
    this.chartData = [];
    this.isGenerate = false
    this.canGenerate = false
  }

  generate() {
    this.canGenerate = true;
    this.isGenerate = false
  }

  chartData: any = []
  chartType:any = {
    'Established_ERAB' : 'column',
    'Accessibility_Pct': 'line',
    'Retainability_Total': 'line',
    'ATTv_Acc_pct': 'line',
    'ERIv_Ret_pct': 'line',
    'Rrc_Failures': 'line',
    'Total_MMe_Drops': 'column',
    'NR_RA_Attempts': 'column',
    'NR_RA_Failures': 'column',
    'NR_RANDOM_ACCESS_SR': 'line',
    'ENDC_Attempts': 'column',
    'NR_DATA_SCG_Bearer_Failures': 'column',
    'NR_DATA_SCG_Bearer_Setup_SR': 'line',
    'DATA_NR_leg_Bearer_Drops': 'column',
    'NR_DL_ACK_MAC_MB': 'line'
  } 
  chartColors: any = [ "#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12" ]
  public onChange(event: any): void {
    const fileList: any = event.target.files
    let file =  fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.isGenerate = true;
      const allContent = fileReader.result
      let lastLine = '';
      let lastDataName = '';
      let lastxAxis: any;
      let lastKey;
      let chartData: any = [];
      allContent?.toString().split(/\r?\n/).forEach((line) => {
        
        if(line) {
          if(line.startsWith('Object') && line.includes('Counter')) {

            if(lastLine.trim().endsWith(':')) {
              lastDataName = lastLine.slice(0, -1);
            }
            lastxAxis = line.split(/\s+/)?.slice(2)
          } else if(line.startsWith('NRCell') || line.includes('Cell')) {
            let yAxis = line.split(/\s+/)
            const cKey = yAxis[1]?.trim()
            const yAxisName = yAxis[0]?.split('=')?.[1]
            yAxis = yAxis?.slice(2)
            if(!chartData?.[cKey]) {
              chartData[cKey] = {};
            }
            if(!chartData[cKey]['title']) {
              chartData[cKey]['title'] = {
                text: lastDataName
              }  
              chartData[cKey]['chart'] = {
                type: self.chartType[cKey]
              }
            }
            if(!chartData[cKey]['xAxis']) {
              chartData[cKey]['xAxis'] = []
              chartData[cKey]['xAxis']['categories'] = lastxAxis
            }
            if(!chartData[cKey]['series']) {
              chartData[cKey]['series'] = []
            }
            chartData[cKey]['series'].push({
              name: yAxisName,
              data: yAxis.map(function(i){
                if(i === 'N/A') { return null}
                return parseFloat(i);
              }),
              type: chartData[cKey]['chart']['type'],
            }) 
            lastKey = cKey
          }
          lastLine = line.trim()
        }
      });
      self.chartData = Object.values(chartData)
      //console.log('chartData', self.chartData)
    }
    fileReader.readAsText(file);
  }

}
