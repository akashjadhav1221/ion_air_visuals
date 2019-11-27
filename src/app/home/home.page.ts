import { Component, OnInit } from '@angular/core';
import { AirvisualsService } from '../services/airvisuals.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  data: any;
  aqi: number;
  isLoading: boolean = true; 
  
  constructor(
    private airVisualService: AirvisualsService
  ) {}


  ngOnInit() {
     this.getAirQualityByIP();
  }

  getAirQualityByIP(){
    this.airVisualService.getAirQualityByIP().subscribe(res => {
      console.log(res);
      if(res){
        this.data = res['data'];
        this.aqi = this.data.current.pollution.aqius;
        this.isLoading = false;
      }
    }, error => {
      console.log(error);
    })
  }

  getAirQuality(){
    if(this.aqi >= 0 && this.aqi <= 50){
      return 'Good';
    }else if(this.aqi >= 51 && this.aqi <= 100){
      return 'Moderate';
    }else if(this.aqi >= 101 && this.aqi <= 150){
      return 'Unhealthy for Sensitive Groups';
    }else if(this.aqi >= 151 && this.aqi <= 200){
      return 'Unhealthy';
    }else if(this.aqi >= 201 && this.aqi <= 300){
      return 'Very Unhealthy';
    }else if(this.aqi >= 301){
      return 'Hazardous';
    }
  }

  getColorByAirQuality(){
    if(this.aqi >= 0 && this.aqi <= 50){
      return '#00ab4a';
    }else if(this.aqi >= 51 && this.aqi <= 100){
      return '#c4d10f';
    }else if(this.aqi >= 101 && this.aqi <= 150){
      return '#d65e90';
    }else if(this.aqi >= 151 && this.aqi <= 200){
      return '#ed3280';
    }else if(this.aqi >= 201 && this.aqi <= 300){
      return '#fc0390';
    }else if(this.aqi >= 301){
      return '#fc0303';
    }
  }

  getTextByAirQuality(){
    if(this.aqi >= 0 && this.aqi <= 50){
      return 'Air pollution poses little or no risk.';
    }else if(this.aqi >= 51 && this.aqi <= 100){
      return 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people. For example, people who are unusually sensitive to ozone may experience respiratory symptoms.';
    }else if(this.aqi >= 101 && this.aqi <= 150){
      return 'Although general public is not likely to be affected at this AQI range, people with lung disease, older adults and children are at a greater risk from exposure to ozone, whereas persons with heart and lung disease, older adults and children are at greater risk from the presence of particles in the air.';
    }else if(this.aqi >= 151 && this.aqi <= 200){
      return 'Everyone may begin to experience some adverse health effects, and members of the sensitive groups may experience more serious effects.';
    }else if(this.aqi >= 201 && this.aqi <= 300){
      return 'This would trigger a health alert signifying that everyone may experience more serious health effects.';
    }else if(this.aqi >= 301){
      return 'This would trigger a health warnings of emergency conditions. The entire population is more likely to be affected.';
    }
  }
}
