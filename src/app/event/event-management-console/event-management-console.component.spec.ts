import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementConsoleComponent } from './event-management-console.component';

describe('EventManagementConsoleComponent', () => {
  let component: EventManagementConsoleComponent;
  let fixture: ComponentFixture<EventManagementConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventManagementConsoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManagementConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
