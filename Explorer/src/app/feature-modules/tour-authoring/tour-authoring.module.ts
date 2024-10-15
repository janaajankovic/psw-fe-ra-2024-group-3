import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TourComponent } from './tour/tour.component'
import { TourFormComponent } from './tour-form/tour-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TourFormComponent,
    TourComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    TourComponent,
    TourFormComponent
  ]
})
export class TourAuthoringModule { }
