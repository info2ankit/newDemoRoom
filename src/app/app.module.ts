import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { SearchComponent } from './search/search.component';
import { SearchJobGroupComponent } from './search/search-job-group/search-job-group.component';
import { SearchJobProfessionComponent } from './search/search-job-profession/search-job-profession.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AlertService} from './service/alert.service';
import {AlertComponent} from './alert/alert.component';
import { RouterModule, Routes } from '@angular/router';
import { AccordianDemoComponent } from './accordian-demo/accordian-demo.component';
import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';

const moreRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'accordian-demo', component: AccordianDemoComponent},
  { path: 'quota', loadChildren: () => import('./modules/quota/quota.module').then(m => m.QuotaModule) }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchJobGroupComponent,
    SearchJobProfessionComponent,
    AlertComponent,
    DashboardComponent,
    AccordianDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    RouterModule.forRoot(moreRoutes),
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },AlertService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
