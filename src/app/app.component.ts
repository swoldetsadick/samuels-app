import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { SpeechReconService } from './shared-services/speech-recon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {

  showSearchButton: boolean;
  speechData: string;
  title: string;

  constructor(private speechReconService: SpeechReconService) {
    this.showSearchButton = true;
    this.speechData = '';
    this.title = 'samuels-app';
  }

  ngAfterViewInit() {
    d3.select('p').style('background-color', 'yellow');
  }

  ngOnDestroy() {
    this.speechReconService.destroySpeechObject();
  }

  ngOnInit() {
    console.log("hello")
  }

  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;
    this.speechReconService.record()
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
            console.log("--restatring service--");
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

}
