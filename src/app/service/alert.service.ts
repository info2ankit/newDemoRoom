import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Alert, AlertType }  from '../model/alert.model'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public subject: Subject<any> = new Subject();
  private keepAfterNavigationChange = false;
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    })
  }
  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next(<Alert>{ type: AlertType.Success, message: message });
  }
  getMessage() { 
    return this.subject.asObservable();
  }
  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next(<Alert>{ type: AlertType.Error, message: message });
  }
}