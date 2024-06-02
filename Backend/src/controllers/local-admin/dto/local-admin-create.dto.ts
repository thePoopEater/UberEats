import { IsNotEmpty, IsNumber } from 'class-validator';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { OneToMany } from 'typeorm';
import { LocalEntity } from 'src/database/entities/local.entity';

export class LocalAdminCreateDTO extends RegisterDTO {

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @OneToMany(() => LocalEntity, (local) => local.localAdmin)
    locals: [];

    constructor(data?: Partial<LocalAdminCreateDTO>) {
        super();
        if (data) {
          Object.assign(this, data);
        }

}
}