import { SyntheticEvent, useState } from "react"
import { Form } from "semantic-ui-react"

interface CompanyFilterInputProps {
    exchangeSymbols: string[];
    onFilterUpdate: (data: CompanyFilterState) => void;
}

interface CompanyFilterState {
    exchangeSymbol: string;
    overallScoreFrom: number;
    overallScoreTo: number;
}

const initialState = {
    exchangeSymbol: "",
    overallScoreFrom: 0,
    overallScoreTo: 50
}

export function CompanyFilterInput({ exchangeSymbols, onFilterUpdate }: CompanyFilterInputProps) {
    const [filterValues, setFilterValues] = useState(initialState);

    const onExchangeSymbolChange = (e: SyntheticEvent<HTMLElement, Event>, { _, value }: { [key: string]: string }) => {
        setFilterValues({ ...filterValues, exchangeSymbol: value })
    }

    const onOverallScoreFromChange = (e: SyntheticEvent<HTMLElement, Event>, { _, value }: { [key: string]: string }) => {
        setFilterValues({ ...filterValues, overallScoreFrom: parseInt(value) })
    }

    const onOverallScoreToChange = (e: SyntheticEvent<HTMLElement, Event>, { _, value }: { [key: string]: string }) => {
        setFilterValues({ ...filterValues, overallScoreTo: parseInt(value) })
    }

    const onSubmit = () => {
        onFilterUpdate(filterValues);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Select
                    name={"exchangeSymbol"}
                    label={<div style={{ color: "whitesmoke" }}>Exchange symbol filter</div>}
                    options={exchangeSymbols.map((val, idx) => ({ key: idx, text: val, value: val }))}
                    placeholder={exchangeSymbols[0]}
                    onChange={onExchangeSymbolChange}
                />
                <Form.Input
                    label={<div style={{ color: "whitesmoke" }}>Overall score from</div>}
                    name="overallScoreFrom"
                    type="number"
                    placeholder={0}
                    onChange={onOverallScoreFromChange}
                />
                <Form.Input
                    label={<div style={{ color: "whitesmoke" }}>Overall score to</div>}
                    name="overallScoreTo"
                    type="number"
                    placeholder={50}
                    onChange={onOverallScoreToChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Button content='Filter' color={"blue"} />
            </Form.Group>
        </Form >
    )
}
