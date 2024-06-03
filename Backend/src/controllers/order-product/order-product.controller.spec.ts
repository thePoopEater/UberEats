import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from '../../providers/order-product/order-product.service';
import { OrderService } from '../../providers/order/order.service';
import { LocalService } from '../../providers/local/local.service';
import { ProductService } from '../../providers/product/product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from '../../database/entities/order.entity';
import { ProductEntity } from '../../database/entities/product.entity';
import { OrderProductEntity } from '../../database/entities/order-products.entity';
import { ClientService } from '../../providers/client/client.service';
import { LocalEntity } from '../../database/entities/local.entity';

describe('ProductController', () => {
  let controller: OrderProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProductController],
      providers: [
        ProductService,
        OrderService,
        OrderProductService, 
        LocalService,
        {provide: ClientService,
          useValue: {}
        },
        {provide: getRepositoryToken(OrderEntity),
          useValue: {}
        },
        {provide: getRepositoryToken(OrderProductEntity),
          useValue: {}
        },
        {provide: getRepositoryToken(ProductEntity),
          useValue: {}
        },
        {provide: getRepositoryToken(LocalEntity),
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<OrderProductController>(OrderProductController);
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
    });
});
