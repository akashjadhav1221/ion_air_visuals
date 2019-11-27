import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirvisualsService {
  private AIR_VISUALS_API_KEY = 'YOUR_AIR_VISUAL_API_KEY';
  constructor(private http: HttpClient) { }

  getAirQualityByIP(){
    return this.http.get(environment.API + 'nearest_city?key=' + this.AIR_VISUALS_API_KEY);
  }
}
