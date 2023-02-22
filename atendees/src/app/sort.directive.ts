import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { SortOrder } from './sort.type';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Output() newSortOrder = new EventEmitter<SortOrder>();
  @HostListener('click') onClick() {
    if (!this.sortOrder || this.sortOrder === 'DESC') {
      this.sortOrder = 'ASC';
    } else {
      this.sortOrder = 'DESC'
    } 
    this.newSortOrder.emit(this.sortOrder);
  }

  @HostBinding('class.sort-asc') get sortClassAsc () { return this.sortOrder === 'ASC'; } 
  @HostBinding('class.sort-desc') get sortClassDesc () { return this.sortOrder === 'DESC'; }
  
  sortOrder: SortOrder | undefined;

}
