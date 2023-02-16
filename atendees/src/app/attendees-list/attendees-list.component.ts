import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendee } from '../attendee.model';
import { AttendeesService } from '../attendees.service';

@Component({
  selector: 'app-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.scss']
})
export class AttendeesListComponent implements OnInit {

  attendees$ =  this.attendeesService.getAttendees();
  currentPage = 0;
  lastPage: number = 1;
  attendees: Attendee[] = [];
  count$!: Observable<number>;

  constructor(private attendeesService: AttendeesService) {}

  ngOnInit(): void {
    //this.attendeesService.getAttendees();
    this.attendeesService.loadAttendees()

    this.loadPage();
    this.attendeesService.getTotalPages().subscribe(count => this.lastPage = count);
    this.count$ = this.attendeesService.getAttendeesCount();
  }

  switchPage(page: number) {
    this.currentPage = page;
    this.loadPage();
  }

  loadPage() {
    this.attendeesService.getAttendeesPage(this.currentPage).subscribe(list => {
      this.attendees = list;
      console.log(this.attendees)
    })
  }

  removeAttendee(id: string) {
    this.attendeesService.removeAttendee(id);
    this.loadPage();
  }
}
