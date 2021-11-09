import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseURL = '/app/';
  private addreqUrl = this.baseURL + 'api/v1/ticket/request';

  private getEventsUrl = this.baseURL + 'api/v1/events';
  private getEventDataUrl = this.baseURL + 'api/v1/events/';



  private httpHeaders  = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    .set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    .set('Cache-Control', 'no-cache');


  constructor(private http: HttpClient) { }

  private requestHeaders = {
    headers: this.httpHeaders
  };


  addRequest(data: any): any{
    return this.http.post(this.addreqUrl, data, this.requestHeaders);
  }

  getEvents(): any{
    return this.http.get(this.getEventsUrl, this.requestHeaders);
  }
  getEventsData(data: string): any{
    return this.http.get(this.getEventDataUrl + data, this.requestHeaders);
  }





}
