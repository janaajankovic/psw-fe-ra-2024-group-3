import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubsFormComponent } from './clubs-form/clubs-form.component';
import { ObjectComponent } from './object/object.component';
import { ObjectFormComponent } from './object-form/object-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TourComponent } from './tour/tour.component'
import { TourFormComponent } from './tour-form/tour-form.component';
import { MatButtonModule } from '@angular/material/button';
import { TourEquipmentComponent } from './tour-equipment/tour-equipment.component';
import { KeyPointComponent } from './key-point/key-point/key-point.component';
import { FormsModule } from '@angular/forms';
import { KeyPointFormComponent } from './key-point-form/key-point-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExploreToursComponent } from './explore-tours/explore-tours';
import { TourReviewFormComponent } from './tour-review-form/tour-review-form.component';

import { KeyPointUpdateFormComponent } from './key-point-update-form/key-point-update-form.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    ClubsComponent,
    ClubsFormComponent,
    ObjectComponent,
    ObjectFormComponent,
    TourFormComponent,
    TourComponent,
    TourEquipmentComponent,
    KeyPointComponent,
    KeyPointFormComponent,
    ExploreToursComponent,
    KeyPointUpdateFormComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  exports: [
    ClubsComponent,
    TourComponent,
    TourFormComponent,
    TourEquipmentComponent,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    ObjectComponent,
    ReactiveFormsModule,
    TourComponent,
    TourFormComponent,
    ExploreToursComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TourAuthoringModule { }
