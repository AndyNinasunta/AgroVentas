import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewTicketTabService {

  /**
     * Constructor
     */
  constructor(private http: HttpClient) { }


  generateTicket(numberIdentif: string): Observable<any> {
    let param = {
      Ruc: numberIdentif,
    };

    return this.http.get<any>(
      `${environment.urlAddress}/process/wTicket`,
      { params: param }
    );
  }
}
