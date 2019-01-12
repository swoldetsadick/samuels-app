import { TestBed } from '@angular/core/testing';

import { SpeechDataService } from './speech-data.service';

describe('SpeechDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechDataService = TestBed.get(SpeechDataService);
    expect(service).toBeTruthy();
  });
});
