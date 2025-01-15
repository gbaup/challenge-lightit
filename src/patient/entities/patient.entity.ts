import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Patient {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    address: string;

    @Column('text')
    phone: string;

    @Column('text')
    photo: string;

}
