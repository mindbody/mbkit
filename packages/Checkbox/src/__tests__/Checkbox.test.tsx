import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
    const spy = jest.fn();
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('should render', () => {
        const { getByTestId } = render(<Checkbox checked={false} data-testid="test" onChange={spy} />);
        expect(getByTestId('test')).toBeTruthy();
    });
    it('should pass the appropriate checked prop', () => {
        const { getByTestId } = render(
            <>
                <Checkbox data-testid="unchecked" checked={false} onChange={spy} />
                <Checkbox data-testid="checked" checked={true} onChange={spy} />
                <Checkbox data-testid="mixed" checked={'mixed'} onChange={spy} />
            </>,
        );
        expect(getByTestId('unchecked').hasAttribute('checked')).toBe(false);
        expect(getByTestId('checked').hasAttribute('checked')).toBe(true);
        expect(getByTestId('mixed').hasAttribute('checked')).toBe(false);
        expect(getByTestId('mixed').getAttribute('aria-checked')).toBe('mixed');
    });
    it('should call the onChange handler when clicked', () => {
        const { getByTestId } = render(<Checkbox data-testid="test" checked={false} onChange={spy} />);
        fireEvent.click(getByTestId('test'));
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should show invalid styling and pass aria-invalid attribute when invalid prop is passed', () => {
        const { getByTestId } = render(<Checkbox data-testid="test" checked={false} onChange={spy} invalid />);
        const checkbox = getByTestId('test');
        expect(checkbox.classList.contains('invalid')).toBe(true);
        expect(checkbox.getAttribute('aria-invalid')).toBe('true');
    });
});
