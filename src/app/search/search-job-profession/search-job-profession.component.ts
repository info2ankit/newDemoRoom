import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { JobDetail } from '../../model/jobdetail.model';
import { JobSearchService } from '../../service/job-search.service';
import {  IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-search-job-profession',
  templateUrl: './search-job-profession.component.html',
  styleUrls: ['./search-job-profession.component.css']
})

export class SearchJobProfessionComponent implements OnInit , OnChanges{
  dropdownSettings:IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  professionCode:number[] = [];

  @Input() jobDetails:JobDetail[];
  @Output() professionCodeEmitter = new EventEmitter<number[]>();

  constructor(private _jobService:JobSearchService){
  }

  ngOnChanges(){
    this.dropdownList = this.jobDetails;
    this.selectedItems = [];
    this.professionCode = [];
  }

  ngOnInit() {
    this.dropdownList = this.jobDetails;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'profession_code',
      textField: 'profession',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    this.professionCode.push(item.profession_code);
    this.professionCodeEmitter.emit(this.professionCode);
  }

  onDeSelect(item: any) {
    const index = this.professionCode.indexOf(item.profession_code);
    if (index > -1) {
      this.professionCode.splice(index, 1);
    }
  }

  onSelectAll(items: any) {
    items.forEach((item) => this.professionCode.push(item.profession_code));
    this.professionCodeEmitter.emit(this.professionCode);
  }

  onDeSelectAll(items: any) {
    this.professionCode = [];
  }
}