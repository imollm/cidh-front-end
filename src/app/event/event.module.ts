import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { SharedModule } from '../shared/shared.module';
import { AccessToEventComponent } from './components/access-to-event/access-to-event.component';

@NgModule({
  declarations: [
    EventComponent,
    AccessToEventComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule
  ]
})
export class EventModule { }
