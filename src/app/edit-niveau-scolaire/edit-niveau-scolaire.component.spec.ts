import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNiveauScolaireComponent } from './edit-niveau-scolaire.component';

describe('EditNiveauScolaireComponent', () => {
  let component: EditNiveauScolaireComponent;
  let fixture: ComponentFixture<EditNiveauScolaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNiveauScolaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNiveauScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
