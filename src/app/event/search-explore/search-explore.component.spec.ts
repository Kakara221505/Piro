import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExploreComponent } from './search-explore.component';

describe('SearchExploreComponent', () => {
  let component: SearchExploreComponent;
  let fixture: ComponentFixture<SearchExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
