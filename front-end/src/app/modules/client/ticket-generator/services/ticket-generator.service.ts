import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from 'app/shared/interfaces/user.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

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


  generateTicket(params: UserI): Observable<UserI> {

    return this.http.post<UserI>(`${environment.urlAddress}seg/GeneralAdministration/GeneralParameters/enterprise-insert`,
      params);

  }

}
