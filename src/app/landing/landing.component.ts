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

    d3.select('#letters')
      .style('color', 'black')
      .style('background-color', 'white')
      .style('overflow', 'hidden')
      .style('line-height', '150%')
      .style('font-family', 'gwibble')
      .style('font-size', '2vw')
      .append('text')
      .text('A B C D E F G H I J K L M N O P Q R S T U V W X Y Z');

    d3.select('#numbers')
      .style('background-color', 'black')
      .style('color', 'white')
      .style('overflow', 'hidden')
      .style('line-height', '200%')
      .style('font-family', 'gwibble')
      .style('font-size', '2vw')
      .append('text')
      .text('0 1 2 3 4 5 6 7 8 9 . ፩ ፪ ፫ ፬ ፭ ፮ ፯ ፰ ፱');

  }

}
