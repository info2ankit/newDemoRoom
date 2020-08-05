import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-accordion-content',
  templateUrl: './accordion-content.component.html',
  styleUrls: ['./accordion-content.component.css'],
})
export class AccordionContentComponent implements OnInit {
  @Input() form: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor() {}

  ngOnInit(): void {}
  panelOpenState = false;
  public stopEvent(event) {
    event.stopPropagation();
  }
}
