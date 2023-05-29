import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    TagCloudComponent,
    BsDatepickerModule.forRoot(),
    FontAwesomeModule,
    Ng2GoogleChartsModule,
    TreeModule,
    ButtonModule,
    OrganizationChartModule,
    TableModule,
    PaginatorModule,
    TooltipModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TypeaheadModule,
    NgMultiSelectDropDownModule,
    TagCloudComponent,
    BsDatepickerModule,
    FontAwesomeModule,
    Ng2GoogleChartsModule,
    TreeModule,
    ButtonModule,
    OrganizationChartModule,
    TableModule,
    PaginatorModule,
    TooltipModule
  ],
})
export class SharedModule {
}
