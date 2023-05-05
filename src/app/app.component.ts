declare var require: any;

import { Component } from '@angular/core';
import ExportingModule from 'highcharts/modules/exporting';
import SunsetTheme from 'highcharts/themes/sunset.js';
import * as Highcharts from "highcharts";
import * as XLSX from "xlsx";
import { DataService } from './services/data.service';


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
    enabled: false
  }
});

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private dataService: DataService) {

  }
  file: any
  arrayBuffer: any
  chartData: any = []

  addfile(event) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, { type: "binary" });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const xData = XLSX.utils.sheet_to_json(worksheet);
      //console.log('INTER', this.objectIntersectKey(...xData));
      let lastKeyItem;
      let lastValueItem;
      let lastKey;
      //let cData:any = [];
      for (let j = 0; j != xData.length; ++j) {

//        console.log('this.chartData', xData[j])
        const a:any = xData[j]
        const aKeys = Object.keys(a)
        if(lastKeyItem && JSON.stringify(lastKeyItem) === JSON.stringify(aKeys)) {
          const currentValueItem:any = Object.values(a)
          const common = currentValueItem.filter(x => lastValueItem?.includes(x) && typeof x === 'string' && x != 'N/A')
          //console.log('common', common)
          if(common?.length === 1) {
            lastKey = common[0];
            //console.log('lastKey', lastKey);
            //console.log('currentValueItem[0]', currentValueItem[0]);
            //console.log('currentValueItem.s', currentValueItem.slice(2));
            if(!this.chartData?.[lastKey]) {
              this.chartData[lastKey] = [];
            }
            if(!this.chartData?.[lastKey]?.[currentValueItem[0]]) {
              this.chartData[lastKey][currentValueItem[0]] = [];
            }
            const validKeys = aKeys.filter(x => !(x.startsWith('__') || x.endsWith(')')))
            //console.log('validKeys', validKeys)
            this.chartData[lastKey][currentValueItem[0]] = {
              heading : validKeys,
              values: validKeys.map((y) => { return a[y]})
            }  
          }
          lastValueItem = currentValueItem
        }
        lastKeyItem = aKeys 
        
      }
      this.dataService.getAfterParsedDataSubject().next(this.chartData) 
      //console.log('this.chartData1', this.chartData)
    }
  }

}
