import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/model";

@Component({
  selector: "app-game-tabs",
  templateUrl: "./game-tabs.component.html",
  styleUrls: ["./game-tabs.component.scss"],
})
export class GameTabsComponent implements OnInit {
  @Input() game: Game;
  constructor() {}

  ngOnInit(): void {
    console.log(this.game);
  }
}
