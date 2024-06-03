/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarritoService } from './carrito.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';

describe('Service: Carrito', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CarritoService]
    });
  });

  it('should ...', inject([CarritoService], (service: CarritoService) => {
    expect(service).toBeTruthy();
  }));
});
