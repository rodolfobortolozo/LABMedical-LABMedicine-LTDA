import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Consult } from 'src/app/shared/model/consult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultService {
  url = `${environment.URL_API}${environment.API_CONSULT}`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  saveConsult(consult: Consult): Observable<Consult[]> {
    return this.httpClient
      .post<Consult[]>(this.url, JSON.stringify(consult), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllConsult(): Observable<Consult[]> {
    return this.httpClient
      .get<Consult[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getConsultById(id: Number): Observable<Consult[]> {
    return this.httpClient
      .get<Consult[]>(`${this.url}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getExamByPatientId(id: Number): Observable<Consult[]> {
    return this.httpClient
      .get<Consult[]>(`${this.url}/?idPatient=${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
  updateConsult(consult: Consult): Observable<Consult[]> {
    return this.httpClient
      .put<Consult[]>(
        `${this.url}/${consult.id}`,
        JSON.stringify(consult),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteConsult(id: Number): Observable<Consult[]> {
    return this.httpClient.delete<Consult[]>(`${this.url}/${id}`);
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
