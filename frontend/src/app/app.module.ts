import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ImageZoomModule} from 'angular2-image-zoom';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { Ph2DataComponent } from './ph2data/ph2data.component';
import { IndexComponent } from './index/index.component';
import { ResultsComponent } from './results/results.component';

import {Ph2ApiService} from './services/ph2-api.service';
import {BackendApiService} from './services/backend-api.service';

@NgModule({
  declarations: [
    AppComponent,
    Ph2DataComponent,
    IndexComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ImageZoomModule,
    HttpClientModule
  ],
  providers: [Ph2ApiService, BackendApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
