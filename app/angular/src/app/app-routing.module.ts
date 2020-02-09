import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: '**', component: ErrorPageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
