import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  /**
    * Register
    *
    * @param user
    */
  registerUser(user: any): Observable<any> {
    const param = new HttpParams()
      .set('NomR', user.cliente)
      .set('DirR', user.direccion)
      .set('RucR', user.ruc)
      .set('EmaR', user.mail)
      .set('TelR', user.telefono);
    console.log(param.toString());

    return this.httpClient.post<any>(
      `${environment.urlAddress}/user/wRegistrar?${param.toString()}`,
      []
    );
  }



}
