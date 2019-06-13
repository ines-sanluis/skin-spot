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
import {FirebaseService} from './services/firebase.service';

import { ReportarComponent } from './reportar/reportar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    Ph2DataComponent,
    IndexComponent,
    ResultsComponent,
    ReportarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ImageZoomModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFireDatabaseModule,
  ],
  providers: [
    Ph2ApiService,
    BackendApiService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
