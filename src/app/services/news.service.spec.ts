import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { API_CONSTANTS } from '../constants/api-constants';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch stories with the given parameters', () => {
    const mockResponse = { data: ['story1', 'story2'] }; // Mocked API response
    const pageNumber = 1;
    const pageSize = 10;
    const searchQuery = 'angular';

    service.getStories(pageNumber, pageSize, searchQuery).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.TOP_STORIES}?pageNumber=${pageNumber}&pageSize=${pageSize}&searchQuery=${searchQuery}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    const pageNumber = 1;
    const pageSize = 10;
    const searchQuery = 'angular';

    service.getStories(pageNumber, pageSize, searchQuery).subscribe(
      () => fail('Should have failed with an error'),
      (error) => {
        expect(error.message).toBe('Failed to load stories. Please try again later.');
      }
    );

    const req = httpMock.expectOne(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.TOP_STORIES}?pageNumber=${pageNumber}&pageSize=${pageSize}&searchQuery=${searchQuery}`
    );
    expect(req.request.method).toBe('GET');
    req.flush('Error message', { status: 500, statusText: 'Server Error' });
  });
});