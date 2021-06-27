import { useEffect, useState } from "react";
import { CompanyDto } from "../models/companyDto";
import { CompanyWithPriceClose } from "../models/companyWithPriceClose";
import { CompanyService, PriceCloseService } from "./httpService";

enum Status {
    Fetched = "Fetched", Fetching = "Fetching", Error = "Error", Idle = "Idle"
}

interface FetchedState {
    companies: CompanyWithPriceClose[];
    status: Status.Fetched;
}

interface FetchingState {
    status: Status.Fetching;
}

interface ErrorState {
    status: Status.Error;
}

interface IdleState {
    status: Status.Idle;
}

type State = FetchedState | FetchingState | ErrorState | IdleState;

const initialState: State = {
    status: Status.Idle
}

export function useCompanySource(companyService: CompanyService, priceCloseService: PriceCloseService): State {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        let isMounted = true;

        const companiesPromise = companyService.getCompanies();
        const priceClosesPromise = priceCloseService.getLatestPriceCloses();
        setState({ status: Status.Fetching });

        Promise.all([companiesPromise, priceClosesPromise])
            .then(([companies, priceCloses]) => {
                if (!isMounted) {
                    return;
                }
                var companiesDict = companies.reduce((dict, currCompany) => {
                    dict[currCompany.id] = currCompany;
                    return dict;
                }, {} as { [id: string]: CompanyDto });

                var priceClosesWithCompany = priceCloses.map((pc) => {
                    var company = companiesDict[pc.company_id];
                    return {
                        ...company,
                        latestPriceClose: pc
                    }
                })
                setState({ status: Status.Fetched, companies: priceClosesWithCompany });
            })
            .catch(() => {
                setState({ status: Status.Error });
            });
        return () => { isMounted = false };
    }, [companyService, priceCloseService]);

    return state;
}