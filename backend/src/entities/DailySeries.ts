import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Security } from './Security';

@Entity()
export class DailySeries {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    date!: string;

    @Column('float')
    close!: number;

    @Column('bigint')
    volume!: number;

    @ManyToOne(() => Security, security => security.dailySeries)
    security!: Security;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}