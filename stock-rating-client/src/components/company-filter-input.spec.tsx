import 'react';
import renderer from 'react-test-renderer';
import { CompanyFilterInput } from './company-filter-input';

const exchangeSymbols = ["All", "ASX", "NYSE"]

test('Company filter input matches snapshot', () => {
  const tree = renderer.create(
    <CompanyFilterInput
      exchangeSymbols={exchangeSymbols}
      onFilterUpdate={() => { }} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});