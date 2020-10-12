import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "./services/categories.service";
import { AuthorsService } from "./services/authors.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private authorsService: AuthorsService
  ) {}
  ngOnInit(): void {
    this.categoriesService.loadCategories$().subscribe();
    this.authorsService.loadAuthors$().subscribe();
  }
}
