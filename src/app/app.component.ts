import { Component, OnDestroy, OnInit } from '@angular/core';

import { SpeechDataService } from './shared-services/speechData/speech-data.service';
import { SpeechReconService } from './shared-services/speechRecon/speech-recon.service';
import { Text2SpeechService } from './shared-services/text2Speech/text2-speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // Un-mutable variables
  languages = [
    {lang: 'en-GB', langName: 'English', flag: '../assets/images/uk.png'},
    {lang: 'fr-FR', langName: 'Français', flag: '../assets/images/france.png'},
    {lang: 'de-DE', langName: 'Deutsch', flag: '../assets/images/germany.png'},
    {lang: 'am-ET', langName: 'አማርኛ', flag: '../assets/images/ethiopia.png'}
  ];
  titles = [
    {text: 'Samuel´s Educational Application'},
    {text: 'L´Application Educative de Samuel'},
    {text: 'Samuel´s Bildungsapplikation'},
    {text: 'የሳሙኤል፡መማርያ፡አፕሊኬሽን፡፡'},
  ];

  // Mutable variables
  iterator: number;
  selectedLanguage: string;
  speechData: string;
  title: string;

  constructor(private speechReconService: SpeechReconService, private speechDataService: SpeechDataService,
              private text2SpeechService: Text2SpeechService) {
    this.iterator = 1;
    this.selectedLanguage = this.languages[this.iterator].lang;
    this.speechData = '';
    this.title = this.titles[this.iterator].text;
    this.speechDataService.changeMessage([this.languages[this.iterator].lang, this.speechData]);
  }

  ngOnDestroy() {
    this.speechReconService.destroySpeechObject();
  }

  ngOnInit() {
    this.activateSpeechSearchMovie();
    this.speechDataService.currentMessage.subscribe( ( message ) => {
      this.selectedLanguage = message[0];
      this.speechData = message[1];
    });
  }

  public activateSpeechSearchMovie(): void {
    this.speechReconService.record(this.selectedLanguage)
      .subscribe(
        (value) => {
          this.speechData = value;
          this.speechDataService.changeMessage([this.languages[this.iterator].lang, this.speechData]);
          setTimeout(()=>{ this.speechData = '' }, 4000);
        }, (err) => { if (err.error == "no-speech") { this.activateSpeechSearchMovie(); }
        }, () => { this.activateSpeechSearchMovie();});
  }

  public announceSelectedLanguague() {
    var message = '';
    if (this.selectedLanguage === 'am-ET') {
      message = 'ቋንቋ:ምርጫ:: አማረኛ';
    } else if (this.selectedLanguage === 'de-DE') {
      message = 'Sprachauswahl, Deutsch.';
    } else if (this.selectedLanguage === 'en-GB') {
      message = 'Selected Language, English.';
    } else {
      message = 'Langue sélectionnée, Français.';
    }
    this.text2SpeechService.speak(message, this.selectedLanguage);
  }

  public changeLanguage() {
    if (this.iterator === this.languages.length) {
      this.iterator = 0;
    } else {
      this.iterator += 1;
    }
    this.title = this.titles[this.iterator].text;
    this.selectedLanguage = this.languages[this.iterator].lang;
    this.speechReconService.destroySpeechObject();
    this.changeMessage();
    this.announceSelectedLanguague();
    this.activateSpeechSearchMovie();
  }

  public changeMessage() {
    this.speechDataService.changeMessage([this.languages[this.iterator].lang, this.speechData]);
  }

}
