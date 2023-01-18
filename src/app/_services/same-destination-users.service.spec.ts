import { TestBed } from '@angular/core/testing';

import { SameDestinationUsersService } from './same-destination-users.service';

describe('SameDestinationUsersService', () => {
  let service: SameDestinationUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SameDestinationUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
