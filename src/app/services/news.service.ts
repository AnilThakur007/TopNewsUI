import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_CONSTANTS } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getStories(pageNumber: number, pageSize: number, searchQuery?: string): Observable<any> {
    const apiUrl = API_CONSTANTS.BASE_URL + API_CONSTANTS.ENDPOINTS.TOP_STORIES;
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
  
    if (searchQuery) {
      params = params.set('searchQuery', searchQuery);
    }
  
    return this.http.get<any>(apiUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching stories:', error);
        return throwError(() => new Error('Failed to load stories. Please try again later.'));
      })
    );
  }
}
