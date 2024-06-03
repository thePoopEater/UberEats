import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { LocalService } from '../../providers/local/local.service';
import { ProductService } from '../../providers/product/product.service';
import { OrderProductService } from '../../providers/order-product/order-product.service';
import { OrderService } from '../../providers/order/order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocalEntity } from '../../database/entities/local.entity';
import { ProductEntity } from '../../database/entities/product.entity';
import { OrderProductEntity } from '../../database/entities/order-products.entity';
import { OrderEntity } from '../../database/entities/order.entity';
import { ClientService } from '../../providers/client/client.service';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        ProductService,
        OrderService,
        OrderProductService, 
        LocalService,
        {provide: ClientService,
          useValue: {}
        },
        {provide: getRepositoryToken(LocalEntity),
          useValue: {}
        },
        {provide: getRepositoryToken(ProductEntity),
          useValue: {}
        },
        {provide: getRepositoryToken(OrderEntity),
          useValue: {}
        },
        {provide: getRepositoryToken(OrderProductEntity),
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
    });
});
