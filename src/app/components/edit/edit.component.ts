import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IVideoExtended } from "../../models/video.interface";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  video?: IVideoExtended;

  ngOnInit(): void {}
}
