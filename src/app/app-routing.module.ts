import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketComponent} from './ticket/ticket.component';
import {TicketDataComponent} from './ticket-data/ticket-data.component';
import {SuccessComponent} from './success/success.component';
import {CancelComponent} from './cancel/cancel.component';

const routes: Routes = [
  {path: 'tickets', component: TicketComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'cancelled', component: CancelComponent},
  {path: 'ticket/:uuid', component: TicketDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
