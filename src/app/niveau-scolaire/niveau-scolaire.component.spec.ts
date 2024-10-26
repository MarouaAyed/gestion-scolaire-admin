import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauScolaireComponent } from './niveau-scolaire.component';

describe('NiveauScolaireComponent', () => {
  let component: NiveauScolaireComponent;
  let fixture: ComponentFixture<NiveauScolaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiveauScolaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
