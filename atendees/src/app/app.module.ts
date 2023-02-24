import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AttendeesListComponent } from './attendees-list/attendees-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { SortDirective } from './sort.directive';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AttendeesListComponent,
    PaginationComponent,
    SortDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe
    
  ],
  providers: [
    provideEnvironmentNgxMask(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
