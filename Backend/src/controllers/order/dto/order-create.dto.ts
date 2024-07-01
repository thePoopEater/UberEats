import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  localId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  payMethod: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
