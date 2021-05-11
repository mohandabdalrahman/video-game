import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin } from "rxjs";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { APIResponse, Game } from "../model";
@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    orderings: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set("ordering", orderings);
    if (search) {
      params = new HttpParams()
        .set("ordering", orderings)
        .set("search", search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailerRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp["gameInfoRequest"],
          screenshots: resp["gameScreenshotsRequest"],
          trailers: resp["gameTrailersRequest"],
        };
      })
    );
  }
}
