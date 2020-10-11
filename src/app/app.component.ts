import { Component, OnInit } from "@angular/core";
import { VideosService } from "./services/videos.service";
import { single } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private videosService: VideosService) {}
  ngOnInit(): void {
    this.videosService.loadData().pipe(single()).subscribe();
  }
}
