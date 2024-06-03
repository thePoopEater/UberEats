import { TestBed } from '@angular/core/testing';

import { ProductosService } from './productos.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ProductosService', () => {
  
  let service: ProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
    });
    service = TestBed.inject(ProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
