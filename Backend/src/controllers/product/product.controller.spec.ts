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
import { ProductCreateDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { ProductUpdateDTO } from './dto/product-update.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;
  let localService: LocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        OrderService,
        OrderProductService, 
        LocalService,
        {
          provide: getRepositoryToken(LocalEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockResolvedValue({ id: 1, name: 'Local 1' })
            }),
          },
        },
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
        
      ]
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
    localService = module.get<LocalService>(LocalService)
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
    });

  
  describe('postProduct', () =>{
    it('Should return "Se agregó el producto"', async () =>{
      const newProduct: ProductCreateDTO = 
      {
        name: 'product 1',
        ingredients: 'ing 1',
        description: 'description 1',
        images: 'image 1',
        localId: 1,
        price: 1200
      };
      const response : ProductResponseDTO = {
        data : null,
        statusCode : 200,
        statusDescription : "Listo",
        error : null
      };
      jest.spyOn(localService, 'getLocal').mockResolvedValue({ id: 1, name: 'Local 1' } as LocalEntity)
      jest.spyOn(productService, 'createProduct').mockResolvedValue(response as any)
      expect(await controller.postProduct(newProduct)).toStrictEqual(response)
    });
  });

  describe('getInfo', () =>{
    it('Should return an local throught ID', async () =>{
      const resp: Partial<ProductEntity> = 
      {
        productId: 1,
        name: 'product 1',
        ingredients: 'ing1, ing2, ing3',
        description: 'description 1',
        images: 'image 1',
        price: 3000
      }
      jest.spyOn(localService, 'getLocal').mockResolvedValue({ id: 1, name: 'Local 1' } as LocalEntity)
      jest.spyOn(productService ,'findOneProduct').mockResolvedValue(resp as any)

      expect(await controller.getInfo(1)).toBe(resp)
    });
  });
  
  describe('putProduct', () =>{
    it('Should return an updated Product', async () =>{
      const update: ProductUpdateDTO = 
      {
        name: 'updated 1',
        description: 'description 1',
        ingredients: 'ing 1, ing 2',
        images: 'image 1',
        price: 3000
      };

      jest.spyOn(localService, 'getLocal').mockResolvedValue({ id: 1, name: 'Local 1' } as LocalEntity);
      jest.spyOn(productService, 'updateProduct').mockResolvedValue(update as any);

      expect(await controller.putProduct(1, update)).toBe(update)
    });
  });
});
