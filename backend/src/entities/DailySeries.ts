import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Security } from './Security';

@Entity()
export class DailySeries {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: string;

    @Column('float')
    close!: number;

    @Column('bigint')
    volume!: number;

    @ManyToOne(() => Security, security => security.dailySeries)
    security!: Security;
}