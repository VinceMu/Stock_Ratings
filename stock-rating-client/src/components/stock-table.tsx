import { useState } from "react";
import * as _ from "lodash";
import { CompanyWithPriceClose } from "../models/companyWithPriceClose"
import { Grid, Table } from 'semantic-ui-react'
import { CompanySnowflakeChart } from "./company-snowflake-chart";
import "./stock-table.css";
import { CompanyFilterInput } from "./company-filter-input";

type Direction = "ascending" | "descending";

interface StockTableFilterState {
    exchangeSymbol: string;
    overallScoreFrom: number;
    overallScoreTo: number
}

const initialFilterState: StockTableFilterState = {
    exchangeSymbol: "All",
    overallScoreFrom: 0,
    overallScoreTo: 50
}

interface StockTableSortState {
    column: string | undefined;
    direction: Direction | undefined;
}

const initalSortState: StockTableSortState = {
    column: undefined,
    direction: undefined
}

interface StockTableProps {
    companies: CompanyWithPriceClose[];
}

function switchDirections(direction: Direction): Direction {
    return direction === "ascending" ? "descending" : "ascending";
}

function orderByColumnWithDirection<T>(arr: T[], column: string, direction: Direction) {
    return _.orderBy(arr, [column], [direction === "ascending" ? "asc" : "desc"]);
}

export const StockTable = ({ companies }: StockTableProps) => {
    const [sortState, setSortState] = useState(initalSortState);
    const [filterState, setFilterState] = useState(initialFilterState);
    const sortedCompanies = sortState.column && sortState.direction ? orderByColumnWithDirection<CompanyWithPriceClose>(companies, sortState.column, sortState.direction) : companies
    const sortedAndFilteredCompanies = sortedCompanies
        .filter(company =>
            (filterState.exchangeSymbol === "All" || company.exchange_symbol === filterState.exchangeSymbol) &&
            (company.score.total >= filterState.overallScoreFrom && company.score.total <= filterState.overallScoreTo)
        )
    return (
        <>
            <Grid columns={3} padded centered>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                        <CompanyFilterInput
                            exchangeSymbols={["All"].concat(Array.from(new Set(companies.map(c => c.exchange_symbol))))}
                            onFilterUpdate={(filterState) => { setFilterState(filterState) }}
                        />
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                        <Table sortable celled>
                            <Table.Header>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell>Company Name</Table.HeaderCell>
                                    <Table.HeaderCell>Unique Symbol Code</Table.HeaderCell>
                                    <Table.HeaderCell>Exchange Symbol</Table.HeaderCell>
                                    <Table.HeaderCell>Last Known Price</Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={sortState.column === "latestPriceClose.volatility" ? sortState.direction : undefined}
                                        onClick={() => setSortState({
                                            column: "latestPriceClose.volatility",
                                            direction: sortState.column === "latestPriceClose.volatility" ? switchDirections(sortState.direction ?? "descending") : "ascending"
                                        })}
                                    >
                                        Price Fluctuations in the last 90 days
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={sortState.column === "score.total" ? sortState.direction : undefined}
                                        onClick={() => setSortState({
                                            column: "score.total", direction: sortState.column === "score.total" ? switchDirections(sortState.direction ?? "descending") : "ascending"
                                        })}
                                    >
                                        Overall Score
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Snowflake Score</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    sortedAndFilteredCompanies.map((company) => (
                                        <Table.Row key={company.id} textAlign='center'>
                                            <Table.Cell>{company.name}</Table.Cell>
                                            <Table.Cell>{company.unique_symbol}</Table.Cell>
                                            <Table.Cell>{company.exchange_symbol}</Table.Cell>
                                            <Table.Cell>{company.latestPriceClose.price}</Table.Cell>
                                            <Table.Cell>{company.latestPriceClose.volatility.toFixed(2)}</Table.Cell>
                                            <Table.Cell>{company.score.total}</Table.Cell>
                                            <Table.Cell>
                                                <div className="snowflake-chart-container">
                                                    <CompanySnowflakeChart
                                                        value={company.score.value}
                                                        future={company.score.future}
                                                        past={company.score.past}
                                                        health={company.score.health}
                                                        dividend={company.score.dividend}
                                                    />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
        </>
    )
}