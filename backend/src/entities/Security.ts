import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DailySeries } from './DailySeries';

@Entity()
export class Security {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ticker!: string;

    @Column()
    securityName!: string;

    @Column()
    sector!: string;

    @Column()
    country!: string;

    @Column('float')
    trend!: number;

    @OneToMany(() => DailySeries, dailySeries => dailySeries.security)
    dailySeries!: DailySeries[];
}