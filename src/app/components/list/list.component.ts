import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IVideo } from "../../models/video.interface";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  videos?: IVideo[];

  ngOnInit(): void {
    this.route.data.subscribe((data: { videos: IVideo[] }) => {
      this.videos = data.videos;
    });
  }
}
