import { Test, TestingModule } from '@nestjs/testing';
import { LocalController } from './local.controller';
import { ProductService } from '../../providers/product/product.service';
import { OrderService } from '../../providers/order/order.service';
import { OrderProductService } from '../../providers/order-product/order-product.service';
import { LocalService } from '../../providers/local/local.service';
import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocalEntity } from '../../database/entities/local.entity';
import { ProductEntity } from '../../database/entities/product.entity';
import { OrderEntity } from '../../database/entities/order.entity';
import { OrderProductEntity } from '../../database/entities/order-products.entity';
import { ClientService } from '../../providers/client/client.service';
import { describe, mock } from 'node:test';


describe('LocalController', () => {
  let controller: LocalController;
  let localService: LocalService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalController],
      providers:
        [ProductService,
          OrderService,
          OrderProductService, 
          LocalService,
          {provide: ClientService, 
            useValue: {}},
          {provide: getRepositoryToken(LocalEntity), 
            useValue: {}},
          {provide: getRepositoryToken(ProductEntity), 
            useValue: {}},
          {provide: getRepositoryToken(OrderEntity), 
            useValue: {}},
          {provide: getRepositoryToken(OrderProductEntity), 
            useValue: {}}
        ]
    }).compile();

    controller = module.get<LocalController>(LocalController);
    localService = module.get<LocalService>(LocalService)
  });
  
  it('should be defined!', () => {
    expect(controller).toBeDefined();
  });
  
});
