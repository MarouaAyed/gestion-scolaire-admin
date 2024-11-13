import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableGroupComponent } from './timetable-group.component';

describe('TimetableGroupComponent', () => {
  let component: TimetableGroupComponent;
  let fixture: ComponentFixture<TimetableGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
