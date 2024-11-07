import { TestBed } from '@angular/core/testing';

import { NiveauSemestreService } from './niveau-semestre.service';

describe('NiveauSemestreService', () => {
  let service: NiveauSemestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveauSemestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
