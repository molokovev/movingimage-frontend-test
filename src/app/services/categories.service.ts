import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICategory } from "../models/category.interface";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { single } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
  public categories$ = new BehaviorSubject<ICategory[]>([]);

  public loadCategories() {
    this.httpClient
      .get<ICategory[]>(`${environment.apiUrl}/categories`)
      .pipe(single())
      .subscribe((categories) => this.categories$.next(categories));
  }
}
