import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IVideoExtended } from "../../models/video.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  video?: IVideoExtended;
  form: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { video: IVideoExtended }) => {
      // TODO: video model is not extended
      this.video = data.video;
      this.initForm();
    });
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.video.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      author: new FormControl(this.video.authorName, [
        Validators.required,
        Validators.minLength(1),
      ]),
      categories: new FormControl(this.video.categoryNames),
    });
  }

  save() {
    // TODO
  }

  cancel() {
    this.router.navigate(["/"]);
  }
}
