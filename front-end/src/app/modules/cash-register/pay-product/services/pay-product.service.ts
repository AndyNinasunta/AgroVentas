import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PayCash } from '../interfaces/pay-product.interface';

@Injectable({
  providedIn: 'root'
})
export class PayProductService {

  /**
    * Constructor
    */
  constructor(private http: HttpClient) { }

  getListTicketsPendsPay(): Observable<any> {
    return this.http.get<any>(
      environment.urlAddress + `/process/wPendTickets`);
  }

  getOneTicketPendPay(): Observable<any> {
    return this.http.get<any>(
      environment.urlAddress + `/process/wPendTickets`);
  }

  payProduct(body: PayCash): Observable<any> {


    return this.http.post<any>(
      environment.urlAddress + `/process/wPayCash`, body);
  }
}
