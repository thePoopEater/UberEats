import { Test, TestingModule } from '@nestjs/testing';
import { LocalController } from './local.controller';
import { ProductService } from '../../providers/product/product.service';
import { OrderService } from '../../providers/order/order.service';
import { OrderProductService } from '../../providers/order-product/order-product.service';
import { LocalService } from '../../providers/local/local.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocalEntity } from '../../database/entities/local.entity';
import { ProductEntity } from '../../database/entities/product.entity';
import { OrderEntity } from '../../database/entities/order.entity';
import { OrderProductEntity } from '../../database/entities/order-products.entity';
import { ClientService } from '../../providers/client/client.service';
import { describe, mock } from 'node:test';
import { LocalCreateDTO } from './dto/local-create.dto';
import { LocalUpdateDTO } from './dto/local-update.dto';
import { LocalResponseDTO } from './dto/local-response.dto';


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
  
  describe('getAllLocals', () =>{
    it('Should return an Array of Local', async () =>{
      const result: Partial<LocalEntity>[] = [
        { id: 1, 
          name: 'Local 1',
          description: 'descripcion 1',
          address: 'direccion 1',
          schedule: 'schedule 1',
          category: 'category 1',
          orders: [],
          products: []
        }, 
        { id: 2, 
          name: 'Local 2',
          description: 'descripcion 2',
          address: 'direccion 2',
          schedule: 'schedule 2',
          category: 'category 2',
          orders: [],
          products: []
        }
      ];
      jest.spyOn(localService, 'getAllLocals').mockResolvedValue(result as LocalEntity[]);
      expect(await controller.getAllLocals()).toBe(result);
      expect(await controller.getAllLocals()).toHaveLength(2);
    });
  });

  describe('getInfo', () =>{
    it('Should return a Local throught ID', async () =>{
      const result: Partial<LocalEntity> = 
        { id: 1, 
          name: 'Local 1',
          description: 'descripcion 1',
          address: 'direccion 1',
          schedule: 'schedule 1',
          category: 'category 1',
          orders: [],
          products: []
        };
      jest.spyOn(localService, 'getLocal').mockResolvedValue(result as LocalEntity);
      expect(await controller.getInfo(1)).toBe(result)
    });
  });

  describe('postLocal', () =>{
    it('Should return "Se creó un local"', async () =>{
      const newLocal: LocalCreateDTO = 
      {
        name: 'Local 3',
        description: 'descripcion 3',
        address: 'direccion 3',
        schedule: 'schedule 3',
        category: 'category 3',
      };
      const result = {
        data : "Se creó un local",
                statusCode: 200,
                statusDescription : 'Listo',
                error : null
      };
      jest.spyOn(localService, 'create').mockReturnValue(result as any);
      expect(await controller.postLocal(newLocal)).toStrictEqual(result);
    });
  });

  describe('putLocal', () =>{
    it('Should return an updated local', async () =>{
      const local: Partial<LocalEntity> = 
      { id: 3,
        name: 'Local 3',
        description: 'descripcion 3',
        address: 'direccion 3',
        schedule: 'schedule 3',
        category: 'category 3',
      };
      const update: LocalUpdateDTO = 
      {
        name: 'changed Local',
        address: 'direccion 3',
        schedule: 'schedule 3',
        description: 'description 3',
        category: 'category 3'
      };
      const response : LocalResponseDTO = 
      {
        data : null,
        statusCode: 200,
        statusDescription:'Listo',
        error : null
      } as LocalResponseDTO;
      jest.spyOn(localService, 'updateLocal').mockResolvedValue(response as any)
      expect(await controller.putLocal(3,update)).toStrictEqual(response)
    });
  });
});
