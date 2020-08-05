import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap, tap, distinct } from 'rxjs/operators';
import { JobDetail } from '../../model/jobdetail.model';
import { JobSearchService } from '../../service/job-search.service';
import { AlertService } from './../../service/alert.service';

@Component({
  selector: 'app-search-job-group',
  templateUrl: './search-job-group.component.html',
  styleUrls: ['./search-job-group.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class SearchJobGroupComponent implements OnInit {
  searchValue: string = '';
  hideAutoSuggestion: boolean = false;
  subscription:Subscription;
  uniqueJobGroups:{}[];

  @Output() jobGroupSearch = new EventEmitter<JobDetail[]>();
  jobDetails = new Array<JobDetail>();
  searchTextChanged = new Subject<string>();
  
  constructor(private _jobService: JobSearchService, private _eref: ElementRef, private alertService:AlertService) {

  }

  ngOnInit(): void {
    this.subscription = this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(data => this.getJobDetailInformation(data)),
    ).subscribe(
      (res: {[key: string]: any}) => {
        this.jobDetails = res.jobTitles.map(jobInfo => {          
          return new JobDetail(jobInfo.profession, jobInfo.profession_code, jobInfo.job_group, jobInfo.job_class);
        });
        this.uniqueJobGroups = [...new Set(res.jobTitles.map(jobInfo => jobInfo.job_group))];
        this.jobGroupSearch.emit(this.jobDetails);
      },error => {
        this.alertService.error(error);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  getJobDetailInformation(info) {
    return this._jobService.getJobDetail(info)
  }

  search($event) {
    this.hideAutoSuggestion = false;
    return this.makeApiCall($event.target.value);
  }

  populateSearchField(value) {
    this.searchValue = value;
    this.hideAutoSuggestion = true;
    return this.makeApiCall(value);
  }

  makeApiCall(value) {
    return this.searchTextChanged.next(value);
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) { // or some similar check
      this.hideAutoSuggestion = true;
    }
  }
}