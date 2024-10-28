import { TestBed } from '@angular/core/testing';

import { TrancheHoraireService } from './tranche-horaire.service';

describe('TrancheHoraireService', () => {
  let service: TrancheHoraireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrancheHoraireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
