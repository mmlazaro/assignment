import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendee } from './attendee.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AttendeesService {

  pageSize = 10;
  constructor(private httpClient: HttpClient) { }

  getAttendees() {
    return this.httpClient.get<Attendee[]>('assets/attendees.json');
  }

  getAttendeesPage(page: number) {
    return this.getAttendees().pipe(
      map(list => {
        if (list.length < this.pageSize * (page)) {
          return list.slice(this.pageSize * (page), list.length - 1);
        } else {
          return list.slice(this.pageSize * (page), this.pageSize * (page + 1));
        }
      })
    )
  }

  getAttendeesCount() {
    return this.getAttendees().pipe(
      map(list => list.length)
    );
  }

  getTotalPages() {
    return this.getAttendeesCount().pipe(map(count => {
      const remainder = (count/this.pageSize)%this.pageSize;
      if (remainder === 0) {
        return count/this.pageSize;
      } else {
        return Math.ceil(count/this.pageSize);
      }
    }));
  }

}
