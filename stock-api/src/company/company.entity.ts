import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PriceClose } from "./price-close/price-close.entity";
import { Score } from "./score/score.entity";

@Entity('swsCompany')
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    ticker_symbol: string;

    @Column()
    exchange_symbol: string;

    @Column()
    unique_symbol: string;

    @Column()
    date_generated: Date;

    @Column()
    security_name: string;

    @Column()
    exchange_country_iso: string;

    @Column()
    listing_currency_iso: string;

    @Column()
    canonical_url: string;

    @Column()
    unique_symbol_slug: string;

    @OneToOne(() => Score, score => score.id, { eager: true })
    @JoinColumn({ name: "score_id" })
    score: Score;
}