import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagCloudComponent } from 'angular-tag-cloud-module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    TagCloudComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TypeaheadModule,
    NgMultiSelectDropDownModule,
    TagCloudComponent
  ],
})
export class SharedModule { }
