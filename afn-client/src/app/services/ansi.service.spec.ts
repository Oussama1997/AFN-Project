import { TestBed } from '@angular/core/testing';

import { AnsiService } from './ansi.service';

describe('AnsiService', () => {
  let service: AnsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
