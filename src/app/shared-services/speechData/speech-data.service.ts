import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechDataService {

  private messageSource = new BehaviorSubject<Array<string>>([]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  public changeMessage(message: Array<string>) {
    this.messageSource.next(message);
  }

}
