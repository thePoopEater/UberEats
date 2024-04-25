import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Cliente } from 'src/database/entities/cliente.entity';

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.direcciones)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente; 
}