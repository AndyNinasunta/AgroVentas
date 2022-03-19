import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserI } from '../shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  logInUser(idNumber: string): Observable<UserI> {
    const param = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Ruc: idNumber,
    };

    return this.httpClient.get<UserI>(
      environment.urlAddress + `/user/wDataClientes`,
      { params: param }
    );
  }
}
