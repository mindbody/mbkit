import React from 'react';
import { Toaster } from '../Toaster';
import { render, fireEvent } from '@testing-library/react';

describe('Toaster', () => {
    it('should render nothing when the show prop is false', () => {
        const { container } = render(<Toaster show={false}>This is a toast</Toaster>);
        expect(container.textContent).toBe('');
    });
    it('should render the text when the show prop is true', () => {
        const { container } = render(<Toaster show={true}>This is a toast</Toaster>, {
            container: document.body,
        });
        expect(container.textContent).toBe('This is a toast');
    });
    it('should allow you to pass custom ', () => {
        const { container } = render(<Toaster show={true}>This is a toast</Toaster>, {
            container: document.body,
        });
        expect(container.textContent).toBe('This is a toast');
    });
    it('should allow a custom icon to be passed in', () => {
        const CustomIcon = () => <div data-testid="customIcon" />;
        const { getByTestId } = render(
            <Toaster show={true} icon={<CustomIcon />}>
                This is a toast
            </Toaster>,
        );
        expect(getByTestId('customIcon')).toBeTruthy();
    });
    it('should pass props down', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <Toaster
                show={true}
                data-testid="toaster"
                className="testing"
                data-randomattribute="cheers"
                onClick={spy}
                style={{ background: 'red' }}
            >
                This is a toast
            </Toaster>,
        );
        const toaster = getByTestId('toaster');
        fireEvent.click(toaster);
        expect(toaster.classList.contains('testing')).toBe(true);
        expect(toaster.getAttribute('data-randomattribute')).toBe('cheers');
        expect(toaster.style.background).toBe('red');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
