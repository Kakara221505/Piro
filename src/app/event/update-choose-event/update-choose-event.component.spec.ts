import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChooseEventComponent } from './update-choose-event.component';

describe('UpdateChooseEventComponent', () => {
  let component: UpdateChooseEventComponent;
  let fixture: ComponentFixture<UpdateChooseEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChooseEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChooseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
