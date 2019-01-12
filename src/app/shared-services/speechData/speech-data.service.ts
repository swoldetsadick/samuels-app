import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechDataService {

  private messageSource = new BehaviorSubject<Array>([]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  public changeMessage(message: Array) {
    this.messageSource.next(message);
  }

}
