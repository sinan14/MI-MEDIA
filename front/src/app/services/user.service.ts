import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private _host: string = environment.baseUrl;
  public pdfLink: string = '';
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  uploadResume(data: any) {
    const api = `${this._host}/careers`;
    return this.http.post<any>(api, data).pipe(catchError(this.handleError));
  }
  loadApplication() {
    const api = `${this._host}/careers`;
    return this.http.get<any>(api).pipe(catchError(this.handleError));
  }
  deleteApplication(id) {
    const api = `${this._host}/careers/${id}`;
    return this.http.delete<any>(api).pipe(catchError(this.handleError));
  }
}
