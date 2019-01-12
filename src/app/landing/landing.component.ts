import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { SpeechDataService } from '../shared-services/speechData/speech-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit, OnInit {

  lang: string;
  speechData: string;

  constructor(private speechDataService: SpeechDataService) {
    this.lang = '';
    this.speechData = '';
  }

  ngOnInit() {
    this.speechDataService.currentMessage.subscribe( ( message ) => {
      this.lang = message[0];
      this.speechData = message[1];
    });
  }

  ngAfterViewInit() {
    d3.select('p').style('background-color', 'yellow');
  }

}
