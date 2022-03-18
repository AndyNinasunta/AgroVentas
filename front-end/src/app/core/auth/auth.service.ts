import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import {
    LoginResponseApiI,
    RegisterResponseApiI,
    UserI,
} from 'app/shared/interfaces/user.interface';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    /**
     * Setter & getter for access token
     */
    set user(res: any) {
        let user = {
            nombre: res.nombre,
            rolus: res.rolus,
            usrid: res.usrid
        };

        localStorage.setItem('user', JSON.stringify(user));
    }

    get user(): string {
        return localStorage.getItem('user') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(us: string, ps: string): Observable<LoginResponseApiI> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        let param = {
            us,
            ps,
        };

        return this._httpClient
            .get<LoginResponseApiI>(`${environment.urlAddress}/user/wLogin`, {
                params: param,
            })
            .pipe(
                switchMap((response: any) => {
                    if (response.rolus !== 'Sin acceso') {
                        // Store the access token in the local storage
                        this.accessToken =
                            'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6NjQwNjcyNzEyMTUsImlhdCI6MTY0NzU5MTIxNX0.2Rqt4g3tj5U6-nzW7gknHgPXD7W7bzbBigN_eRM1-o0';

                        // Set the authenticated flag to true
                        this._authenticated = true;

                        this.user = response;
                        // Store the user on the user service
                        // this._userService.user = response.user;
                    }
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient
            .post('api/auth/refresh-access-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6NjQwNjcyNzEyMTUsImlhdCI6MTY0NzU5MTIxNX0.2Rqt4g3tj5U6-nzW7gknHgPXD7W7bzbBigN_eRM1-o0';

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Register
     *
     * @param user
     */
    registerUser(user: UserI): Observable<RegisterResponseApiI> {
        const param = new HttpParams()
            .set('NomR', user.cliente)
            .set('DirR', user.direccion)
            .set('RucR', user.ruc)
            .set('EmaR', user.mail)
            .set('TelR', user.telefono);
        console.log(param.toString());

        return this._httpClient.post<RegisterResponseApiI>(
            `${environment.urlAddress}/user/wRegistrar?${param.toString()}`,
            []
        );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
