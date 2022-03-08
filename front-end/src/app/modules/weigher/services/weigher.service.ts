import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { StateCoatI, VarietysI } from '../interfaces/weigher-combo.interface';

@Injectable({
  providedIn: 'root'
})
export class WeigherService {

  /**
     * Constructor
     */
  constructor(private http: HttpClient) { }

  getListTickets(): Observable<StateCoatI[]> {


    return this.http.get<StateCoatI[]>(
      environment.urlAddress + `/process/wStates`);
  }

  getInfTicket(id_ticket:string): Observable<any[]> {


    return this.http.get<any[]>(
      environment.urlAddress + `/process/wticket`);
  }

  getStateCoat(): Observable<StateCoatI[]> {


    return this.http.get<StateCoatI[]>(
      environment.urlAddress + `/process/wStates`);
  }

  getVarietys(): Observable<VarietysI[]> {


    return this.http.get<VarietysI[]>(
      environment.urlAddress + `/process/wVarietys`);
  }
}
