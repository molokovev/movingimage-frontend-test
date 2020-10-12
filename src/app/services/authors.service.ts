import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { single } from "rxjs/operators";
import { IAuthor } from "../models/author.interface";

@Injectable({
  providedIn: "root",
})
export class AuthorsService {
  constructor(private httpClient: HttpClient) {}

  public authors$ = new BehaviorSubject<IAuthor[]>([]);

  public loadAuthors() {
    return this.httpClient
      .get<IAuthor[]>(`${environment.apiUrl}/authors`)
      .pipe(single())
      .subscribe((authors) => this.authors$.next(authors));
  }
}
