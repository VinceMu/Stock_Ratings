import axios, { AxiosInstance } from "axios";
import { CompanyDto } from "../models/companyDto";
import { PriceCloseDto } from "../models/priceCloseDto";

export interface CompanyService {
    getCompanies(): Promise<CompanyDto[]>;
}

export interface PriceCloseService {
    getLatestPriceCloses(): Promise<PriceCloseDto[]>
}

export class HttpApiService implements CompanyService, PriceCloseService {

    constructor(private httpService: AxiosInstance) { }

    getCompanies(): Promise<CompanyDto[]> {
        return this.httpService.get("/company").then(res => res.data);
    }

    getLatestPriceCloses(): Promise<PriceCloseDto[]> {
        return this.httpService.get("/price-close").then(res => res.data)
    }
}

const HttpService = axios.create(
    {
        baseURL: "http://localhost:3000"
    }
)


export const StockApiService = new HttpApiService(HttpService);


