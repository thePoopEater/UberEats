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
import { OrderProductCreateDTO } from './dto/order-product-create.dto';
import { OrderResponseDTO } from '../order/dto/order-response.dto';

describe('OrderProductController', () => {
  let controller: OrderProductController;
  let productService: ProductService;
  let localService: LocalService;
  let orderService: OrderService;
  let orderProductService: OrderProductService;

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
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockResolvedValue({ orderId: 10, state: 'por hacer'})
            }),
          },
        },
        {provide: getRepositoryToken(OrderProductEntity),
          useValue: {}
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockResolvedValue({ productId: 1, name: 'producto 1'})
            }),
          },
        },
        {
          provide: getRepositoryToken(LocalEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockResolvedValue({ id: 1, name: 'Local 1' })
            }),
          },
        }
      ]
    }).compile();

    controller = module.get<OrderProductController>(OrderProductController);
    productService = module.get<ProductService>(ProductService);
    localService = module.get<LocalService>(LocalService);
    orderService = module.get<OrderService>(OrderService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
  });

  describe('postOrderProduct', () =>{
    it('Should return a new orderProduct from an Order', async () =>{
      const resp: OrderProductCreateDTO = {
        quantity: 1,
        specification: 'specifications....',
        orderId: 10,
        productId: 1,
      };

      jest.spyOn(localService, 'getLocal').mockResolvedValue({ id: 1, name: 'Local 1' } as LocalEntity);
      jest.spyOn(productService, 'findOneProduct').mockResolvedValue({ productId: 1, name: 'producto 1' } as ProductEntity);
      jest.spyOn(orderService, 'findOrder').mockResolvedValue({ orderId: 10, state: 'por hacer' } as OrderEntity);
      
      const result: OrderResponseDTO = { 
        data : Promise.resolve(),
        statusCode : 200,
        statusDescription : "Listo",
        error : null
      };
      jest.spyOn(orderProductService, 'saveOrderProduct').mockResolvedValue(result as any);

      const response = await controller.postOrderProduct(resp);
      expect(response).toStrictEqual(result as any);
    });
  });
});
