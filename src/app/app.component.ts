import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { SpeechReconService } from './shared-services/speech-recon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  iterator: number = 0;
  languages = [
    {lang: 'en-GB', langName: 'English', flag: '../assets/images/uk.png'},
    {lang: 'fr-FR', langName: 'Français', flag: '../assets/images/france.png'},
    {lang: 'de-DE', langName: 'Deutsch', flag: '../assets/images/germany.png'},
    {lang: 'am-ET', langName: 'አማርኛ', flag: '../assets/images/ethiopia.png'}
  ];
  showSearchButton: boolean;
  selectedLanguage: string;
  speechData: string;
  title: string;

  constructor(private speechReconService: SpeechReconService) {
    this.showSearchButton = true;
    this.selectedLanguage = 'en-us';
    this.speechData = '';
    this.title = "Sam's Learning Web-Application";
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
    this.selectedLanguage = this.languages[this.iterator].lang;
    this.speechReconService.destroySpeechObject();
    this.activateSpeechSearchMovie();
  }

}
