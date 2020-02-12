import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartPageComponent } from "./pages/start-page/start-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { EventsPageComponent } from "./pages/events-page/events-page.component";
import { EventEditorComponent } from "./pages/events-page/event-editor/event-editor.component";

const routes: Routes = [
  { path: "", component: StartPageComponent },
  {
    path: "events",
    component: EventsPageComponent,
    children: [
      { path: "edit", component: EventEditorComponent },
      { path: "edit/:id", component: EventEditorComponent }
    ]
  },
  { path: "**", component: NotFoundPageComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
