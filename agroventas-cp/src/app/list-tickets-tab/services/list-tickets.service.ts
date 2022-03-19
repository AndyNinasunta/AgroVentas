import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TicketNotWeighedI,
  TicketWeighedI,
} from 'src/app/shared/interfaces/shared.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListTicketsService {
  constructor(private httpClient: HttpClient) {}

  getNotWeighedItems(idUser: string): Observable<TicketNotWeighedI[]> {
    const param = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      idnt: idUser,
    };

    return this.httpClient.get<TicketNotWeighedI[]>(
      environment.urlAddress + `/process/wNotWeighedTickets`,
      { params: param }
    );
  }

  getWeighedItems(idUser: string): Observable<TicketWeighedI[]> {
    const param = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      idnt: idUser,
    };

    return this.httpClient.get<TicketWeighedI[]>(
      environment.urlAddress + `/process/wProcessedTickets`,
      { params: param }
    );
  }
}
