import { TestBed, inject } from '@angular/core/testing';

import { ThirdPartyService } from './third-party.service';

describe('ThirdPartyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThirdPartyService]
    });
  });

  it('should be created', inject([ThirdPartyService], (service: ThirdPartyService) => {
    expect(service).toBeTruthy();
  }));
});
