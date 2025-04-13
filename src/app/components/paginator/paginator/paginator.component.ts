import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  standalone: true, 
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() totalItems = 0; // Total number of items
  @Input() itemsPerPage = 10; // Default items per page
  @Input() currentPage = 1; // Current page
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizeOptions = [10, 20, 50, 100, 200];
  displayedPages: number[] = [];
  totalPages = 0;

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePagination();
  }
  
  onPageSizeChange(event: Event) {
    const selectedSize = +(event.target as HTMLSelectElement).value;
    this.itemsPerPage = selectedSize;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1; // Reset to the first page
    this.updatePagination();
    this.pageSizeChange.emit(this.itemsPerPage);
    this.onPageChange(1); // Reset to the first page
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
    this.pageChange.emit(this.currentPage);
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    // Ensure currentPage is within valid range
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));

    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, this.currentPage + 1);

    this.displayedPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    // Ensure displayed page numbers are always 3 digits
    this.displayedPages = this.displayedPages.map(page => Number(page.toString().padStart(3, '0')));
}
  
  // Disable the "Next" button when on the last page
  get isNextDisabled(): boolean {
    return this.currentPage === this.totalPages;
  }
  
}
