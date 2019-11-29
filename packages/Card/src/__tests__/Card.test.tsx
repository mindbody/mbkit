import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
    it('should render with children', () => {
        const { getByText } = render(
            <Card>
                <h1>I am a test</h1>
            </Card>,
        );

        expect(getByText('I am a test')).toBeTruthy();
    });
    it('should pass all props to component', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <Card
                data-testid="test"
                data-randomattribute="THIS IS A TEST"
                onClick={spy}
                className="testing"
                style={{ margin: 24 }}
                as="section"
            />,
        );
        const card = getByTestId('test');
        fireEvent.click(card);

        expect(card.classList.contains('testing')).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(card.getAttribute('data-randomattribute')).toBe('THIS IS A TEST');
        expect(card.style.margin).toBe('24px');
        expect(card.nodeName).toBe('SECTION');
    });
});
