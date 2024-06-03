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
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        ProductService,
        OrderService,
        OrderProductService, 
        LocalService,
        {provide: UserService,
          useValue: {getAll: jest.fn()}
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
    userService = module.get<UserService>(UserService)
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
    });

  describe('getAllUsers', () =>{
    it('Should return an Array of Users', async () =>{
      const response: UserEntity[] = [
        {
          userId: 1,
          username: 'usuario 1',
          password: 'admin1234'
        },
        {
          userId: 2,
          username: 'usuario 2',
          password: 'pass 2'
        },
        {
          userId: 3,
          username: 'usuario 3',
          password: 'Subject'
        }
      ];
      jest.spyOn(userService, 'getAll').mockResolvedValue(response)
      expect(await controller.getAllUsers()).toBe(response)
      expect(await controller.getAllUsers()).toHaveLength(3)
    });
  });

});
