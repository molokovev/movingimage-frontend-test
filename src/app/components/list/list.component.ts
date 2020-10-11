import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IVideoExtended } from "../../models/video.interface";
import { FormControl } from "@angular/forms";
import { ReleaseDateDisplayFormat, stringifyVideoForSearch } from "../../models/video.helpers";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  videos?: IVideoExtended[];
  searchInput = new FormControl("");
  videosFiltered?: IVideoExtended[];
  releaseDateDisplayFormat = ReleaseDateDisplayFormat;

  ngOnInit(): void {
    this.route.data.subscribe((data: { videos: IVideoExtended[] }) => {
      this.videos = data.videos;
      this.videosFiltered = this.videos.slice();
    });
  }

  search() {
    this.videosFiltered = this.videos.filter((vid) =>
      stringifyVideoForSearch(vid).includes(this.searchInput.value)
    );
  }
}
