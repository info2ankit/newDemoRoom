import { Component, OnInit } from '@angular/core';
import { JobSearchService } from '../service/job-search.service';
import { JobDetail } from '../model/jobdetail.model';
import { AlertService } from './../service/alert.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  jobProfessionData: JobDetail[];
  searchDataForAdvertAPI: number[];
  public alertMessage: any;
  constructor(private _jobService: JobSearchService, public alertService: AlertService) {

  }

  ngOnInit(): void {
  }

  setJobSearchData(value: JobDetail[]) {
    this.jobProfessionData = value;
  }

  setJobProfesssionData(value: number[]) {
    this.searchDataForAdvertAPI = value;
  }
  populateSearchField() {
    this._jobService.getAdvertDetail(this.searchDataForAdvertAPI).subscribe(
      data => {
      }, error => {
          this.alertService.error(error);
      }
    );
  }
}
