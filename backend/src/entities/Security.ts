import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DailySeries } from './DailySeries';

@Entity()
export class Security {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

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

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}