import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Ph2DataComponent} from './ph2data/ph2data.component';
import {IndexComponent} from './index/index.component';
import {AnalizarComponent} from './analizar/analizar.component';
import {ResultsComponent} from './results/results.component';
import {ReportarComponent} from './reportar/reportar.component';

const routes: Routes = [
  {path: '', redirectTo:'/index', pathMatch:'full'},
  {path: 'index', component: IndexComponent},
  {path: 'database', component: Ph2DataComponent},
  {path: 'analizar', component: AnalizarComponent},
  {path: 'reportar', component: ReportarComponent},
  {path:'results', component: ResultsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
