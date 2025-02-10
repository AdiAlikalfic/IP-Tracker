import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from './services/data.service';
import { IP } from './models/ip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'IP-Tracker';
  ip: IP[] = []
  map: any;

  constructor(private dataService: DataService) { };

  ngOnInit(): void {
    this.initMap();

    this.dataService.getIpAddress().subscribe({
      next: (data: IP[]) => {
        this.ip = data
      },
      error: (error) => {
        console.log(error);
        
      },
      complete: () => {
        console.log('complete', this.ip);
        
      }
    }
    )
  }

  initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }
}
