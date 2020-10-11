import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { VideosService } from "../services/videos.service";
import { IVideo } from "../models/video.interface";
import { first, map } from "rxjs/operators";
import { IAuthor } from "../models/author.interface";

@Injectable({ providedIn: "root" })
export class VideoListResolver implements Resolve<IVideo[]> {
  constructor(private videosService: VideosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.videosService.authors$.pipe(
      first((value) => value !== undefined),
      map<IAuthor[], IVideo[]>((authors) =>
        authors.reduce((acc, author) => acc.concat(author.videos), [])
      )
    );
  }
}
