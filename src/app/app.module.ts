import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HighchartsChartModule } from "highcharts-angular";
import { AppComponent } from "./app.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { LineTestComponent } from './tests/line-test/line-test.component';
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { HistogramChartComponent } from "./histogram-chart/histogram-chart.component";
import { DataService } from "./services/data.service";
import { HeaderComponent } from "./common/header/header.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, LineChartComponent, LineTestComponent, PieChartComponent, HistogramChartComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HighchartsChartModule,
    HttpClientModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
