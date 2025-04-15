import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component'; // Adjust path as needed
import { NewsService } from '../../../services/news.service'; // Adjust path as needed
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { StoryModel } from '../../../models/story-model';

describe('StoryListComponent', () => {
  let fixture: ComponentFixture<StoryListComponent>;
  let component: StoryListComponent;
  let mockNewsService: any;

  beforeEach(async () => {
    // Create a mock version of NewsService
    mockNewsService = {
      getStories: jasmine.createSpy('getStories').and.returnValue(of([
        { id: 1, title: 'Mock Story 1', description: 'This is a mock story.', totalRecords: 2 },
        { id: 2, title: 'Mock Story 2', description: 'This is another mock story.', totalRecords: 2 },
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [StoryListComponent,HttpClientTestingModule], // Import HTTP testing module
      providers: [
        { provide: NewsService, useValue: mockNewsService }, // Provide the mock service
      ],
    }).compileComponents();

    // Create the component instance
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStories and update newsArticles on initialization', () => {
    fixture.detectChanges(); // Trigger ngOnInit

    // Verify that the service's method was called
    expect(mockNewsService.getStories).toHaveBeenCalledWith(1, 10, '');

    // Verify that the component's newsArticles array is updated
    expect(component.newsArticles.length).toBe(2);
    expect(component.newsArticles[0].title).toBe('Mock Story 1');
  });

  it('should update the current page and fetch new stories on page change', () => {
    component.onPageChange(2);

    // Verify that getStories was called with the correct arguments
    expect(mockNewsService.getStories).toHaveBeenCalledWith(2, 10, '');
  });

  it('should update itemsPerPage and fetch new stories on page size change', () => {
    component.onPageSizeChange(20);

    // Verify the values and method calls
    expect(component.itemsPerPage).toBe(20);
    expect(component.currentPage).toBe(1);
    expect(mockNewsService.getStories).toHaveBeenCalledWith(1, 20, '');
  });

  it('should fetch news articles based on the search term', () => {
    // Mock response to match the StoryModel type
    const mockResponse: StoryModel[] = [
      { id: 3, title: 'Breaking News', url: 'http:www.example.com', totalRecords: 1 },
    ];
    mockNewsService.getStories.and.returnValue(of(mockResponse));

    component.searchTerm = 'Breaking';
    component.onNewsSearch();

    expect(mockNewsService.getStories).toHaveBeenCalledWith(
      component.currentPage,
      component.itemsPerPage,
      'Breaking'
    );

    expect(component.newsArticles).toEqual(mockResponse); // Ensure type compatibility
    expect(component.totalRecords).toBe(1);
  });

  it('should handle empty search results', () => {
    const mockResponse: StoryModel[] = [];
    mockNewsService.getStories.and.returnValue(of(mockResponse));

    component.searchTerm = 'Nonexistent';
    component.onNewsSearch();

    expect(mockNewsService.getStories).toHaveBeenCalledWith(
      component.currentPage,
      component.itemsPerPage,
      'Nonexistent'
    );

    expect(component.newsArticles).toEqual([]);
    expect(component.totalRecords).toBe(0);
  });
});