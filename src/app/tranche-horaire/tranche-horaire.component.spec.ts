import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancheHoraireComponent } from './tranche-horaire.component';

describe('TrancheHoraireComponent', () => {
  let component: TrancheHoraireComponent;
  let fixture: ComponentFixture<TrancheHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrancheHoraireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrancheHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
