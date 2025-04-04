import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LiveNotificationComponent } from './live-notification.component.ts/live-notification.component';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    ImageComponent,
    MapComponent,
    LiveNotificationComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  exports: [
    ImageComponent, MapComponent, LiveNotificationComponent, NotificationComponent
  ],
  
})
export class SharedModule { }
