import { Component, OnInit } from '@angular/core';
import { AttendeesService } from '../attendees.service';

@Component({
  selector: 'app-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.scss']
})
export class AttendeesListComponent implements OnInit {
  constructor(private attendeesService: AttendeesService) {}

  ngOnInit(): void {
    this.attendeesService.getAttendees().subscribe(list => {
      console.log(list);
    })
  }
}
