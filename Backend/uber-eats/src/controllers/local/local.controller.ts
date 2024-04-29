import { Controller, Get, Param } from '@nestjs/common';
import { LocalService }  from 'src/providers/local/local.service';

@Controller('local')  
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  //función que devuelve la lista de todos los registros de la tabla Local
  @Get()
  public async getAllLocals() {
    return await this.localService.getAllLocals();
  }
  //función que devuelve un local en específico según su ID
  @Get(':id')  
  public async getLocal(@Param('id') id: number) {  
    return await this.localService.getLocal(id); 
  }
}
