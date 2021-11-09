import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../services/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {error} from 'protractor';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-ticket-data',
  templateUrl: './ticket-data.component.html',
  styleUrls: ['./ticket-data.component.scss']
})
export class TicketDataComponent implements OnInit {

  id: any;
  bgOne = 'https://comorosinc.com/events-flyers/dream-ghost.png';
  myFormGroup: FormGroup;
  total = 0;
  eventData: any;
  loaded = false;

  constructor(private api: ApiServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) {
    this.id = '';


    this.myFormGroup = this.formBuilder.group({
      firstName: [],
      lastName: [],
      name: [],
      quantity: [],
      email: [],
      mobile: [],
      event_id: [''],
      ticket_type: ['']
    });

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params.uuid;
      this.getData(this.id)
    });
  }

  getTotal(): void{
    if (this.myFormGroup.get('ticket_type')?.value && this.myFormGroup.get('quantity')?.value){
      const priceData = this.eventData.event.prices;
      const price = priceData.filter((val: any) => val.name === this.myFormGroup.get('ticket_type')?.value.toString());
      this.total = Number(price[0].amount) * Number(this.myFormGroup.get('quantity')?.value);
    }

  }

  submit(): void{
    this.myFormGroup.get('event_id')?.setValue(this.id);
    this.myFormGroup.get('name')?.setValue(this.myFormGroup.get('firstName')?.value + ' ' + this.myFormGroup.get('lastName')?.value);
    this.myFormGroup.get('quantity')?.setValue(Number(this.myFormGroup.get('quantity')?.value));
    console.log(this.myFormGroup.value)
    this.spinner.show('processTicket');
    this.api.addRequest(this.myFormGroup.value).subscribe((res: any) => {
      if(res.success){
        window.location.href = res.results.url;
      }
      else{
        this.spinner.hide('processTicket');
      }

    }, (error: HttpErrorResponse) => {
      this.spinner.hide('processTicket');
    });
  }

  getData(id: string): void{
    this.spinner.show('querySpinner');
    this.api.getEventsData(id).subscribe((res: any) => {
      this.loaded = true;
      this.spinner.hide('querySpinner');
      this.eventData = res.results;
      console.log(this.eventData)
    });
  }

}
