import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IP } from './models/ip';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'IP-Tracker';

  ipAddress : string = '';
  map: L.Map | undefined;
  marker: L.Marker | undefined;
  ipInfo: IP | null = null;
  

  constructor(private http: HttpClient) { };

  ngOnInit(): void {
    this.initMap();
  }



  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  getIpLocation(): void {
    const apiKey = 'at_tZLOouLSrM8eE0LKYT1ltjucwZCt5'
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${this.ipAddress}`

    this.http.get<any>(url).subscribe(response => {
      console.log(response);
      if(response && response.location) {
        this.ipInfo = response
        const {lat, lng, city, country} = response.location

        this.showLocationOnMap(lat, lng, city, country);
        console.log(response);
        
      } else {
        alert('Location not found');
      }
    }, error => {
      console.error('Error fetching IP location: ', error)
      alert('An error occured while fetching the location')
    });
  }

  showLocationOnMap(lat: number, lng: number, city: string, country: string): void {
    if (this.map) {
      if (this.marker) {
        this.marker?.remove()
      }
      this.map?.setView([lat, lng], 13);
      this.marker = L.marker([lat, lng]).addTo(this.map);
      this.marker.bindPopup(`<b>${city}, ${country}</b>`).openPopup();
    }
  }
}
