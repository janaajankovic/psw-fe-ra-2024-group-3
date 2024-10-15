import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { Problem } from './model/problem.model';
import { TourReview } from './model/tour-review.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http : HttpClient) { }

  getProblems(): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>('https://localhost:44333/api/tourist/problem/all')
  }

  getReviews(): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>('https://localhost:44333/api/tourist/review')
  }


  addTourReview(tourReview : TourReview): Observable<PagedResults<TourReview>> {
    console.log(tourReview);
    return this.http.post<PagedResults<TourReview>>('https://localhost:44333/api/tourist/review',tourReview)
  }
}
