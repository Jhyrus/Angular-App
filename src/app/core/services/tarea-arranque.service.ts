import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaArranqueService {

  constructor(
    private httpclient: HttpClient
  ) { }

  public listFiles(path: string, body: any): Observable<any> {
    return this.httpclient.post(path, body)
  }

  public getResults(path: string, body: any): Observable<any> {
    return this.httpclient.post(path, body)
  }

}
