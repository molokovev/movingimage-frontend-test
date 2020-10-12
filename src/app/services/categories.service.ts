import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ICategory } from "../models/category.interface";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { single, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  public categories$ = new BehaviorSubject<ICategory[]>([]);

  public loadCategories$(): Observable<ICategory[]> {
    return this.httpClient
      .get<ICategory[]>(`${environment.apiUrl}/categories`)
      .pipe(
        single(),
        tap((categories) => this.categories$.next(categories))
      );
  }
}
