import { Controller, Get, Param } from '@nestjs/common';
import { LocalService }  from 'src/providers/local/local.service';

@Controller('local')  
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get()
  public async getAllLocals() {
    return await this.localService.getAllLocals();
  }

  @Get(':id')  
  public async getLocal(@Param('id') id: number) {  
    return await this.localService.getLocal(id); 
  }
}
