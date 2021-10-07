import React from 'react';
import { render } from '@testing-library/react';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
    it('should render', () => {
        const { getByTestId } = render(<DatePicker label="date picker" data-testid="datepicker" />);
        const datepicker = getByTestId('datepicker');
        expect(datepicker).toBeTruthy();
        expect(datepicker.nodeName).toBe('DIV');
    });
    it('should pass all props through', () => {
        const { getByTestId } = render(
            <DatePicker
                data-testid="datepicker"
                data-random="existing"
                style={{ margin: 8 }}
                id="datepickertest"
                label="date picker"
            >
                <input id="name" data-testid="input" />
            </DatePicker>,
        );
        const label = getByTestId('datepicker');
        const input = getByTestId('datepicker');
        expect(input).toBeTruthy();
        expect(label.getAttribute('data-random')).toBe('existing');
        expect(label.style.margin).toBe('8px');
    });
});
