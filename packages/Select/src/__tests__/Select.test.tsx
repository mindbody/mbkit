import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Select } from '../Select';

describe('Select', () => {
    const spy = jest.fn();
    beforeEach(() => jest.resetAllMocks());
    it('should render a select element with children', () => {
        const { getByTestId } = render(
            <Select data-testid="test" value="" onChange={spy}>
                <option>Test1</option>
                <option>Test2</option>
            </Select>,
        );
        expect(getByTestId('test')).toBeTruthy();
        expect(getByTestId('test').children.length).toBe(2);
    });
    it('should render a select element with children', () => {
        const { getByTestId } = render(
            <Select data-testid="test" value="" onChange={spy}>
                <option>Test1</option>
                <option>Test2</option>
            </Select>,
        );
        expect(getByTestId('test')).toBeTruthy();
        expect(getByTestId('test').children.length).toBe(2);
    });
    it('should pass all props through', () => {
        const { getByTestId } = render(
            <Select data-testid="test" value="one" onChange={spy} data-randomattr="yoga" className="testing" disabled>
                <option>Test1</option>
                <option>Test2</option>
            </Select>,
        );
        const select = getByTestId('test');
        fireEvent.change(select);

        expect(select.hasAttribute('disabled')).toBe(true);
        expect(select.classList.contains('testing')).toBe(true);
        expect(select.getAttribute('data-randomattr')).toBe('yoga');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
