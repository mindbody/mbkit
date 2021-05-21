import React, { Children } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GenderSelection } from '../GenderSelection';

const option = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
describe('GenderSelection', () => {
    const spy = jest.fn();
    beforeEach(() => jest.resetAllMocks());
    it('should pass all props to component', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
            />
        );
        expect(getByTestId('test')).toBeTruthy();
    });
    it('should add custom item in the list when customEnable prop is true', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                customEnable={true}
            />
        );
        const list = container.getElementsByClassName('singleListItem')
        expect(option.length + 1).toBe(list.length)
    });
    it('should open drop down when clicked upon', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                customEnable={true}
            />
        );
        const select = container.getElementsByClassName('genderSelectTitle')
        fireEvent.click(select[0])
        const openedList = container.getElementsByClassName('openList')
        expect(openedList[0]).toBeInTheDocument()
    });

    it('should render default options', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                customEnable={true}
            />
        );
        const list = container.getElementsByClassName('genderSelectionList') || []
        for (let i = 0; i < list.length; i++) {
            expect(list[i].children[0].innerHTML).toBe(option[i].label)
        }

    });
    it('should render textbox to enter custom input option', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                customEnable={true}
            />
        );
        const select = container.getElementsByClassName('genderSelectTitle')
        fireEvent.click(select[0])
        const customItemOption = container.getElementsByClassName('singleListItem')[2]
        fireEvent.click(customItemOption)
        const openedInput = container.getElementsByClassName('displayInput')
        expect(openedInput[0]).toBeInTheDocument()
    });
    it('should add custom input to the list', () => {
        const { container, getByTestId } = render(
            <GenderSelection
                data-testid="test"
                onChange={spy}
                customEnable={true}
            />
        );
        const select = container.getElementsByClassName('genderSelectTitle')
        fireEvent.click(select[0])
        const customItemOption = container.getElementsByClassName('singleListItem')[2]
        fireEvent.click(customItemOption)
        const openedInput = container.getElementsByClassName('customInputBox')[0]
        fireEvent.change(openedInput, { target: { value: 'Foo' } })
        fireEvent.keyPress(openedInput, { key: "Enter", code: 13, charCode: 13 })
        fireEvent.click(select[0])
        const list = container.getElementsByClassName('singleListItem')
        expect(list[list.length - 2].innerHTML).toBe('Foo')
    })
})
