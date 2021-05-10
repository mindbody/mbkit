import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MultiSelect } from '../MultiSelect';

const onChangeMock = jest.fn();
const args = {
    label: 'Select the fruits you ate today',
    placeholder: 'testing',
    options: [
        { label: 'Apple', checked: false, id: '1' },
        { label: 'Banana', checked: false, id: '2' },
        { label: 'Orange', checked: false, id: '3' },
    ],
    onChange: onChangeMock,
};
const appleOptionsSelected = [
    { label: 'Apple', checked: true, id: '1' },
    { label: 'Banana', checked: false, id: '2' },
    { label: 'Orange', checked: false, id: '3' },
]
describe('MultiSelect', () => {
    it('should render with the placeholder passed in', () => {
        const { getByTestId } = render(<MultiSelect {...args} />);

        expect(getByTestId('placeholdOrSelectedOptions').textContent).toBe(args.placeholder);
    });
    it('should render with the selected option in place of the label', () => {
        const { getByTestId } = render(<MultiSelect {...args} options={appleOptionsSelected} />);

        expect(getByTestId('placeholdOrSelectedOptions').textContent).toBe(appleOptionsSelected[0].label);
    });
    it('should render with override selected elements prop text', () => {
        const overrideText = "I should be displayed regardless of the selected elements";
        const { getByText } = render(<MultiSelect {...args} selectedOptionsLabel={overrideText} />);

        expect(getByText(overrideText)).toBeTruthy();
    });
});
