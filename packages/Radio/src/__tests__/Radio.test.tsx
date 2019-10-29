import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Radio } from '../Radio';

describe('Radio input', () => {
    const spy = jest.fn();

    beforeEach(() => jest.resetAllMocks());

    it('should render', () => {
        const { getByTestId } = render(<Radio data-testid="test" checked={false} onChange={spy} />);
        expect(getByTestId('test')).toBeTruthy();
    });
    it('should fire the onChange handler when the radio input is selected', () => {
        const { getByTestId } = render(<Radio data-testid="test" checked={false} onChange={spy} />);
        fireEvent.click(getByTestId('test'));
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should pass the checked prop down to the input field', () => {
        const { getByTestId } = render(
            <>
                <Radio data-testid="test" checked={false} onChange={spy} />
                <Radio data-testid="test2" checked={true} onChange={spy} />
            </>,
        );
        expect(getByTestId('test').hasAttribute('checked')).toBe(false);
        expect(getByTestId('test2').hasAttribute('checked')).toBe(true);
    });
    it('should pass all props to input', () => {
        const { getByTestId } = render(
            <Radio
                data-testid="test"
                checked={false}
                onChange={spy}
                data-randomattribute="something random"
                value="tester"
                className="customClassName"
                disabled
            />,
        );
        const radio = getByTestId('test');
        expect(radio.getAttribute('value')).toBe('tester');
        expect(radio.getAttribute('data-randomattribute')).toBe('something random');
        expect(radio.classList.contains('customClassName')).toBe(true);
        expect(radio.hasAttribute('disabled')).toBe(true);
    });
    it('should have the invalid class name and aria-invalid attribute when invalid is passed', () => {
        const { getByTestId } = render(<Radio data-testid="test" checked={false} onChange={spy} invalid />);
        expect(getByTestId('test').classList.contains('invalid')).toBe(true);
        expect(getByTestId('test').getAttribute('aria-invalid')).toBe('true');
    });
});
