import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Attendee } from '../attendee.model';
import { AttendeesService } from '../attendees.service';
import { SortOrder } from '../sort.type';

@Component({
  selector: 'app-attendees-list',
  templateUrl: './attendees-list.component.html',
  styleUrls: ['./attendees-list.component.scss'],
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
  
  constructor(private attendeesService: AttendeesService, private datePipe: DatePipe) {}

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
    })
  }

  removeAttendee(id: string) {
    this.attendeesService.removeAttendee(id);
    this.loadPage();
  }
  
  enterEdit(person: Attendee) {
    this.isEditMode = true;
    this.editedPerson = {
      ...person,
      dateOfBirth: this.datePipe.transform(person.dateOfBirth, 'd/M/yyyy') || person.dateOfBirth
    };
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  saveEdit() {
    this.isEditMode = false;
    this.attendeesService.updateAttendee(this.editedPerson);
    console.log(this.editedPerson)
    this.loadPage();
  }

  sortColumn(column: keyof Attendee, sortOrder: SortOrder) {
    this.attendeesService.sortAttendees(column, sortOrder);
  }
}
