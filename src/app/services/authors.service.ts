import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { single, tap } from "rxjs/operators";
import { IAuthor } from "../models/author.interface";

@Injectable({
  providedIn: "root",
})
export class AuthorsService {
  constructor(private httpClient: HttpClient) {}

  public authors$ = new BehaviorSubject<IAuthor[]>([]);

  public loadAuthors$(): Observable<IAuthor[]> {
    return this.httpClient.get<IAuthor[]>(`${environment.apiUrl}/authors`).pipe(
      single(),
      tap((authors) => this.authors$.next(authors))
    );
  }
}
