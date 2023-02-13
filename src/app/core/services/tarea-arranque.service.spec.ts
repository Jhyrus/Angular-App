import { TestBed } from '@angular/core/testing';

import { TareaArranqueService } from './tarea-arranque.service';

describe('TareaArranqueService', () => {
  let service: TareaArranqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaArranqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
