import { TestBed } from '@angular/core/testing';

import { JoinSesionService } from './join-sesion.service';

describe('JoinSesionService', () => {
  let service: JoinSesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinSesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
