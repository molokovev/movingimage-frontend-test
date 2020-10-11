import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListComponent } from "./components/list/list.component";
import { VideoListResolver } from "./resolvers/video-list.resolver";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighestQualityFormatPipe } from './pipes/highest-quality-format.pipe';

@NgModule({
  declarations: [AppComponent, ListComponent, HighestQualityFormatPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [VideoListResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
