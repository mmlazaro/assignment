import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Attendee } from '../attendee.model';
import { AttendeesService } from '../attendees.service';

@Component({
  selector: 'app-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.scss']
})
export class AttendeesListComponent implements OnInit, OnDestroy {

  attendees$ =  this.attendeesService.getAttendees();
  currentPage = 0;
  lastPage: number = 1;
  attendees: Attendee[] = [];
  count$!: Observable<number>;
  isEditMode = false;
  editedPerson!: Attendee;

  private destroyed$: Subject<boolean> = new Subject();
  

  constructor(private attendeesService: AttendeesService) {}

  ngOnDestroy(): void {
     this.destroyed$.next(true);
      this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.attendeesService.loadAttendees()
    this.loadPage();
    this.attendeesService.getTotalPages().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(count => this.lastPage = count);
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
  
  enterEdit(person: Attendee) {
    //this.editedAttendeeId = id;
    this.isEditMode = true;
    this.editedPerson = person;
  }

  cancelEdit() {
    //this.editedPerson = null;
    this.isEditMode = false;
  }

  saveEdit(person: Attendee) {
    //this.editedAttendeeId = id;
    this.isEditMode = false;
    this.attendeesService.updateAttendee(person);
  }
}
