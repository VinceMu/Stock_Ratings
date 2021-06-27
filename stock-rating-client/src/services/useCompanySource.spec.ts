import { CompanyDto } from "../models/companyDto"
import { CompanyWithPriceClose } from "../models/companyWithPriceClose"
import { PriceCloseDto } from "../models/priceCloseDto"
import { CompanyService, PriceCloseService } from "./httpService"
import { isFetchedState, useCompanySource } from "./useCompanySource"
import { renderHook } from "@testing-library/react-hooks";

describe("useCompanySource", () => {
    it("returns companies matched with their corrosponding price close", async () => {
        const companies: Promise<CompanyDto[]> = Promise.resolve([
            {
                id: "a",
                name: "A",
                security_name: "AA"

            } as CompanyDto, // save on verbosity
            {
                id: "b",
                name: "B",
                security_name: "BB"

            } as CompanyDto

        ])
        const priceCloses: Promise<PriceCloseDto[]> = Promise.resolve([
            {
                date_created: new Date("01/01/2020"),
                date: new Date("01/01/2020"),
                price: 10,
                company_id: "a",
                volatility: 1
            }
        ])
        const mockCompanyService: CompanyService = {
            getCompanies: jest.fn(() => companies)
        }

        const mockPriceCloseService: PriceCloseService = {
            getLatestPriceCloses: jest.fn(() => priceCloses)
        }
        const expected: CompanyWithPriceClose[] = [
            {
                id: "a",
                name: "A",
                security_name: "AA",
                latestPriceClose: {
                    date_created: new Date("01/01/2020"),
                    date: new Date("01/01/2020"),
                    price: 10,
                    company_id: "a",
                    volatility: 1
                }
            } as CompanyWithPriceClose
        ]
        const hook = renderHook(() => useCompanySource(mockCompanyService, mockPriceCloseService));
        await hook.waitForNextUpdate();

        const result = hook.result.current;
        if (isFetchedState(result)) {
            expect(result.companies.length).toBe(expected.length);
            expect(result.companies).toEqual(expected);
        } else {
            fail('state should be fetched');
        }
    })
})