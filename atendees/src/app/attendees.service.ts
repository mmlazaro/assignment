import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendee } from './attendee.model';


@Injectable({
  providedIn: 'root'
})
export class AttendeesService {

  constructor(private httpClient: HttpClient) { }

  getAttendees() {
    return this.httpClient.get<Attendee[]>('https://63998da716b0fdad77409a5e.mockapi.io/api/v1/hikers');
  }
}
