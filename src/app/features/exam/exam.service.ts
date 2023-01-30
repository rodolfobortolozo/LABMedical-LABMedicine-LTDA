import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Exam } from 'src/app/shared/model/exam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  url = `${environment.URL_API}${environment.API_EXAM}`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  saveExam(exam: Exam): Observable<Exam[]> {
    return this.httpClient
      .post<Exam[]>(this.url, JSON.stringify(exam), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllExam(): Observable<Exam[]> {
    return this.httpClient
      .get<Exam[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getExamById(id: Number): Observable<Exam> {
    return this.httpClient
      .get<Exam>(`${this.url}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getExamByPatientId(id: Number): Observable<Exam[]> {
    return this.httpClient
      .get<Exam[]>(`${this.url}/?idPatient=${id}&_sort=dtaExame&_order=desc`)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateExam(exam: Exam): Observable<Exam[]> {
    return this.httpClient
      .put<Exam[]>(
        `${this.url}/${exam.id}`,
        JSON.stringify(exam),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteExam(id: Number): Observable<Exam[]> {
    return this.httpClient.delete<Exam[]>(`${this.url}/${id}`);
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
