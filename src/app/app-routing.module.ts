import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { EditComponent } from "./components/edit/edit.component";
import { VideoResolver } from "./resolvers/video.resolver";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ListComponent,
  },
  {
    path: ":id",
    pathMatch: "full",
    component: EditComponent,
    resolve: { video: VideoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
