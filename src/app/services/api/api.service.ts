import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  private catchError = (error: any) => {
    console.info(error);
    return Observable.throw(error || "Server.error");
  }

  private debug(url: string, method: string, data: any) {
//    console.info("requesting ["+url+"]("+method+") with options: ", data);
  }

  private ContentType(type: string): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': type,
      }),
    };
    return httpOptions;
  }

  public getApi(url: string, params?: any): Observable<any> {
    this.debug(url, "GET", params);
    let options = this.ContentType("application/json");
    options["params"] = params;
    return this.http.get(url, options);
  }

  public postApi(url: string, payload: any): Observable<any> {
    this.debug(url, "POST", payload);
    return this.http.post(url, payload, this.ContentType("application/json"));
  }

  public putApi(url: string, payload: any): Observable<any> {
    this.debug(url, "PUT", payload);
    return this.http.put(url, payload, this.ContentType("application/json"));
  }

  public deleteApi(url: string): Observable<any> {
    this.debug(url, "DELETE", null);
    return this.http.delete(url, this.ContentType("application/json"));
  }

  public fileApi(url: string): Observable<any> {
    this.debug(url, "FILE", null);
    let options = this.ContentType("application/json");
    options["responseType"] = "blob";
    return this.http.get(url, options);
  }

  public uploadApi(url: string, file: any): Observable<any> {
    let fd = new FormData();
    fd.append("file", file);
    return this.http.post(url, fd);
  }
}
