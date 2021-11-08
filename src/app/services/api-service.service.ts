import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseURL = 'https://comorosinc.com/TwoAmInTortuga/';
  private addreqUrl = this.baseURL + 'save.php';



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





}
