import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  photo: string = '';
}
