import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component'; // Adjust path as needed
import { RouterTestingModule } from '@angular/router/testing';
import { StoryListComponent } from './components/story-list/story-list/story-list.component'; // Adjust path as needed
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this for HttpClient
import { NewsService } from './services/news.service'; // Mock or provide your service

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // For RouterOutlet usage
        StoryListComponent, // Import the standalone component here
        HttpClientTestingModule, // Provide HttpClient for NewsService
      ],
      providers: [
        NewsService, // Ensure NewsService is available
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});