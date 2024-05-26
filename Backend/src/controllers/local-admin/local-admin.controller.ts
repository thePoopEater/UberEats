import { Controller, Post, Get, ValidationPipe, Body } from '@nestjs/common';
import { LocalAdminService } from 'src/providers/local-admin/local-admin.service';
import { LocalAdminCreateDTO } from './dto/local-admin-create.dto';
import { LocalAdminEntity } from 'src/database/entities/local-admin.entity';
import { LocalAdminResponseDTO } from './dto/local-admin-response.dto';

@Controller('local-admin')
export class LocalAdminController {
    constructor (private readonly localAdminService: LocalAdminService){}
    @Post()
    public async postRoute(@Body(ValidationPipe) request: LocalAdminCreateDTO): Promise<LocalAdminResponseDTO>{
    if (request) {
        await this.localAdminService.create(request);
        const localAdmin: LocalAdminResponseDTO = {
            data: null,
            statusCode:200,
            statusDescription:"Admin de local creado",
            error: null
        } as LocalAdminResponseDTO 
        return localAdmin;
    }
}

    @Get()
    public async getAllLocals(): Promise<LocalAdminEntity[]> {
        return await this.localAdminService.getAllLocalAdmins();
  }

}
