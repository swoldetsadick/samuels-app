import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { SpeechDataService } from '../shared-services/speechData/speech-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit, OnInit {

  // Un-mutable variables
  tags: object = {
    "am-ET": {'letters': 'ሀ ሁ ሂ ሃ ሄ ህ ሆ ለ ሉ ላ ሌ ል ሎ ሐ ሑ ሒ ሓ ሔ ሕ ሖ መ ሙ ሚ ማ ሜ ም ሞ',
      'numbers': '. ፩ ፪ ፫ ፬ ፭ ፮ ፯ ፰ ፱', 'planets': 'ፕላኔቶች',},
    "de-DE": {'letters': 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z', 'numbers': '0 1 2 3 4 5 6 7 8 9',
      'planets': 'Planeten',},
    "en-GB": {'letters': 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z', 'numbers': '0 1 2 3 4 5 6 7 8 9',
      'planets': 'Planets',},
    "fr-FR": {'letters': 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z', 'numbers': '0 1 2 3 4 5 6 7 8 9',
      'planets': 'Planetes',},
  };

  // Mutable variables
  lang: string;

  constructor(private speechDataService: SpeechDataService) {
    this.lang = '';
  }

  ngOnInit() {
    this.speechDataService.currentMessage.subscribe( ( message ) => {
      this.lang = message[0];
      this.removeD3Texts();
      this.setD3Texts();
    });

  }

  ngAfterViewInit() { }

  public removeD3Texts() {
    d3.select('#letters').selectAll('text').remove();
    d3.select('#numbers').selectAll('text').remove();
    d3.select('#planets').selectAll('text').remove();
  }

  public setD3Texts() {

    d3.select('#letters')
      .style('color', 'black')
      .style('background-color', 'white')
      .style('overflow', 'hidden')
      .style('line-height', '150%')
      .style('font-family', 'gwibble')
      .style('font-size', '2vw')
      .append('text')
      .text(this.tags[this.lang]['letters']);

    d3.select('#numbers')
      .style('background-color', 'black')
      .style('color', 'white')
      .style('overflow', 'hidden')
      .style('line-height', '200%')
      .style('font-family', 'gwibble')
      .style('font-size', '2vw')
      .append('text')
      .text(this.tags[this.lang]['numbers']);

    d3.select('#planets')
      .style('color', 'white')
      .style('overflow', 'hidden')
      .style('line-height', '200%')
      .style('font-family', 'gwibble')
      .style('font-size', '2vw')
      .append('text')
      .text(this.tags[this.lang]['planets']);

  }

}
