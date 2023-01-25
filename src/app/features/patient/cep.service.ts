import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cep } from '../../shared/model/cep';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private httpClient: HttpClient) {}

  url = 'https://viacep.com.br/ws';
  formato = 'json';

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  getCep(cep: String): Observable<Cep> {
    return this.httpClient
      .get<Cep>(`${environment.API_CEP}/${cep}/${environment.FORMATO_CEP}/`)
      .pipe(retry(2), catchError(this.handleError));
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
