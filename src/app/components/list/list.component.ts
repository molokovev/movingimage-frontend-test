import { Component, OnDestroy, OnInit } from "@angular/core";
import { IVideoExtended } from "../../models/video.interface";
import { FormControl } from "@angular/forms";
import {
  extendVideo,
  ReleaseDateDisplayFormat,
  stringifyVideoForSearch,
} from "../../models/video.helpers";
import { combineLatest, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { IAuthor } from "../../models/author.interface";
import { ICategory } from "../../models/category.interface";
import { CategoriesService } from "../../services/categories.service";
import { AuthorsService } from "../../services/authors.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private authorsService: AuthorsService,
    private categoriesService: CategoriesService
  ) {}

  private subs = new Subscription();
  private videos: IVideoExtended[] = [];
  searchInput = new FormControl("");
  videosFiltered: IVideoExtended[] = [];
  releaseDateDisplayFormat = ReleaseDateDisplayFormat;

  ngOnInit(): void {
    this.subs.add(
      this.getVideos$().subscribe((videos) => {
        this.videos = videos;
        this.videosFiltered = this.videos.slice();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  search() {
    this.videosFiltered = this.videos.filter((vid) =>
      stringifyVideoForSearch(vid).includes(this.searchInput.value)
    );
  }

  private getVideos$(): Observable<IVideoExtended[]> {
    return combineLatest([
      this.authorsService.authors$,
      this.categoriesService.categories$,
    ]).pipe(
      map(([authors, categories]) =>
        authors.reduce(
          (acc, author) =>
            acc.concat(
              author.videos.map((vid) => extendVideo(vid, author, categories))
            ),
          []
        )
      )
    );
  }
}
