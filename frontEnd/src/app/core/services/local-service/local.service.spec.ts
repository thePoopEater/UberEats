import { TestBed } from '@angular/core/testing';
import { LocalService } from './local.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('LocalService', () => {
  let service: LocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
