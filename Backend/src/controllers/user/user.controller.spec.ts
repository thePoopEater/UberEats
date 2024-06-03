import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { LocalEntity } from '../../database/entities/local.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../../database/entities/product.entity';
import { OrderProductEntity } from '../../database/entities/order-products.entity';
import { OrderEntity } from '../../database/entities/order.entity';
import { ClientService } from '../../providers/client/client.service';
import { LocalService } from '../../providers/local/local.service';
import { OrderProductService } from '../../providers/order-product/order-product.service';
import { OrderService } from '../../providers/order/order.service';
import { ProductService } from '../../providers/product/product.service';
import { UserEntity } from '../../database/entities/user.entity';
import { UserService } from '../../providers/user/user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        ProductService,
        OrderService,
        OrderProductService, 
        LocalService,
        {provide: UserService,
          useValue: {}
        },
        {provide: ClientService,
          useValue: {}
        },
        {provide: getRepositoryToken(UserEntity),
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

    controller = module.get<UserController>(UserController);
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
    });
});
