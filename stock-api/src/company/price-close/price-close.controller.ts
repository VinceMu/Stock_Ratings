
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceCloseWithVolatility } from './price-close-with-volatility';
import { PriceClose } from './price-close.entity';
import { PriceCloseService } from './price-close.service';

@Controller('price-close')
export class PriceCloseController {
  constructor(
    private priceCloseService: PriceCloseService
  ) { }

  @Get()
  findLatestWithVolatility(): Promise<PriceCloseWithVolatility[]> {
    return this.priceCloseService.findLatestWithVolatility();
  }

  @Get(":companyId")
  findAll(@Param('companyId') companyId): Promise<PriceClose[]> {
    return this.priceCloseService.findByCompanyId(companyId);
  }
}
