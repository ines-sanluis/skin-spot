import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ImageZoomModule} from 'angular2-image-zoom';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReportarComponent } from './reportar/reportar.component';
import { AnalizarComponent } from './analizar/analizar.component';

import {FirebaseService} from './services/firebase.service';

import {HotkeyModule} from 'angular2-hotkeys';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ResultsComponent,
    ReportarComponent,
    HeaderComponent,
    FooterComponent,
    AnalizarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ImageZoomModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFireDatabaseModule,
    HotkeyModule
  ],
  providers: [
    FirebaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
