import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Textarea } from '../Textarea';

describe('Textarea', () => {
    const spy = jest.fn();
    it('should render', () => {
        const { getByTestId } = render(<Textarea value="Content goes here" onChange={spy} data-testid="test" />);
        expect(getByTestId('test')).toBeTruthy();
    });
    it('should pass all props to textarea', () => {
        const { getByTestId } = render(
            <Textarea
                value="Content goes here"
                onChange={spy}
                data-testid="test"
                data-testattr="some test"
                className="randomClassName"
                id="another"
            />,
        );
        const textarea = getByTestId('test');
        expect(textarea.classList.contains('randomClassName')).toBe(true);
        expect(textarea.getAttribute('data-testattr')).toBe('some test');
        expect(textarea.getAttribute('id')).toBe('another');
        expect(textarea.textContent).toBe('Content goes here');
    });
    it('should fire the spy when the content changes', () => {
        const { getByTestId } = render(<Textarea value="Content goes here" onChange={spy} data-testid="test" />);
        fireEvent.change(getByTestId('test'), { target: { value: 'TEST' } });
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should give the invalid class name when invalid prop is passed', () => {
        const { getByTestId } = render(
            <Textarea value="Content goes here" onChange={spy} data-testid="test" invalid />,
        );
        expect(getByTestId('test').classList.contains('invalid')).toBe(true);
    });
});
