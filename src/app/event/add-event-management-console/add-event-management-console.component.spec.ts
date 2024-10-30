import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventManagementConsoleComponent } from './add-event-management-console.component';

describe('AddEventManagementConsoleComponent', () => {
  let component: AddEventManagementConsoleComponent;
  let fixture: ComponentFixture<AddEventManagementConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventManagementConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventManagementConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
