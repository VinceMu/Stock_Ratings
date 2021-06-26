import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Company } from "../company.entity";

@Entity('swsCompanyScore')
export class Score {
    @PrimaryColumn({ nullable: false })
    id: number;

    @Column({ nullable: false })
    date_generated: Date;


    @Column({ nullable: false })
    dividend: number;

    @Column({ nullable: false })
    future: number;

    @Column({ nullable: false })
    health: number;

    @Column({ nullable: false })
    management: number;

    @Column({ nullable: false })
    past: number;

    @Column({ nullable: false })
    value: number;

    @Column({ nullable: false })
    misc: number;

    @Column({ nullable: false })
    total: number;

    @Column()
    sentence: string;

    @OneToOne(() => Company, company => company.id)
    // @JoinColumn({ name: "company_id" })
    company: Company;

}