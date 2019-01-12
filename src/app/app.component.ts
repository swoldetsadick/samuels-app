import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { SpeechReconService } from './shared-services/speech-recon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

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
  showSearchButton: boolean;
  selectedLanguage: string;
  speechData: string;
  title: string;

  constructor(private speechReconService: SpeechReconService) {
    this.iterator = 1;
    this.selectedLanguage = this.languages[this.iterator].lang;
    this.speechData = '';
    this.title = this.titles[this.iterator].text;
  }

  ngAfterViewInit() {
    d3.select('p').style('background-color', 'yellow');
  }

  ngOnDestroy() {
    this.speechReconService.destroySpeechObject();
  }

  ngOnInit() {
    this.activateSpeechSearchMovie();
  }

  public activateSpeechSearchMovie(): void {
    this.showSearchButton = false;
    this.speechReconService.record(this.selectedLanguage)
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          console.log(value);
        },
        //error
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restarting service--");
            this.activateSpeechSearchMovie();
          }
        },
        //completion
        () => {
          this.showSearchButton = true;
          console.log("--complete--");
          this.activateSpeechSearchMovie();
        });
  }

  public changeLanguage() {
    if (this.iterator === 3) {
      this.iterator = 0;
    } else {
      this.iterator += 1;
    }
    this.title = this.titles[this.iterator].text;
    this.selectedLanguage = this.languages[this.iterator].lang;
    this.speechReconService.destroySpeechObject();
    this.activateSpeechSearchMovie();
  }

}
