import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LettersComponent } from './letters/letters.component';
import { NumbersComponent } from './numbers/numbers.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpeechDataService } from './shared-services/speechData/speech-data.service';
import { SpeechReconService } from './shared-services/speechRecon/speech-recon.service';
import { Text2SpeechService } from './shared-services/text2Speech/text2-speech.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LettersComponent,
    NumbersComponent,
    PlanetsComponent
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
    Text2SpeechService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
