import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxLimitComponent } from './max-limit.component';

describe('MaxLimitComponent', () => {
  let component: MaxLimitComponent;
  let fixture: ComponentFixture<MaxLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
