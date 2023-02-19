import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() lastPage!: number;
  @Output() page = new EventEmitter<number>();

  currentPage = 0;


  onPageChange(page: number) {
    console.log(page);
    this.page.emit(page);
    this.currentPage = page;
  }

  getPageNumbersToShow() {
    let buttonsToShow = [1, this.currentPage - 1, this.currentPage, this.currentPage + 1,  this.lastPage].filter(page => {
      return page >= 0 && page <= this.lastPage; 
    });
    return [...new Set(buttonsToShow)].sort((a,b) => a - b);
  }

}
