import { TestBed } from '@angular/core/testing';

import { Text2SpeechService } from './text2-speech.service';

describe('Text2SpeechService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Text2SpeechService = TestBed.get(Text2SpeechService);
    expect(service).toBeTruthy();
  });
});
