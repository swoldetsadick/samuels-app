import { Injectable, NgZone } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechReconService {

  speechRecognition: any;

  constructor(private zone: NgZone) {

  }

  destroySpeechObject() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
    }
  }

  record(): Observable<string> {

    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      //this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-us';
      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = speech => {
        let term: string = "";
        if (speech.results) {
          let result = speech.results[speech.resultIndex];
          let transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              console.log("Unrecognized result - Please try again");
            }
            else {
              term = _.trim(transcript);
              console.log("Did you said? -> " + term + " , If not then say something else...");
            }
          }
        }
        this.zone.run(() => {
          observer.next(term);
        });
      };

      this.speechRecognition.onerror = error => {
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        observer.complete();
      };

      this.speechRecognition.start();
      console.log("Say something - We are listening !!!");
    });
  }

}