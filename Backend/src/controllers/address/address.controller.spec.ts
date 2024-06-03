import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { ClientService } from '../../providers/client/client.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../../database/entities/address.entity';
import { AddressService } from '../../providers/address/address.service';
import { ClientEntity } from '../../database/entities/client.entity';

describe('ClientController', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers:
        [AddressService,
          ClientService,
          {provide: ClientService, 
            useValue: {}
          },
          {provide: getRepositoryToken(AddressEntity),
            useValue: {}
          },
          {provide: getRepositoryToken(ClientEntity),
            useValue: {}
          }
        ]
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });
  
  it('should be defined!', () => {
        expect(controller).toBeDefined();
    });
});
