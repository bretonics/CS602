import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { GithubComponent } from './components/github/github.component';
import { WeatherComponent } from './components/weather/weather.component';
import { DirectionsComponent } from './components/directions/directions.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'github', component: GithubComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'directions', component: DirectionsComponent },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
