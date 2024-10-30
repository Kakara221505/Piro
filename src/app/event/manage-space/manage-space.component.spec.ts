import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpaceComponent } from './manage-space.component';

describe('ManageSpaceComponent', () => {
  let component: ManageSpaceComponent;
  let fixture: ComponentFixture<ManageSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
