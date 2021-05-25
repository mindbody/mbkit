import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GenderSelection } from '../GenderSelection';

const option = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
describe('GenderSelection', () => {
    const spy = jest.fn();
    beforeEach(() => jest.resetAllMocks());
    it('should pass all props to component', () => {
        const {getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                options={option}
            />
        );
        expect(getByTestId('test')).toBeTruthy();
    });

    it('should render a select element with options', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                options={option}
            />
        );
        const select = container.querySelector('#gender-select')
        expect(getByTestId('test')).toBeTruthy();
        expect(select?.children.length).toBe(option.length + 2)
    });

    it('should render textbox to enter custom input option', () => {
        const { container } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                options={option}

            />
        );
        const select = container.querySelectorAll('#gender-select')
        fireEvent.change(select[0], { target:{ value : 'custom'} })
        const input = container.querySelectorAll('input')
        expect(input[0]).toBeInTheDocument()
    });

    it('should add custom input to the list', () => {
        const { container } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                options={option}

            />
        );
        const select = container.querySelectorAll('#gender-select')
        fireEvent.change(select[0], { target:{ value : 'custom'} })
        const input = container.querySelectorAll('input')
        fireEvent.change(input[0], { target: { value: 'Foo' } })
        fireEvent.keyPress(input[0], { key: "Enter", code: 13, charCode: 13 })
        const optionList = container.querySelectorAll('option')
        expect(optionList.length).toBe(option.length+3)
    })
})
