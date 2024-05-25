import { Injectable } from '@nestjs/common';
import { RoutesEntity } from 'src/database/entities/routes.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository} from 'typeorm';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(RoutesEntity)
        private readonly routeRepository : Repository<RoutesEntity>,
    ) {}
    
    public async create(route : RoutesEntity) : Promise<RoutesEntity> {
        const result = this.routeRepository.create(route);
        return await this.routeRepository.save(result);
}
}
