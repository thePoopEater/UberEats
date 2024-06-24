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
        try{
            const result = this.deliveryRepository.create(deliveryMan)
            return await this.deliveryRepository.save(result)
        }catch (error : any){
            throw new Error(error) 
        }
    }

    public async findDelivery(id : number) : Promise<DeliveryEntity> {
        try{
            return await this.deliveryRepository.findOneBy({deliveryId: id})
        }catch (error : any){
            throw new Error(error) 
        }
    }

    
    //Función para obtener un cliente en específico por ID del repositorio.
    public async getDelivery(idDelivery: number): Promise <DeliveryEntity>{
      try{
          const client = await this.deliveryRepository.createQueryBuilder('delivery').where("deliveryId = :idDelivery", { idDelivery }).getOne();
          return client;
      }catch (error : any){
          throw new Error(error)
      }
    }

    //función para obtener todos los clientes del repositorio.
    public async getAllDelivery() : Promise<DeliveryEntity[]>{
        try{
            return this.deliveryRepository.find()
        }catch (error : any){
            throw new Error(error)
        }
    }
}
