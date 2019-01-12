import { TestBed } from '@angular/core/testing';

import { SpeechReconService } from './speech-recon.service';

describe('SpeechReconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechReconService = TestBed.get(SpeechReconService);
    expect(service).toBeTruthy();
  });
});
