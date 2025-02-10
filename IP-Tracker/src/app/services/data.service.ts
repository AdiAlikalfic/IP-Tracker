import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IP } from '../models/ip';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getIpAddress(): Observable<IP[]> {
    return this.httpClient.get<IP[]>('https://geo.ipify.org/api/v2/country,city?apiKey=at_tZLOouLSrM8eE0LKYT1ltjucwZCt5&ipAddress=8.8.8.8')
  }
}
