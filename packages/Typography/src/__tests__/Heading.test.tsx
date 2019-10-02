import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Heading from '../Heading';

describe('Heading', () => {
    it('should render the text that is passed down', () => {
        const { getByText } = render(<Heading as="h1">Test Text</Heading>);

        expect(getByText('Test Text')).toBeTruthy();
    });
    it('should render with the appropriate heading and class name', () => {
        const { getByTestId } = render(
            <>
                <Heading as="h1" data-testid="h1">
                    Test
                </Heading>
                <Heading as="h2" data-testid="h2">
                    Test
                </Heading>
                <Heading as="h3" data-testid="h3">
                    Test
                </Heading>
                <Heading as="h4" data-testid="h4">
                    Test
                </Heading>
                <Heading as="h5" data-testid="h5">
                    Test
                </Heading>
                <Heading as="h6" data-testid="h6">
                    Test
                </Heading>
            </>,
        );

        const h1 = getByTestId('h1');
        const h2 = getByTestId('h2');
        const h3 = getByTestId('h3');
        const h4 = getByTestId('h4');
        const h5 = getByTestId('h5');
        const h6 = getByTestId('h6');

        expect(h1.className).toContain('h1');
        expect(h1.nodeName.toLowerCase()).toBe('h1');

        expect(h2.className).toContain('h2');
        expect(h2.nodeName.toLowerCase()).toBe('h2');

        expect(h3.className).toContain('h3');
        expect(h3.nodeName.toLowerCase()).toBe('h3');

        expect(h4.className).toContain('h4');
        expect(h4.nodeName.toLowerCase()).toBe('h4');

        expect(h5.className).toContain('h5');
        expect(h5.nodeName.toLowerCase()).toBe('h5');

        expect(h6.className).toContain('h6');
        expect(h6.nodeName.toLowerCase()).toBe('h6');
    });
    it('should render with the appropriate heading and class name should match the size prop', () => {
        const { getByTestId } = render(
            <>
                <Heading as="h1" data-testid="h1" size={6}>
                    Test
                </Heading>
                <Heading as="h2" data-testid="h2" size={5}>
                    Test
                </Heading>
                <Heading as="h3" data-testid="h3" size={4}>
                    Test
                </Heading>
                <Heading as="h4" data-testid="h4" size={3}>
                    Test
                </Heading>
                <Heading as="h5" data-testid="h5" size={2}>
                    Test
                </Heading>
                <Heading as="h6" data-testid="h6" size={1}>
                    Test
                </Heading>
            </>,
        );

        const h1 = getByTestId('h1');
        const h2 = getByTestId('h2');
        const h3 = getByTestId('h3');
        const h4 = getByTestId('h4');
        const h5 = getByTestId('h5');
        const h6 = getByTestId('h6');

        expect(h1.className).toContain('h6');
        expect(h1.nodeName.toLowerCase()).toBe('h1');

        expect(h2.className).toContain('h5');
        expect(h2.nodeName.toLowerCase()).toBe('h2');

        expect(h3.className).toContain('h4');
        expect(h3.nodeName.toLowerCase()).toBe('h3');

        expect(h4.className).toContain('h3');
        expect(h4.nodeName.toLowerCase()).toBe('h4');

        expect(h5.className).toContain('h2');
        expect(h5.nodeName.toLowerCase()).toBe('h5');

        expect(h6.className).toContain('h1');
        expect(h6.nodeName.toLowerCase()).toBe('h6');
    });
    it('should pass through all props', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <Heading onClick={spy} as="h1" className="customClassName" data-testid="test">
                Test
            </Heading>,
        );
        const heading = getByTestId('test');

        fireEvent.click(heading);

        expect(heading.classList).toContain('customClassName');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
