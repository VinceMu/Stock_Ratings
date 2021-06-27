import { CompanyDto } from "./companyDto";
import { PriceCloseDto } from "./priceCloseDto";

export interface CompanyWithPriceClose extends CompanyDto {
    latestPriceClose: PriceCloseDto;
}