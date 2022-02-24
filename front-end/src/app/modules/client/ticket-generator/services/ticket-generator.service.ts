import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseUserI } from 'app/shared/interfaces/user.interface';
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


  searchUser(numberIdentif: string): Observable<ApiResponseUserI> {

    let param = {
      numberIdentif
    };

    return this.http.get<ApiResponseUserI>(`${environment.urlAddress}seg/GeneralAdministration/GeneralParameters/enterprise-insert`,
      { params: param });

  }

}
