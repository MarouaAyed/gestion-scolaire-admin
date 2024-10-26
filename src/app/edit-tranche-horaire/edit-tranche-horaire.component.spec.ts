import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrancheHoraireComponent } from './edit-tranche-horaire.component';

describe('EditTrancheHoraireComponent', () => {
  let component: EditTrancheHoraireComponent;
  let fixture: ComponentFixture<EditTrancheHoraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrancheHoraireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrancheHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
