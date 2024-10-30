import { TestBed } from '@angular/core/testing';

import { ExploreServicesService } from './explore-services.service';

describe('ExploreServicesService', () => {
  let service: ExploreServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
