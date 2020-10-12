import { EMPTY, Observable, of } from "rxjs";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { IVideo, IVideoExtended } from "../models/video.interface";
import { CategoriesService } from "../services/categories.service";
import { AuthorsService } from "../services/authors.service";
import { first, map, mergeMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class VideoResolver implements Resolve<IVideo> {
  constructor(
    private categoriesService: CategoriesService,
    private authorsService: AuthorsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IVideoExtended> | Promise<IVideoExtended> | any {
    const idParam = route.paramMap.get("id");
    if (!idParam) {
      this.router.navigate(["/"]);
      return;
    }

    const videoId = parseInt(idParam);

    return this.authorsService.authors$.pipe(
      first(),
      mergeMap(this.getAuthorsOrLoad()),
      map((authors) => {
        const author = authors.find((author) =>
          author.videos.some((v) => v.id === videoId)
        );

        const unknownVideoId = !author;
        if (unknownVideoId) {
          this.router.navigate(["/"]);
          return EMPTY;
        }

        return author.videos.find((x) => x.id === videoId);
      })
    );
  }

  private getAuthorsOrLoad() {
    return (authors) => {
      if (authors.length === 0) {
        return this.authorsService.loadAuthors$();
      } else {
        return of(authors);
      }
    };
  }
}
