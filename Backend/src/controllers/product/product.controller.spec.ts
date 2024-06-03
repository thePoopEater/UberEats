import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../../providers/product/product.service';
import { OrderService } from '../../providers/order/order.service';
import { OrderProductService } from '../../providers/order-product/order-product.service';
import { LocalService } from '../../providers/local/local.service';
import { ClientService } from '../../providers/client/client.service';
import { OrderEntity } from '../../database/entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderProductEntity } from '../../database/entities/order-products.entity';
import { ProductEntity } from '../../database/entities/product.entity';
import { LocalEntity } from '../../database/entities/local.entity';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
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

    controller = module.get<ProductController>(ProductController);
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
    });
});
