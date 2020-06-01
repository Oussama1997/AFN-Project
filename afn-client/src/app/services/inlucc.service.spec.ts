import { TestBed } from '@angular/core/testing';

import { InluccService } from './inlucc.service';

describe('InluccService', () => {
  let service: InluccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InluccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
