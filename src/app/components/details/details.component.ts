import { Component, OnInit, OnDestroy } from "@angular/core";
("@angular/core");
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Game } from "../../model";
import { HttpService } from "src/app/services/http.service";
@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: string | number = 0;
  gameId: string;
  game: Game;
  private routeSub: Subscription;
  private gameSub: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.gameId = params["id"];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((data) => {
      this.game = data;
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    });
  }

  getColor(value: number): string {
    if (value > 75) {
      return "#5ee432";
    } else if (value > 50) {
      return "#fffa50";
    } else if (value > 30) {
      return "#f7aa38";
    } else {
      return "#ef4655";
    }
  }
}
