import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from 'app/shared/interfaces/user.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TicketI } from '../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketGeneratorService {

  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }


  searchUser(numberIdentif: string): Observable<UserI[]> {

    let param = {
      Ruc: numberIdentif
    };

    return this.http.get<UserI[]>(environment.urlAddress + `/avService/wDataClientes`,
      { params: param });

  }


  generateTicket(numberIdentif: string): Observable<TicketI[]> {

    let param = {
      Ruc: numberIdentif
    };

    return this.http.get<TicketI[]>(`${environment.urlAddress}/avService/wTicket`,
      { params: param });

  }

}
