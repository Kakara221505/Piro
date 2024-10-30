import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDemoChristmasComponent } from './book-demo-christmas.component';

describe('BookDemoChristmasComponent', () => {
  let component: BookDemoChristmasComponent;
  let fixture: ComponentFixture<BookDemoChristmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDemoChristmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDemoChristmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
