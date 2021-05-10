import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as ObservableThrowError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe( 
      catchError((err) => {
        console.log(
          "🚀 ~ file: http-params.interceptor.ts ~ line 13 ~ HttpErrorInterceptor ~ err",
          err
        );
        return ObservableThrowError(err);
      })
    );
  }
}
