import { TestBed } from '@angular/core/testing';

import { TallerUnoService } from './taller-uno.service';

describe('TallerUnoService', () => {
  let service: TallerUnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallerUnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
