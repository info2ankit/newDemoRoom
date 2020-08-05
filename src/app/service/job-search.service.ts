import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobDetail } from '../model/jobdetail.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  private apiPath = environment.apiPath;
  constructor(private _http: HttpClient) { }

  getJobDetail(searchString: string): Observable<JobDetail[]> {
    return this._http.post<JobDetail[]>(this.apiPath+"/search_titles", { "search": searchString });
  }

  getAdvertDetail(value: number[]): Observable<any> {
    return this._http.post<any>(this.apiPath+"/adverts", {
      "search": {
        "jobTitles": value
      },
      "backends": {
        "broadbean": [
          "stats",
          "boards",
          "companyBoards"
        ],
        "textKernel": [
          "boardCounts",
          "clientBoardCounts",
          "advertiserCounts",
          "similarJobs"
        ]
      }
    });
  }
}
