import { TestBed } from '@angular/core/testing';

import { EcoleServiceService } from './ecole.service';

describe('EcoleServiceService', () => {
  let service: EcoleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcoleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
