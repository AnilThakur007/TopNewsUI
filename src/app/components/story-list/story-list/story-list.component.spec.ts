import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component'; // Adjust path as needed
import { NewsService } from '../../../services/news.service'; // Adjust path as needed
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
      imports: [
        StoryListComponent, // Import the standalone component
        HttpClientTestingModule, // Needed for any HTTP-related operations
      ],
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
    // Trigger ngOnInit
    fixture.detectChanges();

    // Verify that the service's method was called
    expect(mockNewsService.getStories).toHaveBeenCalledWith(1, 10, '');

    // Verify that the component's newsArticles array is updated
    expect(component.newsArticles.length).toBe(2);
    expect(component.newsArticles[0].title).toBe('Mock Story 1');
  });

  it('should update the current page and fetch new stories on page change', () => {
    // Trigger a page change
    component.onPageChange(2);

    // Verify that getStories was called with the correct arguments
    expect(mockNewsService.getStories).toHaveBeenCalledWith(2, 10, '');
  });

  it('should update itemsPerPage and fetch new stories on page size change', () => {
    // Trigger a page size change
    component.onPageSizeChange(20);

    // Verify the values and method calls
    expect(component.itemsPerPage).toBe(20);
    expect(component.currentPage).toBe(1);
    expect(mockNewsService.getStories).toHaveBeenCalledWith(1, 20, '');
  });
});