import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../services/api-service.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  events = [];
  loaded = false;

  constructor(private api: ApiServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getEvents();
  }


  getEvents(): void{

    this.spinner.show('querySpinner');
    this.api.getEvents().subscribe((res: any) => {
      this.loaded = true;
      this.events = res.results.events;
      console.log(this.events[0]['created_at'])
      this.spinner.hide('querySpinner');
      console.log(res)
    })

  }

}
