import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GenderSelection } from '../GenderSelection';

const option = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: '+ Custom', value: 'custom' }]
describe('GenderSelection', () => {
    const onChangeMock = jest.fn();
    const onEnterKeyPressedMock = jest.fn();
    const customGenderOnchangeMock = jest.fn();
    beforeEach(() => jest.resetAllMocks());
    it('should pass all props to component', () => {
        const { getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={onChangeMock}
                options={option}
                value={''}
                customGenderValue={''}
                customGenderOnChange={customGenderOnchangeMock}
                onEnterKeyPressed={onEnterKeyPressedMock}
            />
        );
        expect(getByTestId('test')).toBeTruthy();
    });

    it('should render a select element with options', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={onChangeMock}
                options={option}
                value={''}
                customGenderValue={''}
                customGenderOnChange={customGenderOnchangeMock}
                onEnterKeyPressed={onEnterKeyPressedMock}
            />
        );
        const select = container.querySelector('#gender-select')
        expect(getByTestId('test')).toBeTruthy();
        expect(select?.children.length).toBe(option.length + 1)
    });

    it('should render textbox to enter custom input option', () => {
        const { container, rerender } = render(
            <GenderSelection
                data-testid="test"
                onChange={onChangeMock}
                options={option}
                value={''}
                customGenderValue={''}
                customGenderOnChange={customGenderOnchangeMock}
                onEnterKeyPressed={onEnterKeyPressedMock}
            />
        );

        const inputs = container.querySelectorAll('input')
        expect(inputs.length).toBe(0)
        rerender(
            <GenderSelection
                data-testid="test"
                onChange={onChangeMock}
                options={option}
                value={'custom'}
                customGenderValue={''}
                customGenderOnChange={customGenderOnchangeMock}
                onEnterKeyPressed={onEnterKeyPressedMock}
            />
        )
        const inputsRerendered = container.querySelectorAll('input')
        expect(inputsRerendered.length).toBe(1)
    });

    it('should add custom input to the list', () => {
        const { container } = render(
            <GenderSelection
                data-testid="test"
                onChange={onChangeMock}
                options={option}
                value={'custom'}
                customGenderValue={''}
                customGenderOnChange={customGenderOnchangeMock}
                onEnterKeyPressed={onEnterKeyPressedMock}
            />
        );
        expect(onEnterKeyPressedMock).toHaveBeenCalledTimes(0)
        const input = container.querySelectorAll('input')
        fireEvent.change(input[0], { target: { value: 'Foo' } })
        fireEvent.keyPress(input[0], { key: "Enter", code: 13, charCode: 13 })
        expect(onEnterKeyPressedMock).toHaveBeenCalledTimes(1)
    })
})
