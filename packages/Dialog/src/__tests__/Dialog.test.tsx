import React from 'react';
import { render } from '@testing-library/react';
import { Dialog } from '../Dialog';

describe('Dialog', () => {
    const closeSpy = jest.fn();
    it('should render nothing if prop is show prop is false', () => {
        const { baseElement } = render(
            <Dialog data-testid="test" show={false} header="Some Heading" onClose={closeSpy}>
                Testing
            </Dialog>,
        );
        const foundElements = baseElement.querySelectorAll('[data-testid="test"]');
        expect(foundElements.length).toBe(0);
    });
    it('should render nothing if prop is show prop is true', () => {
        const { baseElement } = render(
            <Dialog data-testid="test" show={true} header="Some Heading" onClose={closeSpy}>
                Testing
            </Dialog>,
        );
        const foundElements = baseElement.querySelectorAll('[data-testid="test"]');
        expect(foundElements.length).toBe(1);
    });
    it('should pass props down to dialog', () => {
        const { getByTestId } = render(
            <Dialog
                data-testid="test"
                show={true}
                className="testing"
                style={{ background: 'orange' }}
                data-random-attribute="true"
                header="Some Heading"
                onClose={closeSpy}
            >
                Testing
            </Dialog>,
        );
        const dialog = getByTestId('test');
        expect(dialog.classList.contains('testing')).toBe(true);
        expect(dialog.style.background).toBe('orange');
        expect(dialog.getAttribute('data-random-attribute')).toBe('true');
    });
    it('should pass props to veil', () => {
        const { getByTestId } = render(
            <Dialog
                show={true}
                header="Some Heading"
                onClose={closeSpy}
                veilProps={{
                    className: 'testing',
                    style: { background: 'red' },
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore-next-line
                    ['data-random-attribute']: 'true',
                    ['data-testid']: 'test',
                }}
            >
                Testing
            </Dialog>,
        );
        const veil = getByTestId('test');
        expect(veil.classList.contains('testing')).toBe(true);
        expect(veil.getAttribute('data-random-attribute')).toBe('true');
        expect(veil.style.background).toBe('red');
    });
});
