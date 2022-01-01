import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom imports
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { SharedModule } from '../shared/shared.module';
import { SubscriptionEventListComponent } from './components/subscription-event-list/subscription-event-list.component';

@NgModule({
  declarations: [
    EventComponent,
    SubscriptionEventListComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule
  ]
})
export class EventModule { }
