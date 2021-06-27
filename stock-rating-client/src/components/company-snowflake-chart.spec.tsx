import 'react';
import renderer from 'react-test-renderer';
import { CompanySnowflakeChart } from './company-snowflake-chart';

const data = {
    value: 1,
    future: 2,
    past: 3,
    health: 4,
    dividend: 5
}

test('Company snowflake chart matches snapshot', () => {
    const tree = renderer.create(
        <div style={{ height: "100px", width: "200px" }}>
            <CompanySnowflakeChart
                value={data.value}
                future={data.future}
                past={data.past}
                health={data.health}
                dividend={data.dividend}
            />
        </div >
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
