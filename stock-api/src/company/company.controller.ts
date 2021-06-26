
import { Controller, Get } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {

    constructor(
        private companyService: CompanyService
    ) { }

    @Get()
    findAll(): Promise<Company[]> {
        return this.companyService.findAll();
    }
}
