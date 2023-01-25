import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Patient } from 'src/app/shared/model/patient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  url = `${environment.URL_API}${environment.API_PATIENT}`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  savePatient(patient: Patient): Observable<Patient[]> {
    return this.httpClient
      .post<Patient[]>(this.url, JSON.stringify(patient), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllPatient(): Observable<Patient[]> {
    return this.httpClient
      .get<Patient[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPatientById(id: number): Observable<Patient> {
    return this.httpClient
      .get<Patient>(`${this.url}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updatePatient(patient: Patient): Observable<Patient[]> {
    return this.httpClient
      .put<Patient[]>(
        `${this.url}/${patient.id}`,
        JSON.stringify(patient),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePatient(id: Number): Observable<Patient[]> {
    return this.httpClient.delete<Patient[]>(`${this.url}/${id}`);
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
