import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseEventComponent } from './choose-event.component';

describe('ChooseEventComponent', () => {
  let component: ChooseEventComponent;
  let fixture: ComponentFixture<ChooseEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
