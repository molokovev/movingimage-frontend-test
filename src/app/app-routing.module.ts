import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { VideoListResolver } from "./resolvers/video-list.resolver";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ListComponent,
    resolve: { videos: VideoListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
