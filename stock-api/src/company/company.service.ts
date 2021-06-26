import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID, Repository } from "typeorm";
import { Company } from "./company.entity";

@Injectable()
export class CompanyService {

    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) { }

    findAll(): Promise<Company[]> {
        return this.companyRepository.find();
    }

    findOne(id: string | number | Date | ObjectID) {
        return this.companyRepository.findOne(id);
    }

    findPaginated(skip: number, take: number): Promise<Company[]> {
        return this.companyRepository.find({ skip, take })
    }

}