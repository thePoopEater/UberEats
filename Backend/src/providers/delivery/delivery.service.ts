import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryEntity } from 'src/database/entities/delivery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(DeliveryEntity)
        private readonly deliveryRepository: Repository<DeliveryEntity>){}
    
    public async create(deliveryMan : DeliveryEntity): Promise<DeliveryEntity>{
        const result = this.deliveryRepository.create(deliveryMan)
        return await this.deliveryRepository.save(result)
    }

    public async findDelivery(id : number) : Promise<DeliveryEntity> {
        return await this.deliveryRepository.findOneBy({deliveryId: id})
    }

    public async getDelivery(idDelivery: number): Promise <DeliveryEntity>{
        const delivery = await this.deliveryRepository.createQueryBuilder('delivery').where("deliveryId = :idDelivery", { idDelivery }).getOne();
        return delivery;
    }

    //función para obtener todos los clientes del repositorio.
    public async getAllDelivery() : Promise<DeliveryEntity[]>{
        return this.deliveryRepository.find()
    }
}
