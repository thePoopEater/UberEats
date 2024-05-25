import { Controller, Body, Post } from '@nestjs/common';
import { RoutesService } from 'src/providers/routes/routes.service';
import { RouteCreateDTO } from './dto/route-create.dto'; 
import { RouteResponseDTO } from './dto/route-response.dto';
import { RoutesEntity } from 'src/database/entities/routes.entity';


@Controller('routes')
export class RoutesController {
    constructor (private readonly routesService: RoutesService){}

    @Post()
    public async postRoute(@Body() request: RouteCreateDTO): Promise<RouteResponseDTO>{
    if (request) {
        const newRoute: RoutesEntity = new RoutesEntity(request); 
        await this.routesService.create(newRoute);
        const route: RouteResponseDTO = {
            data: null,
            statusCode:200,
            statusDescription:"Ruta creada",
            error: null
        } as RouteResponseDTO
        return route;
    }
}
}
