import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../services/server.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather: any;
  fiveday: any;
  daily: any;

  constructor(private server: ServerService) { }

  //--------------------------------------------------------------------------------
  // AccuWeather APIs

  // Get 5 Day Forecast for Boston
  getForecast() {
    this.server.getForecast().subscribe(result => { 
      let data = result;
      this.fiveday = data.response;
      this.daily = this.fiveday.DailyForecasts;
      console.log(this.fiveday);
    });
  }


  ngOnInit() {
    this.getForecast();
  }

}
