import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StartPageComponent } from "./pages/start-page/start-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { EventsPageComponent } from "./pages/events-page/events-page.component";
import { EventEditorComponent } from "./pages/events-page/event-editor/event-editor.component";

import { EventResolver } from "./resolvers/event.resolver";
import { CalendarPageComponent } from "./pages/calendar-page/calendar-page.component";
import { CalendarEventsResolver } from "./resolvers/calendar-events.resolver";
import { AuthPageComponent } from "./pages/auth-page/auth-page.component";

const routes: Routes = [
  { path: "", component: StartPageComponent },
  {
    path: "events",
    component: EventsPageComponent,
    children: [
      { path: "edit", component: EventEditorComponent },
      {
        path: "edit/:id",
        component: EventEditorComponent,
        resolve: { appEvent: EventResolver }
      }
    ]
  },
  {
    path: "calendar",
    component: CalendarPageComponent,
    resolve: { calendarEvents: CalendarEventsResolver }
  },
  {
    path: "calendar/:id",
    component: CalendarPageComponent,
    runGuardsAndResolvers: "pathParamsChange",
    resolve: { calendarEvents: CalendarEventsResolver }
  },
  {
    path: "auth",
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "register",
        component: AuthPageComponent
      },
      {
        path: "login",
        component: AuthPageComponent
      }
    ]
  },
  { path: "**", component: NotFoundPageComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
