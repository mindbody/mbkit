import React from 'react';
import { render } from '@testing-library/react';
import { Label } from '../Label';

describe('Label', () => {
    it('should render', () => {
        const { getByTestId } = render(<Label data-testid="label" />);
        const label = getByTestId('label');
        expect(label).toBeTruthy();
        expect(label.nodeName).toBe('LABEL');
    });
    it('should pass all props through', () => {
        const { getByTestId } = render(
            <Label
                data-testid="label"
                className="testing"
                data-random="existing"
                style={{ margin: 8 }}
                id="someAwesomeLabel"
                htmlFor="name"
            >
                <input id="name" data-testid="input" />
            </Label>,
        );
        const label = getByTestId('label');
        const input = getByTestId('input');
        expect(input).toBeTruthy();
        expect(label.classList.contains('testing')).toBe(true);
        expect(label.getAttribute('data-random')).toBe('existing');
        expect(label.style.margin).toBe('8px');
    });
});
