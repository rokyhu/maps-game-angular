import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'tutorial', component: TutorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
