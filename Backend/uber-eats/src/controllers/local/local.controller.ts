import { Controller, Put, Post, Body} from '@nestjs/common';
import { LocalCreateDTO } from './dto/local-create.dto';
import { LocalResponseDTO } from './dto/local-response.dto';

@Controller('local')
export class LocalController {

    locales : LocalCreateDTO[] = [{
        name: "Arturo",
        direction : "Coya 2664",
        schedule :"Abierto todo el dia",
        description : "No se el pp"
    }];

    @Post()
    //Datos de un nuevo local: nombre, direccion, horario, descripcion (todos strings)
    async addLocal(@Body() request : LocalCreateDTO) : Promise<LocalResponseDTO> {
        if (request) {
            this.locales.push(request);
            const response : LocalResponseDTO = {
                data : "Se creo un usuario",
                statusCode: 200,
                statusDescription : 'Listo',
                error : null
            } as LocalResponseDTO;
            console.log(this.locales);
            return response;
        }
    }
}
