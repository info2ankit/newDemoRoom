import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuotaComponent } from './quota.component';
import { AccordionFbModule } from '../shared/accordion-fb/accordion-fb.module';


const routes: Routes = [
  { path: '', component: QuotaComponent }
];

@NgModule({
  declarations: [QuotaComponent],
  imports: [
    CommonModule,
    AccordionFbModule,
    RouterModule.forChild(routes)
  ]
})
export class QuotaModule { }
