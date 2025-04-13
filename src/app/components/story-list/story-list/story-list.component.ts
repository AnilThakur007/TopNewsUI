import { Component } from '@angular/core';
import { StoryModel } from '../../../models/story-model';
import { NewsService } from '../../../services/news.service';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../../paginator/paginator/paginator.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-story-list',
  imports: [CommonModule,PaginatorComponent,FormsModule],
  standalone: true, 
  templateUrl: './story-list.component.html',
  styleUrl: './story-list.component.css'
})
export class StoryListComponent {
  newsArticles: StoryModel[] = [];
  searchTerm:string = "";
  itemsPerPage = 10; // Default items per page
  currentPage = 1;
  totalRecords = 0;
  loading:boolean = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.updatePaginatedData();
  }

  onNewsSearch() {
    this.updatePaginatedData();
  }

  private getTopNewsStories(pageNumber:number,pageSize:number,searchQuery:string=''):void {
    this.loading = true;
    this.newsService.getStories(pageNumber,pageSize,searchQuery).subscribe(response => {
      this.loading = false;
      this.newsArticles = response;
      if(this.newsArticles.length > 0) {
        this.totalRecords = this.newsArticles[0].totalRecords;
      } else {
        this.totalRecords = 0;
      }
    });
  }

  private updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.getTopNewsStories(this.currentPage,this.itemsPerPage,this.searchTerm);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  onPageSizeChange(size: any): void {
    this.currentPage = 1;
    this.itemsPerPage = size;
    this.updatePaginatedData();
  }
}
