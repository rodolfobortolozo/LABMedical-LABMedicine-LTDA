import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = `${environment.URL_API}${environment.API_USER}`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  getUser(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveUser(user: User): Observable<User[]> {
    return this.httpClient
      .post<User[]>(this.url, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserLogin(email: string, password: string): Observable<User[]> {
    return this.httpClient
      .get<User[]>(
        `${this.url}?email=${email}&password=${password}`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  login(email: string, password: string): Observable<any> {
    return this.getUserLogin(email, password).pipe(
      tap((users: User[]) => {
        users.find((user) => {
          if (user.email === email && user.senha === password) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', user.email + user.senha + user.nome); // Token Ficticio com email senha e nome tudo junto
            user.sucesso = true;
            this.router.navigate(['']);
          } else {
            user.sucesso = false;
            //this.router.navigate(['/login']);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        });
      })
    );
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? user : '{}';
  }

  getCurrentToken(): any {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    //console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
