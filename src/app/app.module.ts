import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechReconService } from './shared-services/speech-recon.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,

  ],
  providers: [
    SpeechReconService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
