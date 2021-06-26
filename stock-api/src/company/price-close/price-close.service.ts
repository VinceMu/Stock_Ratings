import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import * as _ from "lodash";
import { Repository } from "typeorm";
import { PriceCloseWithVolatility } from "./price-close-with-volatility";
import { PriceClose } from "./price-close.entity";

@Injectable()
export class PriceCloseService {

    constructor(
        @InjectRepository(PriceClose)
        private priceCloseRepository: Repository<PriceClose>,
    ) { }

    async findLatestWithVolatility(): Promise<PriceCloseWithVolatility[]> {
        var allPriceCloses = await this.priceCloseRepository.find();
        if (allPriceCloses.length === 0) {
            return [];
        }

        var dateBound = calculate90DaysAgo(allPriceCloses[0].date); // entity is retrieved in descending order of date
        
        return Object
            .values(_.groupBy(allPriceCloses, "company_id")) // group by company
            .map(pcGroup => [...pcGroup.values()].filter(pc => moment(pc.date).isSameOrAfter(dateBound))) // filter to latest 90 days
            .map(pcLatest90 => {
                var maxPrice = Math.max(...pcLatest90.map(pc => pc.price));
                var minPrice = Math.min(...pcLatest90.map(pc => pc.price));
                var latestPc = pcLatest90.reduce((a, b) => moment(a.date).isSameOrAfter(b.date) ? a : b);
                return {
                    ...latestPc,
                    volatility: maxPrice - minPrice
                }
            });
    }


    findByCompanyId(id: string): Promise<PriceClose[]> {
        return this.priceCloseRepository.find({ where: { company: { id: id } }, relations: [] })
    }
}

function calculate90DaysAgo(date): Date {
    return moment(date).subtract(90, 'days').toDate();
}
