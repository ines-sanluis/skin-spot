import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResultsComponent} from './results/results.component';
import {Ph2DataComponent} from './ph2data/ph2data.component';
import {UploadComponent} from './upload/upload.component';

const routes: Routes = [
  {path: '', redirectTo:'/upload', pathMatch:'full'},
  {path: 'results', component: ResultsComponent},
  {path: 'database', component: Ph2DataComponent},
  {path: 'upload', component: UploadComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
