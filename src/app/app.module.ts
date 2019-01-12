import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SpeechDataService } from './shared-services/speechData/speech-data.service';
import { SpeechReconService } from './shared-services/speechRecon/speech-recon.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,

  ],
  providers: [
    SpeechDataService,
    SpeechReconService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
