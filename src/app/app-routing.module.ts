import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LettersComponent } from './letters/letters.component';
import { NumbersComponent } from './numbers/numbers.component';
import { PlanetsComponent } from './planets/planets.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'letters', component: LettersComponent },
  { path: 'numbers', component: NumbersComponent },
  { path: 'planets', component: PlanetsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
