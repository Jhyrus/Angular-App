import { TestBed } from '@angular/core/testing';

import { TallerDosService } from './taller-dos.service';

describe('TallerDosService', () => {
  let service: TallerDosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallerDosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
