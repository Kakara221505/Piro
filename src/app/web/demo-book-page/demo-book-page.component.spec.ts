import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBookPageComponent } from './demo-book-page.component';

describe('DemoBookPageComponent', () => {
  let component: DemoBookPageComponent;
  let fixture: ComponentFixture<DemoBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoBookPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
