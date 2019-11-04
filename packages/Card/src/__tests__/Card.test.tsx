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
    it('should render with each elevation class', () => {
        const { getByTestId } = render(
            <>
                <Card data-testid="elevation0" elevation={0} />
                <Card data-testid="elevation1" elevation={1} />
                <Card data-testid="elevation2" elevation={2} />
                <Card data-testid="elevation3" elevation={3} />
                <Card data-testid="elevation4" elevation={4} />
            </>,
        );

        const elevation0 = getByTestId('elevation0');
        const elevation1 = getByTestId('elevation1');
        const elevation2 = getByTestId('elevation2');
        const elevation3 = getByTestId('elevation3');
        const elevation4 = getByTestId('elevation4');

        expect(elevation0.classList.contains('elevation0')).toBe(true);
        expect(elevation1.classList.contains('elevation1')).toBe(true);
        expect(elevation2.classList.contains('elevation2')).toBe(true);
        expect(elevation3.classList.contains('elevation3')).toBe(true);
        expect(elevation4.classList.contains('elevation4')).toBe(true);
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
