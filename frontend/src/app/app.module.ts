import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ImageZoomModule} from 'angular2-image-zoom';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { Ph2DataComponent } from './ph2data/ph2data.component';
import {Ph2ApiService} from './services/ph2-api.service';
import { IndexComponent } from './index/index.component'

@NgModule({
  declarations: [
    AppComponent,
    Ph2DataComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ImageZoomModule,
    HttpClientModule
  ],
  providers: [Ph2ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
