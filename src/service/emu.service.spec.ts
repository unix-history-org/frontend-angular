import { TestBed } from '@angular/core/testing';

import { EmuService } from './emu.service';

describe('EmuService', () => {
  let service: EmuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
