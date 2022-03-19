import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RecipientI, StateCoatI, VarietysI } from '../interfaces/weigher-combo.interface';

@Injectable({
  providedIn: 'root'
})
export class WeigherService {

  /**
     * Constructor
     */
  constructor(private http: HttpClient) { }

  getListTickets(): Observable<any> {


    return this.http.get<any>(
      environment.urlAddress + `/process/wPendTickets`);
  }

  getInfTicket(id_ticket: string): Observable<any[]> {


    let param = {
      idticket: id_ticket
    }
    return this.http.get<any[]>(
      environment.urlAddress + `/process/wTicketData`,
      { params: param });
  }

  getStateCoat(): Observable<StateCoatI[]> {


    return this.http.get<StateCoatI[]>(
      environment.urlAddress + `/process/wStates`);
  }

  getVarietys(): Observable<VarietysI[]> {


    return this.http.get<VarietysI[]>(
      environment.urlAddress + `/process/wVarietys`);
  }

  getRecipient(): Observable<RecipientI[]> {


    return this.http.get<RecipientI[]>(
      environment.urlAddress + `/process/wRecipes`);
  }


  generatePesaje(body: string): Observable<any> {


    return this.http.post<any>(
      `${environment.urlAddress}/process/wPesaje`, body
    );
  }


  discardTicket(id_ticket: string): Observable<any> {


    return this.http.get<any>(
      `${environment.urlAddress}/process/wInvalidateTicket?idticket=${id_ticket}`);
  }


}
