import { Component } from '@angular/core';

@Component({
  selector: 'app-accordian-demo',
  templateUrl: 'accordian-demo.component.html',
  styleUrls: ['./accordian-demo.component.css']
})
export class AccordianDemoComponent {

  constructor() { }
  panelOpenState = false;
  public stopEvent(event) {
    event.stopPropagation();
  }
}
