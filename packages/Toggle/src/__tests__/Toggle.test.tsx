import React from 'react';
import { render } from '@testing-library/react';
import { Toggle } from '../Toggle';

describe('Toggle', () => {
    const spy = jest.fn();

    it('should render', () => {
        const { getByTestId } = render(<Toggle data-testid="test" checked={false} onChange={spy} />);
        expect(getByTestId('test')).toBeTruthy();
    });
    it('should pass props down', () => {
        const { getByTestId } = render(
            <Toggle
                data-testid="test"
                data-randomattribute="testing"
                className="randomClassName"
                checked={false}
                onChange={spy}
                style={{ background: 'red' }}
            />,
        );
        const toggle = getByTestId('test');
        expect(toggle.classList.contains('randomClassName'));
        expect(toggle.getAttribute('data-randomattribute')).toBe('testing');
        expect(toggle.style.background).toBe('red');
    });
});
