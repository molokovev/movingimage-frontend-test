import { Injectable } from "@angular/core";
import { forkJoin, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ICategory } from "../models/category.interface";
import { IAuthor } from "../models/author.interface";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class VideosService {
  constructor(private httpClient: HttpClient) {}

  public categories$ = new Subject<ICategory[]>();
  public authors$ = new Subject<IAuthor[]>();

  loadData(): Observable<any> {
    return forkJoin({
      categories: this.loadCategories(),
      authors: this.loadAuthors(),
    }).pipe(
      tap(({ categories, authors }) => {
        this.categories$.next(categories);
        this.authors$.next(authors);
      })
    );
  }

  private loadCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.apiUrl}/categories`);
  }

  private loadAuthors(): Observable<IAuthor[]> {
    return this.httpClient.get<IAuthor[]>(`${environment.apiUrl}/authors`);
  }
}
