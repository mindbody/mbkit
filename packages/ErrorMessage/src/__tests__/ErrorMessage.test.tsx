import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
    it('should render nothing when the show is set to false', () => {
        const { getByTestId } = render(
            <div data-testid="test">
                <ErrorMessage show={false}>An error message</ErrorMessage>
            </div>,
        );
        expect(getByTestId('test').textContent).toBe('');
    });
    it('should render the message when the show is set to true', () => {
        const { getByTestId } = render(
            <ErrorMessage data-testid="test" show={true}>
                An error message
            </ErrorMessage>,
        );
        expect(getByTestId('test')).toBeTruthy();
        expect(getByTestId('test').textContent).toBe('An error message');
    });
    it('should allow you to pass props down', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <ErrorMessage
                data-testid="test"
                show={true}
                className="testing"
                data-randomattribute="just a test"
                style={{ margin: 8, background: 'red' }}
                onClick={spy}
            >
                An error message
            </ErrorMessage>,
        );
        const errorMessage = getByTestId('test');
        fireEvent.click(errorMessage);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(errorMessage.classList.contains('testing')).toBe(true);
        expect(errorMessage.getAttribute('data-randomattribute')).toBe('just a test');
        expect(errorMessage.style.background).toBe('red');
        expect(errorMessage.style.margin).toBe('8px');
    });
});
