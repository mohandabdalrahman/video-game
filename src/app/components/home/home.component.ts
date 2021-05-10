import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Game } from "src/app/model";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string;
  games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      if (params["game-search"]) {
        this.searchGames("metacrit", params["game-search"]);
      } else {
        this.searchGames("metacrit");
      }
    });
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  searchGames(sort: string, search?: string) {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((data) => {
        this.games = data.results;
      });
  }
  openGameDetails(gameId: string) {
    this.router.navigate(["details", gameId]);
  }
}
