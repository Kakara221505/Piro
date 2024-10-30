import { TestBed } from '@angular/core/testing';

import { ManagementConsoleService } from './management-console.service';

describe('ManagementConsoleService', () => {
  let service: ManagementConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
