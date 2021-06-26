import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "../company.entity";

@Entity('swsCompanyPriceClose', { orderBy: { "date": "DESC" } })
export class PriceClose {
    @Column({ nullable: false })
    date_created: Date;

    @PrimaryColumn({ nullable: false })
    date: Date;

    @Column({ nullable: false })
    price: number;

    @PrimaryGeneratedColumn("uuid")
    company_id: string
}