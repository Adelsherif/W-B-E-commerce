import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { askGuardGuard } from './ask.guard-guard';

describe('askGuardGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => askGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
