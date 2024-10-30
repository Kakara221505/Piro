import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventSessionComponent } from './add-event-session.component';

describe('AddEventSessionComponent', () => {
  let component: AddEventSessionComponent;
  let fixture: ComponentFixture<AddEventSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
