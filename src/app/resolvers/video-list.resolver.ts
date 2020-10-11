import { forkJoin, Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { VideosService } from "../services/videos.service";
import { IVideo, IVideoExtended } from "../models/video.interface";
import { first, map } from "rxjs/operators";
import { IAuthor } from "../models/author.interface";
import { ICategory } from "../models/category.interface";
import { extendVideo } from "../models/video.helpers";

@Injectable({ providedIn: "root" })
export class VideoListResolver implements Resolve<IVideo[]> {
  constructor(private videosService: VideosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IVideoExtended> | Promise<IVideoExtended> | any {
    return forkJoin([this.authors$, this.categories$]).pipe(
      map<[IAuthor[], ICategory[]], IVideoExtended[]>(([authors, categories]) =>
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

  private authors$ = this.videosService.authors$.pipe(
    first((value) => value !== undefined)
  );

  private categories$ = this.videosService.categories$.pipe(
    first((value) => value !== undefined)
  );
}
