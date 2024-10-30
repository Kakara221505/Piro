import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEventDetailsComponent } from './preview-event-details.component';

describe('PreviewEventDetailsComponent', () => {
  let component: PreviewEventDetailsComponent;
  let fixture: ComponentFixture<PreviewEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEventDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
