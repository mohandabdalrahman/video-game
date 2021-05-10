import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        "x-rapidapi-key": "706f06d70cmshd6e104cd515d738p109712jsne17feda4fb72",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      },
      setParams: {
        key: "6962678c49964aaa8c9441a8ecf4163b",
      },
    });
    return next.handle(req);
  }
}
