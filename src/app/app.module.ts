import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListComponent } from "./components/list/list.component";
import { VideoListResolver } from "./resolvers/video-list.resolver";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, ListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [VideoListResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
