import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';

@NgModule({
  declarations: [
    EventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
