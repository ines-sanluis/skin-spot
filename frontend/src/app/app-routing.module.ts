import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Ph2DataComponent} from './ph2data/ph2data.component';
import {IndexComponent} from './index/index.component';
import {ResultsComponent} from './results/results.component';

const routes: Routes = [
  {path: '', redirectTo:'/index', pathMatch:'full'},
  {path: 'database', component: Ph2DataComponent},
  {path: 'index', component: IndexComponent},
  {path:'results', component: ResultsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
